import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { modeIcons, modeOptions } from '../../utils/modes';
import { StudyMode } from '../../types';
import { Button } from '../ui/Button';

interface SidebarProps {
  isOpen: boolean;
  mode: StudyMode;
  onClose: () => void;
  onModeChange: (mode: StudyMode) => void;
}

export function Sidebar({ isOpen, mode, onClose, onModeChange }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed inset-y-0 left-0 z-50 w-80 border-r border-mystic-border bg-mystic-night/96 p-5 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-heading text-xl text-mystic-bone">Modos</p>
              <Button type="button" variant="ghost" icon={X} onClick={onClose} className="px-3">
                Cerrar
              </Button>
            </div>
            <ModeList mode={mode} onModeChange={onModeChange} onClose={onClose} />
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function DesktopSidebar({
  mode,
  onModeChange,
}: Pick<SidebarProps, 'mode' | 'onModeChange'>) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-md border border-mystic-border bg-mystic-card p-4 shadow-inner-rite backdrop-blur-xl">
        <p className="mb-4 font-heading text-xl text-mystic-bone">Modos de estudio</p>
        <ModeList mode={mode} onModeChange={onModeChange} />
      </div>
    </aside>
  );
}

function ModeList({
  mode,
  onModeChange,
  onClose,
}: {
  mode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
  onClose?: () => void;
}) {
  return (
    <div className="space-y-2">
      {modeOptions.map((option) => {
        const Icon = modeIcons[option.value];
        const isActive = mode === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={`w-full rounded-md border p-3 text-left transition ${
              isActive
                ? 'border-mystic-gold/60 bg-mystic-gold/12 shadow-gold-glow'
                : 'border-mystic-border bg-black/18 hover:border-mystic-incense/50 hover:bg-mystic-incense/10'
            }`}
            onClick={() => {
              onModeChange(option.value);
              onClose?.();
            }}
          >
            <span className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-mystic-gold-light" aria-hidden="true" />
              <span>
                <span className="block font-ui text-sm font-bold text-mystic-bone">
                  {option.label}
                </span>
                <span className="mt-1 block font-ui text-xs leading-5 text-mystic-parchment/62">
                  {option.description}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
