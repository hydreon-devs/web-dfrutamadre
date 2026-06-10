import { IconStar } from "./icons";

export function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="inline-flex gap-0.5 text-base text-estrella" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} style={{ opacity: i < n ? 1 : 0.25 }} />
      ))}
    </div>
  );
}
