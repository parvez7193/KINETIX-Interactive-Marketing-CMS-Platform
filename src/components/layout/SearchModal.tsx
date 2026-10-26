import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, FileText, Briefcase, Sparkles, HelpCircle, Layers } from 'lucide-react';
import { useCms } from '../../cms/CmsContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { services, caseStudies, blogPosts, resources, faqs, careers, solutions } = useCms();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  const filteredServices = cleanQ
    ? services.filter(
        (s) =>
          s.published &&
          (s.title.toLowerCase().includes(cleanQ) ||
            s.shortDescription.toLowerCase().includes(cleanQ))
      )
    : [];

  const filteredWork = cleanQ
    ? caseStudies.filter(
        (c) =>
          c.published &&
          (c.title.toLowerCase().includes(cleanQ) ||
            c.client.toLowerCase().includes(cleanQ) ||
            c.summary.toLowerCase().includes(cleanQ))
      )
    : [];

  const filteredPosts = cleanQ
    ? blogPosts.filter(
        (b) =>
          b.published &&
          (b.title.toLowerCase().includes(cleanQ) ||
            b.excerpt.toLowerCase().includes(cleanQ) ||
            b.category.toLowerCase().includes(cleanQ))
      )
    : [];

  const filteredResources = cleanQ
    ? resources.filter(
        (r) =>
          r.published &&
          (r.title.toLowerCase().includes(cleanQ) ||
            r.description.toLowerCase().includes(cleanQ))
      )
    : [];

  const filteredFaqs = cleanQ
    ? faqs.filter(
        (f) =>
          f.published &&
          (f.question.toLowerCase().includes(cleanQ) ||
            f.answer.toLowerCase().includes(cleanQ))
      )
    : [];

  const filteredCareers = cleanQ
    ? careers.filter(
        (c) =>
          c.published &&
          (c.title.toLowerCase().includes(cleanQ) ||
            c.department.toLowerCase().includes(cleanQ))
      )
    : [];

  const totalResults =
    filteredServices.length +
    filteredWork.length +
    filteredPosts.length +
    filteredResources.length +
    filteredFaqs.length +
    filteredCareers.length;

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearch} className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, case studies, insights, resources, roles..."
            className="flex-1 bg-transparent text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-neutral-500 hover:text-neutral-300 p-1"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            title="Close"
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1">
          {!cleanQ ? (
            <div className="py-6 text-center text-neutral-400">
              <p className="text-xs text-neutral-400 mb-4">Popular Explorations</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: 'Interactive Web Platforms', url: '/services/interactive-web-experience' },
                  { label: 'Lumina AI Case Study', url: '/work/lumina-ai' },
                  { label: 'B2B SaaS Solutions', url: '/solutions/b2b-saas-enterprise' },
                  { label: '2026 Conversion Benchmark', url: '/resources/2026-b2b-conversion-benchmark' },
                  { label: 'Pricing Calculator', url: '/pricing' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.url)}
                    className="text-xs bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white px-3 py-1.5 rounded-md border border-neutral-700/60 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-sm">
              No matching records found for "{query}". Try searching for "branding", "growth", "SaaS", or "careers".
            </div>
          ) : (
            <>
              {filteredServices.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Services ({filteredServices.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredServices.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => handleSelect(`/services/${srv.slug}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          <div className="truncate">
                            <p className="text-sm font-medium text-neutral-200 group-hover:text-white truncate">
                              {srv.title}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">{srv.shortDescription}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredWork.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Case Studies ({filteredWork.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredWork.map((cs) => (
                      <button
                        key={cs.id}
                        onClick={() => handleSelect(`/work/${cs.slug}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                          <div className="truncate">
                            <p className="text-sm font-medium text-neutral-200 group-hover:text-white truncate">
                              {cs.title}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">
                              {cs.client} · {cs.industry}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredPosts.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Articles & Insights ({filteredPosts.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredPosts.map((post) => (
                      <button
                        key={post.id}
                        onClick={() => handleSelect(`/blog/${post.slug}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div className="truncate">
                            <p className="text-sm font-medium text-neutral-200 group-hover:text-white truncate">
                              {post.title}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">
                              {post.category} · {post.readTime}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredCareers.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Careers ({filteredCareers.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredCareers.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => handleSelect(`/careers/${job.slug}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Briefcase className="w-4 h-4 text-purple-400 shrink-0" />
                          <div className="truncate">
                            <p className="text-sm font-medium text-neutral-200 group-hover:text-white truncate">
                              {job.title}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">{job.department} · {job.location}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-purple-400 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredFaqs.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    FAQs ({filteredFaqs.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredFaqs.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => handleSelect('/faq')}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <HelpCircle className="w-4 h-4 text-neutral-400 shrink-0" />
                          <div className="truncate">
                            <p className="text-sm font-medium text-neutral-200 group-hover:text-white truncate">
                              {faq.question}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-300 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-neutral-950/70 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700/70 transition-colors font-medium text-xs cursor-pointer shadow-sm"
              title="Close search modal"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close</span>
            </button>
            <span className="hidden sm:inline text-neutral-500">Press Enter for full results page</span>
          </div>
          <button
            onClick={handleFullSearch}
            className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
          >
            <span>View all results</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
