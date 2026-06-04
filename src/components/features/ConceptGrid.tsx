import { useEffect, useState } from 'react';
import { Tags } from 'lucide-react';

import { Card } from '../ui/Card';

interface ConceptGridProps {
  concepts?: string[];
}

const EMPTY_CONCEPTS: string[] = [];

interface WikipediaPage {
  title?: string;
  missing?: string;
}

interface WikipediaQueryResponse {
  query?: {
    normalized?: Array<{ from: string; to: string }>;
    redirects?: Array<{ from: string; to: string }>;
    pages?: Record<string, WikipediaPage>;
  };
}

export function ConceptGrid({ concepts = EMPTY_CONCEPTS }: ConceptGridProps) {
  const [wikiLinks, setWikiLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    const titles = Array.from(new Set(concepts.map(normalizeWikipediaTitle).filter(Boolean)));

    if (!titles.length) {
      setWikiLinks({});
      return undefined;
    }

    const controller = new AbortController();

    async function validateWikipediaLinks() {
      try {
        const params = new URLSearchParams({
          action: 'query',
          format: 'json',
          origin: '*',
          redirects: '1',
          titles: titles.join('|'),
        });
        const response = await fetch(`https://es.wikipedia.org/w/api.php?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Wikipedia validation failed');
        }

        const data = (await response.json()) as WikipediaQueryResponse;
        const normalizedTitles = new Map(
          data.query?.normalized?.map((item) => [item.from, item.to]) ?? [],
        );
        const redirectTitles = new Map(data.query?.redirects?.map((item) => [item.from, item.to]) ?? []);
        const pages = Object.values(data.query?.pages ?? {});
        const nextLinks: Record<string, string> = {};

        for (const title of titles) {
          const normalizedTitle = normalizedTitles.get(title) ?? title;
          const resolvedTitle = redirectTitles.get(normalizedTitle) ?? normalizedTitle;
          const page = pages.find((candidate) => candidate.title === resolvedTitle && !candidate.missing);

          if (page?.title) {
            nextLinks[title] = `https://es.wikipedia.org/wiki/${encodeURIComponent(
              page.title.replace(/\s+/g, '_'),
            )}`;
          }
        }

        setWikiLinks(nextLinks);
      } catch {
        if (!controller.signal.aborted) {
          setWikiLinks({});
        }
      }
    }

    void validateWikipediaLinks();

    return () => controller.abort();
  }, [concepts]);

  if (!concepts.length) {
    return (
      <Card className="p-5">
        <p className="text-base text-slate-300">No se encontraron conceptos clave.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {concepts.map((concept) => {
        const title = normalizeWikipediaTitle(concept);
        const wikipediaHref = wikiLinks[title];

        return (
          <Card key={concept} className="p-5">
            <div className="flex items-center gap-3">
              <Tags className="h-5 w-5 text-mystic-cyan" aria-hidden="true" />
              {wikipediaHref ? (
                <a
                  href={wikipediaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-semibold text-mystic-cyan underline-offset-4 transition hover:text-mystic-cyan-light hover:underline"
                >
                  {concept}
                </a>
              ) : (
                <p className="text-lg font-semibold text-slate-100">{concept}</p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function normalizeWikipediaTitle(concept: string) {
  return concept.trim().replace(/\s+/g, ' ');
}