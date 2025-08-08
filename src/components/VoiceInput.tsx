import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, Volume2 } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { hadassahAI } from '../services/aiEngine';
import { StorageService } from '../services/storage';

const useTheme = () => {
  const preferences = StorageService.getPreferences();
  return {
    isDark: preferences.darkMode,
    contrast: preferences.contrast
  };
};

const VoiceInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { isDark, contrast } = useTheme();
  
  const { 
    transcript, 
    isListening, 
    startListening, 
    stopListening, 
    resetTranscript,
    isSupported: speechSupported 
  } = useSpeechRecognition();
  
  const { speak, isSpeaking, stop: stopSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    const userMessage = input.trim();
    setInput('');
    resetTranscript();

    try {
      const aiResponse = hadassahAI.processCommand(userMessage);
      setResponse(aiResponse);

      // Save conversation
      const preferences = StorageService.getPreferences();
      if (preferences.rememberConversations) {
        StorageService.addConversation({
          timestamp: new Date(),
          userMessage,
          aiResponse
        });
      }

      // Speak response if voice is enabled
      if (preferences.voiceEnabled && aiResponse) {
        speak(aiResponse, { 
          pitch: preferences.voicePitch, 
          rate: preferences.voiceSpeed 
        });
      }
    } catch (error) {
      setResponse("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setResponse(''); // Clear previous response when starting to listen
    }
  };

  const handleSpeakResponse = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (response) {
      const preferences = StorageService.getPreferences();
      speak(response, { 
        pitch: preferences.voicePitch, 
        rate: preferences.voiceSpeed 
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What can I help you with today?"
            className={`w-full px-6 py-4 pr-24 text-lg border-2 rounded-2xl focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-lg ${
              isDark 
                ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            }`}
            style={{ filter: `contrast(${contrast})` }}
            disabled={isProcessing}
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {speechSupported && (
              <motion.button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-full transition-all duration-300 shadow-lg ${
                  isListening 
                    ? 'bg-red-500 text-white shadow-red-500/25' 
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/25'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isProcessing}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </motion.button>
            )}
            
            <motion.button
              type="submit"
              className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-teal-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!input.trim() || isProcessing}
            >
              <Send size={20} />
            </motion.button>
          </div>
        </div>

        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-12 left-0 right-0 text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm shadow-lg shadow-red-500/25">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <span>Listening...</span>
            </div>
          </motion.div>
        )}
      </form>

      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border backdrop-blur-sm shadow-lg transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-gray-600'
              : 'bg-gradient-to-r from-blue-50/80 to-teal-50/80 border-blue-100'
          }`}
          style={{ filter: `contrast(${contrast})` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className={`font-semibold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Hadassah</span>
              </div>
              <p className={`leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>{response}</p>
            </div>
            
            <motion.button
              onClick={handleSpeakResponse}
              className={`ml-4 p-2 rounded-full transition-all duration-300 shadow-lg ${
                isSpeaking
                  ? 'bg-orange-500 text-white shadow-orange-500/25'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
            isDark ? 'bg-gray-700/80' : 'bg-blue-100/80'
          }`}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className={`w-4 h-4 border-2 border-t-transparent rounded-full ${
                isDark ? 'border-blue-400' : 'border-blue-500'
              }`}
            />
            <span className={`text-sm transition-colors duration-300 ${
              isDark ? 'text-blue-300' : 'text-blue-700'
            }`}>Processing...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VoiceInput;