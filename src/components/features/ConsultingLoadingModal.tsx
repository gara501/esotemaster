import { useEffect } from 'react';
import { motion } from 'framer-motion';

export function ConsultingLoadingModal() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-black/82 p-4 backdrop-blur-sm">
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-42"
        style={{ backgroundImage: "url('/loading.png')" }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{
          scale: [1.08, 1.16, 1.08],
          opacity: [0.32, 0.52, 0.32],
          filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,170,92,0.2),rgba(0,0,0,0.78)_62%,rgba(0,0,0,0.95)_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-hidden="true"
      />
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 max-w-2xl rounded-2xl border border-mystic-gold/35 bg-black/58 px-8 py-7 text-center shadow-gold-glow backdrop-blur-md"
      >
        <motion.div
          className="mx-auto mb-5 h-16 w-16 rounded-full border border-mystic-gold/45 bg-mystic-gold/10 shadow-gold-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
        <p className="font-heading text-3xl leading-tight text-mystic-bone sm:text-4xl">
          El maestro está consultando los grimorios sagrados...
        </p>
        <p className="mt-4 font-ui text-sm uppercase tracking-[0.22em] text-mystic-gold-light/78">
          La respuesta se está revelando
        </p>
      </motion.div>
    </div>
  );
}