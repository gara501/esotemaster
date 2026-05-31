import { ReactNode } from 'react';

import { cn } from '../../utils/classNames';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: 'purple' | 'gold' | 'cyan' | 'neutral';
}

export function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]',
        tone === 'purple' && 'border-mystic-purple/40 bg-mystic-purple/10 text-mystic-purple-light',
        tone === 'gold' && 'border-mystic-gold/40 bg-mystic-gold/10 text-mystic-gold-light',
        tone === 'cyan' && 'border-mystic-cyan/40 bg-mystic-cyan/10 text-cyan-200',
        tone === 'neutral' && 'border-mystic-border bg-white/[0.03] text-slate-300',
        className,
      )}
    >
      {children}
    </span>
  );
}
