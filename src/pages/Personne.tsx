import { useParams } from "react-router-dom";
import { useBirthdayContext } from "../context/BirthdayContext";

export default function Personne() {
  const { id } = useParams();
  const { birthdays } = useBirthdayContext();
  const b = birthdays.find((x) => x.id === id);
  if (!b) return <div className="p-4">Introuvable</div>;
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{b.name}</h1>
      <p>{b.birthdate}</p>
      {b.note && <p>{b.note}</p>}
    </div>
  );
}