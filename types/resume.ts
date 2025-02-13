export type Resume = {
  id: string;
  user_id: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    graduationDate: string;
  }[];
  skills: string[];
  template: string;
  created_at: string;
  updated_at: string;
};

export type ResumeFormData = Omit<Resume, 'id' | 'user_id' | 'created_at' | 'updated_at'>;