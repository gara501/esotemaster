import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Eye,
  LibraryBig,
  MessageCircle,
} from 'lucide-react';

import { MaestroSourcesModal } from '../components/features/MaestroSourcesModal';
import { QueryPanel } from '../components/features/QueryPanel';
import { ResultRenderer } from '../components/features/ResultRenderer';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { useApiHealth } from '../hooks/useApiHealth';
import { useEsotericStore } from '../store/useEsotericStore';

export function LibraryOraclePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSourcesOpen, setSourcesOpen] = useState(false);
  const { status, appName } = useApiHealth();
  const {
    mode,
    question,
    result,
    isLoading,
    error,
    rawResult,
    setMode,
    setQuestion,
    submitQuestion,
  } = useEsotericStore();

  const headerSources = result && result.mode !== 'extract' ? result.sources_used : undefined;

  return (
    <PageWrapper>
      <Navbar onMenuClick={() => setSidebarOpen(true)} onSourcesClick={() => setSourcesOpen(true)} />
      <MaestroSourcesModal
        sources={headerSources}
        isOpen={isSourcesOpen}
        onOpenChange={setSourcesOpen}
        showSummary={false}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        mode={mode}
        onClose={() => setSidebarOpen(false)}
        onModeChange={setMode}
      />

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(28rem,1fr)] lg:px-8 lg:py-10">
        <Hero status={status} appName={appName} />

        <div className="relative">
          <div
            className="absolute -inset-5 rounded-[2rem] bg-black/26 blur-2xl"
            aria-hidden="true"
          />
          <QueryPanel
            mode={mode}
            question={question}
            isLoading={isLoading}
            onModeChange={setMode}
            onQuestionChange={setQuestion}
            onSubmit={() => void submitQuestion()}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <Card tone="incense" className="min-h-[24rem] p-5 sm:p-6">
          {error ? <ErrorPanel message={error} rawResult={rawResult} /> : null}
          {!error ? <ResultRenderer result={result} /> : null}
        </Card>
      </section>
    </PageWrapper>
  );
}

function Hero({
  status,
  appName,
}: {
  status: 'checking' | 'online' | 'offline';
  appName: string | null;
}) {
  const StatusIcon =
    status === 'online' ? CheckCircle2 : status === 'offline' ? AlertTriangle : CircleDashed;

  return (
    <section className="max-w-2xl py-4 text-shadow-lg">
      <Badge tone="copper" className="mb-5 bg-black/34 backdrop-blur-md">
        <LibraryBig className="mr-2 h-4 w-4" aria-hidden="true" />
        Biblioteca esoterica local
      </Badge>

      <h1 className="font-heading text-5xl leading-[1.02] text-mystic-bone drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] sm:text-6xl lg:text-7xl">
        Preguntale al Maestro
      </h1>

      <p className="mt-5 max-w-xl font-body text-xl leading-8 text-mystic-parchment drop-shadow-[0_3px_16px_rgba(0,0,0,0.92)] sm:text-2xl sm:leading-9">
        Formula tu consulta como si abrieras un grimorio frente a un guia antiguo. El maestro lee tu
        biblioteca esoterica local y devuelve una respuesta trazada desde tus fuentes.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Badge tone={status === 'online' ? 'incense' : status === 'offline' ? 'gold' : 'neutral'}>
          <StatusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          API {status === 'online' ? 'online' : status === 'offline' ? 'offline' : 'verificando'}
        </Badge>
        {appName ? <Badge tone="neutral">{appName}</Badge> : null}
        <Badge tone="gold">
          <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
          Lectura guiada
        </Badge>
        <Badge tone="incense">
          <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
          Pregunta directa
        </Badge>
      </div>
    </section>
  );
}

function ErrorPanel({ message, rawResult }: { message: string; rawResult: unknown }) {

  return (
    <div>
      <Badge tone="gold" className="mb-4">
        <AlertTriangle className="mr-2 h-4 w-4" aria-hidden="true" />
        Error
      </Badge>
      <h2 className="font-heading text-2xl text-mystic-bone">No se pudo procesar la respuesta</h2>
      <p className="mt-3 font-ui leading-7 text-mystic-parchment/78">{message}</p>
      {rawResult ? (
        <pre className="mt-5 max-h-96 overflow-auto rounded-md border border-mystic-border bg-black/36 p-4 font-ui text-xs leading-6 text-mystic-parchment/78">
          {typeof rawResult === 'string' ? rawResult : JSON.stringify(rawResult, null, 2)}
        </pre>
      ) : (
        <p className="mt-5 rounded-md border border-mystic-border bg-black/24 p-4 font-ui text-sm text-mystic-parchment/62">
          Verifica que FastAPI este corriendo en http://localhost:8000.
        </p>
      )}
    </div>
  );
}
