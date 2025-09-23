'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto relative pl-64">
        <div className="flex-1 overflow-y-auto py-6 px-8 pb-20">
          <div className="space-y-6">
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
                  {m.parts.map((part, index) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <div key={`${m.id}-${index}`} className="whitespace-pre-wrap">
                            {part.text}
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput('');
            }
          }}
          className="sticky bottom-0 left-0 right-0 py-4 px-8"
        >
          <div className="max-w-3xl mx-auto">
            <div className="relative mb-10">
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}