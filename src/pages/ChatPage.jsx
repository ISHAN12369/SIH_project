import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '../components/chat/ChatBubble';
import ChatInput from '../components/chat/ChatInput';
import ChipSelector from '../components/chat/ChipSelector';
import RedFlagBanner from '../components/chat/RedFlagBanner';
import ThinkingIndicator from '../components/chat/ThinkingIndicator';
import MockChatService from '../services/mockChatService';
import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

export default function ChatPage() {
  const chatService = useMemo(() => new MockChatService(), []);
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isRedFlagged, setIsRedFlagged] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Load first question on mount
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

    // Add AI message
    setMessages(prev => [...prev, {
      id: question.id,
      text: question.text,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);

    setCurrentQuestion(question);
  };

  const handleUserSend = async (answer) => {
    const answerText = Array.isArray(answer) ? answer.join(', ') : answer;

    // Add user message
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      text: answerText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);

    setCurrentQuestion(null);
    await loadNextQuestion(answerText);
  };

  const getTimeStamp = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Red flag banner */}
      {isRedFlagged && <RedFlagBanner />}

      {/* Chat header */}
      <div className={`px-6 py-4 border-b border-white/10 bg-[var(--color-bg-card)] ${isRedFlagged ? 'mt-12' : ''}`}>
        <h2 className="font-display font-bold text-lg">Health Assessment</h2>
        <p className="text-sm text-white/40">Answer the questions below to complete your pre-consultation</p>
      </div>

      {/* Messages */}
      <div className="chat-messages flex-1">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            sender={msg.sender}
            timestamp={msg.timestamp}
          />
        ))}

        {/* Thinking indicator */}
        {isThinking && <ThinkingIndicator />}

        {/* Chip selector for current question */}
        {currentQuestion && currentQuestion.type === 'chips' && !isThinking && (
          <div className="ml-11 animate-slide-up">
            <ChipSelector
              chips={currentQuestion.chips}
              multiSelect={currentQuestion.multiSelect}
              onSelect={handleUserSend}
            />
          </div>
        )}

        {/* Completion state */}
        {isComplete && (
          <div className="text-center py-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-600/20 border border-success-500/30 mb-4">
              <svg className="w-8 h-8 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Assessment Complete</h3>
            <p className="text-white/40 text-sm mb-6 max-w-sm mx-auto">
              Your responses have been recorded. You can now upload any documents or proceed to view your summary.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={() => navigate('/upload')} variant="secondary">
                Upload Documents
              </Button>
              <Button onClick={() => navigate('/summary')}>
                View Summary <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area (hide when complete or chips are showing for single-select) */}
      {!isComplete && currentQuestion && currentQuestion.type !== 'chips' && currentQuestion.type !== 'final' && (
        <ChatInput
          onSend={handleUserSend}
          disabled={isThinking}
          inputHint={currentQuestion?.inputHint}
        />
      )}
    </div>
  );
}
