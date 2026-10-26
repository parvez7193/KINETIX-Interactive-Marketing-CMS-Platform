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

export const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'KINETIX',
  tagline: 'Digital Experience & Growth Engine',
  description:
    'Award-winning interactive digital marketing agency and venture studio crafting category-defining brand identities, web platforms, and automated revenue engines.',
  contactEmail: 'partnerships@kinetix.studio',
  phone: '+1 (415) 890-4120',
  address: '850 Folsom St, San Francisco, CA 94107 · Europe Hub: Talstrasse 14, 8001 Zürich',
  announcement: {
    enabled: true,
    text: 'Q4 2026 Strategy Allocations Open · Accepting 3 Select Enterprise Engagements',
    linkUrl: '/book-demo',
    linkLabel: 'Schedule Strategy Session',
  },
  social: {
    twitter: 'https://twitter.com/kinetix_studio',
    linkedin: 'https://linkedin.com/company/kinetix-interactive',
    github: 'https://github.com/kinetix-studio',
    instagram: 'https://instagram.com/kinetix.agency',
  },
  seo: {
    defaultTitle: 'KINETIX — Interactive Marketing & Growth Studio',
    defaultDescription:
      'Premier interactive marketing website and headless CMS platform engineered for high-growth tech ventures, luxury brands, and category leaders.',
    ogImageUrl: '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
  },
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'brand-identity-creative',
    title: 'Brand Identity & Creative Direction',
    kicker: 'Visual Systems & Positioning',
    shortDescription:
      'We craft iconic, unified brand systems, editorial visual languages, and positioning narratives that command premium category authority.',
    fullDescription:
      'A great brand is not merely a logo; it is an unmistakable visual grammar that differentiates category leaders from commoditized peers. We architect comprehensive brand books, bespoke typography pairings, motion identities, and high-impact art direction that resonate with sophisticated enterprise buyers and luxury consumers alike.',
    heroImage: '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
    iconName: 'Sparkles',
    features: [
      'Comprehensive Brand Foundations & Narrative Architecture',
      'Editorial Visual Grammar & Bespoke Typography Guidance',
      'Motion Design Tokens & Interaction Choreography',
      'Enterprise Multi-Touchpoint Design Systems',
    ],
    deliverables: [
      'Master Brand Guidelines (Figma & PDF)',
      'Vector Asset Library & Export Matrix',
      'Social & Campaign Creative Templates',
      'Interactive 3D / Motion Brand Tokens',
    ],
    processSteps: [
      { title: '01. Executive Discovery & Category Audit', description: 'Deep market analysis, competitive positioning matrix, and executive stakeholder alignment.' },
      { title: '02. Creative Concept Directions', description: 'Three contrasting high-fidelity visual territories tested against real customer segments.' },
      { title: '03. Comprehensive System Build', description: 'Exhaustive Figma token architecture, typography scales, iconography, and layout rules.' },
      { title: '04. Production Handover & Training', description: 'Asset exports, developer specs, and internal brand custodian training sessions.' },
    ],
    startingPrice: '$18,500',
    timeline: '4 - 6 Weeks',
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: 'srv-2',
    slug: 'interactive-web-experience',
    title: 'Interactive Web Platforms & Motion Systems',
    kicker: 'Full-Stack Web Architecture',
    shortDescription:
      'Engineering award-winning, responsive web platforms with fluid micro-interactions, editorial grids, and lightning-fast Core Web Vitals.',
    fullDescription:
      'Your digital flagship should captivate attention within milliseconds. We develop high-performance web applications using modern React, Tailwind CSS, hardware-accelerated animations, and headless CMS integrations that transform passive visitors into passionate brand advocates.',
    heroImage: '/src/assets/images/case_study_arc_mobility_1792914299720.jpg',
    iconName: 'Layout',
    features: [
      'Sub-50ms Interaction Latency & Compositor Motion',
      'Editorial Asymmetric Grids & Responsive Breakpoints',
      'Full Headless CMS Integration with Live Editorial Previews',
      'WCAG 2.2 AA Accessibility & Zero-Compromise Security',
    ],
    deliverables: [
      'Complete Production React SPA / Full-Stack Web App',
      'Tailwind Design System & Component Library',
      'Full CMS Schema & Admin Dashboard Integration',
      'Global CDN & SEO Optimization Suite',
    ],
    processSteps: [
      { title: '01. Wireframes & Spatial Math', description: 'Structural information architecture, grid math, and responsive breakpoint mapping.' },
      { title: '02. High-Fidelity UI Design & Motion', description: 'Figma prototypes with micro-interaction states, hover physics, and fluid transitions.' },
      { title: '03. Full-Stack Implementation', description: 'Clean TypeScript codebase, component encapsulation, and headless data layer connection.' },
      { title: '04. Performance Tuning & Launch', description: 'Lighthouse 98+ audit, cross-device testing, analytics wiring, and safe DNS cutover.' },
    ],
    startingPrice: '$24,000',
    timeline: '6 - 8 Weeks',
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    id: 'srv-3',
    slug: 'growth-performance-marketing',
    title: 'Performance Marketing & Demand Generation',
    kicker: 'Scalable Revenue Engines',
    shortDescription:
      'Data-driven paid media, search strategy, and multi-channel acquisition campaigns engineered to generate qualified enterprise pipeline.',
    fullDescription:
      'Stop burning marketing budgets on empty impressions. We build full-funnel acquisition systems targeting decision-makers across Search, LinkedIn, Meta, and programmatic exchanges, tightly coupled with landing page experimentation to maximize pipeline velocity.',
    heroImage: '/src/assets/images/case_study_zenith_fintech_1792914300754.jpg',
    iconName: 'TrendingUp',
    features: [
      'High-Intent Google Search & Programmatic ABM',
      'Paid Social Strategy for B2B Tech & Luxury Goods',
      'Multi-Touch Attribution & Clean CRM Pipeline Tracking',
      'Continuous Creative Experimentation & Message Testing',
    ],
    deliverables: [
      'Paid Acquisition Campaign Blueprint & Ad Creatives',
      'Live Looker / Bi-Weekly Pipeline Dashboards',
      'Keyword Matrix & Search Intent Landing Pages',
      'Monthly Retainer Management & Optimization Sprints',
    ],
    processSteps: [
      { title: '01. Historical Account & CAC Audit', description: 'Granular evaluation of past ad spend, attribution leaks, and customer economics.' },
      { title: '02. Audience Architecture & Creative', description: 'High-converting creative suites tailored to specific buyer personas and intent levels.' },
      { title: '03. Campaign Deployment & Bidding', description: 'Strategic account structures, automated bid management, and budget scaling.' },
      { title: '04. Weekly CRO & Iteration Cycles', description: 'Constant testing of headlines, angles, and landing pages to reduce CAC.' },
    ],
    startingPrice: '$8,500 / mo',
    timeline: 'Ongoing Retainer',
    featured: true,
    published: true,
    displayOrder: 3,
  },
  {
    id: 'srv-4',
    slug: 'conversion-rate-optimization',
    title: 'Conversion Rate Optimization (CRO)',
    kicker: 'Scientific Funnel Science',
    shortDescription:
      'Systematic heuristic audits, qualitative user tracking, and controlled A/B testing frameworks that turn existing traffic into revenue.',
    fullDescription:
      'Doubling your conversion rate yields double the pipeline without spending an extra dollar on ads. We apply rigorous behavioral psychology, heatmap friction analysis, and statistically sound experimentation to eliminate drop-off points across your lead generation funnels.',
    heroImage: '/src/assets/images/case_study_lumina_ai_1792914299591.jpg',
    iconName: 'Target',
    features: [
      'Heuristic Usability & Cognitive Friction Audits',
      'Form Optimization & Micro-Commitment Flows',
      'Statistical A/B & Multivariate Testing Protocols',
      'Post-Conversion Retention & Lead Qualification Nurture',
    ],
    deliverables: [
      'Full CRO Opportunity Scorecard & Roadmap',
      'Figma Test Variant Designs & Copywriting',
      'Full Experiment Deployment & Telemetry Code',
      'Bi-Weekly Experiment Debriefs & Learnings Archive',
    ],
    processSteps: [
      { title: '01. Funnel Telemetry & Quantitative Analysis', description: 'Pinpointing exact drop-off steps in Google Analytics 4, Mixpanel, and Hotjar.' },
      { title: '02. Hypothesis Formulation & Prioritization', description: 'Ranking test concepts by ICE score (Impact, Confidence, Ease).' },
      { title: '03. Production Test Execution', description: 'Clean variant execution with strict sample size controls and no layout thrashing.' },
      { title: '04. Statistical Significance & Rollout', description: 'Hardcoded implementation of validated winning variations into the main codebase.' },
    ],
    startingPrice: '$9,000 / mo',
    timeline: 'Ongoing Sprints',
    featured: false,
    published: true,
    displayOrder: 4,
  },
  {
    id: 'srv-5',
    slug: 'enterprise-cms-architecture',
    title: 'Headless CMS & Custom Content Platforms',
    kicker: 'Composable Architecture',
    shortDescription:
      'Modern content management systems engineered for speed, editorial autonomy, and strict enterprise governance.',
    fullDescription:
      'Empower marketing teams to launch campaign pages in minutes while developers maintain bulletproof code hygiene. We architect composable headless CMS platforms with rich block editors, preview workflows, role-based permissions, and instant revalidation.',
    heroImage: '/src/assets/images/case_study_kanso_audio_1792914301454.jpg',
    iconName: 'Database',
    features: [
      'Visual Block Editors & Reusable Modular Content',
      'Instant Live Preview & Scheduled Publishing',
      'Media Asset Optimization & Focal Point Cropping',
      'Role-Based Access Control (RBAC) & Audit Logging',
    ],
    deliverables: [
      'Configured CMS Workspace & Schemas',
      'Editor Documentation & Video Walkthroughs',
      'Automated Webhook Revalidation Pipelines',
      'Custom Content Migration Scripts',
    ],
    processSteps: [
      { title: '01. Content Domain Modeling', description: 'Mapping all content types, taxonomies, and relational dependencies.' },
      { title: '02. Schema Implementation & Validation', description: 'Building resilient input controls, slug generators, and media upload rules.' },
      { title: '03. Frontend Query Optimization', description: 'Efficient typed data fetching with client caching and instantaneous updates.' },
      { title: '04. Team Onboarding & Governance', description: 'Hands-on training for non-technical writers, marketers, and editors.' },
    ],
    startingPrice: '$16,000',
    timeline: '3 - 5 Weeks',
    featured: false,
    published: true,
    displayOrder: 5,
  },
  {
    id: 'srv-6',
    slug: 'marketing-automation-crm',
    title: 'Revenue Operations & Marketing Automation',
    kicker: 'Lifecycle & CRM Integration',
    shortDescription:
      'Seamless synchronization between web capture, CRM routing, automated qualification sequences, and sales team notification loops.',
    fullDescription:
      'Speed to lead determines conversion rates. We engineer automated workflows that instantly enrich inbound leads, route prospects to the right account executive based on firmographic criteria, and trigger personalized follow-ups that keep momentum alive.',
    heroImage: '/src/assets/images/case_study_zenith_fintech_1792914300754.jpg',
    iconName: 'Cpu',
    features: [
      'Instant Lead Routing & Calendar Booking Integration',
      'Clearbit / ZoomInfo Inbound Lead Enrichment',
      'HubSpot, Salesforce, and Customer.io Orchestration',
      'Real-Time Slack / Teams Alerting for High-Value Leads',
    ],
    deliverables: [
      'Architecture Blueprint & Field Mapping Matrix',
      'Automated Nurture Email Sequences & Templates',
      'Lead Scoring Model & Qualification Rules',
      'End-to-End Test Suite & Fallback Error Logging',
    ],
    processSteps: [
      { title: '01. Tech Stack Audit & Gap Identification', description: 'Reviewing current form handlers, CRM fields, and sales handoff delays.' },
      { title: '02. Workflow Specification & Logic Mapping', description: 'Drafting logic trees for multi-territory routing and scoring thresholds.' },
      { title: '03. Webhook & API Implementation', description: 'Secure integration between web forms, enrichment endpoints, and CRM objects.' },
      { title: '04. Dry Run & Live Simulation Testing', description: 'Submitting test records across all permutations to verify seamless data flow.' },
    ],
    startingPrice: '$12,500',
    timeline: '3 - 4 Weeks',
    featured: false,
    published: true,
    displayOrder: 6,
  },
];

