import { useRef } from 'react';
import SectionHeading from './SectionHeading.tsx';
import ProjectCard from './ProjectCard.tsx';
import { ProjectItem } from '../types.ts';

const projectsList: ProjectItem[] = [
  {
    id: 'vocashield',
    number: '01',
    title: 'VOCASHIELD',
    subtitle: 'AI Voice Security',
    description:
      'Detect AI-generated voices, verify speakers and identify suspicious voice activity in real time.',
    tags: ['Next.js', 'TypeScript', 'AI', 'Voice Security', 'Signal Processing'],
    status: 'featured',
    features: [
      'Deepfake vocal artifact detection',
      'Continuous biometric speaker verification',
      'Acoustic spectral frequency mapping',
    ],
  },
  {
    id: 'project-02',
    number: '02',
    title: 'COMING SOON',
    subtitle: 'Neural Intelligence Architecture',
    description:
      'Next-generation machine intelligence exploration currently under research and development.',
    tags: ['Python', 'AI Research', 'Algorithmic Modeling'],
    status: 'upcoming',
  },
  {
    id: 'project-03',
    number: '03',
    title: 'COMING SOON',
    subtitle: 'Data Science & Predictive Systems',
    description:
      'Advanced exploratory data modeling pipeline designed to extract real-world actionable signals.',
    tags: ['Data Science', 'Predictive Modeling', 'Analytics'],
    status: 'upcoming',
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      <SectionHeading
        number="03"
        tag="Featured Initiatives"
        title="SELECTED WORK"
        subtitle="Focused software artifacts engineered with precision, artificial intelligence, and purpose."
      />

      {/* Featured Primary Project */}
      <div className="mb-8">
        <ProjectCard project={projectsList[0]} index={0} />
      </div>

      {/* Upcoming / Reserved Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <ProjectCard project={projectsList[1]} index={1} />
        <ProjectCard project={projectsList[2]} index={2} />
      </div>
    </section>
  );
}
