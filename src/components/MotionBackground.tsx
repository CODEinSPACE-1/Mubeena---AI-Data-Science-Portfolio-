import { useEffect, useRef } from 'react';

export default function MotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for gentle parallax
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Particle nodes
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      color: string;
    }

    let particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 25 : 55;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const isCyan = Math.random() > 0.35;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.6 + 0.8,
          baseAlpha: Math.random() * 0.4 + 0.15,
          color: isCyan ? 'rgba(0, 240, 255,' : 'rgba(157, 78, 221,',
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      // Smooth lerp for mouse parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle mouse offset
      const offsetX = ((mouse.x - width / 2) / width) * 15;
      const offsetY = ((mouse.y - height / 2) / height) * 15;

      // Draw connection lines
      const maxDistance = isMobile ? 85 : 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x + offsetX, particles[i].y + offsetY);
            ctx.lineTo(particles[j].x + offsetX, particles[j].y + offsetY);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.baseAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base fine cyber grid */}
      <div className="cyber-grid absolute inset-0 opacity-40" />

      {/* Atmospheric radial glows */}
      {/* Cyan glow top-left / center */}
      <div className="pointer-events-none absolute -top-[15%] left-[10%] h-[550px] w-[550px] rounded-full bg-cyan-500/8 blur-[130px]" />
      
      {/* Violet glow bottom-right */}
      <div className="pointer-events-none absolute top-[45%] right-[-5%] h-[600px] w-[600px] rounded-full bg-violet-600/7 blur-[140px]" />

      {/* Deep dark fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />

      {/* Interactive connection canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-65"
      />
    </div>
  );
}