export const INITIAL_SOLUTIONS: SolutionItem[] = [
  {
    id: 'sol-1',
    slug: 'b2b-saas-enterprise',
    title: 'B2B SaaS & Enterprise Software',
    industry: 'Enterprise Software & Cloud Platforms',
    summary:
      'Accelerating ACV growth and reducing sales cycles through authoritative positioning, interactive product tours, and high-velocity demo funnels.',
    heroImage: '/src/assets/images/case_study_zenith_fintech_1792914300754.jpg',
    painPoints: [
      'Complex technical products explained with generic jargon that confuses executive economic buyers.',
      'Sluggish demo-request forms that lose prospects between initial intent and calendar booking.',
      'Marketing teams blocked by engineering backlogs for every minor copy or landing page update.',
    ],
    capabilities: [
      'Interactive visual product walkthroughs and interactive feature sandbox simulators.',
      'Automated lead enrichment with instant calendar scheduling based on company ARR and employee size.',
      'Headless CMS infrastructure allowing PMMs to launch targeted ABM landing pages in 20 minutes.',
    ],
    outcomes: [
      { metric: '+58%', label: 'Inbound Demo-to-Opportunity Velocity' },
      { metric: '3.4x', label: 'Enterprise Pipeline Volume' },
      { metric: '-42%', label: 'Time Spent on Content Operations' },
    ],
    recommendedServices: ['interactive-web-experience', 'conversion-rate-optimization', 'enterprise-cms-architecture'],
    published: true,
  },
  {
    id: 'sol-2',
    slug: 'ai-deeptech-startups',
    title: 'AI & Spatial DeepTech Ventures',
    industry: 'Artificial Intelligence, Robotics & Hardware',
    summary:
      'Translating complex computational breakthroughs into undeniable commercial narratives that attract top-tier capital and enterprise pilots.',
    heroImage: '/src/assets/images/case_study_lumina_ai_1792914299591.jpg',
    painPoints: [
      'Groundbreaking proprietary technology framed like another commodity wrapper or API tool.',
      'Lack of tangible physical/digital product mockups that demonstrate real enterprise utility.',
      'Need to recruit world-class AI research talent while simultaneously booking commercial pilots.',
    ],
    capabilities: [
      'Bespoke 3D asset rendering, interactive component breakdowns, and latency-free interactive visuals.',
      'Dual-funnel narrative structure serving both technical researchers and C-level enterprise buyers.',
      'High-impact media relations drop coordination with synchronized social campaign assets.',
    ],
    outcomes: [
      { metric: '$14.2M', label: 'Commercial Pipeline in 60 Days' },
      { metric: '310%', label: 'Pre-Order Allocation Over-Subscription' },
      { metric: 'Top 1%', label: 'Global Technical Talent Inbound Rate' },
    ],
    recommendedServices: ['brand-identity-creative', 'interactive-web-experience', 'growth-performance-marketing'],
    published: true,
  },
  {
    id: 'sol-3',
    slug: 'luxury-d2c-brands',
    title: 'Luxury Goods & Premium Consumer Brands',
    industry: 'High-End Audio, Mobility & Modern Luxury',
    summary:
      'Elevating brand prestige and driving high-average-order-value direct transactions through sensory digital storytelling.',
    heroImage: '/src/assets/images/case_study_kanso_audio_1792914301454.jpg',
    painPoints: [
      'D2C storefronts that look like cheap dropshipping templates rather than luxury atelier craftsmanship.',
      'Skyrocketing customer acquisition costs on generic paid social channels with zero brand equity.',
      'High return rates caused by inadequate product expectation setting and flat photography.',
    ],
    capabilities: [
      'Editorial magazine-style layout architecture with full-bleed high-definition photography.',
      'Sensory micro-interactions, acoustic previews, and tactile material selector tools.',
      'VIP client concierge booking for private showings and bespoke customer care.',
    ],
    outcomes: [
      { metric: '+245%', label: 'Direct Digital Revenue in Year 1' },
      { metric: '-38%', label: 'Blended Customer Acquisition Cost' },
      { metric: '4.8/5', label: 'Verified Collector Satisfaction' },
    ],
    recommendedServices: ['brand-identity-creative', 'growth-performance-marketing', 'conversion-rate-optimization'],
    published: true,
  },
];

