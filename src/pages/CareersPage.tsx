import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase, DollarSign, CheckCircle2, ChevronRight } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard, ScrollReveal } from '../components/common/MotionComponents';

export const CareersPage: React.FC = () => {
  const { careers } = useCms();
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'Engineering & Creative', 'Design & Brand', 'Growth & Performance'];

  const filteredJobs = careers.filter((c) => {
    if (!c.published) return false;
    if (selectedDept !== 'All' && c.department !== selectedDept) return false;
    return true;
  });

  const perks = [
    {
      title: 'Full Remote & Studio Flexibility',
      description: 'Work from our Zurich or San Francisco ateliers, or fully remote across compatible time zones.',
    },
    {
      title: 'Competitive Compensation & Equity',
      description: 'Top-of-market base salaries, annual performance bonuses, and equity allocation for all senior team members.',
    },
    {
      title: 'Premium Hardware & Workspace Stipend',
      description: 'Top-spec Apple Silicon hardware, 5K Studio Displays, and a $2,500 home studio setup allowance.',
    },
    {
      title: 'Continuous Learning & Research Budget',
      description: '$4,000 annual education grant for design conferences, developer certifications, and books.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <SeoHead
        title="Careers & Open Roles"
        description="Join KINETIX: explore open roles in creative technology, brand identity design, and enterprise growth marketing."
      />

      <Breadcrumbs items={[{ label: 'Careers' }]} />

      {/* Header */}
      <ScrollReveal className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Join The Practice
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Where Craft and Ambition Converge
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          We are a tight-knit collective of senior designers, engineers, and growth scientists. We keep our team intentionally small, pay at the top of the market, and work exclusively on category-defining client flagships.
        </p>
      </ScrollReveal>

      {/* Perks Grid */}
      <section className="space-y-8">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-white">How We Operate & Support Our Team</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {perks.map((perk, idx) => (
            <AnimatedCard
              key={idx}
              delay={idx * 0.08}
              className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2"
            >
              <h3 className="text-base font-bold text-white">{perk.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{perk.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="space-y-8">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Current Openings
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white mt-1">
              Active Positions
            </h2>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedDept === dept
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {filteredJobs.map((job, idx) => (
            <AnimatedCard
              key={job.id}
              delay={idx * 0.08}
              className="p-6 sm:p-8 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
                  <span className="text-amber-400">{job.department}</span>
                  <span aria-hidden="true">·</span>
                  <span>{job.employmentType}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  <Link to={`/careers/${job.slug}`}>{job.title}</Link>
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-neutral-500" />
                    {job.salaryRange}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  to={`/careers/${job.slug}`}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Review Role & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </AnimatedCard>
          ))}

          {filteredJobs.length === 0 && (
            <div className="py-12 text-center text-neutral-500 text-sm">
              No open roles found in this department. We welcome unsolicited portfolios at{' '}
              <a href="mailto:careers@kinetix.studio" className="text-amber-400 underline">
                careers@kinetix.studio
              </a>
              .
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
