import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard, ScrollReveal } from '../components/common/MotionComponents';

export const SolutionsPage: React.FC = () => {
  const { solutions } = useCms();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="Industry Solutions"
        description="Tailored digital marketing, web architecture, and CRO playbooks designed for Enterprise SaaS, DeepTech AI ventures, and Luxury D2C brands."
      />

      <Breadcrumbs items={[{ label: 'Solutions' }]} />

      {/* Hero Header */}
      <ScrollReveal className="space-y-6 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Tailored Playbooks
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Industry-Specific Growth Architecture
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Different business models require fundamentally distinct funnel economics. We tailor positioning, web experiences, and acquisition engines to your specific category dynamics.
        </p>
      </ScrollReveal>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {solutions.map((sol, idx) => (
          <AnimatedCard
            key={sol.id}
            delay={idx * 0.1}
            className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col justify-between group hover:border-neutral-700 transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden bg-neutral-950 relative">
              <img
                src={sol.heroImage}
                alt={sol.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 text-xs font-mono bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-neutral-300 border border-neutral-800">
                {sol.industry}
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  <Link to={`/solutions/${sol.slug}`}>{sol.title}</Link>
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {sol.summary}
                </p>

                {/* Key Outcomes */}
                <div className="pt-2 border-t border-neutral-800/80 space-y-2">
                  <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                    Audited Impact Benchmarks
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {sol.outcomes.slice(0, 2).map((out, oIdx) => (
                      <div key={oIdx} className="p-2.5 rounded bg-neutral-950 border border-neutral-800/80">
                        <p className="text-base font-extrabold text-amber-400 tabular-nums">
                          {out.metric}
                        </p>
                        <p className="text-[10px] text-neutral-400 leading-tight">{out.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <Link
                  to={`/solutions/${sol.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors"
                >
                  <span>Explore Industry Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};
