import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, XCircle, Calculator, Sparkles } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard, ScrollReveal } from '../components/common/MotionComponents';

export const PricingPage: React.FC = () => {
  const { pricing } = useCms();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // ROI Estimator Interactive State
  const [traffic, setTraffic] = useState<number>(25000);
  const [conversionRate, setConversionRate] = useState<number>(1.2);
  const [dealValue, setDealValue] = useState<number>(8000);

  // Estimator Calculations:
  // Current conversions = traffic * (conversionRate / 100)
  // Projected conversions with KINETIX (+65% relative lift based on audited median)
  const currentLeads = Math.round(traffic * (conversionRate / 100));
  const projectedLeads = Math.round(currentLeads * 1.65);
  const additionalLeads = projectedLeads - currentLeads;
  const projectedPipelineGain = Math.round(additionalLeads * dealValue * 12);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <SeoHead
        title="Pricing & Sprint Retainers"
        description="Transparent pricing for high-impact brand sprints, headless CMS flagships, and dedicated monthly CRO growth partnerships."
      />

      <Breadcrumbs items={[{ label: 'Pricing' }]} />

      {/* Hero Header */}
      <ScrollReveal className="space-y-6 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Investment & Engagement Models
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Predictable Pricing. Uncompromised Velocity.
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          No opaque agency hourly billing. We partner on structured milestone sprints and dedicated monthly growth retainers backed by guaranteed SLAs.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-4 flex items-center gap-3">
          <div className="inline-flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-amber-400 text-neutral-950'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Annual Commitment (Save ~18%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-amber-400 text-neutral-950'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Month-to-Month
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Pricing Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricing.map((plan, idx) => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          return (
            <AnimatedCard
              key={plan.id}
              delay={idx * 0.1}
              className={`p-8 rounded-2xl border flex flex-col justify-between space-y-8 relative ${
                plan.popular
                  ? 'bg-neutral-900/90 border-amber-500/60 shadow-xl shadow-amber-500/5'
                  : 'bg-neutral-900/40 border-neutral-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-neutral-950 font-bold text-[10px] uppercase tracking-wider rounded-full">
                  Most Popular Partnership
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-amber-400">{plan.tier}</span>
                  <h2 className="text-2xl font-bold text-white mt-1">{plan.name}</h2>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white tabular-nums">
                      ${price.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">/ month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-[11px] text-amber-400/90 mt-1">
                      Billed annually (save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr)
                    </p>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <p className="text-xs font-mono uppercase text-neutral-400">Included Capabilities</p>
                  <ul className="space-y-2.5 text-xs text-neutral-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <div className="pt-3 border-t border-neutral-800/60">
                      <ul className="space-y-2 text-xs text-neutral-500">
                        {plan.notIncluded.map((notFeat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-neutral-600 font-bold">✕</span>
                            <span>{notFeat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800">
                <Link
                  to="/book-demo"
                  className={`w-full py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    plan.popular
                      ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Interactive Marketing ROI & Revenue Lift Estimator */}
      <ScrollReveal className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Interactive Revenue Simulation
            </span>
            <h2 className="text-2xl font-bold text-white">Estimated Conversion Lift Calculator</h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
          See how an audited KINETIX overhaul impacts your bottom line. Based on our audited median benchmark of a +65% relative lift in qualified inbound demo velocity.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          {/* Sliders on Left */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-300 font-medium">Monthly Website Visitors</span>
                <span className="font-mono text-amber-400 tabular-nums">
                  {traffic.toLocaleString()} visitors
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={150000}
                step={1000}
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 h-2 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-300 font-medium">Current Conversion Rate</span>
                <span className="font-mono text-amber-400 tabular-nums">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={5.0}
                step={0.1}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 h-2 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-300 font-medium">Average ACV / Customer Value</span>
                <span className="font-mono text-amber-400 tabular-nums">
                  ${dealValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={50000}
                step={1000}
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 h-2 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Results Box on Right */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div>
              <p className="text-[11px] font-mono text-neutral-400 uppercase">Current Monthly Inbound</p>
              <p className="text-2xl font-bold text-neutral-200 tabular-nums">{currentLeads} leads/mo</p>
            </div>

            <div>
              <p className="text-[11px] font-mono text-emerald-400 uppercase">Projected Inbound (+65% Lift)</p>
              <p className="text-2xl font-bold text-emerald-400 tabular-nums">{projectedLeads} leads/mo</p>
            </div>

            <div className="pt-3 border-t border-neutral-800">
              <p className="text-xs font-mono text-neutral-400 uppercase">
                Estimated Annual Pipeline Expansion
              </p>
              <p className="text-3xl font-extrabold text-amber-400 tabular-nums mt-1">
                +${projectedPipelineGain.toLocaleString()}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">
                Based on annualized incremental leads × average customer value.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/book-demo"
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Unlock This Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Enterprise Consultation Box */}
      <ScrollReveal className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-white">Have Custom Security, SSO, or Multi-Region Needs?</h3>
          <p className="text-xs text-neutral-400 mt-1">
            We support bespoke MSA agreements, vendor security audits, and dedicated IP assignment covenants.
          </p>
        </div>
        <Link
          to="/contact"
          className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          Contact Legal & Enterprise Sales
        </Link>
      </ScrollReveal>
    </div>
  );
};
