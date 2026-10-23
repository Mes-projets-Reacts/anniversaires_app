import { useEffect } from "react";
import { ageOn, daysUntil, delayLabel } from "../lib/dates";
import type { Birthday } from "../types/birthday";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type Props = {
  person: Birthday | null;
  onClose: () => void;
  onEdit: (b: Birthday) => void;
  onDelete: (id: string) => void;
};

export function PersonModal({ person, onClose, onEdit, onDelete }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!person) return null;
  const d = daysUntil(person.birthdate);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="mb-2 text-sm text-stone-400 hover:text-stone-700">
          ✕ Fermer
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600/13 text-2xl font-bold text-red-600">
            {initials(person.name)}
          </div>
          <h2 className="mt-4 font-[Outfit] text-2xl font-bold text-stone-800">{person.name}</h2>
          <p className="mt-1 text-stone-500">{person.birthdate}</p>
          <p className="mt-2 text-lg text-stone-700">{ageOn(person.birthdate)} ans</p>
          <div className="mt-4 rounded-full bg-amber-500/18 px-4 py-2 text-sm font-medium text-amber-700">
            {delayLabel(person.birthdate)} · J-{d}
          </div>
          {person.note?.trim() !== "" && person.note && (
            <p className="mt-4 text-sm text-stone-500">
              {person.note}
            </p>
          )}
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onEdit(person)}
            className="flex-1 rounded-xl bg-red-700 py-2 font-medium text-white transition hover:bg-red-600"
          >
            Modifier
          </button>
          <button
            onClick={() => {
              if (confirm("Supprimer cet anniversaire ?")) {
                onDelete(person.id);
                onClose();
              }
            }}
            className="flex-1 rounded-xl border border-red-600 py-2 font-medium text-red-600 transition hover:bg-red-600/10"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}