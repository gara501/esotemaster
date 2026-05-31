import {
  BookOpen,
  FileText,
  FlaskConical,
  LucideIcon,
  Scale,
  Sparkles,
  TreePine,
} from 'lucide-react';

import { ModeOption, StudyMode } from '../types';

export const modeOptions: ModeOption[] = [
  {
    value: 'general',
    label: 'General',
    description: 'Hermetismo, simbolismo, alquimia, tarot, cabala y mitologia comparada.',
  },
  {
    value: 'extract',
    label: 'Extracto textual',
    description: 'Recupera fragmentos fieles de la biblioteca local sin interpretacion.',
  },
  {
    value: 'tarot',
    label: 'Tarot',
    description: 'Arcanos, simbolismo tradicional y lectura arquetipica.',
  },
  {
    value: 'cabala',
    label: 'Cabala',
    description: 'Arbol de la Vida, sephiroth, senderos y correspondencias hermeticas.',
  },
  {
    value: 'alquimia',
    label: 'Alquimia',
    description: 'Nigredo, albedo, rubedo, metales, sal, azufre y mercurio.',
  },
  {
    value: 'comparative',
    label: 'Comparativo',
    description: 'Similitudes, diferencias, influencias y tensiones entre tradiciones.',
  },
];

export const modeIcons: Record<StudyMode, LucideIcon> = {
  general: BookOpen,
  extract: FileText,
  tarot: Sparkles,
  cabala: TreePine,
  alquimia: FlaskConical,
  comparative: Scale,
};

export function getModeLabel(mode: StudyMode) {
  return modeOptions.find((option) => option.value === mode)?.label ?? 'General';
}
