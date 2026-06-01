import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: 'default' | 'gold' | 'cyan' | 'purple' | 'incense' | 'copper';
}

export function Card({ children, className, tone = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-mystic-border bg-mystic-card shadow-2xl shadow-black/35 backdrop-blur-xl',
        'bg-[linear-gradient(145deg,rgba(243,231,200,0.055),transparent_36%,rgba(0,0,0,0.22))] shadow-inner-rite',
        tone === 'gold' && 'border-mystic-gold/28 shadow-gold-glow',
        tone === 'cyan' && 'border-mystic-cyan/24 shadow-incense-glow',
        tone === 'purple' && 'border-mystic-purple/28 shadow-glow',
        tone === 'incense' && 'border-mystic-incense/30 shadow-incense-glow',
        tone === 'copper' && 'border-mystic-copper/28 shadow-copper-glow',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
