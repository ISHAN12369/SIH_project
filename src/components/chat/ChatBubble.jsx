import React from 'react';
import { Bot, User } from 'lucide-react';

export default function ChatBubble({ message, sender, timestamp }) {
  const isAI = sender === 'ai';

  return (
    <div className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'} animate-slide-up`}>
      {/* Avatar */}
      <div
        className={`
          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
          ${isAI
            ? 'bg-primary-600/20 border border-primary-500/30'
            : 'bg-teal-600/20 border border-teal-500/30'
          }
        `}
      >
        {isAI ? <Bot size={16} className="text-primary-400" /> : <User size={16} className="text-teal-400" />}
      </div>

      {/* Bubble */}
      <div className={isAI ? 'chat-bubble chat-bubble-ai' : 'chat-bubble chat-bubble-user'}>
        <p>{message}</p>
        {timestamp && (
          <span className={`block text-xs mt-2 ${isAI ? 'text-white/30' : 'text-white/50'}`}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
