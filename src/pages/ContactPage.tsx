import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ContactPage: React.FC = () => {
  const { settings, submitLead } = useCms();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '$25,000 - $50,000',
    timeline: 'Within 30 Days',
    message: '',
  });

  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    'Interactive Web Platform',
  ]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const scopesList = [
    'Brand Identity & Systems',
    'Interactive Web Platform',
    'Headless CMS Migration',
    'CRO & Funnel Science',
    'Performance & Paid Media',
    'Ongoing Scale Retainer',
  ];

  const toggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter((s) => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    setLoading(true);
    try {
      await submitLead({
        type: 'contact',
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        details: {
          budget: formData.budget,
          timeline: formData.timeline,
          scopes: selectedScopes,
          message: formData.message,
        },
      });
      setSubmitted(true);
    } catch (e) {
      setErrorMsg('Submission error. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="Contact & RFP Submission"
        description="Initiate an executive RFP or request a confidential consultation with KINETIX founding partners."
      />

      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Info & Expectations */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Confidential Inquiry
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
              Let's Build Something Category-Defining.
            </h1>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Every inquiry is reviewed directly by our founding partners. We do not employ junior sales representatives. Expect a detailed response and preliminary technical assessment within 4 business hours.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4 text-xs">
            <h2 className="font-mono uppercase text-neutral-400">Direct Atelier Contact</h2>
            <div className="space-y-3 text-neutral-300">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">General & RFP Inquiries</p>
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-amber-400 transition-colors">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Direct Line</p>
                  <a href={`tel:${settings.phone}`} className="hover:text-amber-400 transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Locations</p>
                  <p className="text-neutral-400">{settings.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 space-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Non-Disclosure Assurance</span>
            </div>
            <p className="leading-relaxed">
              We routinely execute bilateral NDAs prior to in-depth strategy sessions. All proprietary data and roadmap documents shared remain strictly confidential.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-800">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your project brief has been routed to our founding partners. We will respond to <strong className="text-white">{formData.email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        phone: '',
                        budget: '$25,000 - $50,000',
                        timeline: 'Within 30 Days',
                        message: '',
                      });
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                  >
                    Submit another inquiry &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-200 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* 2-Column Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcella Rossi"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">
                      Work Email <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. m.rossi@company.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Company / Venture Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Lumina AI"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 (415) 555-0199"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Scope Selection Pills */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-300">
                    Project Scope Areas (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {scopesList.map((scope) => {
                      const selected = selectedScopes.includes(scope);
                      return (
                        <button
                          key={scope}
                          type="button"
                          onClick={() => toggleScope(scope)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            selected
                              ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {scope}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget & Timeline Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Allocated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="$15,000 - $25,000">$15,000 - $25,000 (Foundation Sprint)</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000 (Scale Flagship)</option>
                      <option value="$50,000 - $100,000">$50,000 - $100,000 (Enterprise Multi-Product)</option>
                      <option value="$100,000+">$100,000+ (Full Studio Partnership)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Target Launch Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Immediate (Next 14 Days)">Immediate (Next 14 Days)</option>
                      <option value="Within 30 Days">Within 30 Days</option>
                      <option value="Within 60 Days">Within 60 Days</option>
                      <option value="Flexible / Exploration">Flexible / Exploration</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Project Overview & Key Objectives <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your product, current conversion roadblocks, and primary milestones..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Submitting to Partners...' : 'Transmit Project Brief'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
