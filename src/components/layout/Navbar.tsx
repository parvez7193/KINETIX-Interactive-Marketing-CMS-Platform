import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCms } from '../../cms/CmsContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { settings, isAdminLoggedIn } = useCms();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Insights', href: '/blog' },
    { label: 'About', href: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Optional Top Announcement Strip (Controlled via CMS) */}
      {settings.announcement.enabled && (
        <div className="bg-neutral-900 border-b border-neutral-800/80 px-4 py-2 text-xs text-neutral-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <span className="truncate">{settings.announcement.text}</span>
            <Link
              to={settings.announcement.linkUrl}
              className="inline-flex items-center gap-1 font-medium text-amber-400 hover:text-amber-300 whitespace-nowrap shrink-0 transition-colors"
            >
              <span>{settings.announcement.linkLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav Links) — Zone 3 (Primary Action) */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            {settings.brandName}
          </Link>

          {/* Zone 2: 4–5 concise single-line nav links with hover underlines */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    active ? 'text-white' : 'hover:text-white text-neutral-300'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Search, Admin quick trigger, and 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search website"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 transition-colors text-xs border border-transparent hover:border-neutral-800"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] text-neutral-500 font-mono">⌘K</span>
            </button>

            {/* CMS Portal Access Link */}
            <Link
              to="/admin"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                isAdminLoggedIn
                  ? 'bg-amber-950/40 border-amber-600/40 text-amber-300 hover:bg-amber-900/50'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
              }`}
              title="Open Content Management System"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>CMS Admin</span>
            </Link>

            {/* Single Primary Action Button */}
            <Link
              to="/book-demo"
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Book Demo
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-900 bg-neutral-950 px-6 py-6 space-y-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-1.5 transition-colors ${
                    isActive(link.href) ? 'text-amber-400' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-900 flex flex-col gap-3">
                <Link
                  to="/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-neutral-400 hover:text-neutral-200"
                >
                  Resources & Playbooks
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-neutral-400 hover:text-neutral-200"
                >
                  Frequently Asked Questions
                </Link>
                <Link
                  to="/careers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-neutral-400 hover:text-neutral-200"
                >
                  Careers & Open Roles
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-neutral-400 hover:text-neutral-200"
                >
                  Contact & RFP
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1.5 py-1"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>CMS Administration Portal</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
