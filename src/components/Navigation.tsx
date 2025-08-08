import React from 'react';
import { motion } from 'framer-motion';
import { Home, Settings, BookOpen, Menu, X } from 'lucide-react';
import { StorageService } from '../services/storage';

interface Props {
  currentPage: 'home' | 'settings' | 'commands';
  onPageChange: (page: 'home' | 'settings' | 'commands') => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Navigation: React.FC<Props> = ({ currentPage, onPageChange, isOpen, onToggle }) => {
  const preferences = StorageService.getPreferences();
  const isDark = preferences.darkMode;

  const menuItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'commands' as const, label: 'Commands', icon: BookOpen },
    { id: 'settings' as const, label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={onToggle}
        className={`fixed top-4 right-4 z-50 p-3 backdrop-blur-sm rounded-2xl shadow-lg border lg:hidden transition-all duration-300 ${
          isDark
            ? 'bg-gray-800/80 border-gray-600 text-gray-200'
            : 'bg-white/80 border-gray-200 text-gray-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:fixed lg:left-4 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:flex lg:flex-col lg:space-y-2 lg:z-40">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`p-4 rounded-2xl transition-all duration-300 shadow-lg ${
                isActive 
                  ? 'bg-blue-500 text-white shadow-blue-500/25' 
                  : isDark
                    ? 'bg-gray-800/60 backdrop-blur-sm text-gray-200 hover:bg-gray-700/80 border border-gray-600'
                    : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={item.label}
            >
              <Icon size={20} />
            </motion.button>
          );
        })}
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div className={`absolute inset-0 backdrop-blur-sm ${
            isDark ? 'bg-black/40' : 'bg-black/20'
          }`} onClick={onToggle} />
          
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className={`absolute right-0 top-0 h-full w-64 shadow-2xl p-6 pt-20 transition-colors duration-300 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="space-y-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      onToggle();
                    }}
                    className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-500 text-white' 
                        : isDark
                          ? 'text-gray-200 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.nav>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;