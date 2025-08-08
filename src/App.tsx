import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import CommandGallery from './components/CommandGallery';
import Navigation from './components/Navigation';

type Page = 'home' | 'settings' | 'commands';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full"
        >
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'settings' && (
            <SettingsPage onBack={() => setCurrentPage('home')} />
          )}
          {currentPage === 'commands' && (
            <CommandGallery onBack={() => setCurrentPage('home')} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Prevent scroll when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 overflow-hidden" />
      )}
    </div>
  );
}

export default App;