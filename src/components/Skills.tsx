import { useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from './SectionHeading.tsx';
import { SkillNode } from '../types.ts';
import { Terminal, Cpu, Database, Globe, MessageSquare, Sparkles } from 'lucide-react';

const skillsData: (SkillNode & { icon: ComponentType<{ className?: string }> })[] = [
  {
    id: 'python',
    name: 'PYTHON',
    category: 'Core Language',
    description: 'Foundational syntax, algorithmic logic, data processing and scripting.',
    details: ['Programming', 'Data handling', 'Problem solving'],
    angle: -90, // Top
    distance: 180,
    color: '#00F0FF',
    icon: Terminal,
  },
  {
    id: 'ai',
    name: 'AI',
    category: 'Specialization',
    description: 'Exploring machine learning concepts, automated reasoning, and neural systems.',
    details: ['Neural Concepts', 'Model Architecture', 'Intelligent Agents'],
    angle: -18, // Top-right
    distance: 200,
    color: '#9d4edd',
    icon: Cpu,
  },
  {
    id: 'datascience',
    name: 'DATA SCIENCE',
    category: 'Analytics',
    description: 'Extracting actionable signals and patterns from structured & unstructured datasets.',
    details: ['Data Analysis', 'Exploratory Modeling', 'Pattern Recognition'],
    angle: 54, // Bottom-right
    distance: 190,
    color: '#00F0FF',
    icon: Database,
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Web Interface',
    description: 'Crafting clean semantic markup, accessible architecture, and modern layout foundations.',
    details: ['Semantic Markup', 'Modern Standards', 'Interface Structure'],
    angle: 126, // Bottom-left
    distance: 190,
    color: '#e0a96d',
    icon: Globe,
  },
  {
    id: 'communication',
    name: 'COMMUNICATION',
    category: 'Collaboration',
    description: 'Bridging engineering precision with clear human presentation and team alignment.',
    details: ['Technical Articulation', 'Active Collaboration', 'Project Ideation'],
    angle: 198, // Top-left
    distance: 200,
    color: '#00F0FF',
    icon: MessageSquare,
  },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<typeof skillsData[0]>(skillsData[0]);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      <SectionHeading
        number="02"
        tag="Competency Matrix"
        title="SKILLS NETWORK"
        subtitle="An interconnected constellation of foundational competencies and emerging disciplines."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Network Canvas (Center + Orbital Floating Nodes) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[480px]">
          {/* Subtle orbital circular guide rings */}
          <div className="pointer-events-none absolute h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] rounded-full border border-white/[0.04]" />
          <div className="pointer-events-none absolute h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] rounded-full border border-cyan-500/[0.08]" />

          {/* SVG Connection Lines */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            {skillsData.map((skill) => {
              const rad = (skill.angle * Math.PI) / 180;
              const dist = typeof window !== 'undefined' && window.innerWidth < 640 ? skill.distance * 0.75 : skill.distance;
              const x2 = 50 + (Math.cos(rad) * dist) / 4.4;
              const y2 = 50 + (Math.sin(rad) * dist) / 4.4;
              const isSelected = activeSkill.id === skill.id || hoveredSkillId === skill.id;

              return (
                <line
                  key={skill.id}
                  x1="50%"
                  y1="50%"
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={isSelected ? '#00F0FF' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={isSelected ? '1.5' : '1'}
                  strokeDasharray={isSelected ? 'none' : '3 3'}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* CENTER NODE: MUBEENA */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-20 flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full border border-cyan-500/40 bg-[#08080c] shadow-[0_0_30px_rgba(0,240,255,0.15)]"
          >
            <div className="absolute inset-1 rounded-full border border-white/10" />
            <Sparkles className="h-4 w-4 text-cyan-400 mb-1 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white">
              MUBEENA
            </span>
            <span className="font-mono-tech text-[9px] tracking-widest text-cyan-300">
              CORE
            </span>
          </motion.div>

          {/* SATELLITE FLOATING NODES */}
          {skillsData.map((skill, index) => {
            const rad = (skill.angle * Math.PI) / 180;
            const dist = typeof window !== 'undefined' && window.innerWidth < 640 ? skill.distance * 0.72 : skill.distance;
            const x = Math.cos(rad) * dist;
            const y = Math.sin(rad) * dist;

            const isSelected = activeSkill.id === skill.id;
            const isHovered = hoveredSkillId === skill.id;
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.id}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  y: [0, index % 2 === 0 ? -6 : 6, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5 + index * 0.5,
                  ease: 'easeInOut',
                }}
                className="z-20"
              >
                <button
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setHoveredSkillId(skill.id)}
                  onMouseLeave={() => setHoveredSkillId(null)}
                  data-cursor="view"
                  className={`group relative flex items-center space-x-2 rounded-full border px-4 py-2 sm:px-4 sm:py-2 text-left backdrop-blur-md transition-all duration-300 ${
                    isSelected || isHovered
                      ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_20px_rgba(0,240,255,0.35)] scale-105'
                      : 'border-white/10 bg-[#09090e]/80 hover:border-white/30'
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 transition-colors ${
                      isSelected || isHovered ? 'text-cyan-400' : 'text-neutral-400'
                    }`}
                  />
                  <span
                    className={`font-mono-tech text-xs tracking-wider font-medium transition-colors ${
                      isSelected || isHovered ? 'text-white' : 'text-neutral-300'
                    }`}
                  >
                    {skill.name}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Detailed Skill Inspector Panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="relative rounded border border-white/[0.08] bg-[#09090d]/80 p-7 backdrop-blur-xl"
            >
              {/* Terminal-like top bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF]" />
                  <span className="font-mono-tech text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
                    NODE_INSPECTOR // {activeSkill.id}
                  </span>
                </div>
                <span className="font-mono-tech text-[10px] tracking-wider text-cyan-400 rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5">
                  {activeSkill.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
                  {activeSkill.name}
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                  {activeSkill.description}
                </p>
              </div>

              {/* Key Competencies Details */}
              <div className="space-y-3">
                <span className="font-mono-tech text-[10px] tracking-[0.25em] text-neutral-400 uppercase block">
                  CAPABILITIES & FOCUS AREAS
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeSkill.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-center space-x-3 rounded border border-white/5 bg-white/[0.02] px-3.5 py-2.5 font-mono-tech text-xs text-neutral-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-tech text-neutral-400">
                <span>INTERACTIVE NODE</span>
                <span className="text-cyan-400/80">SELECT NODES TO INSPECT</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
