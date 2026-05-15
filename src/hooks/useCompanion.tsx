/**
 * useCompanion - Main hook for companion state and actions
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

interface EmotionState {
  emotions: Record<string, number>;
  dominant_emotion: string;
  compound_state: string | null;
  mood_mode: string;
}

interface LifeState {
  sleep_quality: number;
  energy_level: number;
  active_concerns: any[];
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  emotion?: { label: string; valence: number; arousal: number };
}

interface CompanionContextType {
  emotionState: EmotionState | null;
  lifeState: LifeState | null;
  sessionId: string | null;
  isConnected: boolean;
  isTyping: boolean;
  messages: ChatMessage[];
  sendMessage: (message: string) => Promise<void>;
  onboard: (name: string, about?: string) => Promise<string>;
}

const CompanionContext = createContext<CompanionContextType | null>(null);

interface CompanionProviderProps {
  apiEndpoint: string;
  children: React.ReactNode;
}

export const CompanionProvider: React.FC<CompanionProviderProps> = ({
  apiEndpoint,
  children,
}) => {
  const [emotionState, setEmotionState] = useState<EmotionState | null>(null);
  const [lifeState, setLifeState] = useState<LifeState | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = useCallback(async (message: string) => {
    if (!sessionId) return;

    setIsTyping(true);

    try {
      const res = await fetch(`${apiEndpoint}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message }),
      });

      if (res.ok) {
        const data = await res.json();

        setMessages((prev) => [...prev, {
          id: `user-${Date.now()}`,
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        }]);

        setMessages((prev) => [...prev, {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toISOString(),
          emotion: data.emotion,
        }]);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setIsTyping(false);
    }
  }, [apiEndpoint, sessionId]);

  const onboard = useCallback(async (name: string, about?: string): Promise<string> => {
    try {
      const res = await fetch(`${apiEndpoint}/onboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, about }),
      });

      if (res.ok) {
        const data = await res.json();
        setSessionId(data.session_id);
        setMessages([{
          id: `sys-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          timestamp: new Date().toISOString(),
        }]);
        return data.session_id;
      }
      throw new Error('Onboard failed');
    } catch (err) {
      console.error('Failed to onboard:', err);
      throw err;
    }
  }, [apiEndpoint]);

  const value: CompanionContextType = {
    emotionState,
    lifeState,
    sessionId,
    isConnected,
    isTyping,
    messages,
    sendMessage,
    onboard,
  };

  return (
    <CompanionContext.Provider value={value}>
      {children}
    </CompanionContext.Provider>
  );
};

export const useCompanion = (): CompanionContextType => {
  const context = useContext(CompanionContext);
  if (!context) {
    throw new Error('useCompanion must be used within CompanionProvider');
  }
  return context;
};