export const INITIAL_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-1',
    slug: 'lumina-ai',
    title: 'Lumina AI: Defining The Ambient Computing Era',
    client: 'Lumina Technologies',
    industry: 'Spatial Hardware & Artificial Intelligence',
    category: 'Product Launch & Web Experience',
    year: '2026',
    heroImage: '/src/assets/images/case_study_lumina_ai_1792914299591.jpg',
    galleryImages: [
      '/src/assets/images/case_study_lumina_ai_1792914299591.jpg',
      '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
    ],
    summary:
      'How KINETIX orchestrated the global launch of Lumina One, achieving 310% pre-order allocation in 30 days and generating $14.2M in enterprise pipeline.',
    challenge:
      'Lumina developed an extraordinary ambient computing device combining local on-device neural processing with tactile volcanic basalt aesthetics. However, their existing prototype website resembled a generic academic paper, failing to convey the physical luxury of the hardware and losing prospective enterprise partners.',
    strategy:
      'We established a museum-grade digital presentation centered on materiality, acoustic presence, and enterprise utility. Through studio macro photography, fluid 60fps interactive breakdowns, and an executive concierge reservation workflow, we positioned Lumina as the definitive computing object of the next decade.',
    solution:
      'Engineered an interactive product showcase featuring fluid component explosion controls, interactive latency simulation, and a headless CMS backend for instant press kit delivery. Paired with a targeted LinkedIn ABM campaign to Fortune 500 innovation leaders.',
    metrics: [
      { metric: '+310%', label: 'Pre-Order Over-Subscription', context: 'Exceeded initial production run within 30 days' },
      { metric: '$14.2M', label: 'Enterprise Pipeline Value', context: 'Generated across 44 qualified Fortune 500 pilots' },
      { metric: '4m 12s', label: 'Average Session Dwell Time', context: '3.8x higher than industry median for tech drops' },
    ],
    testimonial: {
      quote:
        'KINETIX did not just build our website; they defined our brand soul. The launch exceeded our highest expectations and made Lumina the standard in ambient computing.',
      author: 'David Sterling',
      role: 'VP of Marketing & Communications',
      company: 'Lumina Technologies',
    },
    relatedServices: ['brand-identity-creative', 'interactive-web-experience', 'growth-performance-marketing'],
    featured: true,
    published: true,
  },
  {
    id: 'cs-2',
    slug: 'arc-mobility',
    title: 'Arc Mobility: Reimagining Electric Supercar Performance',
    client: 'Arc Dynamics Automotive',
    industry: 'Electric Vehicles & High-Performance Engineering',
    category: 'Digital Flagship & Brand Architecture',
    year: '2026',
    heroImage: '/src/assets/images/case_study_arc_mobility_1792914299720.jpg',
    galleryImages: [
      '/src/assets/images/case_study_arc_mobility_1792914299720.jpg',
      '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
    ],
    summary:
      'Designing an ultra-modern digital cockpit preview and reservation system that secured 82,000 verified track-day inquiries and international acclaim.',
    challenge:
      'Electric supercars are often viewed as sterile compared to combustion heritage. Arc Dynamics needed a digital presence that captured the raw visceral adrenaline, carbon-fiber craftsmanship, and telemetry precision of their 1,400hp hypercar platform.',
    strategy:
      'We built a high-octane editorial experience emphasizing aerodynamic airflow simulations, tactile forged carbon textures, and an interactive cockpit simulator allowing buyers to customize track telemetry modes in real-time.',
    solution:
      'Created a responsive web app with hardware-accelerated animations, telemetry HUD interactions, localized currency conversion, and an encrypted deposit reservation system connected directly to their private dealership network.',
    metrics: [
      { metric: '82,000+', label: 'Verified Global Inquiries', context: 'Acquired across 32 countries during launch week' },
      { metric: '+180%', label: 'Engagement Dwell Time', context: 'Average user completed 4.2 custom vehicle configurations' },
      { metric: '100%', label: 'Initial Production Run Sold Out', context: 'All 250 founding allocations claimed in 48 hours' },
    ],
    testimonial: {
      quote:
        'The telemetry interface and digital craftsmanship KINETIX delivered set a new benchmark for luxury automotive retail. Our private client waitlist has never been stronger.',
      author: 'Vanessa Kovic',
      role: 'Chief Commercial Officer',
      company: 'Arc Dynamics Automotive',
    },
    relatedServices: ['interactive-web-experience', 'brand-identity-creative'],
    featured: true,
    published: true,
  },
  {
    id: 'cs-3',
    slug: 'kanso-audio',
    title: 'Kanso Audio: Analog Soul Meets Digital Precision',
    client: 'Kanso Acoustic Labs',
    industry: 'High-End Consumer Electronics & Audio',
    category: 'E-Commerce & CRO Transformation',
    year: '2025',
    heroImage: '/src/assets/images/case_study_kanso_audio_1792914301454.jpg',
    galleryImages: [
      '/src/assets/images/case_study_kanso_audio_1792914301454.jpg',
      '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
    ],
    summary:
      'A comprehensive direct-to-consumer digital transformation yielding +245% revenue growth and a 38% reduction in customer acquisition cost.',
    challenge:
      'Kanso produced studio-grade audiophile headphones valued at $1,200+, but their generic third-party e-commerce template suffered from a 78% cart abandonment rate and failed to justify the price premium over mainstream competitors.',
    strategy:
      'We replaced commodity product pages with an acoustic journey: lossless interactive frequency response curves, tactile exploded component diagrams, and an unhurried, editorial checkout flow that treats sound like fine art.',
    solution:
      'Engineered a custom headless storefront with instant page transitions, interactive sound profile comparison, and personalized engraving preview with instant checkout.',
    metrics: [
      { metric: '+245%', label: 'Direct Digital Revenue Growth', context: 'Measured across the first four quarters post-launch' },
      { metric: '-38%', label: 'Customer Acquisition Cost', context: 'Driven by organic editorial referrals and word-of-mouth' },
      { metric: '4.8 / 5', label: 'Average Verified Review', context: 'Over 2,100 verified customer reviews' },
    ],
    testimonial: {
      quote:
        'KINETIX transformed our digital presence from a standard online shop into an audiophile sanctuary. Our conversion rate tripled in sixty days.',
      author: 'Kenji Takahashi',
      role: 'Co-Founder & CEO',
      company: 'Kanso Acoustic Labs',
    },
    relatedServices: ['brand-identity-creative', 'conversion-rate-optimization', 'interactive-web-experience'],
    featured: true,
    published: true,
  },
  {
    id: 'cs-4',
    slug: 'zenith-enterprise',
    title: 'Zenith Capital: Institutional Platform for Alternative Assets',
    client: 'Zenith Alternative Investments',
    industry: 'Institutional Fintech & Capital Markets',
    category: 'Enterprise Platform & Growth Engine',
    year: '2025',
    heroImage: '/src/assets/images/case_study_zenith_fintech_1792914300754.jpg',
    galleryImages: [
      '/src/assets/images/case_study_zenith_fintech_1792914300754.jpg',
      '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
    ],
    summary:
      'Architecting an authoritative institutional capital platform that facilitated $4.2B in alternative asset onboarding and accelerated LP allocations.',
    challenge:
      'Managing private equity and real-estate funds required balancing strict regulatory compliance and sophisticated investor security with an intuitive, modern onboarding flow for family offices and institutional endowments.',
    strategy:
      'Designed a secure, discrete portal interface featuring real-time fund performance calculators, gated data rooms, and automated KYC/AML verification workflows.',
    solution:
      'Full-stack platform built with strict role-based access, encrypted document vaults, automated investor accreditation checks, and automated reporting generation.',
    metrics: [
      { metric: '$4.2B', label: 'Institutional Assets Onboarded', context: 'Processed through the digital investor portal' },
      { metric: '52%', label: 'Faster LP Allocation Velocity', context: 'Reduced average investor close time from 48 to 23 days' },
      { metric: '100%', label: 'SOC2 Type II Compliance', context: 'Zero security findings during independent audit' },
    ],
    testimonial: {
      quote:
        'Our LP network commented on how effortless and prestigious the portal felt. KINETIX delivered institutional-grade rigor with world-class design taste.',
      author: 'Rachel Vance',
      role: 'Managing Director',
      company: 'Zenith Alternative Investments',
    },
    relatedServices: ['enterprise-cms-architecture', 'growth-performance-marketing'],
    featured: false,
    published: true,
  },
];

