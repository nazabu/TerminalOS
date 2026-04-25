import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.onclick != null;
      
      setIsHovering(isClickable);
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] backdrop-blur-md border border-amber-900/20 shadow-[0_0_15px_rgba(180,83,9,0.1)]"
      animate={{
        x: pos.x - 16,
        y: pos.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(180,83,9,0.1)' : 'rgba(180,83,9,0.02)',
      }}
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 35,
        mass: 0.5
      }}
    />
  );
}
