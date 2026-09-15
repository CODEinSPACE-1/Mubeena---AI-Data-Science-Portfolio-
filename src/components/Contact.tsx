import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check, Sparkles, X, Send } from 'lucide-react';

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const contactEmail = 'mubeena.b.ai@example.com'; // Placeholders for links

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setModalOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2200);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[90vh] flex flex-col justify-between py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Background vignette darkening */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#020202]" />

      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
        {/* Small subtitle tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1 font-mono-tech text-xs tracking-[0.25em] text-cyan-300 mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>COLLABORATION & DIALOGUE</span>
        </motion.div>

        {/* Cinematic Large Typography */}
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white uppercase select-none leading-[0.95]"
          >
            LET&apos;S
            <br />
            BUILD
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-violet-400">
              SOMETHING.
            </span>
          </motion.h2>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-20 mb-14"
        >
          <button
            onClick={() => setModalOpen(true)}
            data-cursor="view"
            className="group relative flex items-center space-x-3 rounded border border-cyan-400/60 bg-cyan-400 px-8 py-4 font-mono-tech text-sm tracking-[0.2em] font-semibold text-[#050505] transition-all duration-300 hover:bg-white hover:border-white hover:shadow-[0_0_35px_rgba(0,240,255,0.6)]"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* Social / Direct Channels */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-mono-tech text-xs tracking-widest text-neutral-400"
        >
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            className="group flex items-center space-x-2 text-neutral-300 hover:text-cyan-400 transition-colors"
          >
            <Linkedin className="h-4 w-4 text-cyan-400/80 group-hover:text-cyan-400" />
            <span>LinkedIn</span>
            <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            className="group flex items-center space-x-2 text-neutral-300 hover:text-cyan-400 transition-colors"
          >
            <Github className="h-4 w-4 text-cyan-400/80 group-hover:text-cyan-400" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100" />
          </a>

          {/* Email */}
          <button
            onClick={copyToClipboard}
            data-cursor="view"
            className="group flex items-center space-x-2 text-neutral-300 hover:text-cyan-400 transition-colors"
          >
            <Mail className="h-4 w-4 text-cyan-400/80 group-hover:text-cyan-400" />
            <span>Email</span>
            {copied ? (
              <Check className="h-3 w-3 text-emerald-400" />
            ) : (
              <Copy className="h-3 w-3 opacity-50 group-hover:opacity-100" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Cinematic Footer */}
      <footer className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 font-mono-tech text-xs text-neutral-400">
        <div>
          <span className="font-bold tracking-[0.25em] text-white block sm:inline mr-2">
            MUBEENA.B
          </span>
          <span className="tracking-widest text-neutral-400">
            AI & DATA SCIENCE
          </span>
        </div>

        <div className="tracking-widest">
          © 2026 Mubeena B • All rights reserved
        </div>
      </footer>

      {/* Interactive Contact Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg rounded border border-cyan-500/30 bg-[#09090e] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.15)] text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2 text-cyan-400 font-mono-tech text-xs tracking-widest mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>INITIATE TRANSMISSION</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                Get In Touch
              </h3>
              <p className="text-sm text-neutral-400 font-light mb-6">
                Direct communication channel for opportunities, collaborative AI research, or hackathon teams.
              </p>

              {formSent ? (
                <div className="rounded border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                  <Check className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-white font-medium text-base mb-1">
                    Transmission Dispatched
                  </h4>
                  <p className="text-xs font-mono-tech text-emerald-300">
                    Thank you! Your message has been simulated and logged.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alan Turing"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded border border-white/10 bg-white/[0.03] px-3.5 py-2.5 font-mono-tech text-xs text-white placeholder-neutral-600 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alan@ai-research.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded border border-white/10 bg-white/[0.03] px-3.5 py-2.5 font-mono-tech text-xs text-white placeholder-neutral-600 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Discussing an AI initiative or project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded border border-white/10 bg-white/[0.03] px-3.5 py-2.5 font-mono-tech text-xs text-white placeholder-neutral-600 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="flex items-center space-x-1.5 text-xs font-mono-tech text-neutral-400 hover:text-cyan-400"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>{copied ? 'Copied address!' : 'Copy Direct Email'}</span>
                    </button>

                    <button
                      type="submit"
                      className="flex items-center space-x-2 rounded border border-cyan-400 bg-cyan-400 px-5 py-2.5 font-mono-tech text-xs font-semibold text-[#050505] transition-all hover:bg-cyan-300"
                    >
                      <span>SEND DISPATCH</span>
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
