import { useEffect, useState } from "react";
import type { BirthdayInput } from "../types/birthday";

type Props = {
  onSubmit: (data: BirthdayInput) => void;
  initial?: BirthdayInput | null;
  onCancel?: () => void;
  error?: string | null;
};

export function BirthdayForm({ onSubmit, initial, onCancel, error }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [birthdate, setBirthdate] = useState(initial?.birthdate ?? "");
  const [note, setNote] = useState(initial?.note ?? "");

  useEffect(() => {
    setName(initial?.name ?? "");
    setBirthdate(initial?.birthdate ?? "");
    setNote(initial?.note ?? "");
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, birthdate, note: note || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-stone-800">Nom</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-800">Date de naissance</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-800">Note (optionnel)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          {initial ? "Modifier" : "Ajouter"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded border border-stone-300 px-4 py-2">
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}