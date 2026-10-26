import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Compass } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-8">
      <SeoHead
        title="404 — Page Not Found"
        description="The requested route could not be found."
      />

      <div className="space-y-4">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Route Not Located
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
          The page or resource you are attempting to access has either moved or does not exist in our active sitemap.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/services"
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-medium text-xs rounded-lg transition-colors flex items-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Browse Services</span>
        </Link>
      </div>

      <div className="pt-12 border-t border-neutral-900 text-xs text-neutral-400 space-y-2">
        <p>Looking for something specific?</p>
        <div className="flex justify-center gap-4 text-amber-400">
          <Link to="/work" className="hover:underline">Case Studies</Link>
          <span>·</span>
          <Link to="/pricing" className="hover:underline">Pricing Plans</Link>
          <span>·</span>
          <Link to="/blog" className="hover:underline">Insights</Link>
          <span>·</span>
          <Link to="/contact" className="hover:underline">Contact RFP</Link>
        </div>
      </div>
    </div>
  );
};
