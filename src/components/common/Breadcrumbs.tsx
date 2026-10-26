import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
      <Link to="/" className="hover:text-neutral-200 transition-colors">
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            {isLast || !item.href ? (
              <span className="text-neutral-200 font-medium truncate max-w-xs">{item.label}</span>
            ) : (
              <Link to={item.href} className="hover:text-neutral-200 transition-colors truncate max-w-xs">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
