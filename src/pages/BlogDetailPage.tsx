import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Share2, Check, BookOpen, Clock } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts, submitLead } = useCms();

  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Article Not Found</h1>
        <p className="text-sm text-neutral-400">
          The requested essay could not be located in our publication index.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-neutral-950 font-semibold text-xs rounded-lg mt-4"
        >
          <span>Return to All Articles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((b) => b.published && b.id !== post.id)
    .slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    await submitLead({
      type: 'newsletter',
      name: newsletterEmail.split('@')[0],
      email: newsletterEmail.trim(),
      details: { articleSlug: post.slug },
    });
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title={post.title}
        description={post.excerpt}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-bold">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author & Share Bar */}
        <div className="pt-4 pb-6 border-y border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-neutral-700"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-sm font-bold text-white">{post.author.name}</p>
              <p className="text-xs text-neutral-400">{post.author.role}</p>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Article'}</span>
          </button>
        </div>
      </header>

      {/* Hero Visual */}
      <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-[16/9]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Rich Markdown / Prose Article Body */}
      <article className="prose prose-invert max-w-none text-neutral-300 space-y-6 leading-relaxed text-sm sm:text-base">
        {post.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl sm:text-2xl font-bold text-white pt-6 pb-2">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-2xl sm:text-3xl font-extrabold text-white pt-8 pb-3">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
            return (
              <div key={index} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs sm:text-sm text-neutral-200">
                {paragraph}
              </div>
            );
          }
          return (
            <p key={index} className="text-neutral-300 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </article>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="pt-6 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
          <span className="font-mono uppercase text-neutral-500">Topics:</span>
          {post.tags.map((t, idx) => (
            <span key={idx} className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded text-neutral-300">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Newsletter Capture In-Article */}
      <section className="p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Subscribe to The Dispatch</h3>
        <p className="text-xs text-neutral-400 leading-relaxed max-w-lg">
          Receive our bi-weekly research memos directly to your inbox. Curated by our partners, read by over 12,000 tech executives.
        </p>
        {subscribed ? (
          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-emerald-400 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Thank you for subscribing. Check your inbox for our latest research release.</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="executive@company.com"
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>

      {/* Related Posts */}
      <section className="space-y-6 pt-6">
        <h3 className="text-xl font-bold text-white">Continue Reading</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedPosts.map((rel) => (
            <div
              key={rel.id}
              className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4 group"
            >
              <div>
                <p className="text-xs font-mono text-amber-400 mb-1">{rel.category} · {rel.readTime}</p>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                </h4>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{rel.excerpt}</p>
              </div>
              <Link
                to={`/blog/${rel.slug}`}
                className="text-xs font-semibold text-neutral-200 group-hover:text-white inline-flex items-center gap-1"
              >
                <span>Read article</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
