import React, { useEffect, useRef } from 'react';

interface EdgeSwipeDetectorProps {
  onSwipeFromLeft: () => void;
  isDrawerOpen: boolean;
}

export function EdgeSwipeDetector({ onSwipeFromLeft, isDrawerOpen }: EdgeSwipeDetectorProps) {
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const isTracking = useRef<boolean>(false);

  useEffect(() => {
    if (isDrawerOpen) return; // Don't detect when drawer is already open

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX.current = touch.clientX;
      startY.current = touch.clientY;
      
      // Only start tracking if touch begins within 20px of left edge
      if (touch.clientX <= 20) {
        isTracking.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTracking.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - startX.current;
      const deltaY = Math.abs(touch.clientY - startY.current);
      
      // If swipe is more horizontal than vertical and moves right more than 50px
      if (deltaX > 50 && deltaY < 30) {
        isTracking.current = false;
        onSwipeFromLeft();
      }
      
      // Stop tracking if moved too far vertically or left
      if (deltaY > 50 || deltaX < -20) {
        isTracking.current = false;
      }
    };

    const handleTouchEnd = () => {
      isTracking.current = false;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeFromLeft, isDrawerOpen]);

  return (
    <div className="edge-swipe-area fixed left-0 top-0 w-5 h-full z-40 md:hidden pointer-events-none opacity-0 hover:opacity-100" />
  );
}