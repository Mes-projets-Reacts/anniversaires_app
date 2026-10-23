import { useState } from "react";
import { useBirthdayContext } from "../context/BirthdayContext";
import { BirthdayList } from "../components/BirthdayList";
import { PersonModal } from "../components/PersonModal";
import type { Birthday } from "../types/birthday";

export default function Annuaire() {
  const { birthdays, deleteBirthday, openEdit } = useBirthdayContext();
  const [selected, setSelected] = useState<Birthday | null>(null);
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Annuaire</h1>
      <BirthdayList
        birthdays={birthdays}
        onOpen={setSelected}
        onEdit={openEdit}
        onDelete={deleteBirthday}
      />
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