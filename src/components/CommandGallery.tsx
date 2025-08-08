import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { enhancedHadassahAI } from '../services/enhancedAiEngine';
import { StorageService } from '../services/storage';

interface Props {
  onBack: () => void;
}

const CommandGallery: React.FC<Props> = ({ onBack }) => {
  const commands = enhancedHadassahAI.getCommands();
  const preferences = StorageService.getPreferences();
  const isDark = preferences.darkMode;
  const contrast = preferences.contrast;
  
  const categoryColors = {
    communication: 'from-blue-500 to-blue-600',
    device: 'from-orange-500 to-orange-600',
    search: 'from-teal-500 to-teal-600',
    productivity: 'from-purple-500 to-purple-600',
    entertainment: 'from-pink-500 to-pink-600'
  };

  const handleTryCommand = (commandText: string) => {
    // This would typically trigger the voice input with the command
    console.log('Trying command:', commandText);
  };

  return (
    <div 
      className={`min-h-screen p-4 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'
      }`}
      style={{ filter: `contrast(${contrast})` }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center space-x-4 mb-8">
          <motion.button
            onClick={onBack}
            className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 shadow-lg ${
              isDark
                ? 'bg-gray-800/60 border-gray-600 hover:bg-gray-700/80 text-gray-200'
                : 'bg-white/60 border-gray-200 hover:bg-white/80 text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>Command Gallery</h1>
            <p className={`transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>Discover what Hadassah can do for you</p>
          </div>
        </header>

        {/* Commands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commands.map((command, index) => (
            <motion.div
              key={command.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`backdrop-blur-sm rounded-3xl p-6 border transition-all duration-300 group cursor-pointer shadow-lg ${
                isDark
                  ? 'bg-gray-800/60 border-gray-600 hover:bg-gray-700/80'
                  : 'bg-white/60 border-white/50 hover:bg-white/80'
              }`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.3)" : "0 20px 40px rgba(0,0,0,0.1)"
              }}
              onClick={() => handleTryCommand(command.text)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-r ${categoryColors[command.category]} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                    {command.icon}
                  </div>
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play size={14} className={`ml-0.5 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  </motion.div>
                </div>

                <div>
                  <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>{command.text}</h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>{command.description}</p>
                </div>

                <div className={`pt-4 border-t transition-colors duration-300 ${
                  isDark ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <span className={`text-xs uppercase tracking-wide font-medium transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {command.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Usage Tips */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mt-12 backdrop-blur-sm rounded-3xl p-8 border shadow-xl transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-gray-800/60 to-gray-700/60 border-gray-600/50'
              : 'bg-gradient-to-r from-blue-100/60 to-teal-100/60 border-blue-200/50'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>Pro Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>🎙️ Voice Commands</h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>Speak naturally - Hadassah understands context and variations of commands.</p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>⚡ Quick Actions</h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>Chain commands together like "Search YouTube for cooking videos and open it"</p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>🧠 Learning</h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>Hadassah learns your preferences and adapts to your communication style.</p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>🔒 Privacy</h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>All processing happens locally - your conversations stay on your device.</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CommandGallery;