import React, { useState } from 'react';
import { Send, Mic, Keyboard } from 'lucide-react';
import VoiceInput from './VoiceInput';

export default function ChatInput({ onSend, disabled, inputHint }) {
  const [text, setText] = useState('');
  const [useVoice, setUseVoice] = useState(false);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceResult = (transcript) => {
    setText(transcript);
  };

  const handleVoiceSend = (transcript) => {
    if (transcript.trim()) {
      onSend(transcript.trim());
      setText('');
    }
  };

  return (
    <div className="chat-input-area">
      <div className="flex items-end gap-3">
        {/* Mode toggle */}
        <button
          onClick={() => setUseVoice(!useVoice)}
          className={`
            p-3 rounded-xl transition-all duration-200 flex-shrink-0 cursor-pointer
            ${useVoice
              ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
              : 'bg-white/5 text-white/40 border border-white/10 hover:text-white/60'
            }
          `}
          title={useVoice ? 'Switch to keyboard' : 'Switch to voice'}
        >
          {useVoice ? <Keyboard size={20} /> : <Mic size={20} />}
        </button>

        {useVoice ? (
          <VoiceInput
            onResult={handleVoiceResult}
            onSend={handleVoiceSend}
            disabled={disabled}
            currentText={text}
          />
        ) : (
          <>
            {/* Text input */}
            <div className="flex-1 relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={inputHint || 'Type your answer...'}
                disabled={disabled}
                rows={1}
                className="
                  w-full px-4 py-3 pr-12
                  bg-[var(--color-bg)] border border-white/10
                  rounded-xl text-white text-sm
                  placeholder:text-white/30
                  focus:border-primary-500/50 focus:outline-none
                  focus:shadow-[0_0_0_3px_rgba(51,141,255,0.1)]
                  transition-all duration-200
                  resize-none overflow-hidden
                  disabled:opacity-50
                "
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!text.trim() || disabled}
              className="
                p-3 rounded-xl
                bg-primary-600 text-white
                hover:bg-primary-500
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-all duration-200 cursor-pointer
                flex-shrink-0
              "
            >
              <Send size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
