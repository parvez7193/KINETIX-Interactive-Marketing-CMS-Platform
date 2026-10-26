import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Layers,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { SeoHead } from '../components/common/SeoHead';
import { ScrollReveal, AnimatedCard } from '../components/common/MotionComponents';

export const HomePage: React.FC = () => {
  const { settings, services, caseStudies, blogPosts, testimonials, faqs } = useCms();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const featuredServices = services.filter((s) => s.published).slice(0, 4);
  const featuredCases = caseStudies.filter((c) => c.published).slice(0, 3);
  const featuredPosts = blogPosts.filter((b) => b.published).slice(0, 3);
  const publishedFaqs = faqs.filter((f) => f.published).slice(0, 5);

  const clientLogos = [
    { name: 'Lumina Spatial AI', category: 'Ambient Hardware' },
    { name: 'Arc Dynamics', category: 'High-Performance EV' },
    { name: 'Kanso Acoustic Labs', category: 'Audiophile D2C' },
    { name: 'Zenith Capital', category: 'Alternative Assets' },
    { name: 'Omnia Enterprise', category: 'Cloud Infrastructure' },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      <SeoHead
        title="Interactive Marketing & Growth Studio"
        description="Crafting category-defining brand identities, high-converting interactive web platforms, and automated revenue engines for high-growth tech ventures."
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              <span>Digital Experience & Revenue Architecture</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Where Iconic Design Meets Scientific Conversion.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
              We design and engineer bespoke digital flagships, headless CMS platforms, and automated demand engines that position tech pioneers and luxury brands as indisputable category authorities.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/book-demo"
                className="px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-amber-400/10 hover:shadow-amber-400/20"
              >
                <span>Schedule Strategy Session</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/work"
                className="px-6 py-3.5 text-sm font-medium text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>Explore Selected Work</span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </Link>
            </div>

            {/* Credibility Micro-Signals */}
            <div className="pt-4 border-t border-neutral-900/80 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sub-100ms Compositor Motion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Integrated Headless CMS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Quantitative ROI</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Focal Carrier */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group aspect-[16/11]">
              <img
                src="/src/assets/images/hero_marketing_studio_1792914299810.jpg"
                alt="KINETIX Studio Architecture in Zurich"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Atelier Zurich & San Francisco</p>
                  <p className="text-[11px] text-neutral-400">Full-Stack Creative & Engineering Practice</p>
                </div>
                <Link
                  to="/about"
                  className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 rounded-lg text-xs transition-colors flex items-center"
                  aria-label="Learn about KINETIX"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLIENT RECOGNITION STRIP */}
      <ScrollReveal>
        <section className="border-y border-neutral-900 bg-neutral-950/50 py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest text-center mb-8">
              Trusted by Category Leaders & High-Growth Innovators
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center items-center">
              {clientLogos.map((client, i) => (
                <div key={i} className="p-3 rounded-lg border border-neutral-900/60 bg-neutral-900/30">
                  <p className="text-sm font-semibold text-neutral-200">{client.name}</p>
                  <p className="text-[11px] text-neutral-400">{client.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. CAPABILITIES / CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Strategic Disciplines
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                End-to-End Growth Architecture
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl">
                We bridge brand strategy, bespoke engineering, and revenue operations into one unified partner team.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors shrink-0"
            >
              <span>Explore All 6 Practice Areas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredServices.map((srv, index) => (
            <AnimatedCard key={srv.id} delay={index * 0.08} className="h-full">
              <div className="p-8 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span>0{index + 1}. {srv.kicker}</span>
                    <span className="text-amber-400 font-medium">Starts {srv.startingPrice}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {srv.shortDescription}
                  </p>
                  <div className="pt-2 space-y-1.5">
                    {srv.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <span className="text-amber-400 mt-0.5">·</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Timeline: {srv.timeline}</span>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-white group-hover:text-amber-400 transition-colors"
                  >
                    <span>View Practice Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* 4. SELECTED WORK & CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Proven Commercial Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Selected Client Case Studies
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl">
                Real projects delivered for pioneering ventures. Every metric is audited and substantiated by our client partners.
              </p>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors shrink-0"
            >
              <span>View Complete Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCases.map((cs, idx) => (
            <AnimatedCard key={cs.id} delay={idx * 0.1} className="h-full">
              <div className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col justify-between h-full group hover:border-neutral-700 transition-all">
                <div className="aspect-[4/3] relative overflow-hidden bg-neutral-950">
                  <img
                    src={cs.heroImage}
                    alt={cs.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 text-xs font-mono bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-neutral-300 border border-neutral-800">
                    {cs.industry}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>{cs.client}</span>
                      <span>{cs.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {cs.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {cs.summary}
                    </p>
                  </div>

                  {/* Primary Metric Callout */}
                  {cs.metrics[0] && (
                    <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80">
                      <p className="text-xl font-extrabold text-amber-400 tabular-nums">
                        {cs.metrics[0].metric}
                      </p>
                      <p className="text-[11px] text-neutral-300 font-medium">{cs.metrics[0].label}</p>
                    </div>
                  )}

                  <Link
                    to={`/work/${cs.slug}`}
                    className="inline-flex items-center justify-between text-xs font-semibold text-neutral-200 group-hover:text-white pt-2 border-t border-neutral-800/60"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* 5. VALUE PROPOSITION: THE KINETIX METHOD */}
      <section className="bg-neutral-900/50 border-y border-neutral-900 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                The KINETIX Differential
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Engineered Beyond Commodity Agency Work
              </h2>
              <p className="text-sm text-neutral-400">
                Why fast-growing companies replace bloated legacy agencies with our high-velocity team.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard delay={0.05} className="h-full">
              <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4 h-full">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Zero Template AI Slop</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We ban generic pill clusters, noisy gradients, and cookie-cutter templates. Every layout adheres to strict spatial mathematics, intentional typographic scales, and museum-grade visual restraint.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.12} className="h-full">
              <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4 h-full">
                <div className="w-10 h-10 rounded-lg bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Full CMS Editorial Autonomy</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Never wait 3 weeks for an agency to update a pricing number or publish a case study. Our headless CMS architecture gives your marketing team live editing freedom while maintaining bulletproof code.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.19} className="h-full">
              <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4 h-full">
                <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Attributed Commercial Growth</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We measure outcomes in pipeline value, conversion velocity, and qualified sales demos—never vanity social impressions. Every design decision is backed by behavioral data science.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Executive Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              What Category Leaders Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.slice(0, 2).map((test, idx) => (
            <AnimatedCard key={test.id} delay={idx * 0.1} className="h-full">
              <div className="p-8 rounded-xl bg-neutral-900/70 border border-neutral-800 flex flex-col justify-between space-y-6 h-full">
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic">
                  "{test.quote}"
                </p>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{test.author}</p>
                    <p className="text-xs text-neutral-400">
                      {test.role} · {test.company}
                    </p>
                  </div>
                  {test.metricHighlight && (
                    <span className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2.5 py-1 rounded">
                      {test.metricHighlight}
                    </span>
                  )}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* 7. FEATURED CMS ARTICLES & INSIGHTS */}
      <section className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Editorial & Research
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                The KINETIX Dispatch
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl">
                Rigorous perspectives on digital architecture, conversion funnels, and high-stakes positioning.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors shrink-0"
            >
              <span>Browse All Publications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post, idx) => (
            <AnimatedCard key={post.id} delay={idx * 0.08} className="h-full">
              <article className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-6 h-full group">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span>By {post.author.name}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    Read &rarr;
                  </Link>
                </div>
              </article>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Common Inquiries
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-400">
              Clear, transparent answers about our process, technology, and commercial terms.
            </p>
          </div>

          <div className="space-y-3">
            {publishedFaqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-neutral-800 rounded-xl bg-neutral-900/40 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/80 transition-colors"
                  >
                    <span className="text-sm font-semibold text-white">{faq.question}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-neutral-400 transition-transform ${
                        isOpen ? 'rotate-90 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/40 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-8">
            <Link
              to="/faq"
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Have a specialized inquiry? View full FAQ page &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 9. FINAL PERSUASIVE CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="p-10 sm:p-16 rounded-2xl bg-neutral-900 border border-neutral-800 relative overflow-hidden text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Q4 2026 Executive Client Engagements</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto text-balance">
              Ready to Outpace Your Category Competitors?
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Schedule a confidential 30-minute discovery session with our founding partners. We'll audit your current digital flagship and outline actionable CRO opportunities.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/book-demo"
                className="px-8 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all flex items-center gap-2"
              >
                <span>Schedule Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="px-6 py-3.5 text-sm font-medium text-neutral-200 hover:text-white bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
              >
                Review Pricing & Sprints
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
