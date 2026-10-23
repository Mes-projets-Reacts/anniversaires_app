import { Link } from "react-router-dom";
import { useBirthdayContext } from "../context/BirthdayContext";
import { daysUntil } from "../lib/dates";

export default function Dashboard() {
  const { birthdays } = useBirthdayContext();
  const sorted = [...birthdays].sort((a, b) => daysUntil(a.birthdate) - daysUntil(b.birthdate));
  const hero = sorted[0];
  const upcoming = sorted.slice(0, 5);
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Accueil</h1>
      {hero && (
        <div className="mb-4 rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-stone-500">Prochain anniversaire</p>
          <p className="text-4xl font-bold text-red-700">J-{daysUntil(hero.birthdate)}</p>
          <p>{hero.name}</p>
        </div>
      )}
      <h2 className="mb-2 text-lg font-semibold">Ce mois-ci</h2>
      <ul className="space-y-2">
        {upcoming.map((b) => (
          <li key={b.id} className="rounded-xl bg-white p-3 shadow-sm">
            {b.name} — {daysUntil(b.birthdate)} j
          </li>
        ))}
      </ul>
      <Link to="/annuaire" className="mt-3 inline-block text-red-700">Tout voir</Link>
    </div>
  );
}