import { useState } from "react";
import { useBirthdays } from "./hooks/useBirthdays";
import { BirthdayForm } from "./components/BirthdayForm";
import { BirthdayList } from "./components/BirthdayList";
import type { Birthday, BirthdayInput } from "./types/birthday";

export default function App() {
  const { birthdays, addBirthday, editBirthday, deleteBirthday } = useBirthdays();
  const [editing, setEditing] = useState<Birthday | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (data: BirthdayInput) => {
    try {
      setError(null);
      if (editing) {
        editBirthday(editing.id, data);
        setEditing(null);
      } else {
        addBirthday(data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  };

  const handleEdit = (b: Birthday) => {
    setEditing(b);
    setError(null);
  };

  const handleCancel = () => {
    setEditing(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <header className="bg-red-600 px-4 py-4 text-white">
        <h1 className="text-xl font-bold">Anniversaires</h1>
      </header>
      <main className="mx-auto max-w-xl space-y-6 px-4 py-6">
        <BirthdayForm
          onSubmit={handleSubmit}
          initial={editing ? { name: editing.name, birthdate: editing.birthdate, note: editing.note } : null}
          onCancel={editing ? handleCancel : undefined}
          error={error}
        />
        <BirthdayList birthdays={birthdays} onEdit={handleEdit} onDelete={deleteBirthday} />
      </main>
    </div>
  );
}