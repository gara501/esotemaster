import { Tags } from 'lucide-react';

import { Card } from '../ui/Card';

interface ConceptGridProps {
  concepts?: string[];
}

export function ConceptGrid({ concepts = [] }: ConceptGridProps) {
  if (!concepts.length) {
    return (
      <Card className="p-4">
        <p className="text-sm text-slate-400">No se encontraron conceptos clave.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {concepts.map((concept) => (
        <Card key={concept} className="p-4">
          <div className="flex items-center gap-3">
            <Tags className="h-5 w-5 text-mystic-cyan" aria-hidden="true" />
            <p className="font-semibold text-slate-100">{concept}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
