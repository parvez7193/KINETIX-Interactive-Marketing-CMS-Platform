import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const NewsletterPage: React.FC = () => {
  const { submitLead } = useCms();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const pastIssues = [
    {
      issue: 'Issue #44',
      date: 'Oct 2026',
      title: 'The Anatomy of a $10M B2B Landing Page',
      preview: 'Why split-screen value propositions consistently beat traditional stacked heroes in enterprise software.',
    },
    {
      issue: 'Issue #43',
      date: 'Sep 2026',
      title: 'Eliminating the 3-Second Wait in Headless CMS Revalidations',
      preview: 'Engineering composable webhooks with edge caching so editors never preview stale marketing assets.',
    },
    {
      issue: 'Issue #42',
      date: 'Aug 2026',
      title: 'Attribution Fallacies in Multi-Touch B2B Pipelines',
      preview: 'Why first-touch and last-touch attribution misallocate paid advertising budgets by up to 40%.',
    },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;

    setLoading(true);
    await submitLead({
      type: 'newsletter',
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      details: { source: 'Dedicated Newsletter Page' },
    });
    setLoading(false);
    setSubscribed(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="The KINETIX Dispatch — Newsletter"
        description="Bi-weekly research publication delivering actionable insights on digital craftsmanship, conversion science, and category positioning."
      />

      <Breadcrumbs items={[{ label: 'Newsletter' }]} />

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Bi-Weekly Executive Dispatch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Signal Over Noise. Delivered Every Fortnight.
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Join 12,000+ technology founders, design directors, and venture investors who read our unfiltered research on web platforms, conversion telemetry, and brand systems.
        </p>
      </div>

      {/* Subscription Card */}
      <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-800 max-w-lg mx-auto">
        {subscribed ? (
          <div className="text-center space-y-3 py-4">
            <div className="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Subscription Active</h3>
            <p className="text-xs text-neutral-300">
              Welcome to the inner circle. Your first dispatch will arrive this Thursday.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">First Name (Optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Marcella"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">Work Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcella@company.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Subscribing...' : 'Join 12,000+ Subscribers'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <p className="text-[10px] text-neutral-500 text-center">
              Strict zero-spam policy. Unsubscribe anytime with a single click.
            </p>
          </form>
        )}
      </div>

      {/* Archive Highlights */}
      <div className="space-y-6 pt-4 border-t border-neutral-800">
        <h2 className="text-xl font-bold text-white">Recent Dispatch Highlights</h2>
        <div className="space-y-3">
          {pastIssues.map((issue, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                <span className="text-amber-400">{issue.issue}</span>
                <span>·</span>
                <span>{issue.date}</span>
              </div>
              <h3 className="text-sm font-semibold text-white">{issue.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{issue.preview}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