export const INITIAL_BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'post-1',
    slug: 'the-death-of-generic-saas-marketing',
    title: 'Why Commodity Websites Lose Deals: The Rise of High-Fidelity Editorial Web Platforms',
    excerpt:
      'When every competitor uses the exact same rounded cards, purple gradients, and generic claims, aesthetic distinction becomes your sharpest commercial weapon.',
    content: `For the past five years, B2B software websites have converged toward an indistinguishable monoculture: interchangeable hero headers, generic pill-shaped badges, animated floating charts, and predictable three-column feature cards.

To a discerning enterprise buyer evaluating eight different solutions, this visual sameness sends an unintended signal: *commodity product, lack of taste, replaceable vendor*.

### The Economic Cost of Visual Clutter

When a visitor lands on a website, cognitive categorization happens within 50 milliseconds. If your digital presence looks identical to a low-cost weekend template, you immediately forfeit pricing power. You enter the sales cycle as an undifferentiated utility rather than an indispensable strategic partner.

Category leaders understand a simple law of positioning: **how you communicate your product is the ultimate proxy for how rigorously you engineered it**.

### The Three Pillars of Editorial Web Architecture

1. **Spatial Restraint & Typographic Math**: Replace cluttered card-within-card containers with generous whitespace margins and disciplined typography scales. Let the copy breathe.
2. **Authentic Proof Adjacency**: Stop isolating testimonials on a lonely slider at the bottom of the page. Anchor verified metrics and client quotes directly adjacent to the specific capability claims they substantiate.
3. **Hardware-Accelerated Fluidity**: Respect the user's attention. Transitions should settle within 200 milliseconds without layout thrashing or long intro blocking screens.

By building digital flagships that feel more like architectural broadsheets and less like generic dashboard templates, brands transform casual browsing into urgent, high-intent discovery.`,
    author: {
      name: 'Elena Rostova',
      role: 'Executive Creative Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    },
    category: 'Strategy & Brand',
    tags: ['Brand Identity', 'Editorial Design', 'Conversion'],
    readTime: '6 min read',
    publishedAt: 'Oct 18, 2026',
    coverImage: '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
    featured: true,
    published: true,
  },
  {
    id: 'post-2',
    slug: 'mastering-modern-cro-principles',
    title: 'Scientific Conversion Rate Optimization: 12 Structural Experiments That Moved The Needle',
    excerpt:
      'How we achieved double-digit conversion gains for enterprise clients by systematically dismantling cognitive friction and micro-commitment barriers.',
    content: `Conversion Rate Optimization is often reduced to superficial button-color tests. Real, sustainable CRO, however, is the disciplined application of cognitive psychology and information hierarchy.

Across our recent client engagements in high-growth B2B SaaS and hardware drops, we ran over 80 controlled A/B experiments. Here are the core structural patterns that generated statistically significant pipeline lifts.

### 1. The Single-Line Action Contract
When CTA labels are ambiguous (e.g., "Submit" or "Get Started"), user anxiety spikes. Replacing generic verbs with concrete, transparent outcomes ("Schedule 30-Min Strategy Call" or "Download 2026 Benchmark PDF") consistently reduced abandonment by 24% across top-of-funnel landing pages.

### 2. Eliminating Pill Clutter Around Forms
When input fields are surrounded by noisy promotional badges, users perceive the interaction as sales-heavy and intimidating. We stripped decorative status dots and floating pills, introducing a clean two-column split with clear expectation bullet points on the left. The result was a 31% increase in form completion rates.

### 3. Immediate Time-Slot Availability
Rather than forcing enterprise buyers to submit a form and wait 24 hours for a sales rep email, offering instant calendar slot selection immediately after qualifying questions improved meeting hold rates by 48%.`,
    author: {
      name: 'Dr. Ananya Chen',
      role: 'Head of CRO & Data Science',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
    },
    category: 'Conversion Optimization',
    tags: ['CRO', 'Experimentation', 'Analytics'],
    readTime: '8 min read',
    publishedAt: 'Oct 12, 2026',
    coverImage: '/src/assets/images/case_study_lumina_ai_1792914299591.jpg',
    featured: false,
    published: true,
  },
  {
    id: 'post-3',
    slug: 'headless-cms-orchestration-2026',
    title: 'The 2026 Content Architecture: Composable Workflows for Rapid GTM Teams',
    excerpt:
      'Why modern marketing teams require real-time content autonomy without compromising engineering code quality or site performance.',
    content: `The historic tension between engineering and marketing is familiar to every technology company: marketers want to launch new landing pages and campaign variants immediately, while engineers want strict type safety, zero technical debt, and spotless Lighthouse scores.

Headless CMS architecture bridges this divide when implemented with disciplined content domain modeling.

### Core Architecture Guidelines
- **Strict Content Schemas**: Do not allow unstructured HTML blobs. Define discrete fields for headlines, kickers, deliverables, and metrics.
- **Relational Integrity**: Case studies should link to services, and authors should link to articles, preventing broken references across views.
- **In-App Persistent Governance**: Provide marketing custodians with a simple, validated editing interface while persisting updates securely.`,
    author: {
      name: 'Soren Lindqvist',
      role: 'Technical Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    },
    category: 'Engineering & CMS',
    tags: ['Headless CMS', 'Architecture', 'TypeScript'],
    readTime: '5 min read',
    publishedAt: 'Sep 29, 2026',
    coverImage: '/src/assets/images/case_study_zenith_fintech_1792914300754.jpg',
    featured: false,
    published: true,
  },
  {
    id: 'post-4',
    slug: 'motion-design-that-drives-revenue',
    title: 'Motion With Intent: How Micro-Interactions Boost Conversion Rates Without Latency',
    excerpt:
      'Animation should clarify spatial hierarchy and reward user interaction—never slow down task completion or trigger cognitive fatigue.',
    content: `When animation is treated as visual decoration, it harms performance and irritates users. But when engineered with purpose, motion is a powerful conversion catalyst.

### The 200ms Latency Budget
Human perception registers interactions taking longer than 200 milliseconds as sluggish. All hover states, active transitions, and drawer openings should conclude within this window using natural exponential deceleration curves.

### Compositor-Only Rules
Animate exclusively \`transform\` and \`opacity\`. Never animate geometry properties such as \`width\`, \`height\`, or \`margin\` during scroll or hover, which forces expensive browser reflows.`,
    author: {
      name: 'Marcus Thorne',
      role: 'Partner & Head of Growth',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    },
    category: 'Design & Motion',
    tags: ['Motion', 'UX', 'Performance'],
    readTime: '7 min read',
    publishedAt: 'Sep 15, 2026',
    coverImage: '/src/assets/images/case_study_arc_mobility_1792914299720.jpg',
    featured: false,
    published: true,
  },
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    slug: '2026-b2b-conversion-benchmark',
    title: 'The 2026 B2B Marketing Conversion Benchmark Report',
    type: 'Benchmark Report',
    category: 'Analytics & Growth',
    description:
      'Granular benchmark data analyzed across 140+ high-growth tech ventures. Contains conversion rates by channel, ACV cohort, and sales cycle duration.',
    pagesOrSize: '42 Pages · Comprehensive Research PDF',
    coverImage: '/src/assets/images/hero_marketing_studio_1792914299810.jpg',
    keyTakeaways: [
      'Median demo-to-close conversion rates broken down by ARR tier ($1M-$10M vs $10M-$50M).',
      'The direct impact of page load latency on enterprise demo hold rates.',
      'Comparison of multi-touch attribution models versus self-reported lead source data.',
      'Key recommendations for cutting CAC while preserving enterprise lead quality.',
    ],
    downloadFileName: 'kinetix-2026-b2b-conversion-benchmark.pdf',
    featured: true,
    published: true,
  },
  {
    id: 'res-2',
    slug: 'high-converting-landing-page-blueprint',
    title: 'High-Converting Landing Page Design Architecture Checklist',
    type: 'Checklist',
    category: 'Design & CRO',
    description:
      'A battle-tested 36-point inspection rubric covering headline math, claim-to-proof adjacency, form micro-commitments, and mobile ergonomics.',
    pagesOrSize: 'Interactive Spreadsheet & PDF Guide',
    coverImage: '/src/assets/images/case_study_lumina_ai_1792914299591.jpg',
    keyTakeaways: [
      'Strict top-bar contract requirements to eliminate navigation leakage.',
      'Form field friction audit: identifying high-drop-off request fields.',
      'Accessible focus state and contrast verification protocols.',
      'Compositor animation rules ensuring sub-100ms interaction feedback.',
    ],
    downloadFileName: 'kinetix-landing-page-design-blueprint.pdf',
    featured: true,
    published: true,
  },
  {
    id: 'res-3',
    slug: 'enterprise-cms-migration-playbook',
    title: 'Enterprise Headless CMS Migration & SEO Safeguard Playbook',
    type: 'Playbook',
    category: 'Engineering',
    description:
      'Step-by-step technical methodology for migrating legacy monolithic websites to composable headless CMS platforms without losing search rankings.',
    pagesOrSize: '28 Pages · Technical Architecture Guide',
    coverImage: '/src/assets/images/case_study_zenith_fintech_1792914300754.jpg',
    keyTakeaways: [
      'Comprehensive 301 redirect mapping and canonical URL integrity safeguards.',
      'Schema markup generation for dynamic CMS collections.',
      'Draft vs published content isolation to protect staging workflows.',
      'Optimized image caching and responsive CDN distribution.',
    ],
    downloadFileName: 'kinetix-headless-cms-migration-playbook.pdf',
    featured: false,
    published: true,
  },
];

