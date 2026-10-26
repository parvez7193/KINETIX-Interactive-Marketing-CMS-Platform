import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CmsProvider } from './cms/CmsContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CookieBanner } from './components/common/CookieBanner';
import { Toast } from './components/common/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { BookDemoPage } from './pages/BookDemoPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { FaqPage } from './pages/FaqPage';
import { TeamPage } from './pages/TeamPage';
import { CareersPage } from './pages/CareersPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { CustomersPage } from './pages/CustomersPage';
import { NewsletterPage } from './pages/NewsletterPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

import { PageLoadingBar } from './components/common/MotionComponents';

// Automatically scroll window to top upon route transition
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Animated routes wrapper providing smooth Framer Motion transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.22,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full flex-1 flex flex-col"
      >
        <Routes location={location}>
          {/* Core marketing pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Company & conversion pages */}
          <Route path="/book-demo" element={<BookDemoPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:slug" element={<JobDetailPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />

          {/* Content marketing pages */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/category/:category" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<ResourceDetailPage />} />
          <Route path="/faq" element={<FaqPage />} />

          {/* Search & legal utility pages */}
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/cookie-policy" element={<LegalPage />} />

          {/* CMS Admin Console */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Custom 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <BrowserRouter>
        <PageLoadingBar />
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500/20 selection:text-amber-200">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>
          <Footer />
          <CookieBanner />
          <Toast />
        </div>
      </BrowserRouter>
    </CmsProvider>
  );
}
