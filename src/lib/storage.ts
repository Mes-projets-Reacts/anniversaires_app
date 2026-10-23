import type { Birthday, BirthdayInput } from "../types/birthday";
import { validateBirthdayInput } from "../types/birthday";

const STORAGE_KEY = "birthdays";

function readAll(): Birthday[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Birthday =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.birthdate === "string" &&
        typeof item.createdAt === "number",
    );
  } catch {
    return [];
  }
}

function writeAll(items: Birthday[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const storage = {
  list(): Birthday[] {
    return readAll();
  },
  get(id: string): Birthday | undefined {
    return readAll().find((b) => b.id === id);
  },
  create(data: BirthdayInput): Birthday {
    validateBirthdayInput(data);
    const all = readAll();
    const duplicate = all.some(
      (b) => b.name === data.name.trim() && b.birthdate === data.birthdate,
    );
    if (duplicate) {
      throw new Error("Un anniversaire identique existe déjà.");
    }
    const item: Birthday = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      birthdate: data.birthdate,
      note: data.note ?? "",
      createdAt: Date.now(),
    };
    all.push(item);
    writeAll(all);
    return item;
  },
  update(id: string, data: Partial<BirthdayInput>): Birthday {
    const all = readAll();
    const index = all.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Anniversaire introuvable.");
    const current = all[index];
    const merged: BirthdayInput = {
      name: data.name ?? current.name,
      birthdate: data.birthdate ?? current.birthdate,
      note: data.note ?? current.note,
    };
    validateBirthdayInput(merged);
    const duplicate = all.some(
      (b, i) =>
        i !== index &&
        b.name === merged.name.trim() &&
        b.birthdate === merged.birthdate,
    );
    if (duplicate) {
      throw new Error("Un anniversaire identique existe déjà.");
    }
    const updated: Birthday = {
      ...current,
      name: merged.name.trim(),
      birthdate: merged.birthdate,
      note: merged.note ?? "",
    };
    all[index] = updated;
    writeAll(all);
    return updated;
  },
  remove(id: string): void {
    const all = readAll().filter((b) => b.id !== id);
    writeAll(all);
  },
};