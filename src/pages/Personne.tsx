import { Link, useParams } from "react-router-dom";
import { useBirthdayContext } from "../context/BirthdayContext";
import { ageOn, daysUntil, delayLabel } from "../lib/dates";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Personne() {
  const { id } = useParams();
  const { birthdays, deleteBirthday, openEdit } = useBirthdayContext();
  const b = birthdays.find((x) => x.id === id);
  if (!b) return <div className="p-4">Introuvable</div>;
  const d = daysUntil(b.birthdate);
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-3">
        <Link to="/annuaire" className="text-sm text-stone-500 hover:text-red-700">
          ← Retour à l'annuaire
        </Link>
        <Link to="/" className="text-sm text-stone-400 hover:text-stone-700">
          Accueil
        </Link>
      </div>
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600/13 text-2xl font-bold text-red-600">
            {initials(b.name)}
          </div>
          <h1 className="mt-4 font-[Outfit] text-2xl font-bold text-stone-800">{b.name}</h1>
          <p className="mt-1 text-stone-500">{b.birthdate}</p>
          <p className="mt-2 text-lg text-stone-700">{ageOn(b.birthdate)} ans</p>
          <div className="mt-4 rounded-full bg-amber-500/18 px-4 py-2 text-sm font-medium text-amber-700">
            {delayLabel(b.birthdate)} · J-{d}
          </div>
          {b.note && <p className="mt-4 text-sm text-stone-500">{b.note}</p>}
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => openEdit(b)}
            className="flex-1 rounded-xl bg-red-700 py-2 font-medium text-white transition hover:bg-red-600"
          >
            Modifier
          </button>
          <button
            onClick={() => {
              if (confirm("Supprimer cet anniversaire ?")) {
                deleteBirthday(b.id);
                window.history.back();
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