export const INITIAL_TEAM: TeamMemberItem[] = [
  {
    id: 'team-1',
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Founding Partner & Executive Creative Director',
    department: 'Creative & Brand',
    bio: 'Former Design Director at Pentagram and Apple. Elena leads brand architecture and visual systems, bringing 14 years of award-winning digital craftsmanship to category-defining ventures.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=500&q=80',
    linkedin: 'https://linkedin.com/in/elena-rostova-creative',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'team-2',
    slug: 'marcus-thorne',
    name: 'Marcus Thorne',
    role: 'Partner & Head of Growth Marketing',
    department: 'Growth & Strategy',
    bio: 'Previously scaled demand generation at Stripe and Figma. Marcus architects full-funnel acquisition, paid media strategy, and pipeline acceleration for high-growth tech enterprises.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80',
    linkedin: 'https://linkedin.com/in/marcus-thorne-growth',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'team-3',
    slug: 'soren-lindqvist',
    name: 'Soren Lindqvist',
    role: 'Technical Director & Motion Architect',
    department: 'Engineering',
    bio: 'Specialist in hardware-accelerated web graphics and headless CMS platforms. Soren oversees frontend engineering, web accessibility, and sub-100ms interaction architecture.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=80',
    linkedin: 'https://linkedin.com/in/soren-lindqvist-tech',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'team-4',
    slug: 'ananya-chen',
    name: 'Dr. Ananya Chen',
    role: 'Head of CRO & Behavioral Data Science',
    department: 'Data & Optimization',
    bio: 'PhD in Cognitive Ergonomics from Stanford. Ananya leads our quantitative testing laboratory, applying statistical significance modeling to user funnels and high-stakes conversion flows.',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=500&q=80',
    linkedin: 'https://linkedin.com/in/ananya-chen-cro',
    displayOrder: 4,
    published: true,
  },
  {
    id: 'team-5',
    slug: 'gabriel-vance',
    name: 'Gabriel Vance',
    role: 'Principal Brand Strategist',
    department: 'Strategy & Brand',
    bio: 'Veteran brand positioning strategist who has guided positioning for 30+ Series B through IPO technology ventures and heritage European luxury manufacturers.',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80',
    linkedin: 'https://linkedin.com/in/gabriel-vance-strategy',
    displayOrder: 5,
    published: true,
  },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      'KINETIX did not just redesign our website; they re-architected how the market perceives our technology. The launch drove 310% pre-orders and established us as the clear category benchmark.',
    author: 'David Sterling',
    role: 'VP of Marketing',
    company: 'Lumina Technologies',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    metricHighlight: '+310% Pre-Orders in 30 Days',
    featured: true,
    published: true,
  },
  {
    id: 'test-2',
    quote:
      'The digital telemetry and interactive cockpit simulator KINETIX delivered set a new standard for hypercar luxury. We closed all 250 founding allocations within 48 hours.',
    author: 'Vanessa Kovic',
    role: 'Chief Commercial Officer',
    company: 'Arc Dynamics Automotive',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    metricHighlight: '82,000+ Track Reservations',
    featured: true,
    published: true,
  },
  {
    id: 'test-3',
    quote:
      'Working with KINETIX transformed our direct-to-consumer economics. Our conversion rate tripled, customer acquisition costs plummeted 38%, and our product story finally matches the precision of our acoustics.',
    author: 'Kenji Takahashi',
    role: 'Co-Founder & CEO',
    company: 'Kanso Acoustic Labs',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    metricHighlight: '+245% D2C Revenue Growth',
    featured: true,
    published: true,
  },
  {
    id: 'test-4',
    quote:
      'In institutional alternative assets, trust is everything. The investor portal and authoritative positioning created by KINETIX allowed us to onboard $4.2B with zero friction.',
    author: 'Rachel Vance',
    role: 'Managing Director',
    company: 'Zenith Capital Investments',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    metricHighlight: '$4.2B Institutional Assets',
    featured: true,
    published: true,
  },
  {
    id: 'test-5',
    quote:
      'The speed and polish KINETIX brings is unmatched. Their headless CMS architecture liberated our marketing team to deploy localized campaigns in minutes rather than weeks.',
    author: 'Liam Gallagher',
    role: 'Chief Marketing Officer',
    company: 'Omnia Cloud Platform',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
    metricHighlight: '4x GTM Campaign Velocity',
    featured: false,
    published: true,
  },
];

