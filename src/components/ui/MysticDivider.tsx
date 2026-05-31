export function MysticDivider() {
  return (
    <div className="my-8 flex items-center gap-4 text-mystic-gold-light/80" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-mystic-purple/70 to-mystic-gold/40" />
      <span className="font-heading text-sm">✦</span>
      <div className="h-px flex-1 bg-gradient-to-r from-mystic-gold/40 via-mystic-purple/70 to-transparent" />
    </div>
  );
}
