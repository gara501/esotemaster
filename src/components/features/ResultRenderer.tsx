import { History, Lightbulb, MessageSquareText, ScrollText } from 'lucide-react';

import { ExtractModelResult, ModelResult, StandardModelResult } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { MysticDivider } from '../ui/MysticDivider';
import { ConceptGrid } from './ConceptGrid';
import { ComparisonList } from './ComparisonList';
import { ExtractRenderer } from './ExtractRenderer';
import { SourcesList } from './SourcesList';

interface ResultRendererProps {
  result: ModelResult | null;
}

export function ResultRenderer({ result }: ResultRendererProps) {
  if (!result) {
    return (
      <Card className="p-6">
        <Badge tone="purple" className="mb-4">
          ◈ Biblioteca local
        </Badge>
        <h2 className="font-heading text-2xl text-white">Esperando consulta</h2>
        <p className="mt-3 leading-7 text-slate-400">
          Selecciona un modo, escribe una pregunta y consulta el indice Chroma
          alimentado por tus libros esotericos licenciados.
        </p>
      </Card>
    );
  }

  if (isExtractResult(result)) {
    return <ExtractRenderer result={result} />;
  }

  const standard = result as StandardModelResult;

  return (
    <section>
      <Badge tone="gold" className="mb-4">
        <ScrollText className="mr-2 h-4 w-4" aria-hidden="true" />
        Respuesta
      </Badge>
      <h2 className="font-heading text-3xl text-white">{standard.title || 'Respuesta'}</h2>
      <p className="mt-4 whitespace-pre-line text-base leading-8 text-slate-200">
        {standard.short_answer || ''}
      </p>

      <MysticDivider />

      <div className="grid gap-5 lg:grid-cols-2">
        <InfoPanel
          icon={History}
          title="Contexto historico"
          text={standard.historical_context || 'Sin contexto historico disponible.'}
          tone="gold"
        />
        <InfoPanel
          icon={Lightbulb}
          title="Interpretacion simbolica"
          text={standard.symbolic_interpretation || 'Sin interpretacion simbolica disponible.'}
          tone="cyan"
        />
      </div>

      {standard.expanded_analysis ? (
        <>
          <MysticDivider />
          <InfoPanel
            icon={MessageSquareText}
            title="Analisis ampliado"
            text={standard.expanded_analysis}
            tone="purple"
          />
        </>
      ) : null}

      {standard.comparisons?.length ? (
        <>
          <MysticDivider />
          <SectionTitle title="Comparaciones" />
          <ComparisonList comparisons={standard.comparisons} />
        </>
      ) : null}

      <MysticDivider />
      <SectionTitle title="Conceptos clave" />
      <ConceptGrid concepts={standard.key_concepts} />

      <MysticDivider />
      <InfoPanel
        icon={ScrollText}
        title="Reflexion"
        text={standard.reflection || 'Sin reflexion disponible.'}
        tone="default"
      />

      <MysticDivider />
      <SectionTitle title="Fuentes consultadas" />
      <SourcesList sources={standard.sources_used} />
    </section>
  );
}

function InfoPanel({
  icon: Icon,
  title,
  text,
  tone,
}: {
  icon: typeof History;
  title: string;
  text: string;
  tone: 'default' | 'gold' | 'cyan' | 'purple';
}) {
  return (
    <Card tone={tone} className="p-5">
      <div className="mb-3 flex items-center gap-3">
        <Icon className="h-6 w-6 text-mystic-gold-light" aria-hidden="true" />
        <h3 className="font-heading text-xl text-white">{title}</h3>
      </div>
      <p className="whitespace-pre-line text-sm leading-7 text-slate-300">{text}</p>
    </Card>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h3 className="mb-4 font-heading text-2xl text-white">{title}</h3>;
}

function isExtractResult(result: ModelResult): result is ExtractModelResult {
  return result.mode === 'extract';
}
