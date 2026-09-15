export interface SkillNode {
  id: string;
  name: string;
  category: string;
  description: string;
  details: string[];
  angle: number; // for circular network positioning
  distance: number;
  color?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: 'featured' | 'upcoming';
  features?: string[];
  metrics?: { label: string; value: string }[];
  link?: string;
}

export interface JourneyMilestone {
  id: string;
  year?: string;
  title: string;
  subtitle?: string;
  status: 'current' | 'completed' | 'future';
  isNextArrow?: boolean;
}
