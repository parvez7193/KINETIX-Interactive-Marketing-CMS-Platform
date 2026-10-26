import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, ArrowRight, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard, ScrollReveal } from '../components/common/MotionComponents';

export const ResourcesPage: React.FC = () => {
  const { resources, submitLead } = useCms();
  const [downloadModalRes, setDownloadModalRes] = useState<any | null>(null);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadName, setDownloadName] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadEmail.includes('@') || !downloadName.trim()) return;
    setLoading(true);
    await submitLead({
      type: 'resource_download',
      name: downloadName.trim(),
      email: downloadEmail.trim(),
      details: {
        resourceTitle: downloadModalRes.title,
        resourceSlug: downloadModalRes.slug,
        fileName: downloadModalRes.downloadFileName,
      },
    });
    setLoading(false);
    setDownloadSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="Resources, Benchmarks & Playbooks"
        description="Downloadable B2B conversion benchmarks, landing page checklists, and enterprise headless CMS migration playbooks."
      />

      <Breadcrumbs items={[{ label: 'Resources' }]} />

      {/* Hero Header */}
      <ScrollReveal className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Proprietary Research & Tools
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Executive Playbooks & Benchmarks
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Actionable frameworks, empirical conversion data, and architectural checklists built from our private agency laboratory.
        </p>
      </ScrollReveal>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {resources.map((res, idx) => (
          <AnimatedCard
            key={res.id}
            delay={(idx % 3) * 0.1}
            className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-950 relative">
                <img
                  src={res.coverImage}
                  alt={res.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 text-[10px] font-mono bg-neutral-950/80 backdrop-blur-md px-2 py-0.5 rounded text-amber-300 border border-neutral-800">
                  {res.type}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400">{res.category}</span>
                <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  <Link to={`/resources/${res.slug}`}>{res.title}</Link>
                </h2>
                <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-2 space-y-1 text-xs text-neutral-300">
                <p className="text-neutral-500 font-mono text-[11px]">Key Highlights:</p>
                {res.keyTakeaways.slice(0, 2).map((takeaway, tIdx) => (
                  <p key={tIdx} className="flex items-start gap-1.5 text-neutral-400 text-xs">
                    <span className="text-amber-400 mt-0.5">·</span>
                    <span className="line-clamp-1">{takeaway}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-3">
              <p className="text-[11px] text-neutral-500 font-mono">{res.pagesOrSize}</p>
              <div className="flex items-center justify-between gap-3">
                <Link
                  to={`/resources/${res.slug}`}
                  className="text-xs font-medium text-neutral-300 hover:text-white"
                >
                  Overview &rarr;
                </Link>
                <button
                  onClick={() => {
                    setDownloadModalRes(res);
                    setDownloadSuccess(false);
                  }}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get Asset</span>
                </button>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Interactive Download Modal */}
      {downloadModalRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setDownloadModalRes(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-sm p-1"
            >
              ✕
            </button>

            {downloadSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Access Granted</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  The download link for <strong className="text-white">{downloadModalRes.downloadFileName}</strong> has been authorized.
                </p>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-amber-300">
                  Ready: {downloadModalRes.downloadFileName} ({downloadModalRes.pagesOrSize})
                </div>
                <button
                  onClick={() => {
                    // Simulated instant file download
                    const dummyBlob = new Blob(
                      [
                        `KINETIX Research Document: ${downloadModalRes.title}\nPublished by KINETIX Studio Zurich / San Francisco\nAuthorized to: ${downloadEmail}\n\nContents:\n${downloadModalRes.keyTakeaways.join('\n')}`,
                      ],
                      { type: 'text/plain' }
                    );
                    const url = URL.createObjectURL(dummyBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = downloadModalRes.downloadFileName.replace('.pdf', '.txt');
                    a.click();
                  }}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document Now</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    Instant Research Access
                  </span>
                  <h3 className="text-lg font-bold text-white">{downloadModalRes.title}</h3>
                  <p className="text-xs text-neutral-400">{downloadModalRes.pagesOrSize}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={downloadName}
                    onChange={(e) => setDownloadName(e.target.value)}
                    placeholder="e.g. Caroline Dupré"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Work Email Address</label>
                  <input
                    type="email"
                    required
                    value={downloadEmail}
                    onChange={(e) => setDownloadEmail(e.target.value)}
                    placeholder="c.dupre@company.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Validating...' : 'Unlock Instant Download'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-neutral-500 text-center">
                  Zero spam. Download links remain active indefinitely.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
