import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useBirthdays } from "./hooks/useBirthdays";
import { BirthdayForm } from "./components/BirthdayForm";
import { BirthdayList } from "./components/BirthdayList";
import { ageOn, daysUntil, nextBirthday } from "./lib/dates";
import type { Birthday, BirthdayInput } from "./types/birthday";

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function formatFr(date: Date): string {
  return `${date.getDate()} ${MONTHS_FR[date.getMonth()]} ${date.getFullYear()}`;
}

export default function App() {
  const { birthdays, addBirthday, editBirthday, deleteBirthday } = useBirthdays();
  const [editing, setEditing] = useState<Birthday | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = birthdays.some((b) => daysUntil(b.birthdate) === 0);
    if (today) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  }, [birthdays]);

  const handleSubmit = (data: BirthdayInput) => {
    try {
      setError(null);
      if (editing) {
        editBirthday(editing.id, data);
        setEditing(null);
      } else {
        addBirthday(data);
      }
      setShowForm(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  };

  const handleEdit = (b: Birthday) => {
    setEditing(b);
    setShowForm(true);
    setError(null);
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
    setError(null);
  };

  const sorted = [...birthdays].sort((a, b) => daysUntil(a.birthdate) - daysUntil(b.birthdate));
  const hero = sorted[0];

  const grouped = birthdays.reduce<Record<string, Birthday[]>>((acc, b) => {
    const n = nextBirthday(b.birthdate);
    const key = `${MONTHS_FR[n.getMonth()]} ${n.getFullYear()}`;
    (acc[key] ??= []).push(b);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <header className="bg-red-600 px-4 py-4 text-white">
        <h1 className="font-[Outfit] text-xl font-bold">Anniversaires</h1>
      </header>
      <main className="mx-auto max-w-xl space-y-6 px-4 py-6">
        {hero && (
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-sm text-stone-500">Prochain anniversaire</p>
            <p className="font-[Outfit] text-5xl font-extrabold text-red-600">
              J-{daysUntil(hero.birthdate)}
            </p>
            <p className="mt-2 text-lg">
              {hero.name} fête ses {ageOn(hero.birthdate) + (daysUntil(hero.birthdate) === 0 ? 0 : 0)} ans
            </p>
            <p className="text-sm text-stone-500">{formatFr(nextBirthday(hero.birthdate))}</p>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded bg-stone-200">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-amber-500"
                style={{ width: `${Math.max(5, 100 - daysUntil(hero.birthdate))}%` }}
              />
            </div>
          </div>
        )}

        {birthdays.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="50" r="30" fill="#DC2626" opacity="0.13" />
              <rect x="45" y="60" width="30" height="24" rx="4" fill="#F59E0B" />
              <path d="M60 30 L60 18" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
              <circle cx="60" cy="14" r="4" fill="#DC2626" />
            </svg>
            <p className="text-stone-500">Aucun anniversaire à venir</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([month, items]) => (
              <section key={month}>
                <h2 className="mb-2 font-[Outfit] text-lg font-semibold capitalize text-stone-700">
                  {month}
                </h2>
                <BirthdayList birthdays={items} onEdit={handleEdit} onDelete={deleteBirthday} />
              </section>
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-3xl text-white shadow-lg transition hover:bg-red-700"
        aria-label="Ajouter"
      >
        +
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <BirthdayForm
              onSubmit={handleSubmit}
              initial={editing ? { name: editing.name, birthdate: editing.birthdate, note: editing.note } : null}
              onCancel={handleCancel}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
}