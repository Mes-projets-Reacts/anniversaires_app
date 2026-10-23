import { useBirthdayContext } from "../context/BirthdayContext";
import { BirthdayList } from "../components/BirthdayList";

export default function Annuaire() {
  const { birthdays, deleteBirthday, openEdit } = useBirthdayContext();
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Annuaire</h1>
      <BirthdayList birthdays={birthdays} onEdit={openEdit} onDelete={deleteBirthday} />
    </div>
  );
}