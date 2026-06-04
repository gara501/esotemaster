import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

import bookListData from '../../data/booklist.json';
import { SourceUsed } from '../../types';
import { groupSources } from '../../utils/responseParser';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

interface BookListEntry {
  title: string;
  filename: string;
  path: string;
  sizeBytes: number;
}

interface BookListData {
  books: BookListEntry[];
}

interface MaestroSourcesModalProps {
  sources?: SourceUsed[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const BOOKS_PER_PAGE = 20;
const bookList = (bookListData as BookListData).books;

export function MaestroSourcesModal({ sources = [], isOpen, onOpenChange }: MaestroSourcesModalProps) {
  const [page, setPage] = useState(1);
  const groupedSources = useMemo(() => groupSources(sources), [sources]);
  const consultedBookNames = useMemo(
    () => new Set(groupedSources.map((source) => source.book.toLowerCase())),
    [groupedSources],
  );
  const pageCount = Math.max(1, Math.ceil(bookList.length / BOOKS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * BOOKS_PER_PAGE;
  const pageEnd = Math.min(pageStart + BOOKS_PER_PAGE, bookList.length);
  const visibleBooks = bookList.slice(pageStart, pageEnd);

  useEffect(() => {
    if (isOpen) {
      setPage(1);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      title="Fuentes del maestro"
      onClose={() => onOpenChange(false)}
      className="max-h-[86vh] max-w-3xl overflow-hidden"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="gold">{bookList.length} libros</Badge>
          <Badge tone="incense">
            {pageStart + 1}-{pageEnd} de {bookList.length}
          </Badge>
        </div>
        <p className="font-ui text-xs text-mystic-parchment/58">
          Pagina {currentPage} de {pageCount}
        </p>
      </div>

      <div className="max-h-[58vh] overflow-y-auto pr-1">
        <ul className="divide-y divide-mystic-border/70 rounded-md border border-mystic-border bg-black/18">
          {visibleBooks.map((book, index) => {
            const bookNumber = pageStart + index + 1;
            const wasConsulted = consultedBookNames.has(book.title.toLowerCase());

            return (
              <li key={book.filename} className="flex items-center gap-2 px-3 py-2">
                <BookOpen className="h-3.5 w-3.5 flex-none text-mystic-gold-light" aria-hidden="true" />
                <span className="w-8 flex-none font-ui text-[0.65rem] text-mystic-parchment/45">
                  {bookNumber}.
                </span>
                <span className="min-w-0 flex-1 truncate font-ui text-xs leading-5 text-mystic-parchment/82">
                  {book.title}
                </span>
                {wasConsulted ? (
                  <span className="flex-none rounded-full border border-mystic-gold/35 px-2 py-0.5 font-ui text-[0.62rem] uppercase tracking-[0.12em] text-mystic-gold-light">
                    Citado
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-mystic-border pt-3">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={currentPage === 1}
          className="inline-flex min-h-9 items-center gap-2 rounded-md border border-mystic-border px-3 py-2 font-ui text-xs font-bold uppercase tracking-[0.12em] text-mystic-parchment transition hover:border-mystic-gold/55 hover:text-mystic-gold-light disabled:cursor-not-allowed disabled:opacity-45"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Anterior
        </button>
        <span className="font-ui text-xs text-mystic-parchment/62">
          Maximo {BOOKS_PER_PAGE} libros por pagina
        </span>
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          disabled={currentPage === pageCount}
          className="inline-flex min-h-9 items-center gap-2 rounded-md border border-mystic-border px-3 py-2 font-ui text-xs font-bold uppercase tracking-[0.12em] text-mystic-parchment transition hover:border-mystic-gold/55 hover:text-mystic-gold-light disabled:cursor-not-allowed disabled:opacity-45"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </Modal>
  );
}