import { BookMarked } from 'lucide-react';

import { SourceUsed } from '../../types';
import { groupSources } from '../../utils/responseParser';
import { Card } from '../ui/Card';

interface SourcesListProps {
  sources?: SourceUsed[];
}

export function SourcesList({ sources = [] }: SourcesListProps) {
  const groupedSources = groupSources(sources);

  if (!groupedSources.length) {
    return (
      <Card className="p-4">
        <p className="text-sm text-slate-400">No se encontraron fuentes especificas.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {groupedSources.map((source, index) => (
        <Card key={`${source.book}-${index}`} className="p-4">
          <div className="flex items-start gap-3">
            <BookMarked className="mt-1 h-5 w-5 flex-none text-mystic-gold-light" aria-hidden="true" />
            <div>
              <p className="font-semibold text-slate-100">
                {index + 1}. {source.book}
              </p>
              <p className="mt-1 text-sm text-slate-400">Paginas: {source.pages.join(', ')}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
