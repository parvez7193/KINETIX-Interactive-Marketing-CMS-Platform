import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const SolutionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { solutions, services, caseStudies } = useCms();

  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Solution Playbook Not Found</h1>
        <p className="text-sm text-neutral-400">
          The requested industry playbook is not available in our published directory.
        </p>
        <Link
          to="/solutions"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-neutral-950 font-semibold text-xs rounded-lg mt-4"
        >
          <span>Return to All Solutions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  // Recommended Services
  const recServices = services.filter((srv) =>
    solution.recommendedServices.includes(srv.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <SeoHead
        title={solution.title}
        description={solution.summary}
      />

      <Breadcrumbs
        items={[
          { label: 'Solutions', href: '/solutions' },
          { label: solution.title },
        ]}
      />

      {/* Hero Header */}
      <section className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <span>{solution.industry}</span>
          <span>·</span>
          <span>Audited Playbook</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {solution.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          {solution.summary}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            to="/book-demo"
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
          >
            <span>Book Industry Discovery Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/work"
            className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-medium text-xs rounded-lg transition-colors"
          >
            Review Relevant Work
          </Link>
        </div>
      </section>

      {/* Hero Visual */}
      <section className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-[16/9]">
        <img
          src={solution.heroImage}
          alt={solution.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Pain Points vs Engineered Architecture */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Category Friction Points</span>
          </div>
          <h3 className="text-xl font-bold text-white">Where Most Brands Stall</h3>
          <ul className="space-y-4 text-xs text-neutral-300">
            {solution.painPoints.map((pain, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-red-400/80 font-bold shrink-0">✕</span>
                <span className="leading-relaxed">{pain}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>The KINETIX Architecture</span>
          </div>
          <h3 className="text-xl font-bold text-white">How We Solve It</h3>
          <ul className="space-y-4 text-xs text-neutral-300">
            {solution.capabilities.map((cap, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span className="leading-relaxed">{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Audited Outcomes Strip */}
      <section className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            Audited Milestones
          </span>
          <h3 className="text-2xl font-bold text-white">Target Impact Benchmarks</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {solution.outcomes.map((out, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
              <p className="text-3xl font-extrabold text-amber-400 tabular-nums">{out.metric}</p>
              <p className="text-xs text-neutral-300 font-medium">{out.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Practice Areas */}
      {recServices.length > 0 && (
        <section className="space-y-8">
          <h3 className="text-2xl font-bold text-white">
            Recommended Practice Areas For This Industry
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recServices.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <p className="text-xs font-mono text-amber-400">{srv.kicker}</p>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mt-1">
                    <Link to={`/services/${srv.slug}`}>{srv.title}</Link>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{srv.shortDescription}</p>
                </div>
                <Link
                  to={`/services/${srv.slug}`}
                  className="text-xs font-semibold text-neutral-200 group-hover:text-white inline-flex items-center gap-1"
                >
                  <span>Practice details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Conversion Section */}
      <section className="p-10 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Deploy The {solution.title} Playbook
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          Schedule a strategy call to evaluate your current funnel against these industry benchmarks.
        </p>
        <div className="pt-2">
          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors"
          >
            <span>Book Discovery Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
