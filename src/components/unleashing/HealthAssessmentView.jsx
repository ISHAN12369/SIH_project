import React, { useState, useEffect, useRef, useMemo } from 'react';
import MockChatService from '../../services/mockChatService';
import { Send, Mic, Keyboard, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HealthAssessmentView({ onNavigateToUpload, onNavigateToSummary }) {
  const chatService = useMemo(() => new MockChatService(), []);
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isRedFlagged, setIsRedFlagged] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Initial question
  useEffect(() => {
    loadNextQuestion(null);
  }, []);

  const loadNextQuestion = async (userAnswer) => {
    setIsThinking(true);
    const question = await chatService.fetchNextQuestion(userAnswer);
    setIsThinking(false);

    if (!question) {
      setIsComplete(true);
      return;
    }

    if (question.isRedFlagged) {
      setIsRedFlagged(true);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: question.id,
        text: question.text,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setCurrentQuestion(question);
  };

  const handleSend = async (answer) => {
    const answerText = Array.isArray(answer) ? answer.join(', ') : answer;
    if (!answerText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        text: answerText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setText('');
    setCurrentQuestion(null);
    await loadNextQuestion(answerText);
  };

  // Web Speech API for voice
  const toggleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onstart = () => setIsListening(true);
      rec.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((r) => r[0].transcript)
          .join('');
        setText(transcript);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <div className="ub-clinical-shell" style={{ '--theme-bg': '#d6e2de', '--theme-color': '#35705b' }}>
      <div className="ub-clinical-card">
        {/* Red Flag Urgent Alert Banner */}
        {isRedFlagged && (
          <div className="ub-red-flag-banner">
            <AlertTriangle size={20} />
            <span>⚠️ URGENT: High priority symptoms flagged — patient queue prioritized for immediate physician attention.</span>
          </div>
        )}

        {/* Card Header */}
        <div className="ub-clinical-header">
          <div>
            <h2 className="ub-clinical-header-title">Conversational Health Assessment</h2>
            <p className="ub-clinical-header-subtitle">
              Adaptive AI intake questioning • Voice, typed, or tap chips supported
            </p>
          </div>
          <span className="ub-status-pill normal" style={{ background: '#35705b15', color: '#35705b' }}>
            {isComplete ? 'Intake Completed' : 'Session Active'}
          </span>
        </div>

        {/* Message Log */}
        <div className="ub-chat-log">
          {messages.map((m) => (
            <div key={m.id} className={`ub-bubble ${m.sender}`}>
              <p>{m.text}</p>
              <span className="ub-bubble-time">{m.timestamp}</span>
            </div>
          ))}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="ub-bubble ai" style={{ display: 'flex', gap: '5px', padding: '1rem 1.25rem' }}>
              <span style={{ animation: 'soundBar 0.8s infinite' }}>●</span>
              <span style={{ animation: 'soundBar 0.8s infinite 0.2s' }}>●</span>
              <span style={{ animation: 'soundBar 0.8s infinite 0.4s' }}>●</span>
            </div>
          )}

          {/* Tap-to-Select Chips */}
          {currentQuestion?.type === 'chips' && !isThinking && (
            <div className="ub-chips-area">
              {currentQuestion.chips?.map((chip) => (
                <button
                  key={chip}
                  className="ub-chip"
                  onClick={() => handleSend(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Completion State */}
          {isComplete && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <CheckCircle2 size={48} color="#35705b" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                Assessment Complete
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', maxWidth: '28rem', margin: '0 auto 1.5rem' }}>
                Your responses have been structured for the attending physician. Proceed to upload lab records or review the clinical summary.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  className="ub-see-chap-btn"
                  style={{ borderColor: '#35705b', color: '#35705b' }}
                  onClick={onNavigateToUpload}
                >
                  Upload Records
                </button>
                <button
                  className="ub-see-chap-btn"
                  style={{ background: '#35705b', color: '#ffffff', borderColor: '#35705b' }}
                  onClick={onNavigateToSummary}
                >
                  View Physician Summary <ArrowRight size={14} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        {!isComplete && currentQuestion?.type !== 'chips' && (
          <div className="ub-chat-input-bar">
            <button
              className={`ub-input-mode-btn ${isListening ? 'active' : ''}`}
              onClick={toggleVoice}
              title={isListening ? 'Listening... Tap to stop' : 'Tap to speak (Web Speech API)'}
            >
              <Mic size={18} />
            </button>

            <input
              type="text"
              className="ub-chat-textarea"
              placeholder={isListening ? 'Listening to your voice...' : currentQuestion?.inputHint || 'Type your answer...'}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(text);
              }}
              disabled={isThinking}
            />

            <button
              className="ub-chat-send-btn"
              onClick={() => handleSend(text)}
              disabled={isThinking || !text.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
