import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Quick smooth progress counter
      const progressObj = { val: 0 };
      tl.to(progressObj, {
        val: 37,
        duration: 0.35,
        ease: 'power1.inOut',
        onUpdate: () => setPercent(Math.floor(progressObj.val)),
      })
      .to(progressObj, {
        val: 78,
        duration: 0.35,
        ease: 'power2.out',
        onUpdate: () => setPercent(Math.floor(progressObj.val)),
      })
      .to(progressObj, {
        val: 100,
        duration: 0.35,
        ease: 'power2.inOut',
        onUpdate: () => setPercent(Math.floor(progressObj.val)),
      })
      // Reveal name and specialization
      .to(brandRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
      })
      // Short pause
      .to({}, { duration: 0.25 })
      // Slide curtain upward smoothly into the main site
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power4.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      id="loading-curtain"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
    >
      {/* Fine background grid */}
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-40" />

      {/* Center content container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Status text */}
        <div
          ref={textRef}
          className="font-mono-tech mb-3 text-xs tracking-[0.3em] text-cyan-400/80"
        >
          INITIALIZING...
        </div>

        {/* Dynamic percentage counter */}
        <div className="flex items-baseline space-x-1 font-mono-tech text-4xl sm:text-6xl font-light tracking-tight text-white">
          <span ref={numberRef}>{percent}</span>
          <span className="text-xl sm:text-2xl text-cyan-400 font-normal">%</span>
        </div>

        {/* Minimal progress line indicator */}
        <div className="mt-5 h-[1px] w-40 overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-75 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Brand reveal */}
        <div
          ref={brandRef}
          style={{ opacity: 0, transform: 'translateY(12px)' }}
          className="mt-8 flex flex-col items-center"
        >
          <span className="text-sm sm:text-base font-semibold tracking-[0.25em] text-white">
            MUBEENA.B
          </span>
          <span className="font-mono-tech mt-1 text-[11px] tracking-[0.2em] text-neutral-400">
            AI & DATA SCIENCE
          </span>
        </div>
      </div>
    </div>
  );
}
