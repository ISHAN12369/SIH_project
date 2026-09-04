import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

// Direct Web Speech API usage (avoids dependency issues with react-speech-recognition)
const SpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null;

export default function VoiceInput({ onResult, onSend, disabled, currentText }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-IN';

    rec.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      const combined = finalTranscript || interimTranscript;
      setTranscript(combined);
      if (onResult) onResult(combined);
    };

    rec.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    rec.onend = () => {
      setListening(false);
    };

    setRecognition(rec);

    return () => {
      rec.abort();
    };
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognition) return;

    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      setTranscript('');
      recognition.start();
      setListening(true);
    }
  }, [listening, recognition]);

  const handleSend = () => {
    const textToSend = currentText || transcript;
    if (textToSend.trim()) {
      if (listening && recognition) {
        recognition.stop();
        setListening(false);
      }
      onSend(textToSend);
      setTranscript('');
    }
  };

  if (!supported) {
    return (
      <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-danger-500/10 border border-danger-500/20">
        <MicOff size={18} className="text-danger-400" />
        <span className="text-sm text-danger-300">Voice input not supported in this browser. Try Chrome or Edge.</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center gap-3">
      {/* Live transcript display */}
      <div className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-white/10 min-h-[48px] flex items-center">
        {listening ? (
          <div className="flex items-center gap-2 w-full">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-danger-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-danger-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-danger-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm text-white/80 flex-1">
              {currentText || transcript || 'Listening...'}
            </span>
          </div>
        ) : (
          <span className="text-sm text-white/30">
            {currentText || 'Tap the mic and start speaking...'}
          </span>
        )}
      </div>

      {/* Mic button */}
      <button
        onClick={toggleListening}
        disabled={disabled}
        className={`mic-button ${listening ? 'listening' : ''}`}
        title={listening ? 'Stop listening' : 'Start voice input'}
      >
        {listening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      {/* Send */}
      <button
        onClick={handleSend}
        disabled={!(currentText || transcript).trim() || disabled}
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
    </div>
  );
}
