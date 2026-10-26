import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard, ScrollReveal } from '../components/common/MotionComponents';

export const CustomersPage: React.FC = () => {
  const { testimonials, caseStudies } = useCms();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <SeoHead
        title="Customer Stories & Executive Testimonials"
        description="Verified testimonials and customer stories from founders, CMOs, and VPs of Marketing who partnered with KINETIX."
      />

      <Breadcrumbs items={[{ label: 'Customers' }]} />

      {/* Header */}
      <ScrollReveal className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Audited Client Trust
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          What Category Leaders Say About Partnering With Us
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Unvarnished commentary and quantifiable business results from the founders, CMOs, and product leaders who trust KINETIX with their most critical digital flagships.
        </p>
      </ScrollReveal>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((test, idx) => (
          <AnimatedCard
            key={test.id}
            delay={idx * 0.1}
            className="p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-4">
              <Quote className="w-8 h-8 text-amber-400/40" />
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed italic">
                "{test.quote}"
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={test.avatarUrl}
                  alt={test.author}
                  className="w-11 h-11 rounded-full object-cover border border-neutral-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-sm font-bold text-white">{test.author}</p>
                  <p className="text-xs text-neutral-400">
                    {test.role} · <strong className="text-neutral-300">{test.company}</strong>
                  </p>
                </div>
              </div>

              {test.metricHighlight && (
                <div className="text-right">
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded">
                    {test.metricHighlight}
                  </span>
                </div>
              )}
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Proof Banner */}
      <ScrollReveal className="p-8 sm:p-12 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Want to Inspect Full Case Studies?</h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          Read deep teardowns detailing challenges, tactical decisions, and before-and-after conversion comparisons.
        </p>
        <div className="pt-2">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors"
          >
            <span>Browse Case Study Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
};
