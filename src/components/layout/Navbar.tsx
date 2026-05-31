import { Menu, MoonStar, Server } from 'lucide-react';

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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-mystic-gold/30 bg-mystic-gold/10 shadow-gold-glow">
            <MoonStar className="h-6 w-6 text-mystic-gold-light" aria-hidden="true" />
          </div>
          <div>
            <p className="font-heading text-lg text-white">Maestro Esoterico</p>
            <p className="text-xs text-slate-400">RAG local + Gemma</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Badge tone="cyan">
            <Server className="mr-2 h-4 w-4" aria-hidden="true" />
            localhost:8000
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
