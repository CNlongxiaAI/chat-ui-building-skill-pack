/**
 * EmotionDisplay - Visualizes the companion's emotional state
 */

import React from 'react';

interface EmotionDisplayProps {
  emotions: Record<string, number>;
  mode?: 'wheel' | 'bars';
  dominant?: string;
  compoundState?: string | null;
  moodMode?: string;
  size?: 'small' | 'medium' | 'large';
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

const EMOTION_LABELS: Record<string, string> = {
  joy: 'Joy',
  sadness: 'Sadness',
  trust: 'Trust',
  disgust: 'Disgust',
  fear: 'Fear',
  anger: 'Anger',
  anticipation: 'Anticipation',
  surprise: 'Surprise',
};

export const EmotionDisplay: React.FC<EmotionDisplayProps> = ({
  emotions = {},
  mode = 'bars',
  dominant = '',
  compoundState = null,
  moodMode = 'CALM',
  size = 'medium',
}) => {
  const sizeStyles = {
    small: { width: 120, barHeight: 8 },
    medium: { width: 200, barHeight: 12 },
    large: { width: 280, barHeight: 16 },
  };

  const { width, barHeight } = sizeStyles[size];
  const maxValue = 20;

  if (mode === 'wheel') {
    const radius = size === 'small' ? 40 : size === 'medium' ? 60 : 80;
    const centerX = radius + 10;
    const centerY = radius + 10;
    const emotionsList = Object.entries(emotions).filter(([_, v]) => v > 0);
    const angleStep = (2 * Math.PI) / Math.max(emotionsList.length, 1);

    return (
      <div style={{ width: (radius + 20) * 2, height: (radius + 20) * 2, position: 'relative' }}>
        <svg width={(radius + 20) * 2} height={(radius + 20) * 2}>
          <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#333" strokeWidth={1} />
          {emotionsList.map(([emotion, value], i) => {
            const angle = i * angleStep - Math.PI / 2;
            const barLength = (value / maxValue) * radius * 0.8;
            const x1 = centerX + Math.cos(angle) * (radius * 0.2);
            const y1 = centerY + Math.sin(angle) * (radius * 0.2);
            const x2 = centerX + Math.cos(angle) * (radius * 0.2 + barLength);
            const y2 = centerY + Math.sin(angle) * (radius * 0.2 + barLength);

            return (
              <g key={emotion}>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={EMOTION_COLORS[emotion] || '#888'}
                  strokeWidth={barHeight}
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 10, color: '#888' }}>{moodMode}</div>
          <div style={{
            fontSize: size === 'small' ? 14 : size === 'medium' ? 16 : 20,
            fontWeight: 'bold',
            color: EMOTION_COLORS[dominant] || '#888',
          }}>
            {EMOTION_LABELS[dominant] || 'Neutral'}
          </div>
          {compoundState && (
            <div style={{ fontSize: 10, color: '#888', fontStyle: 'italic' }}>
              {compoundState}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Bars mode
  const entries = Object.entries(emotions).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ width, padding: '8px' }}>
      {compoundState && (
        <div style={{ fontSize: 11, color: '#888', marginBottom: '8px', fontStyle: 'italic' }}>
          {compoundState}
        </div>
      )}

      {entries.map(([emotion, value]) => (
        <div key={emotion} style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
            <span style={{ color: EMOTION_COLORS[emotion] }}>{EMOTION_LABELS[emotion] || emotion}</span>
            <span style={{ color: '#888' }}>{value.toFixed(1)}</span>
          </div>
          <div style={{
            width: '100%',
            height: barHeight,
            background: '#252525',
            borderRadius: barHeight / 2,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${(value / maxValue) * 100}%`,
              height: '100%',
              background: EMOTION_COLORS[emotion] || '#888',
              borderRadius: barHeight / 2,
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      ))}

      <div style={{ marginTop: 8, fontSize: 10, color: '#666', textAlign: 'center' }}>
        {moodMode} MODE
      </div>
    </div>
  );
};