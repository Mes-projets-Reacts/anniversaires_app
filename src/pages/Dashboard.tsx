import { Link } from "react-router-dom";
import { useBirthdayContext } from "../context/BirthdayContext";
import { daysUntil } from "../lib/dates";

export default function Dashboard() {
  const { birthdays } = useBirthdayContext();
  const now = new Date();
  const currentMonth = now.getMonth();

  const monthBirthdays = birthdays
    .filter((b) => {
      const d = new Date(b.birthdate);
      return d.getMonth() === currentMonth;
    })
    .sort((a, b) => {
      const da = new Date(a.birthdate).getDate();
      const db = new Date(b.birthdate).getDate();
      return da - db;
    });

  const sorted = [...birthdays].sort((a, b) => daysUntil(a.birthdate) - daysUntil(b.birthdate));
  const hero = sorted[0];
  const todayBirthdays = birthdays.filter((b) => daysUntil(b.birthdate) === 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[Outfit] text-2xl font-bold text-stone-800">Bonjour 👋</h1>
        <p className="text-sm text-stone-500">Les anniversaires à venir</p>
      </div>

      {todayBirthdays.length > 0 && (
        <div className="rounded-3xl bg-gradient-to-r from-red-600 to-amber-500 p-6 text-white shadow-lg">
          <p className="text-sm font-medium opacity-90">🎉 Anniversaire aujourd'hui</p>
          <p className="mt-1 font-[Outfit] text-2xl font-bold">
            {todayBirthdays.map((b) => b.name).join(", ")}
          </p>
        </div>
      )}

      {hero && (
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Prochain anniversaire</p>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="font-[Outfit] text-5xl font-extrabold text-red-700">J-{daysUntil(hero.birthdate)}</p>
              <p className="mt-1 text-lg font-semibold text-stone-800">{hero.name}</p>
            </div>
            <p className="text-sm text-stone-500">{hero.birthdate}</p>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-600 to-amber-500"
              style={{ width: `${Math.max(6, 100 - Math.min(daysUntil(hero.birthdate), 100))}%` }}
            />
          </div>
        </div>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-[Outfit] text-lg font-semibold text-stone-800">
            Ce mois-ci · {monthBirthdays.length}
          </h2>
          <Link to="/annuaire" className="text-sm font-medium text-red-700 hover:underline">
            Tout voir
          </Link>
        </div>
        {monthBirthdays.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-stone-500">Aucun anniversaire ce mois-ci</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {monthBirthdays.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <p className="font-medium text-stone-800">{b.name}</p>
                  <p className="text-sm text-stone-500">{b.birthdate}</p>
                </div>
                <span className="rounded-full bg-amber-500/18 px-3 py-1 text-xs font-medium text-amber-700">
                  {new Date(b.birthdate).getDate()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}