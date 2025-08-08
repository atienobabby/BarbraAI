import React from 'react';
import { ArrowLeft, Settings, Moon, Sun, Volume2, VolumeX, Palette } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [highContrast, setHighContrast] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            Back
          </button>
        </div>

        {/* Settings Content */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>

          <div className="space-y-6">
            {/* Theme Settings */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                Appearance
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-lg font-medium">Dark Mode</label>
                    <p className="text-sm text-gray-300">Toggle between light and dark themes</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      darkMode ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                    {darkMode ? (
                      <Moon className="absolute left-1 w-3 h-3 text-purple-600" />
                    ) : (
                      <Sun className="absolute right-1 w-3 h-3 text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-lg font-medium">High Contrast</label>
                    <p className="text-sm text-gray-300">Increase contrast for better visibility</p>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      highContrast ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Audio Settings */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-purple-400" />
                Audio
              </h2>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-lg font-medium">Sound Effects</label>
                  <p className="text-sm text-gray-300">Enable audio feedback and notifications</p>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    soundEnabled ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                  {soundEnabled ? (
                    <Volume2 className="absolute left-1 w-3 h-3 text-purple-600" />
                  ) : (
                    <VolumeX className="absolute right-1 w-3 h-3 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <div className="space-y-2 text-gray-300">
                <p>Version: 1.0.0</p>
                <p>Built with React and TypeScript</p>
                <p>Powered by modern web technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}