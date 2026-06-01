import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

import { cn } from '../../utils/classNames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  isLoading?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({
  icon: Icon,
  isLoading = false,
  children,
  className,
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-2 rounded-md border px-5 py-3 font-ui text-sm font-bold uppercase tracking-[0.12em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-mystic-gold/60 disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' &&
          'border-mystic-gold/50 bg-gradient-to-r from-mystic-copper-dark via-mystic-gold-dark to-mystic-incense-dark text-mystic-bone shadow-gold-glow hover:-translate-y-0.5 hover:border-mystic-gold-light/70 hover:shadow-glow',
        variant === 'secondary' &&
          'border-mystic-border bg-mystic-void/80 text-mystic-parchment hover:border-mystic-incense/50 hover:text-mystic-bone hover:shadow-incense-glow',
        variant === 'ghost' &&
          'border-transparent bg-transparent text-mystic-parchment/80 hover:bg-mystic-bone/[0.055] hover:text-mystic-bone',
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      ) : Icon ? (
        <Icon className="h-5 w-5 transition group-hover:scale-105" aria-hidden="true" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
