import { TextareaHTMLAttributes } from 'react';

import { cn } from '../../utils/classNames';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextArea({ label, className, id, ...props }: TextAreaProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="mb-2 block font-ui text-xs font-bold uppercase tracking-[0.18em] text-mystic-parchment/85">
        {label}
      </span>
      <textarea
        id={fieldId}
        className={cn(
          'min-h-36 w-full resize-y rounded-md border border-mystic-border bg-black/38 px-4 py-3 font-ui text-sm leading-7 text-mystic-bone outline-none transition placeholder:text-mystic-parchment/42 focus:border-mystic-gold/70 focus:shadow-gold-glow',
          className,
        )}
        {...props}
      />
    </label>
  );
}
