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
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] backdrop-blur-sm border border-black/10 shadow-[0_0_10px_rgba(0,0,0,0.05)]"
      animate={{
        x: pos.x - 10,
        y: pos.y - 10,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.03)',
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
