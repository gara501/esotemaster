import { ReactNode } from 'react';

import { cn } from '../../utils/classNames';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: 'purple' | 'gold' | 'cyan' | 'neutral' | 'incense' | 'copper';
}

export function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em]',
        tone === 'purple' && 'border-mystic-purple/42 bg-mystic-purple/12 text-mystic-purple-light',
        tone === 'gold' && 'border-mystic-gold/45 bg-mystic-gold/12 text-mystic-gold-light',
        tone === 'cyan' && 'border-mystic-cyan/38 bg-mystic-cyan/10 text-mystic-cyan',
        tone === 'incense' &&
          'border-mystic-incense/42 bg-mystic-incense/12 text-mystic-incense-light',
        tone === 'copper' && 'border-mystic-copper/42 bg-mystic-copper/12 text-mystic-copper-light',
        tone === 'neutral' && 'border-mystic-border bg-mystic-bone/[0.035] text-mystic-parchment',
        className,
      )}
    >
      {children}
    </span>
  );
}
