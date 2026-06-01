import { FileText } from 'lucide-react';

import { ExtractModelResult } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface ExtractRendererProps {
  result: ExtractModelResult;
}

export function ExtractRenderer({ result }: ExtractRendererProps) {
  if (!result.found) {
    return (
      <Card tone="gold" className="p-6">
        <h2 className="font-heading text-2xl text-white">{result.title || 'Extracto textual'}</h2>
        <p className="mt-3 text-slate-300">{result.notes || 'No se encontraron extractos.'}</p>
      </Card>
    );
  }

  const extracts = result.extracts || [];

  return (
    <section className="space-y-5">
      <div>
        <Badge tone="cyan" className="mb-3">
          <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
          Extracto textual
        </Badge>
        <h2 className="font-heading text-3xl text-white">
          {result.title || 'Extracto textual encontrado'}
        </h2>
        {result.matched_query ? (
          <p className="mt-2 text-sm text-slate-400">Busqueda: {result.matched_query}</p>
        ) : null}
      </div>

      {extracts.length ? (
        extracts.map((extract, index) => (
          <Card key={`${extract.book}-${extract.page}-${index}`} className="p-5">
            <h3 className="font-heading text-xl text-white">Fragmento {index + 1}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="gold">Libro: {extract.book || 'Fuente desconocida'}</Badge>
              <Badge tone="purple">Pagina: {extract.page || 'No disponible'}</Badge>
            </div>
            <pre className="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-lg border border-mystic-border bg-black/30 p-4 font-body text-sm leading-7 text-slate-200">
              {extract.text || ''}
            </pre>
          </Card>
        ))
      ) : (
        <Card className="p-4">
          <p className="text-sm text-slate-400">No se encontraron fragmentos para mostrar.</p>
        </Card>
      )}

      {result.notes ? (
        <Card className="border-mystic-cyan/20 p-4">
          <p className="text-sm leading-6 text-cyan-100">{result.notes}</p>
        </Card>
      ) : null}
    </section>
  );
}
