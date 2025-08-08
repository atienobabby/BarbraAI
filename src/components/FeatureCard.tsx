import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCard as FeatureCardType } from '../types';

interface Props {
  feature: FeatureCardType;
  index: number;
  isActive: boolean;
}

const FeatureCard: React.FC<Props> = ({ feature, index, isActive }) => {
  return (
    <motion.div
      className={`absolute w-80 h-48 rounded-2xl p-6 shadow-2xl transform-gpu backdrop-blur-sm border border-white/10 ${feature.color}`}
      initial={{ 
        x: 120, 
        opacity: 0, 
        scale: 0.85,
        rotateY: 20,
        z: -50
      }}
      animate={{ 
        x: isActive ? 0 : -420,
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.85,
        rotateY: isActive ? 0 : -20,
        z: isActive ? 0 : -50,
        zIndex: isActive ? 10 : 0
      }}
      transition={{ 
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1,
        scale: {
          duration: 0.4,
          ease: "backOut"
        }
      }}
      whileHover={isActive ? { 
        scale: 1.05,
        y: -8,
        rotateX: 5,
        z: 20,
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      } : {}}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="flex flex-col h-full justify-between relative z-10">
        <div>
          <div className="text-4xl mb-3">{feature.icon}</div>
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">{feature.title}</h3>
          <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">{feature.description}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-4 border border-white/10">
          <p className="text-white/80 text-xs font-medium">Try saying:</p>
          <p className="text-white font-semibold text-sm drop-shadow-sm">"{feature.example}"</p>
        </div>
      </div>
      
      {/* 3D depth effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl shadow-inner opacity-20 pointer-events-none" />
    </motion.div>
  );
};

export default FeatureCard;