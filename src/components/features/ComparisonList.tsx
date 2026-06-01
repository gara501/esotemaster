import { Scale } from 'lucide-react';

import { Comparison } from '../../types';
import { Card } from '../ui/Card';

interface ComparisonListProps {
  comparisons?: Comparison[];
}

export function ComparisonList({ comparisons = [] }: ComparisonListProps) {
  if (!comparisons.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {comparisons.map((comparison, index) => (
        <Card key={`${comparison.topic}-${index}`} className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <Scale className="h-5 w-5 text-mystic-gold-light" aria-hidden="true" />
            <h4 className="font-heading text-lg text-white">{comparison.topic || 'Sin tema'}</h4>
          </div>
          <dl className="grid gap-4 md:grid-cols-2">
            <Definition label="Tradicion A" value={comparison.tradition_a || '-'} />
            <Definition label="Tradicion B" value={comparison.tradition_b || '-'} />
            <Definition label="Similitud" value={comparison.similarity || '-'} />
            <Definition label="Diferencia" value={comparison.difference || '-'} />
          </dl>
        </Card>
      ))}
    </div>
  );
}

function Definition({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-mystic-purple-light">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-slate-300">{value}</dd>
    </div>
  );
}
