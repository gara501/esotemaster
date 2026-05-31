import { useState } from 'react';
import { AlertTriangle, CheckCircle2, CircleDashed, LibraryBig, MoonStar } from 'lucide-react';

import { QueryPanel } from '../components/features/QueryPanel';
import { ResultRenderer } from '../components/features/ResultRenderer';
import { DesktopSidebar, Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { useApiHealth } from '../hooks/useApiHealth';
import { useEsotericStore } from '../store/useEsotericStore';

export function LibraryOraclePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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

  return (
    <PageWrapper>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        mode={mode}
        onClose={() => setSidebarOpen(false)}
        onModeChange={setMode}
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[18rem_1fr] lg:px-8">
        <DesktopSidebar mode={mode} onModeChange={setMode} />

        <div className="space-y-6">
          <Hero status={status} appName={appName} />

          <div className="space-y-6">
            <QueryPanel
              mode={mode}
              question={question}
              isLoading={isLoading}
              onModeChange={setMode}
              onQuestionChange={setQuestion}
              onSubmit={() => void submitQuestion()}
            />

            <Card className="min-h-[28rem] p-5 sm:p-6">
              {error ? <ErrorPanel message={error} rawResult={rawResult} /> : null}
              {!error ? <ResultRenderer result={result} /> : null}
            </Card>
          </div>
        </div>
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
    <section className="relative overflow-hidden rounded-lg border border-mystic-border bg-white/[0.025] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_84%_15%,rgba(217,119,6,0.16),transparent_24%),linear-gradient(135deg,rgba(6,182,212,0.08),transparent_50%)]" />
      <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full border border-mystic-gold/20 bg-mystic-gold/5 shadow-gold-glow md:block">
        <MoonStar className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-mystic-gold-light" />
      </div>

      <div className="relative max-w-3xl">
        <Badge tone="purple" className="mb-5">
          <LibraryBig className="mr-2 h-4 w-4" aria-hidden="true" />
          Biblioteca esoterica local
        </Badge>
        <h1 className="font-heading text-4xl leading-tight text-white sm:text-5xl">
          Maestro Esoterico
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
          Consulta tus libros esotericos licenciados usando recuperacion local,
          Chroma, Ollama y Gemma. El frontend conserva el contrato original de
          Streamlit y lo presenta como una experiencia React moderna.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge tone={status === 'online' ? 'cyan' : status === 'offline' ? 'gold' : 'neutral'}>
            <StatusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            API {status === 'online' ? 'online' : status === 'offline' ? 'offline' : 'verificando'}
          </Badge>
          {appName ? <Badge tone="neutral">{appName}</Badge> : null}
        </div>
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
      <h2 className="font-heading text-2xl text-white">No se pudo procesar la respuesta</h2>
      <p className="mt-3 leading-7 text-slate-300">{message}</p>
      {rawResult ? (
        <pre className="mt-5 max-h-96 overflow-auto rounded-lg border border-mystic-border bg-black/30 p-4 text-xs leading-6 text-slate-300">
          {typeof rawResult === 'string' ? rawResult : JSON.stringify(rawResult, null, 2)}
        </pre>
      ) : (
        <p className="mt-5 rounded-lg border border-mystic-border bg-black/20 p-4 text-sm text-slate-400">
          Verifica que FastAPI este corriendo en http://localhost:8000.
        </p>
      )}
    </div>
  );
}
