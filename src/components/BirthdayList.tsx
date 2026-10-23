import { ageOn, daysUntil, delayLabel } from "../lib/dates";
import type { Birthday } from "../types/birthday";

type Props = {
  birthdays: Birthday[];
  onOpen: (b: Birthday) => void;
  onEdit: (b: Birthday) => void;
  onDelete: (id: string) => void;
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function BirthdayList({ birthdays, onOpen, onEdit, onDelete }: Props) {
  const sorted = [...birthdays].sort((a, b) => daysUntil(a.birthdate) - daysUntil(b.birthdate));
  if (sorted.length === 0) return null;
  return (
    <ul className="space-y-3">
      {sorted.map((b) => {
        const d = daysUntil(b.birthdate);
        return (
          <li key={b.id}>
            <div
              onClick={() => onOpen(b)}
              className="flex cursor-pointer flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/13 text-sm font-semibold text-red-600">
                {initials(b.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-stone-800">{b.name}</p>
                <p className="truncate text-sm text-stone-500">
                  {b.birthdate} · {ageOn(b.birthdate)} ans · prochain dans {daysUntil(b.birthdate)} j
                </p>
              </div>
              {d <= 7 && (
                <span className="rounded-full bg-amber-500/18 px-2 py-1 text-xs font-medium text-amber-700">
                  {delayLabel(b.birthdate)}
                </span>
              )}
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(b);
                  }}
                  aria-label="Modifier"
                  title="Modifier"
                  className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-amber-500"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (confirm("Supprimer cet anniversaire ?")) onDelete(b.id);
                  }}
                  aria-label="Supprimer"
                  title="Supprimer"
                  className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-red-600"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}