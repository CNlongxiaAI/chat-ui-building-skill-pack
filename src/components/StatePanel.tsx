/**
 * StatePanel - Displays life state and active concerns
 */

import React from 'react';

interface ActiveConcern {
  id: string;
  description: string;
  importance: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  emotion_link: string;
  needs_info?: boolean;
}

interface StatePanelProps {
  sleepQuality?: number;
  energyLevel?: number;
  activeConcerns?: ActiveConcern[];
  currentTask?: string | null;
  taskStress?: number;
  compact?: boolean;
}

const IMPORTANCE_COLORS: Record<string, string> = {
  LOW: '#888888',
  MEDIUM: '#c9b99a',
  HIGH: '#d97373',
  CRITICAL: '#d97373',
};

export const StatePanel: React.FC<StatePanelProps> = ({
  sleepQuality = 3,
  energyLevel = 5,
  activeConcerns = [],
  currentTask = null,
  taskStress = 0,
  compact = false,
}) => {
  const getSleepEmoji = (quality: number) => {
    if (quality >= 5) return '😴';
    if (quality >= 4) return '😊';
    if (quality >= 3) return '😐';
    if (quality >= 2) return '😔';
    return '😫';
  };

  const getEnergyBar = (level: number) => {
    const filled = Math.round(level / 2);
    return '●'.repeat(filled) + '○'.repeat(5 - filled);
  };

  if (compact) {
    return (
      <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
        <span title="Sleep quality">{getSleepEmoji(sleepQuality)}{sleepQuality}</span>
        <span title="Energy level" style={{ color: '#888' }}>⚡{getEnergyBar(energyLevel)}</span>
        {currentTask && <span title="Current task" style={{ color: '#888' }}>📋</span>}
      </div>
    );
  }

  return (
    <div style={{
      padding: 16,
      background: '#1a1a1a',
      borderRadius: 8,
      border: '1px solid #2a2a2a',
    }}>
      <div style={{ fontSize: 11, color: '#888', marginBottom: 12, letterSpacing: '0.1em' }}>
        LIFE STATE
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>SLEEP</div>
          <div style={{ fontSize: 16 }}>{getSleepEmoji(sleepQuality)} {sleepQuality}/5</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>ENERGY</div>
          <div style={{ fontSize: 16, color: energyLevel >= 6 ? '#73d973' : '#d97373' }}>
            {getEnergyBar(energyLevel)} {energyLevel}/10
          </div>
        </div>
      </div>

      {currentTask && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>CURRENT TASK</div>
          <div style={{ fontSize: 12 }}>{currentTask}</div>
          {taskStress > 0 && (
            <div style={{ fontSize: 10, color: taskStress >= 7 ? '#d97373' : '#888', marginTop: 2 }}>
              Stress: {taskStress}/10
            </div>
          )}
        </div>
      )}

      <div>
        <div style={{ fontSize: 10, color: '#666', marginBottom: 8 }}>ACTIVE CONCERNS</div>
        {activeConcerns.length === 0 ? (
          <div style={{ fontSize: 11, color: '#555', fontStyle: 'italic' }}>(none)</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {activeConcerns.slice(0, 5).map((concern) => (
              <div key={concern.id} style={{
                display: 'flex',
                gap: 8,
                fontSize: 11,
                padding: '4px 0',
                borderBottom: '1px solid #252525',
              }}>
                <span style={{ color: IMPORTANCE_COLORS[concern.importance] || '#888', fontWeight: 'bold' }}>
                  [{concern.importance[0]}]
                </span>
                <span style={{ flex: 1 }}>{concern.description}</span>
                {concern.needs_info && <span style={{ color: '#888' }}>🔍</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};