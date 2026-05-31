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
    <Card tone="purple" className="relative overflow-hidden p-5 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-mystic-purple/20">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-mystic-gold-light to-transparent opacity-80 animate-shimmer" />
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge tone="gold" className="mb-3">
            <WandSparkles className="mr-2 h-4 w-4" aria-hidden="true" />
            Modo activo: {getModeLabel(mode)}
          </Badge>
          <h2 className="font-heading text-2xl text-white">Consulta la biblioteca</h2>
        </div>
      </div>

      <ModeSelector value={mode} onChange={onModeChange} />

      <div className="mt-6">
        <TextArea
          label="Haz una pregunta"
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder="Ej: ARTE DE EVOCAR A LOS ESPIRITUS INFERNALES, POR MEDIO DE CIRCULOS CABALISTICOS"
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
        {isLoading ? 'Consultando biblioteca...' : 'Consultar'}
      </Button>
    </Card>
  );
}
