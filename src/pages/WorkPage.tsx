import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Search } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard, ScrollReveal } from '../components/common/MotionComponents';

export const WorkPage: React.FC = () => {
  const { caseStudies } = useCms();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Hardware & AI', 'Electric Vehicles', 'Acoustic & Audio', 'Fintech & Capital'];

  const filteredCases = caseStudies.filter((c) => {
    if (!c.published) return false;
    if (categoryFilter !== 'All') {
      const match =
        c.industry.toLowerCase().includes(categoryFilter.toLowerCase().split(' ')[0]) ||
        c.category.toLowerCase().includes(categoryFilter.toLowerCase().split(' ')[0]);
      if (!match) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        c.title.toLowerCase().includes(q) ||
        c.client.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="Selected Work & Case Studies"
        description="Audited case studies from KINETIX: digital flagships, ambient computing launches, luxury automotive simulators, and institutional fintech platforms."
      />

      <Breadcrumbs items={[{ label: 'Work' }]} />

      {/* Hero Header */}
      <ScrollReveal className="space-y-6 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Portfolio of Impact
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Selected Client Case Studies
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Explore how we partner with category pioneers to engineer iconic digital flagships, seamless CMS platforms, and verifiable revenue engines.
        </p>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  categoryFilter === cat
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCases.map((cs, idx) => (
          <AnimatedCard
            key={cs.id}
            delay={(idx % 4) * 0.08}
            className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col justify-between group hover:border-neutral-700 transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden bg-neutral-950 relative">
              <img
                src={cs.heroImage}
                alt={cs.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 text-xs font-mono bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-neutral-300 border border-neutral-800">
                {cs.client} · {cs.year}
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-amber-400">{cs.category}</span>
                <h2 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  <Link to={`/work/${cs.slug}`}>{cs.title}</Link>
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {cs.summary}
                </p>

                {/* Primary Metric Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {cs.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                      <p className="text-lg font-bold text-amber-400 tabular-nums">{m.metric}</p>
                      <p className="text-[11px] text-neutral-300">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">{cs.industry}</span>
                <Link
                  to={`/work/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-amber-400 transition-colors"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="py-16 text-center text-neutral-500 text-sm">
          No case studies match your active filter. Try resetting search or category filters.
        </div>
      )}
    </div>
  );
};
