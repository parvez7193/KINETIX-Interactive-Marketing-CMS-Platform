import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, CheckCircle2, ArrowRight, FileText, Check } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ResourceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { resources, submitLead } = useCms();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const resource = resources.find((r) => r.slug === slug);

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Resource Not Found</h1>
        <p className="text-sm text-neutral-400">
          The requested research publication could not be found.
        </p>
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-neutral-950 font-semibold text-xs rounded-lg mt-4"
        >
          <span>Return to All Resources</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !name.trim()) return;
    setLoading(true);
    await submitLead({
      type: 'resource_download',
      name: name.trim(),
      email: email.trim(),
      details: {
        resourceTitle: resource.title,
        resourceSlug: resource.slug,
        fileName: resource.downloadFileName,
      },
    });
    setLoading(false);
    setDownloaded(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title={resource.title}
        description={resource.description}
      />

      <Breadcrumbs
        items={[
          { label: 'Resources', href: '/resources' },
          { label: resource.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Details & Key Takeaways */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-amber-400 font-bold">{resource.type}</span>
              <span>·</span>
              <span>{resource.category}</span>
              <span>·</span>
              <span>{resource.pagesOrSize}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {resource.title}
            </h1>

            <p className="text-base text-neutral-300 leading-relaxed">
              {resource.description}
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-[16/9]">
            <img
              src={resource.coverImage}
              alt={resource.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase text-neutral-400 tracking-wider">
              Key Research Takeaways
            </h3>
            <div className="space-y-3">
              {resource.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3 text-xs text-neutral-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Download Form Card */}
        <div className="lg:col-span-5 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
              Complimentary Research Asset
            </span>
            <h3 className="text-xl font-bold text-white">Instant Document Access</h3>
            <p className="text-xs text-neutral-400">
              Complete the coordinates below to download the official edition.
            </p>
          </div>

          {downloaded ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Document Unlocked</h4>
              <p className="text-xs text-neutral-300">
                You can now download <strong className="text-white">{resource.downloadFileName}</strong> directly.
              </p>
              <button
                onClick={() => {
                  const dummyBlob = new Blob(
                    [
                      `KINETIX Research Document: ${resource.title}\nPublished by KINETIX Studio Zurich / San Francisco\nAuthorized to: ${email}\n\nContents:\n${resource.keyTakeaways.join('\n')}`,
                    ],
                    { type: 'text/plain' }
                  );
                  const url = URL.createObjectURL(dummyBlob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = resource.downloadFileName.replace('.pdf', '.txt');
                  a.click();
                }}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Save To Disk ({resource.downloadFileName})</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Liam Sterling"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="l.sterling@venture.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Authorizing Access...' : 'Download Document'}</span>
                <Download className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-neutral-500 text-center">
                Confidentiality guaranteed. Zero spam.
              </p>
            </form>
          )}

          <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-400 space-y-2">
            <p className="font-semibold text-white">Have questions about applying this research?</p>
            <Link to="/book-demo" className="text-amber-400 hover:underline inline-flex items-center gap-1">
              <span>Book a 30-min strategy debrief &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
