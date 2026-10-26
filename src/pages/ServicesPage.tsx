import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Sparkles, Database, TrendingUp, Cpu, Target } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard } from '../components/common/MotionComponents';

export const ServicesPage: React.FC = () => {
  const { services } = useCms();
  const [filter, setFilter] = useState<'all' | 'creative' | 'engineering' | 'growth'>('all');

  const filteredServices = services.filter((s) => {
    if (!s.published) return false;
    if (filter === 'creative') return s.slug.includes('brand') || s.slug.includes('creative');
    if (filter === 'engineering') return s.slug.includes('web') || s.slug.includes('cms');
    if (filter === 'growth') return s.slug.includes('growth') || s.slug.includes('conversion') || s.slug.includes('marketing');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="Services & Capabilities"
        description="Comprehensive capabilities across Brand Identity, Full-Stack Web Architecture, Headless CMS, CRO Funnels, and Performance Marketing."
      />

      <Breadcrumbs items={[{ label: 'Services' }]} />

      {/* Hero Header */}
      <div className="space-y-6 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Practice Areas
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Specialized Disciplines. Unified Execution.
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          We combine the strategic depth of a top-tier management consultancy with the design craft of an elite boutique atelier and the technical agility of a venture engineering team.
        </p>

        {/* Filter Controls (Allowed buttons with functional states) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Disciplines ({services.length})
          </button>
          <button
            onClick={() => setFilter('creative')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'creative'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Brand & Creative
          </button>
          <button
            onClick={() => setFilter('engineering')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'engineering'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Web & CMS Tech
          </button>
          <button
            onClick={() => setFilter('growth')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'growth'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Growth & CRO
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-8">
        {filteredServices.map((service, index) => (
          <AnimatedCard key={service.id} delay={index * 0.08}>
            <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group">
              {/* Left Column: Number, Title, Description */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                  <span className="text-amber-400">0{index + 1}.</span>
                  <span>{service.kicker}</span>
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  <Link to={`/services/${service.slug}`}>{service.title}</Link>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {service.shortDescription}
                </p>
                <div className="pt-2 flex items-center gap-6 text-xs text-neutral-400">
                  <div>
                    <span className="text-neutral-500">Starting at:</span>{' '}
                    <span className="font-semibold text-white">{service.startingPrice}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Sprint Timeline:</span>{' '}
                    <span className="font-semibold text-white">{service.timeline}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition-colors"
                  >
                    <span>Explore Practice Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Middle Column: Core Features */}
              <div className="lg:col-span-4 space-y-3 border-t lg:border-t-0 lg:border-l border-neutral-800 pt-6 lg:pt-0 lg:pl-8">
                <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                  Capabilities & Focus
                </h3>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            {/* Right Column: Key Deliverables */}
            <div className="lg:col-span-3 space-y-3 border-t lg:border-t-0 lg:border-l border-neutral-800 pt-6 lg:pt-0 lg:pl-8">
              <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                Production Deliverables
              </h3>
              <ul className="space-y-2 text-xs text-neutral-400">
                {service.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-600">→</span>
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedCard>
      ))}
      </div>

      {/* Bottom Consultation CTA */}
      <div className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Need a Multi-Discipline Scope?</h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            We routinely configure custom hybrid sprints combining brand strategy, headless CMS development, and dedicated CRO retainers.
          </p>
        </div>
        <Link
          to="/book-demo"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          Request Custom Proposal
        </Link>
      </div>
    </div>
  );
};
