export interface Education {
  id: number;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface Language {
  id: number;
  name: string;
  proficiency: "Basic" | "Intermediate" | "Advanced" | "Native";
}

export interface Award {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Settings {
  bgColor: string;
  fontColor: string;
  fontSize: number;
  fontFamily: string;
}

export interface Skill {
  id: number;
  value: string;
}

export interface FormInputs {
  name: string;
  email: string;
  phone: string;
  address: string;
  professionalSummary: string;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  awards: Award[];
}
