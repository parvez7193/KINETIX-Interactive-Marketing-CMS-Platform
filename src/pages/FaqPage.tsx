import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard, ScrollReveal } from '../components/common/MotionComponents';

export const FaqPage: React.FC = () => {
  const { faqs } = useCms();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQ, setSearchQ] = useState('');

  const categories = ['All', 'Strategy', 'Engineering', 'Pricing', 'CMS & Tech'];

  const filteredFaqs = faqs.filter((f) => {
    if (!f.published) return false;
    if (selectedCat !== 'All' && f.category !== selectedCat) return false;
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase().trim();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="Frequently Asked Questions"
        description="Clear answers regarding our agency process, technology stack, headless CMS, pricing models, and IP transfer terms."
      />

      <Breadcrumbs items={[{ label: 'FAQ' }]} />

      {/* Header */}
      <ScrollReveal className="space-y-4 text-center sm:text-left">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Answers & Operational Clarity
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-neutral-300 leading-relaxed max-w-2xl">
          Everything you need to know about our design methodology, full-stack engineering, pricing structures, and post-launch partnership.
        </p>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6">
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
              placeholder="Search questions..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = activeId === faq.id;
          return (
            <AnimatedCard
              key={faq.id}
              delay={idx * 0.05}
              enableHover={false}
              className="border border-neutral-800 rounded-xl bg-neutral-900/40 overflow-hidden"
            >
              <button
                onClick={() => setActiveId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/80 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    {faq.category}
                  </span>
                  <p className="text-sm font-semibold text-white">{faq.question}</p>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-neutral-400 transition-transform shrink-0 ${
                    isOpen ? 'rotate-90 text-amber-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="p-5 pt-0 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/40">
                  {faq.answer}
                </div>
              )}
            </AnimatedCard>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="py-12 text-center text-neutral-500 text-sm">
            No questions matched your search query. Contact our team directly below.
          </div>
        )}
      </div>

      {/* Still Have Questions Box */}
      <ScrollReveal className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-white">Have a Specific Custom Question?</h3>
          <p className="text-xs text-neutral-400">
            Our founding partners are available for confidential scoping discussions.
          </p>
        </div>
        <Link
          to="/contact"
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>Get In Touch</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </ScrollReveal>
    </div>
  );
};
