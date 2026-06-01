import { Send, WandSparkles } from 'lucide-react';

import { StudyMode } from '../../types';
import { getModeLabel } from '../../utils/modes';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { TextArea } from '../ui/TextArea';
import { ModeSelector } from './ModeSelector';

interface QueryPanelProps {
  mode: StudyMode;
  question: string;
  isLoading: boolean;
  onModeChange: (mode: StudyMode) => void;
  onQuestionChange: (question: string) => void;
  onSubmit: () => void;
}

export function QueryPanel({
  mode,
  question,
  isLoading,
  onModeChange,
  onQuestionChange,
  onSubmit,
}: QueryPanelProps) {
  return (
    <Card
      tone="copper"
      className="relative overflow-hidden bg-black/58 p-5 shadow-2xl shadow-black/50 sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-mystic-gold/20">
        <div className="h-full w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-mystic-gold-light to-transparent opacity-80" />
      </div>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-mystic-gold/12 opacity-70" />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge tone="gold" className="mb-3">
            <WandSparkles className="mr-2 h-4 w-4" aria-hidden="true" />
            Modo activo: {getModeLabel(mode)}
          </Badge>
          <h2 className="font-heading text-3xl text-mystic-bone">Haz tu pregunta</h2>
          <p className="mt-2 font-ui text-sm leading-6 text-mystic-parchment/68">
            Escribe una duda concreta y elige el tipo de lectura que quieres recibir.
          </p>
        </div>
      </div>

      <ModeSelector value={mode} onChange={onModeChange} />

      <div className="mt-6">
        <TextArea
          label="Pregunta para el maestro"
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder="Ej: Que advierte la tradicion sobre evocar espiritus inferiores mediante circulos cabalisticos?"
          rows={5}
        />
      </div>

      <Button
        type="button"
        icon={Send}
        isLoading={isLoading}
        className="mt-5 w-full"
        onClick={onSubmit}
      >
        {isLoading ? 'El maestro consulta el grimorio...' : 'Preguntar al maestro'}
      </Button>
    </Card>
  );
}
