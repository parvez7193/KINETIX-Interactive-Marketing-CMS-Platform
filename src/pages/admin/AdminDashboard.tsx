import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  Save,
  RotateCcw,
  Download,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  FileText,
  Users,
  MessageSquare,
  CreditCard,
  HelpCircle,
  Briefcase,
  Sliders,
  Inbox,
  ExternalLink,
} from 'lucide-react';
import { useCms } from '../../cms/CmsContext';
import { SeoHead } from '../../components/common/SeoHead';
import {
  ServiceItem,
  CaseStudyItem,
  BlogPostItem,
  TeamMemberItem,
  TestimonialItem,
  PricingPlanItem,
  FaqItem,
  CareerItem,
  ResourceItem,
  LeadSubmission,
} from '../../types/cms';

export const AdminDashboard: React.FC = () => {
  const {
    settings,
    updateSettings,
    services,
    addService,
    updateService,
    deleteService,
    caseStudies,
    addCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    resources,
    addResource,
    updateResource,
    deleteResource,
    team,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    pricing,
    addPricingPlan,
    updatePricingPlan,
    deletePricingPlan,
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    careers,
    addCareer,
    updateCareer,
    deleteCareer,
    submissions,
    updateSubmissionStatus,
    deleteSubmission,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    resetToDefaults,
    exportDataJson,
    importDataJson,
    showToast,
  } = useCms();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'services' | 'work' | 'blog' | 'resources' | 'team' | 'testimonials' | 'pricing' | 'faqs' | 'careers' | 'submissions' | 'settings'
  >('overview');

  // Search filter inside admin
  const [adminSearch, setAdminSearch] = useState('');

  // Edit Modals State
  const [editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);

  // Authentication Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = loginAdmin(passwordInput.trim());
    if (!success) {
      setAuthError('Invalid credentials. Use passcode "admin2026" or click Quick Login.');
    }
  };

  const handleQuickLogin = () => {
    loginAdmin('admin2026');
  };

  // Export & Import Handlers
  const handleExport = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kinetix-cms-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('CMS database exported to JSON file');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const ok = importDataJson(text);
      if (ok) showToast('CMS database restored from backup');
    };
    reader.readAsText(file);
  };

  // If Not Authenticated, show Admin Login Portal
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 space-y-8 animate-fade-in">
        <SeoHead title="CMS Administration Login" />

        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            KINETIX Studio CMS
          </span>
          <h1 className="text-3xl font-extrabold text-white">Administration Console</h1>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Authenticated workspace to manage pages, case studies, services, blog publications, and form submissions.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
          {authError && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">
                Administrator Passcode
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-lg transition-colors"
            >
              Authenticate & Open CMS
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-neutral-800 text-center space-y-3">
            <p className="text-[11px] text-neutral-500">
              Evaluation Passcode: <code className="text-amber-300 bg-neutral-950 px-1.5 py-0.5 rounded font-mono">admin2026</code>
            </p>
            <button
              onClick={handleQuickLogin}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors border border-neutral-700"
            >
              1-Click Instant Demo Login
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs text-neutral-500 hover:text-white transition-colors">
            &larr; Return to public marketing website
          </Link>
        </div>
      </div>
    );
  }

  // Count unread submissions
  const unreadSubmissions = submissions.filter((s) => s.status === 'New').length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 pb-32">
      <SeoHead title="CMS Administration Console" />

      {/* Top Console Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">CMS Administration</h1>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                Live & Persistent
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Managing <strong className="text-neutral-200">{settings.brandName}</strong> Production Content Architecture
            </p>
          </div>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Link
            to="/"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleExport}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
            title="Download full CMS state as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>

          <label className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (window.confirm('Restore all collections to initial factory demo state? Any custom edits will be reset.')) {
                resetToDefaults();
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            title="Restore original sample data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900/50 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-neutral-800/80 scrollbar-none text-xs font-medium">
        {[
          { key: 'overview', label: 'Overview', icon: Sliders },
          { key: 'services', label: `Services (${services.length})`, icon: Sparkles },
          { key: 'work', label: `Case Studies (${caseStudies.length})`, icon: Layers },
          { key: 'blog', label: `Blog (${blogPosts.length})`, icon: FileText },
          { key: 'resources', label: `Resources (${resources.length})`, icon: Download },
          { key: 'team', label: `Team (${team.length})`, icon: Users },
          { key: 'testimonials', label: `Testimonials (${testimonials.length})`, icon: MessageSquare },
          { key: 'pricing', label: `Pricing (${pricing.length})`, icon: CreditCard },
          { key: 'faqs', label: `FAQs (${faqs.length})`, icon: HelpCircle },
          { key: 'careers', label: `Careers (${careers.length})`, icon: Briefcase },
          {
            key: 'submissions',
            label: `Leads & Inbox (${submissions.length})${unreadSubmissions > 0 ? ` [${unreadSubmissions} New]` : ''}`,
            icon: Inbox,
          },
          { key: 'settings', label: 'Site Settings', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as any);
                setEditingItem(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREAS */}

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Services</span>
              <p className="text-2xl font-bold text-white tabular-nums mt-1">{services.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Case Studies</span>
              <p className="text-2xl font-bold text-white tabular-nums mt-1">{caseStudies.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Blog Articles</span>
              <p className="text-2xl font-bold text-white tabular-nums mt-1">{blogPosts.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Resources</span>
              <p className="text-2xl font-bold text-white tabular-nums mt-1">{resources.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Team Members</span>
              <p className="text-2xl font-bold text-white tabular-nums mt-1">{team.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-amber-500/40">
              <span className="text-[10px] font-mono text-amber-400 uppercase">Inbound Leads</span>
              <p className="text-2xl font-bold text-amber-400 tabular-nums mt-1">{submissions.length}</p>
            </div>
          </div>

          {/* Recent Inbound Leads Highlight */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Recent Inbound Submissions</h3>
              </div>
              <button
                onClick={() => setActiveTab('submissions')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                View all in inbox &rarr;
              </button>
            </div>

            <div className="divide-y divide-neutral-800 text-xs">
              {submissions.slice(0, 3).map((sub) => (
                <div key={sub.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{sub.name}</span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-neutral-400">{sub.email}</span>
                      {sub.company && (
                        <span className="text-neutral-500">({sub.company})</span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Type: <span className="font-mono text-amber-400 uppercase">{sub.type}</span> · Received {new Date(sub.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      sub.status === 'New'
                        ? 'bg-amber-950 text-amber-300 border border-amber-700'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <h4 className="text-sm font-bold text-white">1. Add or Edit Services</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Add new practice areas, change starting prices, update deliverables, and toggle live visibility.
              </p>
              <button
                onClick={() => setActiveTab('services')}
                className="text-xs text-amber-400 hover:underline pt-2 block"
              >
                Open Services Manager &rarr;
              </button>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <h4 className="text-sm font-bold text-white">2. Publish Case Studies</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Document customer challenges, strategy decisions, and verified ROI percentage metrics.
              </p>
              <button
                onClick={() => setActiveTab('work')}
                className="text-xs text-amber-400 hover:underline pt-2 block"
              >
                Open Case Studies Manager &rarr;
              </button>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <h4 className="text-sm font-bold text-white">3. Update Site Brand & SEO</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Configure brand name, announcement bar, phone, email, and global social profile links.
              </p>
              <button
                onClick={() => setActiveTab('settings')}
                className="text-xs text-amber-400 hover:underline pt-2 block"
              >
                Open Site Settings &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SERVICES TAB */}
      {activeTab === 'services' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Services & Capabilities ({services.length})</h2>
            <button
              onClick={() =>
                setEditingItem({
                  type: 'service',
                  data: {
                    title: 'New Strategic Practice',
                    slug: `practice-${Date.now()}`,
                    kicker: 'Growth & Technology',
                    shortDescription: 'High-impact capability description.',
                    fullDescription: 'Comprehensive overview of practice methodologies.',
                    heroImage: '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
                    iconName: 'Sparkles',
                    features: ['Strategic Architecture', 'Rapid Turnaround'],
                    deliverables: ['Full Specification & Production Code'],
                    processSteps: [
                      { title: '01. Discovery', description: 'Deep market and technical audit.' },
                      { title: '02. Execution', description: 'High-velocity build.' },
                    ],
                    startingPrice: '$15,000',
                    timeline: '4 Weeks',
                    featured: true,
                    published: true,
                    displayOrder: services.length + 1,
                  },
                })
              }
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Service</span>
            </button>
          </div>

          <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden text-xs">
            {services.map((srv) => (
              <div key={srv.id} className="p-4 flex items-center justify-between gap-4 hover:bg-neutral-850">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{srv.title}</span>
                    <span className="text-neutral-500 font-mono">/services/{srv.slug}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        srv.published ? 'bg-emerald-950 text-emerald-300' : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {srv.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-neutral-400 line-clamp-1">{srv.shortDescription}</p>
                  <p className="text-amber-400/90 font-mono">
                    Starts: {srv.startingPrice} · Timeline: {srv.timeline}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/services/${srv.slug}`}
                    target="_blank"
                    className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                    title="Preview on live site"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setEditingItem({ type: 'service', data: srv })}
                    className="p-1.5 text-neutral-400 hover:text-amber-400 rounded hover:bg-neutral-800"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete service "${srv.title}"?`)) deleteService(srv.id);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-400 rounded hover:bg-neutral-800"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CASE STUDIES TAB */}
      {activeTab === 'work' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Client Case Studies ({caseStudies.length})</h2>
            <button
              onClick={() =>
                setEditingItem({
                  type: 'caseStudy',
                  data: {
                    title: 'New Client Transformation',
                    slug: `case-${Date.now()}`,
                    client: 'Innovator Corp',
                    industry: 'B2B Enterprise',
                    category: 'Flagship Platform',
                    year: '2026',
                    heroImage: '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
                    galleryImages: ['/src/assets/images/hero_marketing_studio_1792914299810.jpg'],
                    summary: 'Strategic overhaul yielding +180% inbound pipeline expansion.',
                    challenge: 'Faced high friction and lost prospective pilots.',
                    strategy: 'Engineered an authoritative digital broadsheet layout.',
                    solution: 'Full headless CMS and sub-100ms compositor micro-interactions.',
                    metrics: [
                      { metric: '+180%', label: 'Inbound Growth', context: 'Across 60 days' },
                    ],
                    testimonial: {
                      quote: 'KINETIX defined our category presence.',
                      author: 'Alex Rivera',
                      role: 'Chief Commercial Officer',
                      company: 'Innovator Corp',
                    },
                    relatedServices: ['interactive-web-experience'],
                    featured: true,
                    published: true,
                  },
                })
              }
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Case Study</span>
            </button>
          </div>

          <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden text-xs">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="p-4 flex items-center justify-between gap-4 hover:bg-neutral-850">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{cs.title}</span>
                    <span className="text-neutral-500 font-mono">/work/{cs.slug}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        cs.published ? 'bg-emerald-950 text-emerald-300' : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {cs.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-neutral-400">{cs.client} · {cs.industry} · {cs.year}</p>
                  {cs.metrics[0] && (
                    <p className="text-amber-400 font-mono text-[11px]">
                      Audited Metric: {cs.metrics[0].metric} ({cs.metrics[0].label})
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/work/${cs.slug}`}
                    target="_blank"
                    className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setEditingItem({ type: 'caseStudy', data: cs })}
                    className="p-1.5 text-neutral-400 hover:text-amber-400 rounded hover:bg-neutral-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete case study "${cs.title}"?`)) deleteCaseStudy(cs.id);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-400 rounded hover:bg-neutral-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. BLOG POSTS TAB */}
      {activeTab === 'blog' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Articles & Publications ({blogPosts.length})</h2>
            <button
              onClick={() =>
                setEditingItem({
                  type: 'blogPost',
                  data: {
                    title: 'New Strategic Dispatch',
                    slug: `dispatch-${Date.now()}`,
                    excerpt: 'Essential thesis on conversion engineering.',
                    content: 'Detailed editorial narrative with research frameworks...',
                    author: {
                      name: 'Elena Rostova',
                      role: 'Executive Creative Director',
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
                    },
                    category: 'Strategy & Brand',
                    tags: ['Brand', 'Growth'],
                    readTime: '5 min read',
                    publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    coverImage: '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
                    featured: false,
                    published: true,
                  },
                })
              }
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write Article</span>
            </button>
          </div>

          <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden text-xs">
            {blogPosts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between gap-4 hover:bg-neutral-850">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{post.title}</span>
                    <span className="text-neutral-500 font-mono">/blog/{post.slug}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        post.published ? 'bg-emerald-950 text-emerald-300' : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-neutral-400">{post.category} · {post.readTime} · By {post.author.name}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setEditingItem({ type: 'blogPost', data: post })}
                    className="p-1.5 text-neutral-400 hover:text-amber-400 rounded hover:bg-neutral-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete article "${post.title}"?`)) deleteBlogPost(post.id);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-400 rounded hover:bg-neutral-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. INBOX & SUBMISSIONS TAB */}
      {activeTab === 'submissions' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Inbound Leads & Submissions ({submissions.length})</h2>
              <p className="text-xs text-neutral-400">
                Live records captured from website forms, demo booking calendar, and newsletter inputs.
              </p>
            </div>
          </div>

          <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden text-xs">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-5 space-y-3 hover:bg-neutral-850">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{sub.name}</span>
                    <span className="text-neutral-500 font-mono">({sub.email})</span>
                    {sub.company && <span className="text-neutral-400">· {sub.company}</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-400">
                      {new Date(sub.createdAt).toLocaleString()}
                    </span>
                    <select
                      value={sub.status}
                      onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as any)}
                      className="bg-neutral-950 border border-neutral-700 rounded px-2 py-1 text-[11px] text-amber-300 font-mono focus:outline-none"
                    >
                      <option value="New">Status: New</option>
                      <option value="In Review">Status: In Review</option>
                      <option value="Responded">Status: Responded</option>
                      <option value="Archived">Status: Archived</option>
                    </select>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete submission record?')) deleteSubmission(sub.id);
                      }}
                      className="p-1 text-neutral-500 hover:text-red-400"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Submission Details */}
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-neutral-300 space-y-1">
                  <p className="font-mono text-[11px] text-amber-400 uppercase">Type: {sub.type}</p>
                  {sub.phone && <p>Phone: {sub.phone}</p>}
                  {sub.details && Object.keys(sub.details).length > 0 && (
                    <div className="pt-1 text-[11px] text-neutral-400 space-y-0.5">
                      {Object.entries(sub.details).map(([k, v]) => (
                        <p key={k}>
                          <strong className="text-neutral-300 capitalize">{k}:</strong>{' '}
                          {Array.isArray(v) ? v.join(', ') : String(v)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {submissions.length === 0 && (
              <div className="p-8 text-center text-neutral-500">
                No submissions received yet. Test by submitting the contact or demo form!
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. GLOBAL SITE SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6 animate-fade-in max-w-2xl text-xs">
          <h2 className="text-lg font-bold text-white">Global Site Settings</h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Brand Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => updateSettings({ brandName: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => updateSettings({ tagline: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Description</label>
              <textarea
                rows={3}
                value={settings.description}
                onChange={(e) => updateSettings({ description: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Direct Phone</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => updateSettings({ phone: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            {/* Announcement Banner */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Top Announcement Strip</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.announcement.enabled}
                    onChange={(e) =>
                      updateSettings({
                        announcement: { ...settings.announcement, enabled: e.target.checked },
                      })
                    }
                    className="accent-amber-400"
                  />
                  <span className="text-neutral-300">Enabled</span>
                </label>
              </div>

              <input
                type="text"
                value={settings.announcement.text}
                onChange={(e) =>
                  updateSettings({
                    announcement: { ...settings.announcement, text: e.target.value },
                  })
                }
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-xs"
                placeholder="Announcement banner text"
              />
            </div>
          </div>
        </div>
      )}

      {/* 7. OTHER TABS (Resources, Team, Pricing, FAQs, Careers) */}
      {activeTab === 'resources' && (
        <div className="space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Downloadable Resources ({resources.length})</h2>
            <button
              onClick={() =>
                addResource({
                  slug: `resource-${Date.now()}`,
                  title: 'New Research Guide',
                  type: 'Playbook',
                  category: 'Growth',
                  description: 'Actionable executive playbook.',
                  pagesOrSize: '24 Pages · PDF',
                  coverImage: '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
                  keyTakeaways: ['High-impact takeaway point'],
                  downloadFileName: 'kinetix-guide.pdf',
                  featured: false,
                  published: true,
                })
              }
              className="px-3 py-1.5 bg-amber-400 text-neutral-950 font-bold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Resource</span>
            </button>
          </div>
          <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900 border border-neutral-800">
            {resources.map((res) => (
              <div key={res.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-white text-sm">{res.title}</p>
                  <p className="text-neutral-400">{res.type} · {res.pagesOrSize}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${res.title}?`)) deleteResource(res.id);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Team Members ({team.length})</h2>
            <button
              onClick={() =>
                addTeamMember({
                  slug: `team-${Date.now()}`,
                  name: 'New Practice Lead',
                  role: 'Senior Consultant',
                  department: 'Strategy & Brand',
                  bio: 'Experienced creative practitioner.',
                  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=500&q=80',
                  linkedin: 'https://linkedin.com',
                  displayOrder: team.length + 1,
                  published: true,
                })
              }
              className="px-3 py-1.5 bg-amber-400 text-neutral-950 font-bold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </button>
          </div>
          <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900 border border-neutral-800">
            {team.map((member) => (
              <div key={member.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={member.photoUrl} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-white text-sm">{member.name}</p>
                    <p className="text-neutral-400">{member.role} · {member.department}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${member.name}?`)) deleteTeamMember(member.id);
                  }}
                  className="p-1.5 text-neutral-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Pricing Plans ({pricing.length})</h2>
          </div>
          <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900 border border-neutral-800">
            {pricing.map((plan) => (
              <div key={plan.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-white text-sm">{plan.name} ({plan.tier})</p>
                  <p className="text-amber-400 font-mono">
                    ${plan.monthlyPrice.toLocaleString()}/mo · Annual: ${plan.annualPrice.toLocaleString()}/mo
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newPrice = Number(prompt('Enter new monthly price:', String(plan.monthlyPrice)));
                      if (newPrice && !isNaN(newPrice)) {
                        updatePricingPlan(plan.id, { monthlyPrice: newPrice });
                      }
                    }}
                    className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-xs"
                  >
                    Adjust Price
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'faqs' && (
        <div className="space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">FAQs ({faqs.length})</h2>
            <button
              onClick={() => {
                const q = prompt('Enter FAQ question:');
                const a = prompt('Enter FAQ answer:');
                if (q && a) {
                  addFaq({
                    question: q,
                    answer: a,
                    category: 'Strategy',
                    displayOrder: faqs.length + 1,
                    published: true,
                  });
                }
              }}
              className="px-3 py-1.5 bg-amber-400 text-neutral-950 font-bold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>
          <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900 border border-neutral-800">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase">{faq.category}</span>
                  <p className="font-bold text-white text-sm">{faq.question}</p>
                  <p className="text-neutral-400 line-clamp-1">{faq.answer}</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Delete FAQ?')) deleteFaq(faq.id);
                  }}
                  className="p-1.5 text-neutral-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'careers' && (
        <div className="space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Career Postings ({careers.length})</h2>
            <button
              onClick={() =>
                addCareer({
                  slug: `role-${Date.now()}`,
                  title: 'Senior Motion Specialist',
                  department: 'Engineering & Creative',
                  location: 'Remote / Zurich',
                  employmentType: 'Full-time',
                  description: 'Engineering compositor animations and responsive broadsheets.',
                  responsibilities: ['Build fluid micro-interactions.'],
                  qualifications: ['Deep TypeScript and CSS mastery.'],
                  salaryRange: '$150,000 - $190,000',
                  status: 'Open',
                  published: true,
                })
              }
              className="px-3 py-1.5 bg-amber-400 text-neutral-950 font-bold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Job</span>
            </button>
          </div>
          <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900 border border-neutral-800">
            {careers.map((job) => (
              <div key={job.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-white text-sm">{job.title}</p>
                  <p className="text-neutral-400">{job.department} · {job.location} · {job.salaryRange}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={job.status}
                    onChange={(e) => updateCareer(job.id, { status: e.target.value as any })}
                    className="bg-neutral-950 border border-neutral-700 rounded px-2 py-1 text-[11px] text-amber-300"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${job.title}?`)) deleteCareer(job.id);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT MODAL DIALOG (For Services, Case Studies, and Blog Posts) */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-base font-bold text-white">
                Edit {editingItem.type.toUpperCase()}: {editingItem.data.title}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-neutral-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Title</label>
                <input
                  type="text"
                  value={editingItem.data.title}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, title: e.target.value },
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">URL Slug</label>
                <input
                  type="text"
                  value={editingItem.data.slug}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, slug: e.target.value },
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              {editingItem.type === 'service' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-neutral-300 font-medium">Starting Price</label>
                      <input
                        type="text"
                        value={editingItem.data.startingPrice}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, startingPrice: e.target.value },
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-neutral-300 font-medium">Timeline</label>
                      <input
                        type="text"
                        value={editingItem.data.timeline}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, timeline: e.target.value },
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-medium">Short Summary</label>
                    <textarea
                      rows={2}
                      value={editingItem.data.shortDescription}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, shortDescription: e.target.value },
                        })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </>
              )}

              {editingItem.type === 'caseStudy' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-neutral-300 font-medium">Client Name</label>
                      <input
                        type="text"
                        value={editingItem.data.client}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, client: e.target.value },
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-neutral-300 font-medium">Industry</label>
                      <input
                        type="text"
                        value={editingItem.data.industry}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, industry: e.target.value },
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-medium">Audited Metric (Key Outcome)</label>
                    <input
                      type="text"
                      value={editingItem.data.metrics?.[0]?.metric || ''}
                      onChange={(e) => {
                        const updatedMetrics = [...(editingItem.data.metrics || [])];
                        if (!updatedMetrics[0]) {
                          updatedMetrics[0] = { metric: e.target.value, label: 'Key Result', context: '' };
                        } else {
                          updatedMetrics[0] = { ...updatedMetrics[0], metric: e.target.value };
                        }
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, metrics: updatedMetrics },
                        });
                      }}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-amber-300 font-mono"
                    />
                  </div>
                </>
              )}

              {editingItem.type === 'blogPost' && (
                <>
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-medium">Excerpt</label>
                    <textarea
                      rows={2}
                      value={editingItem.data.excerpt}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, excerpt: e.target.value },
                        })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-medium">Article Body (Markdown)</label>
                    <textarea
                      rows={6}
                      value={editingItem.data.content}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, content: e.target.value },
                        })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white font-mono text-[11px]"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.data.published}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, published: e.target.checked },
                      })
                    }
                    className="accent-amber-400"
                  />
                  <span className="text-neutral-300">Published Status (Visible to public)</span>
                </label>

                <button
                  onClick={() => {
                    if (editingItem.type === 'service') {
                      if (editingItem.data.id) {
                        updateService(editingItem.data.id, editingItem.data);
                      } else {
                        addService(editingItem.data);
                      }
                    } else if (editingItem.type === 'caseStudy') {
                      if (editingItem.data.id) {
                        updateCaseStudy(editingItem.data.id, editingItem.data);
                      } else {
                        addCaseStudy(editingItem.data);
                      }
                    } else if (editingItem.type === 'blogPost') {
                      if (editingItem.data.id) {
                        updateBlogPost(editingItem.data.id, editingItem.data);
                      } else {
                        addBlogPost(editingItem.data);
                      }
                    }
                    setEditingItem(null);
                  }}
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg transition-colors"
                >
                  Save & Publish Live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