export const INITIAL_PRICING: PricingPlanItem[] = [
  {
    id: 'price-1',
    name: 'Foundation Sprint',
    tier: 'Growth Ventures',
    monthlyPrice: 7500,
    annualPrice: 6200,
    description:
      'Ideal for Seed to Series A startups seeking an authoritative, high-converting digital flagship and core brand foundation.',
    features: [
      'Comprehensive Brand Style Tokens & Figma System',
      'High-Impact 6-Page Core Marketing Website',
      'Sub-100ms Responsive Interaction Polish',
      'Headless CMS Setup with Editor Onboarding',
      'Full SEO Technical Optimization & Metadata',
      'Lead Capture Form & Analytics Setup',
    ],
    notIncluded: ['Dedicated Monthly CRO Sprints', 'Custom 3D / WebGL Shaders', 'Multi-Region Localization'],
    ctaLabel: 'Book Strategy Sprint',
    popular: false,
    published: true,
    displayOrder: 1,
  },
  {
    id: 'price-2',
    name: 'Scale Engine',
    tier: 'Series B+ & Category Leaders',
    monthlyPrice: 14500,
    annualPrice: 12000,
    description:
      'Our flagship partnership combining bespoke web architecture, full CMS editorial autonomy, and ongoing conversion optimization.',
    features: [
      'Complete Multi-Page Digital Flagship (12+ Custom Views)',
      'Bespoke Motion Design & Interactive Hardware/Software Previews',
      'Full Headless CMS Architecture with Custom Schemas',
      'Bi-Weekly Scientific CRO Sprints & A/B Experimentation',
      'Paid Acquisition Ad Creative Suite & Landing Page Variations',
      'CRM & Revenue Operations Automation (HubSpot / Salesforce)',
      'Guaranteed 48-Hour Engineering Turnaround SLA',
    ],
    ctaLabel: 'Start Scale Partnership',
    popular: true,
    published: true,
    displayOrder: 2,
  },
  {
    id: 'price-3',
    name: 'Enterprise Studio',
    tier: 'Global Corporations & Luxury Houses',
    monthlyPrice: 28000,
    annualPrice: 23500,
    description:
      'Dedicated embedded creative, engineering, and performance studio delivering category-defining experiences across global markets.',
    features: [
      'Dedicated Senior Team (Design Director, Tech Lead, CRO Scientist)',
      'Unlimited High-Fidelity Page Architecture & Campaign Drops',
      'Multi-Language & Multi-Currency Global CDN Infrastructure',
      'Enterprise SSO & Role-Based Access Control (RBAC)',
      'Custom 3D Product Configurator & Spatial Simulators',
      'Weekly Executive Pipeline & Attribution Reviews',
      'Direct Slack Connect Channel with 1-Hour SLA',
    ],
    ctaLabel: 'Inquire for Enterprise',
    popular: false,
    published: true,
    displayOrder: 3,
  },
];

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does an engagement with KINETIX typically begin?',
    answer:
      'Every project starts with an Executive Discovery Sprint: a 5-day deep dive into your product economics, competitive positioning, and target buyer psyche. We deliver a concrete Brand & Conversion Blueprint with wireframes, spatial mathematics, and quantitative milestones before writing a single line of code.',
    category: 'Strategy',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'faq-2',
    question: 'What technology stack do you build our marketing website on?',
    answer:
      'We engineer production websites on React, TypeScript, and modern headless architecture. We avoid bloated generic WordPress themes or slow drag-and-drop builders. The result is instant sub-100ms page transitions, perfect 95+ Core Web Vitals, and seamless headless CMS editorial control.',
    category: 'Engineering',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'faq-3',
    question: 'Can our internal marketing team edit content without developers?',
    answer:
      'Yes, 100%. Every page, service, case study, blog article, and pricing tier is connected to a visual headless CMS. Your marketing team can publish new blog posts, adjust pricing figures, launch case studies, and update hero copy with live preview in seconds.',
    category: 'CMS & Tech',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'faq-4',
    question: 'How long does a full website redesign and build take?',
    answer:
      'Our Foundation Sprint typically delivers a complete, production-ready marketing website in 4 to 6 weeks. Full Scale Engine partnerships with extensive interactive 3D elements, custom CMS schemas, and multi-page sitemaps take 6 to 8 weeks.',
    category: 'Pricing',
    displayOrder: 4,
    published: true,
  },
  {
    id: 'faq-5',
    question: 'Do you offer ongoing retainer support after launch?',
    answer:
      'Yes. Over 80% of our clients transition into ongoing Scale or Optimization retainers where our team executes bi-weekly CRO testing, designs paid acquisition creatives, and builds targeted landing pages as your product evolves.',
    category: 'Pricing',
    displayOrder: 5,
    published: true,
  },
  {
    id: 'faq-6',
    question: 'How do you measure and verify success metrics?',
    answer:
      'We do not celebrate vanity metrics like impressions. We instrument clean attribution pipelines directly into your CRM (HubSpot, Salesforce) to track verified Demo Requests, Inbound Pipeline Dollar Value, and Customer Acquisition Cost (CAC) reduction.',
    category: 'Strategy',
    displayOrder: 6,
    published: true,
  },
];

