import { motion } from 'motion/react';

interface SectionHeadingProps {
  number?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  number,
  tag,
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`relative mb-14 md:mb-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-start"
      >
        <div className="flex items-center space-x-3 mb-3">
          {number && (
            <span className="font-mono-tech text-xs tracking-widest text-cyan-400/90 font-medium">
              [{number}]
            </span>
          )}
          {tag && (
            <span className="font-mono-tech text-xs tracking-[0.25em] uppercase text-neutral-400">
              {tag}
            </span>
          )}
          <span className="h-[1px] w-8 bg-cyan-500/40" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-3 max-w-xl text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
