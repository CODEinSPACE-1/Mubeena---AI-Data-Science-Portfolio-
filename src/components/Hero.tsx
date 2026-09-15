import { motion } from 'motion/react';
import { ArrowDown, Sparkles, ChevronRight } from 'lucide-react';
import AIOrb from './AIOrb.tsx';

interface HeroProps {
  onExploreProjects?: () => void;
  onContact?: () => void;
}

const letterVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.07,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export default function Hero({ onExploreProjects, onContact }: HeroProps) {
  const nameLetters = 'MUBEENA'.split('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left column: Typography and Hero details */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center space-x-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.04] px-3.5 py-1.5 backdrop-blur-md mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono-tech text-xs tracking-[0.25em] text-cyan-300 font-medium">
              AI & DATA SCIENCE
            </span>
          </motion.div>

          {/* Staggered Heading "MUBEENA" */}
          <div className="overflow-hidden mb-4">
            <div className="flex">
              {nameLetters.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[128px] font-bold tracking-tight text-white leading-none select-none"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium tracking-tight text-neutral-200 leading-snug mb-5"
          >
            Building intelligent
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-violet-400">
              solutions with AI.
            </span>
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="max-w-xl text-neutral-400 text-base sm:text-lg font-light leading-relaxed mb-9"
          >
            First-year B.Tech AI & Data Science student exploring Python, artificial
            intelligence, data science and web development.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            {/* Explore Projects Button */}
            <button
              onClick={() => {
                if (onExploreProjects) onExploreProjects();
                else scrollToSection('projects');
              }}
              data-cursor="project"
              className="group relative flex items-center justify-center space-x-2.5 rounded border border-cyan-500/50 bg-cyan-500/10 px-7 py-3.5 font-mono-tech text-xs tracking-[0.2em] font-medium text-cyan-300 transition-all duration-300 hover:bg-cyan-500 hover:text-[#050505] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            >
              <span>EXPLORE PROJECTS</span>
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Contact Me Button */}
            <button
              onClick={() => {
                if (onContact) onContact();
                else scrollToSection('contact');
              }}
              data-cursor="view"
              className="flex items-center justify-center space-x-2 rounded border border-white/10 bg-white/[0.02] px-7 py-3.5 font-mono-tech text-xs tracking-[0.2em] font-medium text-neutral-300 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
            >
              <span>CONTACT ME</span>
            </button>
          </motion.div>
        </div>

        {/* Right column: 3D AI Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          <AIOrb />
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="flex flex-col items-center justify-center pt-8 cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <span className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-2">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex h-8 w-5 items-center justify-center rounded-full border border-white/15"
        >
          <ArrowDown className="h-3 w-3 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
