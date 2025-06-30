import { useState, useCallback, useRef } from 'react';

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export const useSpeechSynthesis = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    return new Promise<void>((resolve) => {
      if ('speechSynthesis' in window) {
        // Stop any current speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;
        
        // Set options
        utterance.rate = options.rate || 0.9;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;
        
        if (options.voice) {
          utterance.voice = options.voice;
        }
        
        // Progress tracking
        let startTime = Date.now();
        const estimatedDuration = text.length * 60; // Rough estimate: 60ms per character
        
        if (options.onProgress) {
          progressIntervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / estimatedDuration) * 100, 95);
            options.onProgress!(progress);
          }, 100);
        }
        
        utterance.onstart = () => {
          setIsPlaying(true);
          setIsPaused(false);
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
          setIsPaused(false);
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          if (options.onProgress) {
            options.onProgress(100);
          }
          if (options.onComplete) {
            options.onComplete();
          }
          resolve();
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          setIsPaused(false);
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          resolve();
        };
        
        utterance.onpause = () => {
          setIsPaused(true);
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
        };
        
        utterance.onresume = () => {
          setIsPaused(false);
          // Resume progress tracking
          if (options.onProgress && !progressIntervalRef.current) {
            startTime = Date.now(); // Reset start time for remaining text
            progressIntervalRef.current = setInterval(() => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min((elapsed / estimatedDuration) * 100, 95);
              options.onProgress!(progress);
            }, 100);
          }
        };
        
        window.speechSynthesis.speak(utterance);
      } else {
        console.warn('Speech synthesis not supported');
        resolve();
      }
    });
  }, []);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  }, []);

  const pause = useCallback(() => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
    }
  }, [isPlaying]);

  const resume = useCallback(() => {
    if ('speechSynthesis' in window && isPaused) {
      window.speechSynthesis.resume();
    }
  }, [isPaused]);

  const getVoices = useCallback(() => {
    if ('speechSynthesis' in window) {
      return window.speechSynthesis.getVoices();
    }
    return [];
  }, []);

  return {
    speak,
    stop,
    pause,
    resume,
    isPlaying,
    isPaused,
    getVoices
  };
};