import React from 'react';
import { Bot } from 'lucide-react';

export default function ThinkingIndicator() {
  return (
    <div className="flex gap-3 animate-slide-up">
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-primary-600/20 border border-primary-500/30">
        <Bot size={16} className="text-primary-400" />
      </div>
      <div className="chat-bubble chat-bubble-ai">
        <div className="thinking-dots">
          <div className="thinking-dot" />
          <div className="thinking-dot" />
          <div className="thinking-dot" />
        </div>
      </div>
    </div>
  );
}
