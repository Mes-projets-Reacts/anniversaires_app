import { ageOn, daysUntil, delayLabel } from "../lib/dates";
import type { Birthday } from "../types/birthday";

type Props = {
  birthdays: Birthday[];
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

export function BirthdayList({ birthdays, onEdit, onDelete }: Props) {
  const sorted = [...birthdays].sort((a, b) => daysUntil(a.birthdate) - daysUntil(b.birthdate));
  if (sorted.length === 0) return null;
  return (
    <ul className="space-y-3">
      {sorted.map((b) => {
        const d = daysUntil(b.birthdate);
        return (
          <li
            key={b.id}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/13 text-sm font-semibold text-red-600">
              {initials(b.name)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-stone-800">{b.name}</p>
              <p className="text-sm text-stone-500">
                {b.birthdate} · {ageOn(b.birthdate)} ans
              </p>
            </div>
            {d <= 7 && (
              <span className="rounded-full bg-amber-500/18 px-2 py-1 text-xs font-medium text-amber-700">
                {delayLabel(b.birthdate)}
              </span>
            )}
            <div className="flex gap-2">
              <button onClick={() => onEdit(b)} className="text-sm text-stone-500 hover:text-amber-500">
                Modifier
              </button>
              <button
                onClick={() => {
                  if (confirm("Supprimer cet anniversaire ?")) onDelete(b.id);
                }}
                className="text-sm text-stone-500 hover:text-red-600"
              >
                Supprimer
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}