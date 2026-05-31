import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-mystic-dark bg-mystic-radial text-slate-100">
      <div className="cosmic-texture" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(10,10,15,0.74)_72%)]" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </main>
  );
}
