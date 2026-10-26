import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, User, Tag } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard, ScrollReveal } from '../components/common/MotionComponents';

export const BlogPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const { blogPosts } = useCms();
  const [searchQ, setSearchQ] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>(category || 'All');

  const categories = ['All', 'Strategy & Brand', 'Conversion Optimization', 'Engineering & CMS', 'Design & Motion'];

  const filteredPosts = blogPosts.filter((post) => {
    if (!post.published) return false;
    if (selectedCat !== 'All' && !post.category.toLowerCase().includes(selectedCat.toLowerCase())) {
      return false;
    }
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase().trim();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const featuredPost = blogPosts.find((p) => p.published && p.featured) || blogPosts[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="The KINETIX Dispatch — Insights & Research"
        description="Rigorous editorial publications on digital craftsmanship, scientific CRO, headless CMS architectures, and brand positioning."
      />

      <Breadcrumbs items={[{ label: 'Blog & Insights' }]} />

      {/* Header */}
      <ScrollReveal className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          The KINETIX Dispatch
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Editorial Perspectives on Digital Architecture
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Deep research, teardowns, and experimental data from our creative directors and conversion engineers.
        </p>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedCat === cat
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Featured Marquee Article (if no active search) */}
      {!searchQ && selectedCat === 'All' && featuredPost && (
        <ScrollReveal>
          <section className="p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="text-amber-400 font-semibold">{featuredPost.category}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredPost.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredPost.publishedAt}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors">
                <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-neutral-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">{featuredPost.author.name}</p>
                    <p className="text-[11px] text-neutral-400">{featuredPost.author.role}</p>
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl overflow-hidden aspect-[16/10] bg-neutral-950">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <AnimatedCard
            key={post.id}
            delay={(idx % 6) * 0.08}
            className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-neutral-950 mb-2">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <span className="text-amber-400/90">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>By {post.author.name}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Read</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-16 text-center text-neutral-500 text-sm">
          No articles found matching "{searchQ}". Try searching for other topics.
        </div>
      )}
    </div>
  );
};
