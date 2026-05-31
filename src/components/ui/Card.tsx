import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: 'default' | 'gold' | 'cyan' | 'purple';
}

export function Card({ children, className, tone = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-mystic-border bg-mystic-card shadow-2xl shadow-black/20 backdrop-blur-xl',
        tone === 'gold' && 'border-mystic-gold/20 shadow-gold-glow',
        tone === 'cyan' && 'border-mystic-cyan/20 shadow-cyan-glow',
        tone === 'purple' && 'border-mystic-purple/25 shadow-glow',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
