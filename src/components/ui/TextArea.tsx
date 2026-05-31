import { TextareaHTMLAttributes } from 'react';

import { cn } from '../../utils/classNames';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextArea({ label, className, id, ...props }: TextAreaProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <textarea
        id={fieldId}
        className={cn(
          'min-h-32 w-full resize-y rounded-lg border border-mystic-border bg-black/30 px-4 py-3 text-sm leading-7 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-mystic-gold/60 focus:shadow-gold-glow',
          className,
        )}
        {...props}
      />
    </label>
  );
}
