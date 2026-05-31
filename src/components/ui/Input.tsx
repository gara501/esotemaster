import { InputHTMLAttributes } from 'react';

import { cn } from '../../utils/classNames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, id, ...props }: InputProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <input
        id={fieldId}
        className={cn(
          'h-12 w-full rounded-lg border border-mystic-border bg-black/30 px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-mystic-gold/60 focus:shadow-gold-glow',
          className,
        )}
        {...props}
      />
    </label>
  );
}
