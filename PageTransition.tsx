import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export function PageTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Slide transition for form pages
export function SlideTransition({ children, pageKey, direction = 'right' }: PageTransitionProps & { direction?: 'left' | 'right' }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ 
          opacity: 0, 
          x: direction === 'right' ? 50 : -50 
        }}
        animate={{ 
          opacity: 1, 
          x: 0 
        }}
        exit={{ 
          opacity: 0, 
          x: direction === 'right' ? -50 : 50 
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Scale transition for modal-like pages
export function ScaleTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Stagger animation for lists and grids
export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating animation for cards
export function FloatingCard({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Button press animation
export function AnimatedButton({ 
  children, 
  onClick,
  className = "",
  disabled = false,
  variant = "default"
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "primary" | "secondary";
}) {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
}

// Fade in animation
export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  duration?: number; 
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Slide up animation
export function SlideUp({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}