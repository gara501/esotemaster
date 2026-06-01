import { ReactNode, useEffect, useId } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '../../utils/classNames';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

export function Modal({ isOpen, title, children, onClose, className }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className={cn(
              'relative z-10 w-full max-w-lg rounded-lg border border-mystic-border bg-mystic-night/95 p-5 shadow-glow backdrop-blur-xl',
              className,
            )}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id={titleId} className="font-heading text-xl text-white">
                {title}
              </h2>
              <Button type="button" variant="ghost" icon={X} onClick={onClose} className="px-3">
                Cerrar
              </Button>
            </div>
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
