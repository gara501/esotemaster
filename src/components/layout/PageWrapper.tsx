import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-mystic-dark text-mystic-bone">
      <div
        className="absolute inset-0 bg-cover bg-[center_top] opacity-88"
        style={{ backgroundImage: "url('/maestro.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,6,0.92)_0%,rgba(5,5,6,0.64)_42%,rgba(5,5,6,0.26)_70%,rgba(5,5,6,0.78)_100%),linear-gradient(180deg,rgba(5,5,6,0.36)_0%,rgba(5,5,6,0.28)_48%,rgba(5,5,6,0.96)_100%)]" />
      <div className="cosmic-texture opacity-40" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </main>
  );
}
