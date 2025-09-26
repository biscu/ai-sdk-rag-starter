'use client';

import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';

const CHAT_STORAGE_KEY = 'chat:main-chat';

type ChatContextValue = {
  messages: any[];
  sendMessage: (input: { text: string }) => Promise<void>;
  reset: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  // Load any saved messages from localStorage only once on the client
  const [initialMessages] = useState<any[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const { messages, sendMessage, setMessages } = useChat({
    id: 'main-chat',
    messages: initialMessages,
  });

  // Persist to localStorage when messages change
  useEffect(() => {
    try {
      window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages]);

  const value = useMemo<ChatContextValue>(() => ({
    messages,
    sendMessage,
    reset: () => setMessages([]),
  }), [messages, sendMessage, setMessages]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within a ChatProvider');
  return ctx;
}
