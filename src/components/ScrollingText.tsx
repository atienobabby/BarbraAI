import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
}

const ScrollingText: React.FC<Props> = ({ text, className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: ['100%', '-100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default ScrollingText;