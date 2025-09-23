'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Messages container with scrolling */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-6 w-full"
        >
          <div className="max-w-4xl mx-auto px-6 space-y-6 pb-24">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-4 rounded-lg ${
                    m.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {m.parts.map((part, index) => (
                      part.type === 'text' && part.text
                    )).join('')}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed input at the bottom */}
        <div className="w-full">
          <div className="max-w-4xl mx-auto pt-0 w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (input.trim()) {
                  sendMessage({ text: input });
                  setInput('');
                }
              }}
              className="relative w-full mb-10"
            >
              <input
                className="w-full p-4 pr-14 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                value={input}
                placeholder="Ask me about UX copy..."
                onChange={e => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 focus:outline-none"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}