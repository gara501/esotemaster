import { ModelResult, SourceUsed } from '../types';

export function parseModelResponse(data: unknown): ModelResult {
  if (isRecord(data)) {
    return data as ModelResult;
  }

  if (typeof data !== 'string') {
    throw new Error('La respuesta no es string ni objeto.');
  }

  let cleaned = data.trim();

  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace('```json', '').trim();
  }

  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace('```', '').trim();
  }

  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3).trim();
  }

  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');

  if (start === -1 || end === -1) {
    throw new Error('No se encontro un objeto JSON en la respuesta.');
  }

  return JSON.parse(cleaned.slice(start, end + 1)) as ModelResult;
}

export interface GroupedSource {
  book: string;
  pages: string[];
}

export function groupSources(sources: SourceUsed[] = []): GroupedSource[] {
  const grouped = new Map<string, Set<string>>();

  for (const source of sources) {
    const book = source.book || 'Fuente desconocida';
    const page = source.page;

    if (page !== null && page !== undefined) {
      if (!grouped.has(book)) {
        grouped.set(book, new Set());
      }

      grouped.get(book)?.add(String(page));
    }
  }

  return Array.from(grouped.entries()).map(([book, pages]) => ({
    book,
    pages: sortPages(Array.from(pages)),
  }));
}

function sortPages(pages: string[]) {
  return [...pages].sort((a, b) => {
    const aNumber = Number.parseInt(a, 10);
    const bNumber = Number.parseInt(b, 10);

    if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
      return aNumber - bNumber;
    }

    return a.localeCompare(b, 'es');
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
