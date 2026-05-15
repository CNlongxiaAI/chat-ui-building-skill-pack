/**
 * MemoryIndicator - Shows memory tier status
 */

import React from 'react';

interface MemoryTier {
  count: number;
  loading?: boolean;
}

interface MemoryIndicatorProps {
  tiers: {
    tier1?: MemoryTier;
    tier2?: MemoryTier;
    tier3?: MemoryTier;
    tier4?: MemoryTier;
  };
  lastRecall?: number;
  onExpand?: (tier: number) => void;
}

const TIER_LABELS = { 1: 'Real-time', 2: 'Shallow', 3: 'Structured', 4: 'Deep' };
const TIER_COLORS = { 1: '#f0d000', 2: '#73d973', 3: '#5b8fd9', 4: '#8b73d9' };

export const MemoryIndicator: React.FC<MemoryIndicatorProps> = ({
  tiers = {},
  lastRecall,
  onExpand,
}) => {
  return (
    <div style={{
      padding: 16,
      background: '#1a1a1a',
      borderRadius: 8,
      border: '1px solid #2a2a2a',
    }}>
      <div style={{ fontSize: 11, color: '#888', marginBottom: 12, letterSpacing: '0.1em' }}>
        MEMORY TIERS
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[1, 2, 3, 4].map((tier) => {
          const tierData = tiers[`tier${tier}` as keyof typeof tiers];
          const count = tierData?.count || 0;
          const loading = tierData?.loading || false;
          const color = TIER_COLORS[tier as keyof typeof TIER_COLORS];

          return (
            <div
              key={tier}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: onExpand ? 'pointer' : 'default',
              }}
              onClick={() => onExpand?.(tier)}
            >
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: loading ? '#888' : color,
                opacity: loading ? 0.5 : 1,
              }} />

              <div style={{ flex: 1, fontSize: 10, color: '#888' }}>
                {TIER_LABELS[tier as keyof typeof TIER_LABELS]}
              </div>

              <div style={{ fontSize: 11, color: '#e8e4dc', fontFamily: 'monospace' }}>
                {loading ? '...' : count}
              </div>

              <div style={{
                width: 40,
                height: 4,
                background: '#252525',
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${Math.min(100, count * 2)}%`,
                  height: '100%',
                  background: color,
                  opacity: loading ? 0.5 : 1,
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {lastRecall !== undefined && (
        <div style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid #252525',
          fontSize: 10,
          color: '#666',
        }}>
          Last recall: {lastRecall} memories
        </div>
      )}
    </div>
  );
};