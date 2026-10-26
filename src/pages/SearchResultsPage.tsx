import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight, Layers, FileText, Sparkles, HelpCircle, Briefcase } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQ = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(rawQ);

  const { services, caseStudies, blogPosts, resources, faqs, careers } = useCms();

  useEffect(() => {
    setSearchTerm(rawQ);
  }, [rawQ]);

  const cleanQ = searchTerm.trim().toLowerCase();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchTerm.trim() ? { q: searchTerm.trim() } : {});
  };

  const resultsServices = cleanQ
    ? services.filter(
        (s) =>
          s.published &&
          (s.title.toLowerCase().includes(cleanQ) ||
            s.shortDescription.toLowerCase().includes(cleanQ))
      )
    : [];

  const resultsWork = cleanQ
    ? caseStudies.filter(
        (c) =>
          c.published &&
          (c.title.toLowerCase().includes(cleanQ) ||
            c.client.toLowerCase().includes(cleanQ) ||
            c.summary.toLowerCase().includes(cleanQ))
      )
    : [];

  const resultsBlog = cleanQ
    ? blogPosts.filter(
        (b) =>
          b.published &&
          (b.title.toLowerCase().includes(cleanQ) ||
            b.excerpt.toLowerCase().includes(cleanQ) ||
            b.content.toLowerCase().includes(cleanQ))
      )
    : [];

  const resultsResources = cleanQ
    ? resources.filter(
        (r) =>
          r.published &&
          (r.title.toLowerCase().includes(cleanQ) ||
            r.description.toLowerCase().includes(cleanQ))
      )
    : [];

  const resultsFaqs = cleanQ
    ? faqs.filter(
        (f) =>
          f.published &&
          (f.question.toLowerCase().includes(cleanQ) ||
            f.answer.toLowerCase().includes(cleanQ))
      )
    : [];

  const resultsCareers = cleanQ
    ? careers.filter(
        (c) =>
          c.published &&
          (c.title.toLowerCase().includes(cleanQ) ||
            c.department.toLowerCase().includes(cleanQ))
      )
    : [];

  const totalResults =
    resultsServices.length +
    resultsWork.length +
    resultsBlog.length +
    resultsResources.length +
    resultsFaqs.length +
    resultsCareers.length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <SeoHead
        title={rawQ ? `Search results for "${rawQ}"` : 'Search Global Directory'}
        description="Search services, case studies, insights, playbooks, and open careers at KINETIX."
      />

      <Breadcrumbs items={[{ label: 'Search Results' }]} />

      {/* Header & Search Input */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Search Results
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all content, services, insights, roles..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-12 pr-28 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors"
          >
            Search
          </button>
        </form>

        <p className="text-xs text-neutral-400">
          {rawQ ? (
            <>
              Found <strong className="text-white tabular-nums">{totalResults}</strong> matching results for "{rawQ}".
            </>
          ) : (
            'Enter keywords above to query the full CMS catalog.'
          )}
        </p>
      </div>

      {/* Results Groups */}
      <div className="space-y-10">
        {resultsServices.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
              Services ({resultsServices.length})
            </h2>
            <div className="space-y-2">
              {resultsServices.map((srv) => (
                <div key={srv.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white hover:text-amber-300">
                      <Link to={`/services/${srv.slug}`}>{srv.title}</Link>
                    </h3>
                    <p className="text-xs text-neutral-400">{srv.shortDescription}</p>
                  </div>
                  <Link to={`/services/${srv.slug}`} className="text-amber-400 hover:text-amber-300 p-2">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {resultsWork.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase text-blue-400 tracking-wider">
              Case Studies ({resultsWork.length})
            </h2>
            <div className="space-y-2">
              {resultsWork.map((cs) => (
                <div key={cs.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white hover:text-blue-300">
                      <Link to={`/work/${cs.slug}`}>{cs.title}</Link>
                    </h3>
                    <p className="text-xs text-neutral-400">{cs.client} · {cs.industry}</p>
                  </div>
                  <Link to={`/work/${cs.slug}`} className="text-blue-400 hover:text-blue-300 p-2">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {resultsBlog.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
              Articles & Insights ({resultsBlog.length})
            </h2>
            <div className="space-y-2">
              {resultsBlog.map((post) => (
                <div key={post.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white hover:text-emerald-300">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-neutral-400">{post.category} · {post.readTime}</p>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="text-emerald-400 hover:text-emerald-300 p-2">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {resultsResources.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase text-purple-400 tracking-wider">
              Resources ({resultsResources.length})
            </h2>
            <div className="space-y-2">
              {resultsResources.map((res) => (
                <div key={res.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white hover:text-purple-300">
                      <Link to={`/resources/${res.slug}`}>{res.title}</Link>
                    </h3>
                    <p className="text-xs text-neutral-400">{res.type} · {res.pagesOrSize}</p>
                  </div>
                  <Link to={`/resources/${res.slug}`} className="text-purple-400 hover:text-purple-300 p-2">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {resultsCareers.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
              Careers ({resultsCareers.length})
            </h2>
            <div className="space-y-2">
              {resultsCareers.map((job) => (
                <div key={job.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white hover:text-amber-300">
                      <Link to={`/careers/${job.slug}`}>{job.title}</Link>
                    </h3>
                    <p className="text-xs text-neutral-400">{job.department} · {job.location}</p>
                  </div>
                  <Link to={`/careers/${job.slug}`} className="text-amber-400 hover:text-amber-300 p-2">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {cleanQ && totalResults === 0 && (
          <div className="py-16 text-center text-neutral-500 space-y-3">
            <p className="text-base font-semibold text-neutral-300">No records found matching "{rawQ}"</p>
            <p className="text-xs">
              Check your spelling or explore our popular topics: Branding, Web Platform, CRO, Careers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
