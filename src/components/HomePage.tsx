import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import VoiceInput from './VoiceInput';
import FeatureCarousel from './FeatureCarousel';
import ScrollingText from './ScrollingText';
import { StorageService } from '../services/storage';

const HomePage: React.FC = () => {
  const preferences = StorageService.getPreferences();
  const isDark = preferences.darkMode;
  const contrast = preferences.contrast;

  const quickCommands = [
    'Send message',
    'Dim lights',
    'Search web',
    'Set reminder',
    'Open YouTube',
    'Check weather'
  ];

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'
      }`}
      style={{ filter: `contrast(${contrast})` }}
    >
      {/* Header */}
      <header className="relative pt-8 pb-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center space-x-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
            >
              <Sparkles className="text-white" size={24} />
            </motion.div>
            <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
              isDark 
                ? 'from-blue-400 to-teal-400' 
                : 'from-blue-600 to-teal-600'
            }`}>
              BarbraAI
            </h1>
          </div>
          <p className={`text-lg font-medium transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            powered by <span className={`font-semibold transition-colors duration-300 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>Hadassah</span>
          </p>
        </motion.div>

        {/* Scrolling text banner */}
        <div className={`absolute bottom-0 left-0 right-0 py-2 opacity-60 transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-gray-800/80 to-gray-700/80' 
            : 'bg-gradient-to-r from-blue-100 to-teal-100'
        }`}>
          <ScrollingText 
            text="Your intelligent voice assistant that learns, adapts, and acts just like you • Smart • Responsive • Personal • Secure"
            className={`font-medium transition-colors duration-300 ${
              isDark ? 'text-blue-300' : 'text-blue-800'
            }`}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-8"
        >
          <VoiceInput />
          
          {/* Quick command suggestions */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {quickCommands.map((command, index) => (
              <motion.span
                key={command}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`px-4 py-2 backdrop-blur-sm rounded-full text-sm border cursor-pointer transition-all duration-300 shadow-lg ${
                  isDark
                    ? 'bg-gray-800/60 text-gray-200 border-gray-600 hover:bg-gray-700/80'
                    : 'bg-white/60 text-gray-700 border-gray-200 hover:bg-white/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {command}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Feature Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className={`text-3xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              What Hadassah Can Do
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience the power of AI that understands you, learns from you, and acts on your behalf
            </p>
          </div>
          
          <FeatureCarousel />
        </motion.section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <div className={`backdrop-blur-sm rounded-3xl p-8 border shadow-xl transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-gray-800/60 to-gray-700/40 border-gray-600/50'
              : 'bg-gradient-to-r from-white/60 to-white/40 border-white/50'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Your Personal AI Assistant
            </h3>
            <p className={`text-lg leading-relaxed mb-6 transition-colors duration-300 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              BarbraAI is powered by Hadassah, an intelligent engine that can speak, listen, act, and remember — just like you would. 
              Say it, and Hadassah will handle it with the same care and attention you would give it yourself.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                  <span className="text-white text-2xl">🎙️</span>
                </div>
                <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Voice First</h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>Natural speech recognition and synthesis</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/25">
                  <span className="text-white text-2xl">🧠</span>
                </div>
                <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Learns You</h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>Adapts to your style and preferences</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25">
                  <span className="text-white text-2xl">🔒</span>
                </div>
                <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Private</h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>Your data stays on your device</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <motion.button
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 shadow-blue-500/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Get Started with Hadassah</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.section>
      </main>
    </div>
  );
};

export default HomePage;