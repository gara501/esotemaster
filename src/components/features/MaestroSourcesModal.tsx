import { useMemo, useState } from 'react';
import { BookOpen, LibraryBig, ScrollText } from 'lucide-react';

import bookListData from '../../data/booklist.json';
import { SourceUsed } from '../../types';
import { groupSources } from '../../utils/responseParser';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
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
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  showSummary?: boolean;
}

const bookList = (bookListData as BookListData).books;

export function MaestroSourcesModal({
  sources = [],
  isOpen,
  onOpenChange,
  showSummary = true,
}: MaestroSourcesModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const modalIsOpen = isOpen ?? internalIsOpen;
  const groupedSources = useMemo(() => groupSources(sources), [sources]);
  const consultedBookNames = useMemo(
    () => new Set(groupedSources.map((source) => source.book.toLowerCase())),
    [groupedSources],
  );

  const setModalOpen = (nextIsOpen: boolean) => {
    if (isOpen === undefined) {
      setInternalIsOpen(nextIsOpen);
    }

    onOpenChange?.(nextIsOpen);
  };

  return (
    <>
      {showSummary ? (
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-heading text-2xl text-mystic-bone">Fuentes del maestro</h3>
              <p className="mt-2 font-ui text-sm leading-6 text-mystic-parchment/68">
                La biblioteca completa que alimenta las lecturas del oraculo.
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              icon={LibraryBig}
              onClick={() => setModalOpen(true)}
            >
              Ver biblioteca
            </Button>
          </div>

          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="gold">
                <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                {bookList.length} libros registrados
              </Badge>
              <Badge tone="incense">
                <ScrollText className="mr-2 h-4 w-4" aria-hidden="true" />
                {groupedSources.length} fuentes citadas en esta respuesta
              </Badge>
            </div>
          </Card>
        </section>
      ) : null}

      <Modal
        isOpen={modalIsOpen}
        title="Fuentes del maestro"
        onClose={() => setModalOpen(false)}
        className="max-h-[86vh] max-w-4xl overflow-hidden"
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge tone="gold">{bookList.length} libros</Badge>
        </div>

        <div className="max-h-[62vh] overflow-y-auto pr-1">
          <div className="grid gap-3 sm:grid-cols-2">
            {bookList.map((book, index) => {
              const normalizedTitle = book.title.toLowerCase();
              const wasConsulted = consultedBookNames.has(normalizedTitle);

              return (
                <Card key={book.filename} tone={wasConsulted ? 'gold' : 'default'} className="p-4">
                  <div className="flex items-start gap-3">
                    <BookOpen
                      className="mt-1 h-5 w-5 flex-none text-mystic-gold-light"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="font-ui text-xs font-bold uppercase tracking-[0.16em] text-mystic-parchment/56">
                        Libro {index + 1}
                      </p>
                      <h4 className="mt-1 break-words font-heading text-sm leading-6 text-mystic-bone">
                        {book.title}
                      </h4>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}
