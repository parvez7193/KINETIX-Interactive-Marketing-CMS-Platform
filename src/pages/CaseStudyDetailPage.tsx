import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Building, Calendar, Layers } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { caseStudies, services } = useCms();

  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Case Study Not Found</h1>
        <p className="text-sm text-neutral-400">
          The requested client engagement could not be found in our published portfolio.
        </p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-neutral-950 font-semibold text-xs rounded-lg mt-4"
        >
          <span>Return to All Work</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  // Related other case studies
  const otherStudies = caseStudies
    .filter((c) => c.published && c.id !== study.id)
    .slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <SeoHead
        title={`${study.title} — Case Study`}
        description={study.summary}
      />

      <Breadcrumbs
        items={[
          { label: 'Work', href: '/work' },
          { label: study.title },
        ]}
      />

      {/* Hero Header */}
      <section className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-bold">{study.client}</span>
          <span>·</span>
          <span>{study.industry}</span>
          <span>·</span>
          <span>{study.year}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {study.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          {study.summary}
        </p>
      </section>

      {/* Hero Visual */}
      <section className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-[16/9] sm:aspect-[21/9]">
        <img
          src={study.heroImage}
          alt={study.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Audited Impact Metrics Grid */}
      <section className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-8">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            Audited Commercial Impact
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">Verified Performance Outcomes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {study.metrics.map((m, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
              <p className="text-3xl font-extrabold text-amber-400 tabular-nums">{m.metric}</p>
              <p className="text-sm font-semibold text-white">{m.label}</p>
              <p className="text-xs text-neutral-400 leading-relaxed">{m.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative: Challenge, Strategy, Solution */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-12">
          {/* The Challenge */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              01. The Challenge
            </h3>
            <h4 className="text-2xl font-bold text-white tracking-tight">The Problem Space</h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {study.challenge}
            </p>
          </div>

          {/* The Strategy */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              02. The Strategy
            </h3>
            <h4 className="text-2xl font-bold text-white tracking-tight">Architectural Thesis</h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {study.strategy}
            </p>
          </div>

          {/* The Solution */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              03. The Implementation
            </h3>
            <h4 className="text-2xl font-bold text-white tracking-tight">Full-Stack Execution</h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {study.solution}
            </p>
          </div>
        </div>

        {/* Project Metadata Card */}
        <div className="lg:col-span-4 p-8 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-6">
          <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
            Engagement Specifications
          </h3>
          <div className="space-y-4 text-xs text-neutral-300">
            <div>
              <p className="text-neutral-500">Client Partner</p>
              <p className="font-semibold text-white">{study.client}</p>
            </div>
            <div>
              <p className="text-neutral-500">Industry Sector</p>
              <p className="font-semibold text-white">{study.industry}</p>
            </div>
            <div>
              <p className="text-neutral-500">Practice Disciplines</p>
              <p className="font-semibold text-white">{study.category}</p>
            </div>
            <div>
              <p className="text-neutral-500">Year Deployed</p>
              <p className="font-semibold text-white">{study.year}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <Link
              to="/book-demo"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Executive Testimonial Quote */}
      {study.testimonial && (
        <section className="p-8 sm:p-12 rounded-2xl bg-neutral-900/40 border border-neutral-800 max-w-4xl mx-auto text-center space-y-6">
          <p className="text-lg sm:text-xl text-neutral-200 italic leading-relaxed">
            "{study.testimonial.quote}"
          </p>
          <div>
            <p className="text-sm font-bold text-white">{study.testimonial.author}</p>
            <p className="text-xs text-neutral-400">
              {study.testimonial.role} · {study.testimonial.company}
            </p>
          </div>
        </section>
      )}

      {/* Related Projects */}
      <section className="space-y-8">
        <h3 className="text-2xl font-bold text-white">More Category Case Studies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherStudies.map((cs) => (
            <div
              key={cs.id}
              className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4 group"
            >
              <div>
                <p className="text-xs text-neutral-500 font-mono mb-1">{cs.client} · {cs.year}</p>
                <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  <Link to={`/work/${cs.slug}`}>{cs.title}</Link>
                </h4>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{cs.summary}</p>
              </div>
              <Link
                to={`/work/${cs.slug}`}
                className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 inline-flex items-center gap-1"
              >
                <span>Read case study</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
