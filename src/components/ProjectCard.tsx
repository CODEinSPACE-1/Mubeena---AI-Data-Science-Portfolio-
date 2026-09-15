import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../types.ts';
import { ShieldCheck, Mic, Activity, Lock, ArrowUpRight, Radio } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [analyzingVoice, setAnalyzingVoice] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isFeatured = project.status === 'featured';

  const triggerVoiceScan = () => {
    if (analyzingVoice) return;
    setAnalyzingVoice(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setAnalyzingVoice(false);
      setAnalysisResult('SPEAKER VERIFIED • 99.2% AUTHENTIC (NON-SYNTHETIC)');
    }, 1800);
  };

  if (!isFeatured) {
    // Coming soon placeholder card
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: index * 0.15 }}
        className="relative overflow-hidden rounded border border-white/[0.06] bg-[#08080c]/50 p-8 backdrop-blur-md transition-all duration-300 hover:border-white/15"
      >
        <div className="cyber-grid absolute inset-0 opacity-20" />
        <div className="relative z-10 flex flex-col justify-between h-full min-h-[260px]">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-3xl font-light text-neutral-400">
              {project.number}
            </span>
            <span className="flex items-center space-x-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono-tech text-[10px] tracking-widest text-neutral-400">
              <Lock className="h-3 w-3" />
              <span>INCUBATING</span>
            </span>
          </div>

          <div className="my-auto py-6">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-400">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-400 font-light">
              {project.description}
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono-tech text-xs text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
            <span>PROJECT_SLOT_{project.number} // RESERVED</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Primary Featured Project: VocaShield
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="project"
      className="group relative overflow-hidden rounded border border-cyan-500/25 bg-[#08080d]/85 p-6 sm:p-8 lg:p-10 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.12)]"
    >
      {/* Background glow and fine grid */}
      <div className="cyber-grid absolute inset-0 opacity-25 pointer-events-none" />
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-40'
        }`}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Project Details */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Project Number and Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-tech text-4xl sm:text-5xl font-light text-cyan-400 tracking-tight">
                {project.number}
              </span>
              <div className="flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono-tech text-xs tracking-widest text-cyan-300">
                <Radio className="h-3 w-3 animate-pulse text-cyan-400" />
                <span>FEATURED ARCHITECTURE</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
              {project.title}
            </h3>

            {/* Subtitle */}
            <p className="font-mono-tech text-sm sm:text-base text-cyan-400 tracking-wider font-medium mb-4">
              {project.subtitle}
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Technology Labels */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-white/10 bg-white/[0.03] px-3 py-1 font-mono-tech text-xs text-neutral-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Action CTA */}
          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={triggerVoiceScan}
              className="flex items-center space-x-2 rounded border border-cyan-500/60 bg-cyan-500/10 px-5 py-2.5 font-mono-tech text-xs tracking-widest text-cyan-300 transition-all duration-300 hover:bg-cyan-500 hover:text-[#050505] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              <Mic className="h-3.5 w-3.5" />
              <span>{analyzingVoice ? 'SCANNING HARMONICS...' : 'SIMULATE VOICE SCAN'}</span>
            </button>

            <span className="font-mono-tech text-[11px] text-neutral-400 flex items-center space-x-1">
              <span>EXPLORE ARCHITECTURE</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400" />
            </span>
          </div>
        </div>

        {/* Right Column: VocaShield Futuristic Biometric UI Preview */}
        <div className="lg:col-span-6">
          <div className="relative rounded border border-white/10 bg-[#060609] p-6 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
                <span className="font-mono-tech text-xs tracking-widest text-white font-medium">
                  VOCASHIELD // REAL-TIME SPECTRAL ENGINE
                </span>
              </div>
              <span className="font-mono-tech text-[10px] text-emerald-400 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE GUARD</span>
              </span>
            </div>

            {/* Voice Waveform Visualizer simulation */}
            <div className="relative mb-5 rounded border border-white/5 bg-[#0a0a10] p-4">
              <div className="flex items-center justify-between mb-3 text-[11px] font-mono-tech text-neutral-400">
                <span>AUDIO FREQUENCY OSCILLOGRAM</span>
                <span className="text-cyan-400">48.0 kHz / 24-bit PCM</span>
              </div>

              {/* Dynamic waveform bars */}
              <div className="flex h-20 items-center justify-between gap-1 px-1">
                {[
                  18, 35, 60, 42, 80, 95, 70, 48, 88, 100, 65, 45, 90, 75, 55, 30,
                  65, 82, 94, 58, 40, 78, 62, 85, 44, 32, 60, 74, 92, 50, 25, 42,
                ].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: analyzingVoice
                        ? [`${height}%`, `${Math.max(15, (height * 1.5) % 100)}%`, `${height}%`]
                        : isHovered
                        ? [`${height}%`, `${(height + 25) % 95}%`, `${height}%`]
                        : `${height * 0.7}%`,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: analyzingVoice ? 0.4 + (i % 5) * 0.1 : 1.2 + (i % 4) * 0.2,
                      ease: 'easeInOut',
                    }}
                    className={`w-full rounded-full transition-colors ${
                      i % 3 === 0
                        ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.6)]'
                        : i % 2 === 0
                        ? 'bg-violet-400'
                        : 'bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Metrics HUD */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono-tech text-xs">
              <div className="rounded border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-neutral-400 uppercase block">SYNTHETIC DETECT</span>
                <span className="text-sm font-semibold text-emerald-400 mt-0.5 block">0.08% RISK</span>
              </div>
              <div className="rounded border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-neutral-400 uppercase block">VOICEPRINT MATCH</span>
                <span className="text-sm font-semibold text-cyan-400 mt-0.5 block">99.8% VERIFIED</span>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-neutral-400 uppercase block">LATENCY</span>
                <span className="text-sm font-semibold text-neutral-200 mt-0.5 block">&lt; 42 ms</span>
              </div>
            </div>

            {/* Dynamic scan feedback */}
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center space-x-2 rounded border border-emerald-500/30 bg-emerald-500/10 p-2.5 font-mono-tech text-[11px] text-emerald-300"
              >
                <Activity className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{analysisResult}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
