import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface SwipeHintProps {
  show: boolean;
  onDismiss: () => void;
}

export function SwipeHint({ show, onDismiss }: SwipeHintProps) {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (show && !hasShown) {
      setHasShown(true);
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000); // Auto dismiss after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [show, hasShown, onDismiss]);

  if (!show || hasShown) return null;

  return (
    <motion.div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: [0, -10, 0] }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ 
        opacity: { duration: 0.3 },
        x: { 
          duration: 1.5, 
          repeat: 2,
          ease: "easeInOut"
        }
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20 backdrop-blur-sm">
        <ChevronLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Swipe to close</span>
      </div>
    </motion.div>
  );
}