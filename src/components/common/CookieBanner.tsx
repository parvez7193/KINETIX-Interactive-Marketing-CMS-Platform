import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kinetix_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('kinetix_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('kinetix_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Privacy and cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-2xl text-xs text-neutral-300 animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="leading-relaxed">
            We use essential cookies to maintain site performance and anonymous session analytics to refine our digital experience. Learn more in our{' '}
            <Link to="/cookie-policy" className="text-amber-400 hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
