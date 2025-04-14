// Project type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
}

// Skill type definition
export interface Skill {
  name: string;
  percentage: number;
  color: string;
}

// Experience type definition
export interface Experience {
  title: string;
  organization: string;
  period: string;
  bullets: string[];
  active: boolean;
}

// Education type definition
export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

// Contact form values type definition
export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
