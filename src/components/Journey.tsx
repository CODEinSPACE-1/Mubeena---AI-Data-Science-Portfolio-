import { useRef } from 'react';
import { motion } from 'motion/react';
import SectionHeading from './SectionHeading.tsx';
import { JourneyMilestone } from '../types.ts';
import { ArrowDown, CheckCircle2, CircleDot, Compass } from 'lucide-react';

const milestones: JourneyMilestone[] = [
  {
    id: 'm1',
    year: '2026',
    title: 'Started B.Tech AI & Data Science',
    subtitle: 'Embarked on undergraduate engineering focusing on artificial intelligence, algorithmic foundations, and computational mathematics.',
    status: 'completed',
  },
  {
    id: 'm2',
    title: 'Learning Python',
    subtitle: 'Deepening core scripting capabilities, object-oriented principles, algorithmic problem solving, and data structures.',
    status: 'current',
  },
  {
    id: 'm3',
    title: 'Exploring Artificial Intelligence',
    subtitle: 'Studying neural architectures, machine learning methodologies, natural language understanding, and automated decision engines.',
    status: 'current',
  },
  {
    id: 'm4',
    title: 'Building Projects',
    subtitle: 'Translating theoretical concepts into production tools like VocaShield for synthetic speech and voice anomaly detection.',
    status: 'current',
  },
  {
    id: 'm5',
    title: 'More to come...',
    subtitle: 'Expanding research horizons, architecting scalable intelligent systems, and continuously refining technical depth.',
    status: 'future',
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      <SectionHeading
        number="04"
        tag="Academic Trajectory"
        title="JOURNEY / EDUCATION"
        subtitle="Chronological milestones marking the evolution of technical skills and real-world experiments."
      />

      <div className="relative max-w-3xl mx-auto pt-6 pb-12">
        {/* Animated Drawing Central Timeline Line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-white/[0.08] overflow-hidden">
          <motion.div
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-gradient-to-b from-cyan-400 via-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
          />
        </div>

        {/* Milestones */}
        <div className="space-y-12 sm:space-y-16">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={item.id} className="relative flex flex-col sm:flex-row items-start">
                {/* Milestone Marker Node on the line */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/40 bg-[#050505] shadow-[0_0_15px_rgba(0,240,255,0.3)] z-20">
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  ) : item.status === 'current' ? (
                    <CircleDot className="h-4 w-4 text-cyan-400 animate-pulse" />
                  ) : (
                    <Compass className="h-4 w-4 text-neutral-400" />
                  )}
                </div>

                {/* Content Card (alternates left / right on desktop, single column on mobile) */}
                <motion.div
                  initial={{ opacity: 0, y: 25, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  className={`pl-14 sm:pl-0 w-full sm:w-[46%] ${
                    isEven ? 'sm:mr-auto sm:text-right sm:pr-10' : 'sm:ml-auto sm:text-left sm:pl-10'
                  }`}
                >
                  <div className="rounded border border-white/[0.08] bg-[#09090e]/70 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:bg-[#09090e]/95">
                    {item.year && (
                      <span className="inline-block rounded border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono-tech text-xs tracking-widest text-cyan-300 font-semibold mb-2">
                        {item.year}
                      </span>
                    )}

                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mb-1.5">
                      {item.title}
                    </h3>

                    {item.subtitle && (
                      <p className="text-sm text-neutral-400 font-light leading-relaxed">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Arrow connector between milestones */}
                {index < milestones.length - 1 && (
                  <div className="hidden sm:flex absolute left-1/2 -bottom-10 -translate-x-1/2 z-10 text-cyan-400/40">
                    <ArrowDown className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
