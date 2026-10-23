export type BirthdayInput = {
  name: string;
  birthdate: string;
  note?: string;
};

export type Birthday = BirthdayInput & {
  id: string;
  createdAt: number;
  note: string;
};

export function isValidBirthdate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  return d.toISOString().slice(0, 10) === value;
}

export function validateBirthdayInput(input: BirthdayInput): void {
  if (typeof input.name !== "string" || input.name.trim() === "") {
    throw new Error("Le nom est obligatoire et ne peut pas être vide.");
  }
  if (typeof input.birthdate !== "string" || !isValidBirthdate(input.birthdate)) {
    throw new Error("La date de naissance est invalide (format YYYY-MM-DD).");
  }
}