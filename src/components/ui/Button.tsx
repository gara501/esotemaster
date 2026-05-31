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
        'group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-mystic-gold/60 disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' &&
          'border-mystic-gold/40 bg-gradient-to-r from-mystic-gold to-mystic-purple text-white shadow-gold-glow hover:-translate-y-0.5 hover:shadow-glow',
        variant === 'secondary' &&
          'border-mystic-border bg-white/[0.04] text-slate-100 hover:border-mystic-cyan/40 hover:text-white hover:shadow-cyan-glow',
        variant === 'ghost' &&
          'border-transparent bg-transparent text-slate-300 hover:bg-white/[0.04] hover:text-white',
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
