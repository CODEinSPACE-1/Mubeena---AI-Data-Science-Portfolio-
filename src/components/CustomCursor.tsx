import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'project'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for cursor follow
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'project') {
          setCursorType('project');
          return;
        }
        if (type === 'view') {
          setCursorType('view');
          return;
        }
      }

      // Check buttons or links
      if (target.closest('button') || target.closest('a')) {
        setCursorType('view');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const isExpanded = cursorType !== 'default';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer ring / pill */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isExpanded ? 1.5 : 1,
          width: isExpanded ? (cursorType === 'project' ? 88 : 72) : 28,
          height: isExpanded ? 34 : 28,
          borderRadius: isExpanded ? 17 : 14,
          backgroundColor: isExpanded ? 'rgba(0, 240, 255, 0.95)' : 'rgba(0, 240, 255, 0.08)',
          borderColor: isExpanded ? 'rgba(0, 240, 255, 1)' : 'rgba(0, 240, 255, 0.45)',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
        }}
        className="fixed -top-3.5 -left-3.5 flex items-center justify-center border text-[10px] font-bold tracking-widest text-[#050505] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
      >
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono-tech select-none uppercase tracking-wider"
          >
            {cursorType === 'project' ? 'PROJECT' : 'VIEW'}
          </motion.span>
        )}
      </motion.div>

      {/* Center pinpoint dot */}
      {!isExpanded && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
          }}
          className="fixed -top-1 -left-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F0FF]"
        />
      )}
    </div>
  );
}
