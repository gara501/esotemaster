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
      {modeOptions.map((option, index) => {
        const Icon = modeIcons[option.value];
        const isActive = value === option.value;

        return (
          <motion.button
            key={option.value}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.32, ease: 'easeOut' }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-md border p-4 text-left transition duration-300 ${
              isActive
                ? 'border-mystic-gold/70 bg-mystic-gold/12 shadow-gold-glow'
                : 'border-mystic-border bg-mystic-void/58 hover:border-mystic-incense/50 hover:bg-mystic-incense/10 hover:shadow-incense-glow'
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-mystic-gold-light/55 to-transparent" />
            <div className="mb-3 flex items-center justify-between">
              <Icon className="h-6 w-6 text-mystic-gold-light" aria-hidden="true" />
              <span className="font-heading text-xs text-mystic-incense-light">?</span>
            </div>
            <p className="font-heading text-base text-mystic-bone">{option.label}</p>
            <p className="mt-2 font-ui text-xs leading-5 text-mystic-parchment/68">
              {option.description}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
