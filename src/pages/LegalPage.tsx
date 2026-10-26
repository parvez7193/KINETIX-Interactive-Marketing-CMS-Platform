import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Cookie } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const LegalPage: React.FC = () => {
  const location = useLocation();

  const getInitialTab = () => {
    if (location.pathname.includes('terms')) return 'terms';
    if (location.pathname.includes('cookie')) return 'cookies';
    return 'privacy';
  };

  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>(getInitialTab());

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);

  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Engagement',
    cookies: 'Cookie & Tracking Policy',
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <SeoHead
        title={titles[activeTab]}
        description="Comprehensive legal and regulatory disclosures for KINETIX Studio Inc."
      />

      <Breadcrumbs items={[{ label: 'Legal' }, { label: titles[activeTab] }]} />

      {/* Header & Tabs */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          {titles[activeTab]}
        </h1>
        <p className="text-xs font-mono text-neutral-400">
          Last revised: October 2026 · Governed by Swiss & California Commercial Law
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-neutral-900 border border-neutral-800 rounded-lg w-fit">
          <Link
            to="/privacy-policy"
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'privacy'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'terms'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Terms of Engagement
          </Link>
          <Link
            to="/cookie-policy"
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'cookies'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Cookie Policy
          </Link>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-8 text-xs sm:text-sm text-neutral-300 leading-relaxed">
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
              <p>
                KINETIX collects personal information when you submit a project brief, schedule a strategy demonstration, subscribe to The Dispatch, or apply for open employment roles. This information includes your name, work email address, company name, phone number, and any project documentation you share with our partners.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Use of Personal Information</h2>
              <p>
                We use collected information strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                <li>Evaluate project scopes and deliver preliminary technical estimates.</li>
                <li>Coordinate confidential strategy sessions via Google Meet or teleconference.</li>
                <li>Deliver our bi-weekly curated research dispatch.</li>
                <li>Review candidate portfolios and assess employment qualifications.</li>
              </ul>
              <p>
                We never monetize, broker, or sell client or subscriber contact coordinates to third-party ad networks.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Data Retention & GDPR / CCPA Rights</h2>
              <p>
                In accordance with the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), you retain the right to request access, rectification, or complete erasure of your personal data stored within our systems. To exercise these rights, email our compliance officer directly at <strong className="text-white">privacy@kinetix.studio</strong>.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Master Services & Scope Sprints</h2>
              <p>
                All design, engineering, and CRO retainers executed by KINETIX Studio Inc. are governed by bilateral Master Services Agreements (MSAs) and detailed Statements of Work (SOWs) specifying deliverables, acceptance milestones, and payment schedules.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Intellectual Property Transfer</h2>
              <p>
                Upon receipt of final milestone payments, full and exclusive worldwide intellectual property rights, trademarks, design tokens, and production codebase artifacts transfer directly to the client partner. KINETIX retains solely the limited right to showcase non-confidential project visuals in retrospective portfolios.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Warranties & Limitation of Liability</h2>
              <p>
                KINETIX guarantees that all custom engineering code complies with modern WCAG 2.2 AA accessibility standards and is delivered free of critical vulnerabilities. Under no circumstance shall KINETIX be liable for indirect, consequential, or speculative business damages exceeding total fees collected under the applicable SOW.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'cookies' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Cookie Architecture</h2>
              <p>
                Cookies are compact text files stored on your local device to enable session security, preserve preference selections (such as dark mode preferences and CMS admin state), and capture aggregated anonymous traffic telemetry.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Categories of Cookies Employed</h2>
              <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                <li>
                  <strong className="text-white">Strictly Essential:</strong> Mandatory for security, form submission verification, and CMS authentication state.
                </li>
                <li>
                  <strong className="text-white">Performance & Telemetry:</strong> Cookieless or anonymized analytics tracking session dwell time and scroll depths without capturing PII.
                </li>
                <li>
                  <strong className="text-white">Preferences:</strong> Remembers your cookie consent selection and form draft state.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Managing Preferences</h2>
              <p>
                You may revoke or adjust cookie consent at any time through our global consent banner or via your browser's security settings.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
