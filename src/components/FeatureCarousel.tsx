import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { FeatureCard as FeatureCardType } from '../types';

const features: FeatureCardType[] = [
  {
    id: '1',
    title: 'Smart Messaging',
    icon: '💬',
    description: 'Send messages across platforms with natural voice commands',
    example: 'Message Mom on WhatsApp: I\'ll be late',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: '2',
    title: 'Device Control',
    icon: '🔦',
    description: 'Control device settings and hardware through voice',
    example: 'Turn on flashlight',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    id: '3',
    title: 'Smart Search',
    icon: '🔍',
    description: 'Search the web, YouTube, and apps intelligently',
    example: 'Search YouTube for funny cat videos',
    color: 'bg-gradient-to-br from-teal-500 to-teal-600'
  },
  {
    id: '4',
    title: 'Quick Actions',
    icon: '⚡',
    description: 'Perform common tasks with simple voice commands',
    example: 'Dim screen brightness',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    id: '5',
    title: 'Smart Reminders',
    icon: '⏰',
    description: 'Set contextual reminders that understand your needs',
    example: 'Remind me to call John at 3 PM',
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
  },
  {
    id: '6',
    title: 'Voice Personality',
    icon: '🧠',
    description: 'AI that learns and mimics your communication style',
    example: 'Reply to Sarah in my usual tone',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600'
  }
];

const FeatureCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      <div className="relative w-80 h-48">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index}
            isActive={index === activeIndex}
          />
        ))}
      </div>
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-blue-500 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;