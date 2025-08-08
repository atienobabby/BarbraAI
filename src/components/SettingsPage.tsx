import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, Moon, Sun, Volume2, VolumeX, Palette } from 'lucide-react';
import { StorageService } from '../services/storage';

interface SettingsPageProps {
  onBack: () => void;
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const [preferences, setPreferences] = React.useState(() => StorageService.getPreferences());

  const updatePreference = (key: string, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    StorageService.setPreferences({ [key]: value });
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ${
        preferences.darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'
      }`}
      style={{ filter: `contrast(${preferences.contrast})` }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <motion.button
            onClick={onBack}
            className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 shadow-lg ${
              preferences.darkMode
                ? 'bg-gray-800/60 border-gray-600 hover:bg-gray-700/80 text-gray-200'
                : 'bg-white/60 border-gray-200 hover:bg-white/80 text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
          </motion.button>
        </div>

        {/* Settings Content */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Settings className={`w-8 h-8 transition-colors duration-300 ${
              preferences.darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
              preferences.darkMode 
                ? 'from-blue-400 to-teal-400' 
                : 'from-blue-600 to-teal-600'
            }`}>
              Settings
            </h1>
          </div>

          <div className="space-y-6">
            {/* Theme Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`backdrop-blur-sm rounded-3xl p-6 border shadow-xl transition-all duration-300 ${
                preferences.darkMode
                  ? 'bg-gray-800/60 border-gray-600'
                  : 'bg-white/60 border-white/50'
              }`}
            >
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                preferences.darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <Palette className={`w-5 h-5 transition-colors duration-300 ${
                  preferences.darkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                Appearance
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className={`text-lg font-medium transition-colors duration-300 ${
                      preferences.darkMode ? 'text-white' : 'text-gray-800'
                    }`}>Dark Mode</label>
                    <p className={`text-sm transition-colors duration-300 ${
                      preferences.darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>Toggle between light and dark themes</p>
                  </div>
                  <button
                    onClick={() => updatePreference('darkMode', !preferences.darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.darkMode ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                    {preferences.darkMode ? (
                      <Moon className="absolute left-1 w-3 h-3 text-blue-600" />
                    ) : (
                      <Sun className="absolute right-1 w-3 h-3 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className={`text-lg font-medium transition-colors duration-300 ${
                      preferences.darkMode ? 'text-white' : 'text-gray-800'
                    }`}>High Contrast</label>
                    <p className={`text-sm transition-colors duration-300 ${
                      preferences.darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>Increase contrast for better visibility</p>
                  </div>
                  <button
                    onClick={() => updatePreference('contrast', preferences.contrast === 1 ? 1.2 : 1)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.contrast > 1 ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.contrast > 1 ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Audio Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`backdrop-blur-sm rounded-3xl p-6 border shadow-xl transition-all duration-300 ${
                preferences.darkMode
                  ? 'bg-gray-800/60 border-gray-600'
                  : 'bg-white/60 border-white/50'
              }`}
            >
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                preferences.darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <Volume2 className={`w-5 h-5 transition-colors duration-300 ${
                  preferences.darkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                Audio
              </h2>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className={`text-lg font-medium transition-colors duration-300 ${
                    preferences.darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Voice Responses</label>
                  <p className={`text-sm transition-colors duration-300 ${
                    preferences.darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Enable voice responses from Hadassah</p>
                </div>
                <button
                  onClick={() => updatePreference('voiceEnabled', !preferences.voiceEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.voiceEnabled ? 'bg-blue-600' : 'bg-gray-400'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                  {preferences.voiceEnabled ? (
                    <Volume2 className="absolute left-1 w-3 h-3 text-blue-600" />
                  ) : (
                    <VolumeX className="absolute right-1 w-3 h-3 text-gray-400" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`backdrop-blur-sm rounded-3xl p-6 border shadow-xl transition-all duration-300 ${
                preferences.darkMode
                  ? 'bg-gray-800/60 border-gray-600'
                  : 'bg-white/60 border-white/50'
              }`}
            >
              <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                preferences.darkMode ? 'text-white' : 'text-gray-800'
              }`}>About BarbraAI</h2>
              <div className={`space-y-2 transition-colors duration-300 ${
                preferences.darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>Version: 1.0.0</p>
                <p>Powered by Hadassah AI Engine</p>
                <p>Built with React, TypeScript & Framer Motion</p>
                <p>Your intelligent personal voice assistant</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}