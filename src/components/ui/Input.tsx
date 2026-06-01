import { InputHTMLAttributes } from 'react';

import { cn } from '../../utils/classNames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, id, ...props }: InputProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="mb-2 block font-ui text-xs font-bold uppercase tracking-[0.18em] text-mystic-parchment/85">
        {label}
      </span>
      <input
        id={fieldId}
        className={cn(
          'h-12 w-full rounded-md border border-mystic-border bg-black/36 px-4 font-ui text-sm text-mystic-bone outline-none transition placeholder:text-mystic-parchment/42 focus:border-mystic-gold/70 focus:shadow-gold-glow',
          className,
        )}
        {...props}
      />
    </label>
  );
}
