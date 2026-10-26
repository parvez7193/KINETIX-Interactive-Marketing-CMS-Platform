export interface SiteSettings {
  brandName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  phone: string;
  address: string;
  announcement: {
    enabled: boolean;
    text: string;
    linkUrl: string;
    linkLabel: string;
  };
  social: {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImageUrl: string;
  };
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  processSteps: { title: string; description: string }[];
  startingPrice: string;
  timeline: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
}

export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  industry: string;
  summary: string;
  heroImage: string;
  painPoints: string[];
  capabilities: string[];
  outcomes: { metric: string; label: string }[];
  recommendedServices: string[];
  published: boolean;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  year: string;
  heroImage: string;
  galleryImages: string[];
  summary: string;
  challenge: string;
  strategy: string;
  solution: string;
  metrics: { metric: string; label: string; context: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  relatedServices: string[];
  featured: boolean;
  published: boolean;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  coverImage: string;
  featured: boolean;
  published: boolean;
}

export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  type: 'Whitepaper' | 'Benchmark Report' | 'Playbook' | 'Spreadsheet Tool' | 'Checklist';
  category: string;
  description: string;
  pagesOrSize: string;
  coverImage: string;
  keyTakeaways: string[];
  downloadFileName: string;
  featured: boolean;
  published: boolean;
}

export interface TeamMemberItem {
  id: string;
  slug: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  photoUrl: string;
  linkedin: string;
  displayOrder: number;
  published: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
  metricHighlight?: string;
  featured: boolean;
  published: boolean;
}

export interface PricingPlanItem {
  id: string;
  name: string;
  tier: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaLabel: string;
  popular: boolean;
  published: boolean;
  displayOrder: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Strategy' | 'Engineering' | 'Pricing' | 'CMS & Tech';
  displayOrder: number;
  published: boolean;
}

export interface CareerItem {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Contract';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  salaryRange: string;
  status: 'Open' | 'Closed';
  published: boolean;
}

export interface LeadSubmission {
  id: string;
  type: 'contact' | 'demo' | 'newsletter' | 'career' | 'resource_download';
  name: string;
  email: string;
  company?: string;
  phone?: string;
  details?: Record<string, any>;
  createdAt: string;
  status: 'New' | 'In Review' | 'Responded' | 'Archived';
}
