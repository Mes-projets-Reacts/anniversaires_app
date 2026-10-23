import { useState } from "react";
import { useBirthdayContext } from "../context/BirthdayContext";
import { BirthdayList } from "../components/BirthdayList";
import { PersonModal } from "../components/PersonModal";
import { daysUntil } from "../lib/dates";
import type { Birthday } from "../types/birthday";

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export default function Annuaire() {
  const { birthdays, deleteBirthday, openEdit } = useBirthdayContext();
  const [selected, setSelected] = useState<Birthday | null>(null);
  const [sort, setSort] = useState<"name" | "date">("date");
  const [query, setQuery] = useState("");
  const [showEmpty, setShowEmpty] = useState(false);

  const filtered = birthdays.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    return daysUntil(a.birthdate) - daysUntil(b.birthdate);
  });

  const groups = MONTHS.map((m, i) => ({
    month: m,
    items: sorted.filter((b) => new Date(b.birthdate).getMonth() === i),
  })).filter((g) => showEmpty || g.items.length > 0);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Annuaire</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-xl border border-stone-300 px-3 py-2"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value as "name" | "date")} className="rounded-xl border border-stone-300 px-3 py-2">
          <option value="date">Prochain anniversaire</option>
          <option value="name">Nom</option>
        </select>
        <button
          onClick={() => setShowEmpty((v) => !v)}
          className="rounded-xl border border-stone-300 px-3 py-2 text-sm"
        >
          {showEmpty ? "Masquer les mois vides" : "Afficher les mois vides"}
        </button>
      </div>
      {groups.length === 0 || groups.every((g) => g.items.length === 0) ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-stone-500">Aucune personne ne correspond à la recherche.</p>
        </div>
      ) : (
        groups.map((g) => (
          <section key={g.month || "all"} className="mb-6">
            {g.month && (
              <h2 className="mb-2 flex items-center justify-between font-[Outfit] text-lg font-semibold text-stone-700">
                <span className="capitalize">{g.month}</span>
                <span className="text-xs font-normal text-stone-400">{g.items.length}</span>
              </h2>
            )}
            <BirthdayList birthdays={g.items} onOpen={setSelected} onEdit={openEdit} onDelete={deleteBirthday} />
          </section>
        ))
      )}
      <PersonModal
        person={selected}
        onClose={() => setSelected(null)}
        onEdit={(b) => {
          setSelected(null);
          openEdit(b);
        }}
        onDelete={deleteBirthday}
      />
    </div>
  );
}