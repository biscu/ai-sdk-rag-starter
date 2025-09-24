'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 pl-64 flex flex-col h-screen overflow-hidden">
        {/* Messages container with scrolling */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto px-6 py-8">
            {!hasMessages ? (
              <div className="h-full flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
                    <MessageCircle className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Welcome to Carro GPT</h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-center max-w-md mx-auto">
                    Start a conversation by typing a message below. I'm here to help you with any questions you might have regarding UX copywriting.
                  </p>
                </div>
              </div>
            ) : (
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
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {m.parts.map((part, index) => (
                          <span key={index}>{part.text}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 mb-16">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-r-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}