export const INITIAL_CAREERS: CareerItem[] = [
  {
    id: 'job-1',
    slug: 'senior-creative-technologist',
    title: 'Senior Creative Technologist & Motion Lead',
    department: 'Engineering & Creative',
    location: 'Zurich, Switzerland · Hybrid or Remote (EU/US)',
    employmentType: 'Full-time',
    description:
      'Lead the engineering of hardware-accelerated micro-interactions, editorial grid choreography, and fluid web experiences for category-defining brands.',
    responsibilities: [
      'Architect sub-100ms compositor animation systems using Motion and WebGL.',
      'Bridge the gap between high-fidelity Figma prototypes and clean production TypeScript code.',
      'Establish technical performance benchmarks and guarantee 95+ Core Web Vitals on all client flagships.',
      'Mentor frontend engineers in spatial mathematics and responsive layout integrity.',
    ],
    qualifications: [
      '5+ years engineering high-end interactive websites or award-winning agency digital platforms.',
      'Deep mastery of React, TypeScript, Tailwind CSS, and compositor animation principles.',
      'Obsessive eye for typography, spatial balance, and anti-slop design discipline.',
      'Comfortable communicating directly with client executives and product founders.',
    ],
    salaryRange: '$160,000 - $210,000 + Equity & Performance Bonus',
    status: 'Open',
    published: true,
  },
  {
    id: 'job-2',
    slug: 'principal-brand-designer',
    title: 'Principal Brand & Visual Identity Designer',
    department: 'Design & Brand',
    location: 'San Francisco, CA · Hybrid or Remote (US/EU)',
    employmentType: 'Full-time',
    description:
      'Craft unmistakable brand identities, editorial design systems, and positioning narratives for next-generation AI, robotics, and luxury enterprises.',
    responsibilities: [
      'Lead end-to-end brand identity discovery, conceptualization, and comprehensive design system documentation.',
      'Develop bespoke typography hierarchies, spatial grids, and art direction guidelines.',
      'Collaborate closely with copywriters and motion designers to translate technical IP into cultural authority.',
      'Present strategic creative directions to client leadership with clarity and commercial conviction.',
    ],
    qualifications: [
      'Proven portfolio showcasing world-class brand identities and editorial design systems.',
      'Deep typography knowledge with zero reliance on generic AI clichés or overused templates.',
      'Mastery of Figma, typography curation, and print-to-digital translation.',
      'Experience in high-growth B2B tech, industrial hardware, or luxury consumer goods.',
    ],
    salaryRange: '$150,000 - $195,000 + Equity & Annual Bonus',
    status: 'Open',
    published: true,
  },
  {
    id: 'job-3',
    slug: 'growth-director-b2b',
    title: 'Growth Marketing Director (B2B Tech & Enterprise)',
    department: 'Growth & Performance',
    location: 'New York, NY · Hybrid or Remote (US)',
    employmentType: 'Full-time',
    description:
      'Lead data-driven acquisition engines, paid media channels, and conversion rate optimization sprints for our venture-backed client portfolio.',
    responsibilities: [
      'Manage multi-million dollar annual paid media budgets across Google Search, LinkedIn ABM, and programmatic channels.',
      'Partner with our CRO team to design and deploy continuous landing page experimentation roadmaps.',
      'Instrument clean multi-touch attribution and live executive pipeline reporting dashboards.',
      'Direct copywriters and motion designers on high-converting paid ad creative variations.',
    ],
    qualifications: [
      '6+ years driving enterprise demand generation or performance marketing in B2B SaaS or venture agencies.',
      'Proven track record scaling pipeline while cutting CAC by double digits.',
      'Fluency with Google Ads, LinkedIn Campaign Manager, HubSpot, and GA4 telemetry.',
      'Strong analytical mindset with deep statistical understanding of test significance.',
    ],
    salaryRange: '$170,000 - $220,000 + Performance Incentive',
    status: 'Open',
    published: true,
  },
];

export const INITIAL_SUBMISSIONS: LeadSubmission[] = [
  {
    id: 'sub-1',
    type: 'demo',
    name: 'Julian Montgomery',
    email: 'j.montgomery@auroracloud.io',
    company: 'Aurora Cloud Technologies',
    phone: '+1 (415) 555-0192',
    details: {
      annualRevenue: '$10M - $50M',
      timeline: 'Next 30 Days',
      selectedService: 'interactive-web-experience',
      notes: 'Looking to overhaul our Series B enterprise marketing site before Q1 2027.',
    },
    createdAt: '2026-10-24T18:22:00.000Z',
    status: 'New',
  },
  {
    id: 'sub-2',
    type: 'contact',
    name: 'Astrid Lindau',
    email: 'astrid@vanguard-robotics.de',
    company: 'Vanguard Industrial Robotics',
    phone: '+49 89 244 1209',
    details: {
      budget: '$25,000 - $50,000',
      message: 'Need a complete brand identity and interactive 3D product showcase for our new robotic arm line.',
    },
    createdAt: '2026-10-23T11:05:00.000Z',
    status: 'In Review',
  },
];
