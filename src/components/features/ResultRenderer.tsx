import ReactMarkdown from 'react-markdown';
import { History, Lightbulb, MessageSquareText, ScrollText } from 'lucide-react';

import { ExtractModelResult, ModelResult, StandardModelResult } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { MysticDivider } from '../ui/MysticDivider';
import { ComparisonList } from './ComparisonList';
import { ConceptGrid } from './ConceptGrid';
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
          Ommm
        </Badge>
        <h2 className="font-heading text-4xl text-white">El maestro esta esperando tu consulta</h2>
        <p className="mt-3 text-lg leading-8 text-slate-300">
          Selecciona un modo, escribe una pregunta y el maestro te respondera.
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
      <h2 className="font-heading text-4xl text-white">{standard.title || 'Respuesta'}</h2>
      <p className="mt-5 whitespace-pre-line text-lg leading-9 text-slate-100 sm:text-xl sm:leading-10">
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
            title="Analisis detallado"
            text={standard.expanded_analysis}
            tone="purple"
            renderMarkdown
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
  renderMarkdown = false,
}: {
  icon: typeof History;
  title: string;
  text: string;
  tone: 'default' | 'gold' | 'cyan' | 'purple';
  renderMarkdown?: boolean;
}) {
  return (
    <Card tone={tone} className="p-5">
      <div className="mb-3 flex items-center gap-3">
        <Icon className="h-6 w-6 text-mystic-gold-light" aria-hidden="true" />
        <h3 className="font-heading text-3xl text-white">{title}</h3>
      </div>
      {renderMarkdown ? (
        <div className="space-y-4 text-lg leading-9 text-slate-100 sm:text-xl sm:leading-10 [&_a]:text-mystic-cyan [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-mystic-gold/45 [&_blockquote]:pl-4 [&_blockquote]:text-mystic-parchment [&_code]:rounded [&_code]:bg-black/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-mystic-gold-light [&_h1]:font-heading [&_h1]:text-3xl [&_h2]:font-heading [&_h2]:text-2xl [&_h3]:font-heading [&_h3]:text-xl [&_li]:ml-6 [&_ol]:list-decimal [&_strong]:text-mystic-bone [&_ul]:list-disc">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      ) : (
        <p className="whitespace-pre-line text-base leading-8 text-slate-200 sm:text-lg">{text}</p>
      )}
    </Card>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h3 className="mb-4 font-heading text-3xl text-white">{title}</h3>;
}

function isExtractResult(result: ModelResult): result is ExtractModelResult {
  return result.mode === 'extract';
}