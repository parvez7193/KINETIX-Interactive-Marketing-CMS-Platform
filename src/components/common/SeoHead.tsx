import { useEffect } from 'react';
import { useCms } from '../../cms/CmsContext';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
}

export const SeoHead = ({ title, description, canonicalPath }: SeoProps) => {
  const { settings } = useCms();

  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${settings.brandName}`
      : `${settings.brandName} — ${settings.tagline}`;
    document.title = fullTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    const finalDesc = description || settings.seo.defaultDescription;
    if (metaDesc) {
      metaDesc.setAttribute('content', finalDesc);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', finalDesc);
    }
  }, [title, description, canonicalPath, settings]);

  return null;
};
