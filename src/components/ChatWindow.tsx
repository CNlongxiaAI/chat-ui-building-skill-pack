/**
 * ChatWindow - Full-featured chat interface for AI companion
 */

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  emotion?: { label: string; valence: number; arousal: number };
}

interface ChatWindowProps {
  sessionId?: string;
  messages?: ChatMessage[];
  showEmotionTags?: boolean;
  showTimestamps?: boolean;
  maxMessages?: number;
  placeholder?: string;
  onSend?: (message: string) => void;
  onTyping?: (isTyping: boolean) => void;
  disabled?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages = [],
  showEmotionTags = true,
  showTimestamps = true,
  maxMessages = 100,
  placeholder = 'Say something...',
  onSend,
  onTyping,
  disabled = false,
}) => {
  const [input, setInput] = useState('');
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  const handleSend = () => {
    if (!input.trim() || disabled) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setLocalMessages((prev) => {
      const updated = [...prev, userMessage];
      if (maxMessages && updated.length > maxMessages) {
        return updated.slice(-maxMessages);
      }
      return updated;
    });

    setInput('');
    onSend?.(input.trim());

    setIsTyping(true);
    onTyping?.(true);

    setTimeout(() => {
      setIsTyping(false);
      onTyping?.(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (ts: string) => {
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#111',
      border: '1px solid #2a2a2a',
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {localMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              maxWidth: '82%',
              padding: '10px 14px',
              borderRadius: 10,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' ? '#2a2419' : '#1a1e1a',
              border: msg.role === 'user' ? '1px solid #3d3020' : '1px solid #253025',
            }}
          >
            <div style={{ lineHeight: 1.5, fontSize: '0.92rem' }}>{msg.content}</div>
            {showEmotionTags && msg.emotion && (
              <div style={{ fontSize: '0.72rem', color: '#888', marginTop: 4 }}>
                {msg.emotion.label} · v{msg.emotion.valence.toFixed(1)} a{msg.emotion.arousal.toFixed(1)}
              </div>
            )}
            {showTimestamps && (
              <div style={{ fontSize: '0.65rem', color: '#555', marginTop: 4 }}>
                {formatTime(msg.timestamp)}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{
            maxWidth: '82%',
            padding: '10px 14px',
            borderRadius: 10,
            alignSelf: 'flex-start',
            background: '#1a1e1a',
            border: '1px solid #253025',
            fontSize: '0.85rem',
            color: '#888',
          }}>
            thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div style={{
        display: 'flex',
        gap: 8,
        padding: '12px 16px',
        borderTop: '1px solid #2a2a2a',
        background: '#0d0d0d',
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            flex: 1,
            padding: '10px 14px',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 6,
            color: '#e8e4dc',
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          style={{
            padding: '10px 20px',
            background: '#c9b99a',
            color: '#0d0d0d',
            border: 'none',
            borderRadius: 6,
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            fontWeight: 'bold',
            cursor: disabled || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: disabled || !input.trim() ? 0.5 : 1,
          }}
        >
          →
        </button>
      </div>
    </div>
  );
};