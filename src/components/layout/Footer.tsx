import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { useCms } from '../../cms/CmsContext';

export const Footer: React.FC = () => {
  const { settings, submitLead } = useCms();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    await submitLead({
      type: 'newsletter',
      name: email.split('@')[0],
      email: email.trim(),
      details: { source: 'Global Footer' },
    });
    setLoading(false);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-white inline-block">
              {settings.brandName}
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {settings.description}
            </p>
            <div className="pt-2 text-xs text-neutral-500 space-y-1">
              <p>{settings.address}</p>
              <p>
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-amber-400 transition-colors">
                  {settings.contactEmail}
                </a>
                {' · '}
                <a href={`tel:${settings.phone}`} className="hover:text-amber-400 transition-colors">
                  {settings.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Solutions & Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-neutral-300 tracking-wider">Capabilities</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/brand-identity-creative" className="hover:text-white transition-colors">
                  Brand Identity & Direction
                </Link>
              </li>
              <li>
                <Link to="/services/interactive-web-experience" className="hover:text-white transition-colors">
                  Interactive Web Architecture
                </Link>
              </li>
              <li>
                <Link to="/services/growth-performance-marketing" className="hover:text-white transition-colors">
                  Performance & Demand Gen
                </Link>
              </li>
              <li>
                <Link to="/services/conversion-rate-optimization" className="hover:text-white transition-colors">
                  Conversion Funnel Science
                </Link>
              </li>
              <li>
                <Link to="/services/enterprise-cms-architecture" className="hover:text-white transition-colors">
                  Headless CMS Platforms
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 mt-1">
                  View All Services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-neutral-300 tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/work" className="hover:text-white transition-colors">
                  Selected Work & Case Studies
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  Industry Solutions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About & Principles
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">
                  Leadership & Team
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Careers & Open Roles
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Pricing & Retainers
                </Link>
              </li>
              <li>
                <Link to="/customers" className="hover:text-white transition-colors">
                  Client Reviews & Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Insights & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase text-neutral-300 tracking-wider">The Dispatch</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Bi-weekly research on digital craftsmanship, conversion experiments, and brand equity.
            </p>
            {submitted ? (
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-amber-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subscription confirmed. Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="executive@company.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded text-xs transition-colors flex items-center"
                    aria-label="Subscribe to newsletter"
                  >
                    {loading ? '...' : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Zero spam. Curated editorial dispatches only.
                </p>
              </form>
            )}
            <div className="pt-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-amber-400 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CMS Content Management Console</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} {settings.brandName} Studio Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-neutral-300 transition-colors">
              Terms of Engagement
            </Link>
            <Link to="/cookie-policy" className="hover:text-neutral-300 transition-colors">
              Cookie Policy
            </Link>
            <Link to="/contact" className="hover:text-neutral-300 transition-colors">
              Contact
            </Link>
            <Link to="/admin" className="text-amber-400/80 hover:text-amber-300 font-medium transition-colors">
              CMS Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
