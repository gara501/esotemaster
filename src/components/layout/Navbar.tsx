import { Menu, Search } from 'lucide-react';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-mystic-border bg-mystic-dark/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-mystic-gold/30 bg-mystic-gold/10 shadow-gold-glow">
            <img
              src="/tree-of-life.png"
              alt="Maestro Esoterico"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-heading text-lg text-white">Maestro Esoterico</p>
            <p className="text-xs text-slate-400">Desvelando el velo</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Badge tone="cyan">
            <Search className="mr-2 h-4 w-4" aria-hidden="true" />
            Busca en tu interior
          </Badge>
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
