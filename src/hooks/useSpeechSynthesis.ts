import { useState, useCallback } from 'react';

interface SpeechSynthesisHook {
  speak: (text: string, options?: { pitch?: number; rate?: number }) => void;
  isSpeaking: boolean;
  stop: () => void;
  isSupported: boolean;
}

export const useSpeechSynthesis = (): SpeechSynthesisHook => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSupported = 'speechSynthesis' in window;

  const speak = useCallback((text: string, options?: { pitch?: number; rate?: number }) => {
    if (!isSupported) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = options?.pitch ?? 1;
    utterance.rate = options?.rate ?? 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return { speak, isSpeaking, stop, isSupported };
};