/**
 * ProactiveIndicator - Shows companion thinking/proactive state
 */

import React from 'react';

interface ProactiveIndicatorProps {
  isThinking?: boolean;
  pendingThoughts?: number;
  lastProactiveMessage?: string;
  timeSinceLastInteraction?: number;
  compact?: boolean;
}

export const ProactiveIndicator: React.FC<ProactiveIndicatorProps> = ({
  isThinking = false,
  pendingThoughts = 0,
  lastProactiveMessage = '',
  timeSinceLastInteraction = 0,
  compact = false,
}) => {
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
  };

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#888' }}>
        {isThinking ? (
          <>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#f0a000',
              animation: 'pulse 1s infinite',
            }} />
            <span>thinking</span>
          </>
        ) : (
          <>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#333' }} />
            <span>idle</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{
      padding: 12,
      background: '#1a1a1a',
      borderRadius: 8,
      border: '1px solid #2a2a2a',
      fontSize: 11,
    }}>
      <div style={{ color: '#888', marginBottom: 8 }}>COMPANION STATUS</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isThinking ? '#f0a000' : '#333',
          animation: isThinking ? 'pulse 1s infinite' : 'none',
        }} />
        <span style={{ color: isThinking ? '#f0a000' : '#666' }}>
          {isThinking ? 'Thinking...' : 'Idle'}
        </span>
      </div>

      {pendingThoughts > 0 && (
        <div style={{ marginBottom: 8 }}>
          <span style={{ color: '#888' }}>Pending thoughts: </span>
          <span style={{ color: '#e8e4dc' }}>{pendingThoughts}</span>
          {pendingThoughts >= 3 && (
            <span style={{ color: '#f0a000', marginLeft: 4 }}>⚠️</span>
          )}
        </div>
      )}

      {lastProactiveMessage && (
        <div style={{
          padding: '6px 8px',
          background: '#151515',
          borderRadius: 4,
          marginBottom: 8,
          fontStyle: 'italic',
          color: '#888',
        }}>
          "{lastProactiveMessage.substring(0, 50)}
          {lastProactiveMessage.length > 50 ? '...' : ''}"
        </div>
      )}

      <div style={{ color: '#666' }}>
        Last interaction: {formatDuration(timeSinceLastInteraction)} ago
      </div>

      <style>
        {`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}
      </style>
    </div>
  );
};