import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen.tsx';
import SmoothScroll from './components/SmoothScroll.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import MotionBackground from './components/MotionBackground.tsx';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Journey from './components/Journey.tsx';
import Contact from './components/Contact.tsx';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for Navbar indicator
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050505] text-[#ededed] font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
        {/* Loading curtain */}
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

        {/* Desktop interactive custom cursor */}
        <CustomCursor />

        {/* Ambient atmospheric background with subtle particles and soft glow */}
        <MotionBackground />

        {/* Fixed minimal Navbar */}
        <Navbar activeSection={activeSection} />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero
            onExploreProjects={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onContact={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <About />

          <Skills />

          <Projects />

          <Journey />

          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
