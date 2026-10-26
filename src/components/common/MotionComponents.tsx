import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Top Ambient Page Loading Progress Bar
 * Runs a smooth progress beam across the top of the viewport on initial page load and route transitions.
 */
export const PageLoadingBar: React.FC = () => {
  const location = useLocation();
  const [animating, setAnimating] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setAnimating(true);
    setKey((prev) => prev + 1);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!animating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-neutral-950/80 pointer-events-none overflow-hidden">
      <motion.div
        key={key}
        className="h-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
        initial={{ x: '-100%', opacity: 1 }}
        animate={{ x: '100%', opacity: [1, 1, 0.6, 0] }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}

/**
 * ScrollReveal: Elements smoothly animate into view as user scrolls down the page
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  yOffset = 24,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  enableHover?: boolean;
}

/**
 * AnimatedCard: Cards appear with scroll animation and subtle interactive lift on hover
 */
export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = '',
  enableHover = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={
        enableHover
          ? {
              y: -4,
              transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer: Parent container that staggers the reveal of its children
 */
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.08 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
