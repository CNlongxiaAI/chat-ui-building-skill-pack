/**
 * useEmotion - Emotion computation hook with decay
 */

import { useState, useEffect, useCallback } from 'react';

interface UseEmotionReturn {
  currentEmotions: Record<string, number>;
  dominant: string;
  compoundState: string | null;
  moodMode: 'HIGH' | 'MID' | 'CALM';
  updateEmotion: (deltas: Record<string, number>) => void;
  reset: () => void;
}

const EMOTION_COLORS: Record<string, string> = {
  joy: '#f0d000',
  sadness: '#5b8fd9',
  trust: '#73d973',
  disgust: '#d973d9',
  fear: '#8b73d9',
  anger: '#d97373',
  anticipation: '#f0a000',
  surprise: '#d97373',
};

const DECAY_RATES: Record<string, number> = {
  joy: 0.985,
  sadness: 0.996,
  trust: 0.992,
  disgust: 0.992,
  fear: 0.992,
  anger: 0.980,
  anticipation: 0.985,
  surprise: 0.985,
};

const SLEEP_DECAY_RATE = 0.999;

const COMPOUND_TABLE: [string, string, string][] = [
  ['anticipation', 'fear', 'Apprehension'],
  ['joy', 'sadness', 'Mixed Feelings'],
  ['trust', 'sadness', 'Complicated'],
  ['anger', 'disgust', 'Edge of Rage'],
  ['joy', 'surprise', 'Excited Unease'],
];

function detectCompound(emotions: Record<string, number>): string | null {
  const sorted = Object.entries(emotions).sort((a, b) => b[1] - a[1]);
  const [topA, topB] = [sorted[0][0], sorted[1][0]];
  const [valA, valB] = [sorted[0][1], sorted[1][1]];

  if (Math.abs(valA - valB) > 4 || Math.min(valA, valB) < 8) return null;

  for (const [a, b, state] of COMPOUND_TABLE) {
    if ((topA === a && topB === b) || (topA === b && topB === a)) {
      return state;
    }
  }
  return null;
}

function getMoodMode(emotions: Record<string, number>): 'HIGH' | 'MID' | 'CALM' {
  const max = Math.max(...Object.values(emotions));
  if (max >= 16) return 'HIGH';
  if (max >= 11) return 'MID';
  return 'CALM';
}

function getDominant(emotions: Record<string, number>): string {
  return Object.entries(emotions).sort((a, b) => b[1] - a[1])[0][0];
}

export function useEmotion(
  initialEmotions?: Record<string, number>,
  options: { enableDecay?: boolean; decayInterval?: number; sleepMode?: boolean } = {}
): UseEmotionReturn {
  const { enableDecay = true, decayInterval = 1000, sleepMode = false } = options;

  const baselineRef = { current: {
    joy: 3, sadness: 3, trust: 3, disgust: 3,
    fear: 3, anger: 3, anticipation: 3, surprise: 3,
  }};

  const [emotions, setEmotions] = useState<Record<string, number>>(() => {
    const result: Record<string, number> = {};
    for (const k of Object.keys(baselineRef.current)) {
      result[k] = initialEmotions?.[k] ?? 3;
    }
    return result;
  });

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    if (!enableDecay) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMinutes = (now - lastUpdate) / 60000;
      const rate = sleepMode ? SLEEP_DECAY_RATE : null;

      setEmotions((prev) => {
        const decayed = { ...prev };
        for (const [emotion, current] of Object.entries(decayed)) {
          const decay = rate || DECAY_RATES[emotion] || 0.985;
          const baseline = baselineRef.current[emotion] || 3;
          decayed[emotion] = Math.max(1, Math.min(20,
            baseline + (current - baseline) * Math.pow(decay, elapsedMinutes)
          ));
        }
        return decayed;
      });

      setLastUpdate(now);
    }, decayInterval);

    return () => clearInterval(interval);
  }, [enableDecay, decayInterval, sleepMode, lastUpdate]);

  const updateEmotion = useCallback((deltas: Record<string, number>) => {
    setEmotions((prev) => {
      const updated = { ...prev };
      for (const [emotion, delta] of Object.entries(deltas)) {
        if (emotion in updated) {
          updated[emotion] = Math.max(1, Math.min(20, updated[emotion] + delta));
        }
      }
      return updated;
    });
    setLastUpdate(Date.now());
  }, []);

  const reset = useCallback(() => {
    const result: Record<string, number> = {};
    for (const k of Object.keys(baselineRef.current)) {
      result[k] = baselineRef.current[k];
    }
    setEmotions(result);
    setLastUpdate(Date.now());
  }, []);

  return {
    currentEmotions: emotions,
    dominant: getDominant(emotions),
    compoundState: detectCompound(emotions),
    moodMode: getMoodMode(emotions),
    updateEmotion,
    reset,
  };
}

export { EMOTION_COLORS };