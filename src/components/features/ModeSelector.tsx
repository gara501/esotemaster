import { motion } from 'framer-motion';

import { StudyMode } from '../../types';
import { modeIcons, modeOptions } from '../../utils/modes';

interface ModeSelectorProps {
  value: StudyMode;
  onChange: (mode: StudyMode) => void;
}

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {modeOptions.map((option) => {
        const Icon = modeIcons[option.value];
        const isActive = value === option.value;

        return (
          <motion.button
            key={option.value}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-lg border p-4 text-left transition duration-300 ${
              isActive
                ? 'border-mystic-gold/60 bg-mystic-gold/10 shadow-gold-glow'
                : 'border-mystic-border bg-white/[0.025] hover:border-mystic-purple/50 hover:bg-mystic-purple/10 hover:shadow-glow'
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="mb-3 flex items-center justify-between">
              <Icon className="h-6 w-6 text-mystic-gold-light" aria-hidden="true" />
              <span className="font-heading text-xs text-mystic-purple-light">◈</span>
            </div>
            <p className="font-heading text-base text-white">{option.label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">{option.description}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
