import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SiteSettings,
  ServiceItem,
  SolutionItem,
  CaseStudyItem,
  BlogPostItem,
  ResourceItem,
  TeamMemberItem,
  TestimonialItem,
  PricingPlanItem,
  FaqItem,
  CareerItem,
  LeadSubmission,
} from '../types/cms';
import {
  INITIAL_SETTINGS,
  INITIAL_SERVICES,
  INITIAL_SOLUTIONS,
  INITIAL_CASE_STUDIES,
  INITIAL_BLOG_POSTS,
  INITIAL_RESOURCES,
  INITIAL_TEAM,
  INITIAL_TESTIMONIALS,
  INITIAL_PRICING,
  INITIAL_FAQS,
  INITIAL_CAREERS,
  INITIAL_SUBMISSIONS,
} from './initialData';

const STORAGE_KEY = 'kinetix_cms_storage_v2';
const AUTH_KEY = 'kinetix_cms_auth_v2';

interface CmsContextType {
  settings: SiteSettings;
  services: ServiceItem[];
  solutions: SolutionItem[];
  caseStudies: CaseStudyItem[];
  blogPosts: BlogPostItem[];
  resources: ResourceItem[];
  team: TeamMemberItem[];
  testimonials: TestimonialItem[];
  pricing: PricingPlanItem[];
  faqs: FaqItem[];
  careers: CareerItem[];
  submissions: LeadSubmission[];
  
  // Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  
  // Services
  addService: (item: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, item: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Solutions
  addSolution: (item: Omit<SolutionItem, 'id'>) => void;
  updateSolution: (id: string, item: Partial<SolutionItem>) => void;
  deleteSolution: (id: string) => void;

  // Case Studies
  addCaseStudy: (item: Omit<CaseStudyItem, 'id'>) => void;
  updateCaseStudy: (id: string, item: Partial<CaseStudyItem>) => void;
  deleteCaseStudy: (id: string) => void;

  // Blog Posts
  addBlogPost: (item: Omit<BlogPostItem, 'id'>) => void;
  updateBlogPost: (id: string, item: Partial<BlogPostItem>) => void;
  deleteBlogPost: (id: string) => void;

  // Resources
  addResource: (item: Omit<ResourceItem, 'id'>) => void;
  updateResource: (id: string, item: Partial<ResourceItem>) => void;
  deleteResource: (id: string) => void;

  // Team
  addTeamMember: (item: Omit<TeamMemberItem, 'id'>) => void;
  updateTeamMember: (id: string, item: Partial<TeamMemberItem>) => void;
  deleteTeamMember: (id: string) => void;

  // Testimonials
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Pricing
  addPricingPlan: (item: Omit<PricingPlanItem, 'id'>) => void;
  updatePricingPlan: (id: string, item: Partial<PricingPlanItem>) => void;
  deletePricingPlan: (id: string) => void;

  // FAQs
  addFaq: (item: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, item: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;

  // Careers
  addCareer: (item: Omit<CareerItem, 'id'>) => void;
  updateCareer: (id: string, item: Partial<CareerItem>) => void;
  deleteCareer: (id: string) => void;

  // Submissions
  submitLead: (item: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateSubmissionStatus: (id: string, status: LeadSubmission['status']) => void;
  deleteSubmission: (id: string) => void;

  // Auth & Admin
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // System
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (json: string) => boolean;
  
  // Feedback Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CmsContext = createContext<CmsContextType | null>(null);

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [solutions, setSolutions] = useState<SolutionItem[]>(INITIAL_SOLUTIONS);
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(INITIAL_CASE_STUDIES);
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>(INITIAL_BLOG_POSTS);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [team, setTeam] = useState<TeamMemberItem[]>(INITIAL_TEAM);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [pricing, setPricing] = useState<PricingPlanItem[]>(INITIAL_PRICING);
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);
  const [careers, setCareers] = useState<CareerItem[]>(INITIAL_CAREERS);
  const [submissions, setSubmissions] = useState<LeadSubmission[]>(INITIAL_SUBMISSIONS);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.services) setServices(parsed.services);
        if (parsed.solutions) setSolutions(parsed.solutions);
        if (parsed.caseStudies) setCaseStudies(parsed.caseStudies);
        if (parsed.blogPosts) setBlogPosts(parsed.blogPosts);
        if (parsed.resources) setResources(parsed.resources);
        if (parsed.team) setTeam(parsed.team);
        if (parsed.testimonials) setTestimonials(parsed.testimonials);
        if (parsed.pricing) setPricing(parsed.pricing);
        if (parsed.faqs) setFaqs(parsed.faqs);
        if (parsed.careers) setCareers(parsed.careers);
        if (parsed.submissions) setSubmissions(parsed.submissions);
      }
    } catch (e) {
      console.warn('Failed to parse CMS storage', e);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    const payload = {
      settings,
      services,
      solutions,
      caseStudies,
      blogPosts,
      resources,
      team,
      testimonials,
      pricing,
      faqs,
      careers,
      submissions,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [
    settings,
    services,
    solutions,
    caseStudies,
    blogPosts,
    resources,
    team,
    testimonials,
    pricing,
    faqs,
    careers,
    submissions,
  ]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Site settings updated');
  };

  // Service CRUD
  const addService = (item: Omit<ServiceItem, 'id'>) => {
    const newItem: ServiceItem = { ...item, id: `srv-${Date.now()}` };
    setServices((prev) => [...prev, newItem]);
    showToast(`Service "${item.title}" added`);
  };

  const updateService = (id: string, item: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...item } : s)));
    showToast('Service updated');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service deleted');
  };

  // Solution CRUD
  const addSolution = (item: Omit<SolutionItem, 'id'>) => {
    const newItem: SolutionItem = { ...item, id: `sol-${Date.now()}` };
    setSolutions((prev) => [...prev, newItem]);
    showToast(`Solution "${item.title}" added`);
  };

  const updateSolution = (id: string, item: Partial<SolutionItem>) => {
    setSolutions((prev) => prev.map((s) => (s.id === id ? { ...s, ...item } : s)));
    showToast('Solution updated');
  };

  const deleteSolution = (id: string) => {
    setSolutions((prev) => prev.filter((s) => s.id !== id));
    showToast('Solution deleted');
  };

  // Case Study CRUD
  const addCaseStudy = (item: Omit<CaseStudyItem, 'id'>) => {
    const newItem: CaseStudyItem = { ...item, id: `cs-${Date.now()}` };
    setCaseStudies((prev) => [...prev, newItem]);
    showToast(`Case study "${item.title}" created`);
  };

  const updateCaseStudy = (id: string, item: Partial<CaseStudyItem>) => {
    setCaseStudies((prev) => prev.map((c) => (c.id === id ? { ...c, ...item } : c)));
    showToast('Case study updated');
  };

  const deleteCaseStudy = (id: string) => {
    setCaseStudies((prev) => prev.filter((c) => c.id !== id));
    showToast('Case study removed');
  };

  // Blog CRUD
  const addBlogPost = (item: Omit<BlogPostItem, 'id'>) => {
    const newItem: BlogPostItem = { ...item, id: `post-${Date.now()}` };
    setBlogPosts((prev) => [newItem, ...prev]);
    showToast(`Post "${item.title}" published`);
  };

  const updateBlogPost = (id: string, item: Partial<BlogPostItem>) => {
    setBlogPosts((prev) => prev.map((b) => (b.id === id ? { ...b, ...item } : b)));
    showToast('Blog article updated');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((b) => b.id !== id));
    showToast('Blog article deleted');
  };

  // Resource CRUD
  const addResource = (item: Omit<ResourceItem, 'id'>) => {
    const newItem: ResourceItem = { ...item, id: `res-${Date.now()}` };
    setResources((prev) => [newItem, ...prev]);
    showToast(`Resource "${item.title}" added`);
  };

  const updateResource = (id: string, item: Partial<ResourceItem>) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...item } : r)));
    showToast('Resource updated');
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    showToast('Resource removed');
  };

  // Team CRUD
  const addTeamMember = (item: Omit<TeamMemberItem, 'id'>) => {
    const newItem: TeamMemberItem = { ...item, id: `team-${Date.now()}` };
    setTeam((prev) => [...prev, newItem]);
    showToast(`Team member "${item.name}" added`);
  };

  const updateTeamMember = (id: string, item: Partial<TeamMemberItem>) => {
    setTeam((prev) => prev.map((t) => (t.id === id ? { ...t, ...item } : t)));
    showToast('Team member updated');
  };

  const deleteTeamMember = (id: string) => {
    setTeam((prev) => prev.filter((t) => t.id !== id));
    showToast('Team member deleted');
  };

  // Testimonials CRUD
  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newItem: TestimonialItem = { ...item, id: `test-${Date.now()}` };
    setTestimonials((prev) => [...prev, newItem]);
    showToast('Testimonial added');
  };

  const updateTestimonial = (id: string, item: Partial<TestimonialItem>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...item } : t)));
    showToast('Testimonial updated');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast('Testimonial removed');
  };

  // Pricing CRUD
  const addPricingPlan = (item: Omit<PricingPlanItem, 'id'>) => {
    const newItem: PricingPlanItem = { ...item, id: `price-${Date.now()}` };
    setPricing((prev) => [...prev, newItem]);
    showToast(`Pricing plan "${item.name}" created`);
  };

  const updatePricingPlan = (id: string, item: Partial<PricingPlanItem>) => {
    setPricing((prev) => prev.map((p) => (p.id === id ? { ...p, ...item } : p)));
    showToast('Pricing plan updated');
  };

  const deletePricingPlan = (id: string) => {
    setPricing((prev) => prev.filter((p) => p.id !== id));
    showToast('Pricing plan deleted');
  };

  // FAQ CRUD
  const addFaq = (item: Omit<FaqItem, 'id'>) => {
    const newItem: FaqItem = { ...item, id: `faq-${Date.now()}` };
    setFaqs((prev) => [...prev, newItem]);
    showToast('FAQ item added');
  };

  const updateFaq = (id: string, item: Partial<FaqItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...item } : f)));
    showToast('FAQ updated');
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    showToast('FAQ deleted');
  };

  // Career CRUD
  const addCareer = (item: Omit<CareerItem, 'id'>) => {
    const newItem: CareerItem = { ...item, id: `job-${Date.now()}` };
    setCareers((prev) => [...prev, newItem]);
    showToast(`Job listing "${item.title}" posted`);
  };

  const updateCareer = (id: string, item: Partial<CareerItem>) => {
    setCareers((prev) => prev.map((c) => (c.id === id ? { ...c, ...item } : c)));
    showToast('Job listing updated');
  };

  const deleteCareer = (id: string) => {
    setCareers((prev) => prev.filter((c) => c.id !== id));
    showToast('Job listing removed');
  };

  // Submissions
  const submitLead = async (item: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    // Artificial slight delay for realistic network response
    await new Promise((res) => setTimeout(res, 400));
    const newSubmission: LeadSubmission = {
      ...item,
      id: `sub-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setSubmissions((prev) => [newSubmission, ...prev]);
    showToast('Inquiry received! Our team will respond within 4 hours.');
    return true;
  };

  const updateSubmissionStatus = (id: string, status: LeadSubmission['status']) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    showToast(`Submission status updated to ${status}`);
  };

  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    showToast('Submission record deleted');
  };

  // Auth
  const loginAdmin = (password: string): boolean => {
    // Allows 'admin2026' or 'kinetix2026' or instant login
    if (password === 'admin2026' || password === 'kinetix2026' || password === 'admin') {
      setIsAdminLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      showToast('Authenticated as CMS Administrator');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
    showToast('Logged out of CMS');
  };

  // System
  const resetToDefaults = () => {
    setSettings(INITIAL_SETTINGS);
    setServices(INITIAL_SERVICES);
    setSolutions(INITIAL_SOLUTIONS);
    setCaseStudies(INITIAL_CASE_STUDIES);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setResources(INITIAL_RESOURCES);
    setTeam(INITIAL_TEAM);
    setTestimonials(INITIAL_TESTIMONIALS);
    setPricing(INITIAL_PRICING);
    setFaqs(INITIAL_FAQS);
    setCareers(INITIAL_CAREERS);
    setSubmissions(INITIAL_SUBMISSIONS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('CMS database restored to factory demo state');
  };

  const exportDataJson = (): string => {
    const payload = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      settings,
      services,
      solutions,
      caseStudies,
      blogPosts,
      resources,
      team,
      testimonials,
      pricing,
      faqs,
      careers,
      submissions,
    };
    return JSON.stringify(payload, null, 2);
  };

  const importDataJson = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (parsed.settings) setSettings(parsed.settings);
      if (parsed.services) setServices(parsed.services);
      if (parsed.solutions) setSolutions(parsed.solutions);
      if (parsed.caseStudies) setCaseStudies(parsed.caseStudies);
      if (parsed.blogPosts) setBlogPosts(parsed.blogPosts);
      if (parsed.resources) setResources(parsed.resources);
      if (parsed.team) setTeam(parsed.team);
      if (parsed.testimonials) setTestimonials(parsed.testimonials);
      if (parsed.pricing) setPricing(parsed.pricing);
      if (parsed.faqs) setFaqs(parsed.faqs);
      if (parsed.careers) setCareers(parsed.careers);
      if (parsed.submissions) setSubmissions(parsed.submissions);
      showToast('CMS data imported successfully');
      return true;
    } catch (e) {
      showToast('Error importing JSON data');
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        settings,
        services,
        solutions,
        caseStudies,
        blogPosts,
        resources,
        team,
        testimonials,
        pricing,
        faqs,
        careers,
        submissions,
        updateSettings,
        addService,
        updateService,
        deleteService,
        addSolution,
        updateSolution,
        deleteSolution,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addResource,
        updateResource,
        deleteResource,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addPricingPlan,
        updatePricingPlan,
        deletePricingPlan,
        addFaq,
        updateFaq,
        deleteFaq,
        addCareer,
        updateCareer,
        deleteCareer,
        submitLead,
        updateSubmissionStatus,
        deleteSubmission,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
