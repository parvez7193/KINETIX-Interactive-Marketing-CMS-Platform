import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, DollarSign, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const JobDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { careers, submitLead } = useCms();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const job = careers.find((c) => c.slug === slug);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Position Not Found</h1>
        <p className="text-sm text-neutral-400">
          The requested role is no longer active or does not exist.
        </p>
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-neutral-950 font-semibold text-xs rounded-lg mt-4"
        >
          <span>Return to All Open Roles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !name.trim()) return;

    setLoading(true);
    await submitLead({
      type: 'career',
      name: name.trim(),
      email: email.trim(),
      details: {
        roleTitle: job.title,
        roleSlug: job.slug,
        portfolioUrl: portfolio.trim(),
        linkedinUrl: linkedin.trim(),
        notes: notes.trim(),
      },
    });
    setLoading(false);
    setApplied(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title={`${job.title} — Careers`}
        description={job.description}
      />

      <Breadcrumbs
        items={[
          { label: 'Careers', href: '/careers' },
          { label: job.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Job Description, Responsibilities, Qualifications */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="text-amber-400 font-semibold">{job.department}</span>
              <span>·</span>
              <span>{job.employmentType}</span>
              <span>·</span>
              <span className="text-emerald-400">Status: {job.status}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300 pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                {job.salaryRange}
              </span>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed pt-2">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Key Responsibilities</h3>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Ideal Qualifications</h3>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-neutral-500 font-mono font-bold mt-0.5">→</span>
                  <span className="leading-relaxed">{qual}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Application Form Card */}
        <div className="lg:col-span-5 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
              Confidential Application
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Apply for this Role</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Applications are reviewed directly by the department practice lead.
            </p>
          </div>

          {applied ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Application Transmitted</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Thank you, <strong className="text-white">{name}</strong>. We have received your portfolio submission for the <strong className="text-white">{job.title}</strong> role. Our team will follow up at <strong className="text-white">{email}</strong>.
              </p>
              <div className="pt-2">
                <Link to="/careers" className="text-xs text-amber-400 hover:underline">
                  View other open positions &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Hayes"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="julian@gmail.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Portfolio / GitHub / Work URL</label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://julianhayes.design"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/julian-hayes"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Introductory Note</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share a project you engineered or designed that you are proud of..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Transmitting...' : 'Submit Application'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-neutral-500 text-center">
                We value your privacy. We never share applicant details externally.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
