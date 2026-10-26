import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, HelpCircle, Layers } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, caseStudies, faqs } = useCms();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Service Not Found</h1>
        <p className="text-sm text-neutral-400">
          The requested service practice could not be located in our active directory.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-neutral-950 font-semibold text-xs rounded-lg mt-4"
        >
          <span>Return to All Services</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  // Related Case Studies
  const relatedCases = caseStudies.filter(
    (c) => c.published && (c.relatedServices.includes(service.slug) || c.relatedServices.includes(service.id))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <SeoHead
        title={service.title}
        description={service.shortDescription}
      />

      <Breadcrumbs
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* Hero Header */}
      <section className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-bold">{service.kicker}</span>
          <span>·</span>
          <span>Starting at {service.startingPrice}</span>
          <span>·</span>
          <span>{service.timeline}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {service.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          {service.shortDescription}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            to="/book-demo"
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
          >
            <span>Book Scope Discovery Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/pricing"
            className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-medium text-xs rounded-lg transition-colors"
          >
            Review Sprint Pricing
          </Link>
        </div>
      </section>

      {/* Hero Visual */}
      <section className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-[16/9] sm:aspect-[21/9]">
        <img
          src={service.heroImage}
          alt={service.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Detailed Narrative & Core Focus */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            Practice Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Comprehensive Architectural Depth
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {service.fullDescription}
          </p>

          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-semibold text-white">Key Capabilities Included:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deliverables Card */}
        <div className="lg:col-span-5 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
          <h3 className="text-sm font-mono uppercase text-neutral-400 tracking-wider">
            Tangible Deliverables
          </h3>
          <ul className="space-y-3 text-xs text-neutral-300">
            {service.deliverables.map((deliv, idx) => (
              <li key={idx} className="flex items-start gap-2.5 pb-2.5 border-b border-neutral-800/80 last:border-0 last:pb-0">
                <span className="text-amber-400 font-mono font-bold">✓</span>
                <span>{deliv}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs text-neutral-400">
            <p>
              <strong className="text-white">Engagement Format:</strong> Fixed-Scope Milestone Sprint or Retainer.
            </p>
            <p>
              <strong className="text-white">Custody & Code:</strong> 100% intellectual property ownership transferred upon project sign-off.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Methodology */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Methodology & Cadence
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              How We Execute
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3"
              >
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Substantiating Case Studies */}
      {relatedCases.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Case Study Proof
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Related Client Engagements
              </h2>
            </div>
            <Link to="/work" className="text-xs text-amber-400 hover:underline">
              View all work &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedCases.map((cs) => (
              <div
                key={cs.id}
                className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <p className="text-xs text-neutral-500 font-mono mb-1">{cs.client} · {cs.year}</p>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    <Link to={`/work/${cs.slug}`}>{cs.title}</Link>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{cs.summary}</p>
                </div>
                {cs.metrics[0] && (
                  <div className="pt-2 text-xs text-amber-400 font-mono font-bold">
                    Key Outcome: {cs.metrics[0].metric} ({cs.metrics[0].label})
                  </div>
                )}
                <Link
                  to={`/work/${cs.slug}`}
                  className="text-xs font-semibold text-neutral-300 group-hover:text-white inline-flex items-center gap-1"
                >
                  <span>Review full case study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Practice Conversion CTA */}
      <section className="p-10 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Ready to Deploy {service.title}?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          Contact our practice leads to review availability and receive a customized scope estimate within 24 hours.
        </p>
        <div className="pt-2">
          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors"
          >
            <span>Book Strategy Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
