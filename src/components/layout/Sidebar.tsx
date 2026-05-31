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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
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
            className="fixed inset-y-0 left-0 z-50 w-80 border-r border-mystic-border bg-mystic-night/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-heading text-lg">Modos</p>
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
      <div className="sticky top-24 rounded-lg border border-mystic-border bg-white/[0.025] p-4 backdrop-blur-xl">
        <p className="mb-4 font-heading text-lg text-white">Modos de estudio</p>
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
            className={`w-full rounded-lg border p-3 text-left transition ${
              isActive
                ? 'border-mystic-gold/50 bg-mystic-gold/10 shadow-gold-glow'
                : 'border-mystic-border bg-white/[0.02] hover:border-mystic-purple/50 hover:bg-mystic-purple/10'
            }`}
            onClick={() => {
              onModeChange(option.value);
              onClose?.();
            }}
          >
            <span className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-mystic-gold-light" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold text-white">{option.label}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">
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
