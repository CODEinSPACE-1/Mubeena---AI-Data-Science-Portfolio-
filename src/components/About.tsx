import { motion } from 'motion/react';
import SectionHeading from './SectionHeading.tsx';
import { Cpu, Compass, Activity, Sparkles } from 'lucide-react';

export default function About() {
  const infoBlocks = [
    {
      icon: Cpu,
      label: 'ACADEMIC PURSUIT',
      title: 'B.Tech',
      subtitle: 'AI & Data Science',
      badge: '1st Year',
      accent: 'border-cyan-500/20 text-cyan-400',
    },
    {
      icon: Compass,
      label: 'INTERESTS',
      title: 'Core Disciplines',
      subtitle: 'AI / Data Science / Python / Web',
      badge: 'Focus',
      accent: 'border-violet-500/20 text-violet-400',
    },
    {
      icon: Activity,
      label: 'CURRENTLY',
      title: 'State of Mind',
      subtitle: 'Learning • Building • Experimenting',
      badge: 'Active',
      accent: 'border-cyan-500/20 text-cyan-400',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      <SectionHeading
        number="01"
        tag="Profile Overview"
        title="ABOUT ME"
        subtitle="Bridging curiosity and algorithmic precision to solve tangible challenges."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Statement */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-100 font-light leading-relaxed tracking-tight">
              I&apos;m a first-year{' '}
              <span className="text-white font-normal underline decoration-cyan-500/40 decoration-2 underline-offset-8">
                Artificial Intelligence & Data Science
              </span>{' '}
              student interested in building practical technology and exploring how AI can solve real-world problems.
            </p>

            <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              Fascinated by the intersection of machine intelligence, voice pattern analysis, and modern web interfaces. Currently developing strong foundations in Python computational modeling, algorithm design, and modern interactive engineering.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs font-mono-tech text-cyan-400/90">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>PASSIONATE ABOUT ETHICAL AI & SYSTEM SECURITY</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Info Blocks */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {infoBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                className="group relative rounded border border-white/[0.08] bg-[#0c0c10]/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:bg-[#0c0c10]/90"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded border border-white/10 bg-white/[0.03] text-neutral-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono-tech text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                        {block.label}
                      </span>
                      <h3 className="text-base font-medium text-white tracking-tight mt-0.5">
                        {block.title}
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono-tech text-[10px] tracking-wider rounded border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-neutral-400">
                    {block.badge}
                  </span>
                </div>

                <div className="mt-3.5 pl-12">
                  <p className="text-sm font-light text-cyan-300/90 tracking-wide font-mono-tech">
                    {block.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
