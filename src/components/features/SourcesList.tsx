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
      <Card className="p-5">
        <p className="font-ui text-base text-mystic-parchment/68">
          No se encontraron fuentes especificas.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <ul className="space-y-2 font-ui text-base leading-7 text-mystic-parchment/82 sm:text-lg">
        {groupedSources.map((source, index) => (
          <li key={`${source.book}-${index}`} className="flex gap-2">
            <span className="text-mystic-gold-light">{index + 1}.</span>
            <span>
              <span className="font-bold text-mystic-bone">{source.book}</span>, pag:{' '}
              {source.pages.join(', ')}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
