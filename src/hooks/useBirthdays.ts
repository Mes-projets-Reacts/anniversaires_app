import { useCallback, useEffect, useState } from "react";
import type { Birthday, BirthdayInput } from "../types/birthday";
import { storage } from "../lib/storage";

export function useBirthdays() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);

  useEffect(() => {
    setBirthdays(storage.list());
  }, []);

  const addBirthday = useCallback((data: BirthdayInput) => {
    const created = storage.create(data);
    setBirthdays(storage.list());
    return created;
  }, []);

  const editBirthday = useCallback((id: string, data: Partial<BirthdayInput>) => {
    const updated = storage.update(id, data);
    setBirthdays(storage.list());
    return updated;
  }, []);

  const deleteBirthday = useCallback((id: string) => {
    storage.remove(id);
    setBirthdays(storage.list());
  }, []);

  return { birthdays, addBirthday, editBirthday, deleteBirthday };
}