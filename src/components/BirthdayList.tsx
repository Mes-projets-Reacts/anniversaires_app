import { ageOn, daysUntil, delayLabel } from "../lib/dates";
import type { Birthday } from "../types/birthday";

type Props = {
  birthdays: Birthday[];
  onEdit: (b: Birthday) => void;
  onDelete: (id: string) => void;
};

export function BirthdayList({ birthdays, onEdit, onDelete }: Props) {
  const sorted = [...birthdays].sort((a, b) => daysUntil(a.birthdate) - daysUntil(b.birthdate));
  if (sorted.length === 0) {
    return <p className="text-stone-500">Aucun anniversaire pour le moment.</p>;
  }
  return (
    <ul className="space-y-3">
      {sorted.map((b) => (
        <li key={b.id} className="rounded border border-stone-200 bg-white p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-stone-800">{b.name}</h3>
              <p className="text-sm text-stone-600">
                {ageOn(b.birthdate)} ans — {delayLabel(b.birthdate)}
              </p>
              {b.note && <p className="mt-1 text-sm text-stone-500">{b.note}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(b)} className="text-sm text-amber-500 hover:underline">
                Modifier
              </button>
              <button
                onClick={() => {
                  if (confirm("Supprimer cet anniversaire ?")) onDelete(b.id);
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}