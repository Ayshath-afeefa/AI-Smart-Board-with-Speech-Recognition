import React from 'react';
import { Volume2, Mic, BookOpen, Brain } from 'lucide-react';

interface AvatarProps {
  isListening: boolean;
  isSpeaking: boolean;
  mode: 'recording' | 'content';
}

const Avatar: React.FC<AvatarProps> = ({ isListening, isSpeaking, mode }) => {
  const getAvatarIcon = () => {
    if (isSpeaking) {
      return <Volume2 size={32} className="text-white animate-pulse" />;
    }
    if (isListening) {
      return <Mic size={32} className="text-white" />;
    }
    if (mode === 'content') {
      return <BookOpen size={32} className="text-white" />;
    }
    return <Brain size={32} className="text-white" />;
  };

  const getAvatarColor = () => {
    if (mode === 'content') {
      return 'from-purple-400 to-pink-500';
    }
    return 'from-blue-400 to-purple-500';
  };

  const getRingColor = () => {
    if (mode === 'content' && isSpeaking) {
      return 'ring-purple-400/50';
    }
    if (isListening) {
      return 'ring-green-400/50';
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Circle */}
      <div className="relative">
        <div 
          className={`w-32 h-32 rounded-full bg-gradient-to-br ${getAvatarColor()} flex items-center justify-center transition-all duration-300 ${
            isListening || isSpeaking ? `animate-pulse ring-4 ${getRingColor()}` : ''
          } ${
            isSpeaking ? 'animate-bounce' : ''
          }`}
        >
          {/* Avatar Face */}
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {getAvatarIcon()}
          </div>
        </div>

        {/* Content Processing Indicator */}
        {mode === 'content' && isSpeaking && (
          <div className="absolute -inset-8 flex items-center justify-center">
            <div className="flex space-x-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    height: `${15 + Math.random() * 25}px`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Audio Waves Animation for Recording */}
        {mode === 'recording' && isSpeaking && (
          <div className="absolute -inset-8 flex items-center justify-center">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-blue-400 rounded-full animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 30}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Listening Indicator */}
        {isListening && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content Reading Progress Ring */}
        {mode === 'content' && isSpeaking && (
          <div className="absolute inset-0 rounded-full">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(147, 51, 234, 0.3)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#9333ea"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - 0.3)}`}
                className="transition-all duration-300"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Status Text */}
      <div className="mt-4 text-center">
        <p className="text-white font-medium">
          {mode === 'content' 
            ? (isSpeaking ? 'Reading Content...' : 'Content Mode') 
            : (isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready')
          }
        </p>
        <p className="text-blue-200 text-sm mt-1">
          {mode === 'content' 
            ? (isSpeaking ? 'Processing and summarizing' : 'Upload content to begin') 
            : (isSpeaking ? 'Processing your words' : isListening ? 'Say something' : 'Press start to begin')
          }
        </p>
      </div>

      {/* Visual Feedback Bars */}
      <div className="mt-4 flex space-x-1">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-200 ${
              mode === 'content' ? 'bg-purple-400' : 'bg-blue-400'
            } ${
              isListening || isSpeaking 
                ? 'animate-pulse' 
                : 'opacity-30'
            }`}
            style={{
              height: `${8 + (isListening || isSpeaking ? Math.random() * 16 : 0)}px`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Avatar;