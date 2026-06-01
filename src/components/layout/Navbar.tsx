import { Menu, ScrollText } from 'lucide-react';

import { Button } from '../ui/Button';

interface NavbarProps {
  onMenuClick: () => void;
  onSourcesClick: () => void;
}

export function Navbar({ onMenuClick, onSourcesClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-mystic-border bg-black/52 shadow-inner-rite backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-mystic-gold/50 bg-mystic-bone p-1.5 shadow-gold-glow">
            <img
              src="/tree-of-life.png"
              alt="Maestro Esoterico"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p className="font-heading text-xl leading-none text-mystic-bone drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Maestro Esoterico
            </p>
            <p className="mt-1 font-ui text-[0.68rem] uppercase tracking-[0.24em] text-mystic-parchment/78">
              Las respuestas están en tu interior
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onSourcesClick}
            className="inline-flex items-center rounded-full border border-mystic-incense/42 bg-mystic-incense/12 px-3 py-1 font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-mystic-incense-light transition duration-300 hover:border-mystic-gold/55 hover:bg-mystic-gold/12 hover:text-mystic-gold-light focus:outline-none focus:ring-2 focus:ring-mystic-gold/60"
            aria-haspopup="dialog"
          >
            <ScrollText className="mr-2 h-4 w-4" aria-hidden="true" />
            Fuentes del maestro
          </button>
        </div>

        <Button
          type="button"
          variant="ghost"
          icon={Menu}
          className="px-3 md:hidden"
          onClick={onMenuClick}
        >
          Menu
        </Button>
      </div>
    </header>
  );
}
