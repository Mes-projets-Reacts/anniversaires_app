import { createContext, useContext, useState } from "react";
import { useBirthdays } from "../hooks/useBirthdays";
import type { Birthday, BirthdayInput } from "../types/birthday";

type ModalState = {
  open: boolean;
  editing: Birthday | null;
};

type CtxValue = ReturnType<typeof useBirthdays> & {
  modal: ModalState;
  openCreate: () => void;
  openEdit: (b: Birthday) => void;
  closeModal: () => void;
  submit: (data: BirthdayInput) => void;
  error: string | null;
};

const Ctx = createContext<CtxValue | null>(null);

export function BirthdayProvider({ children }: { children: React.ReactNode }) {
  const birthdays = useBirthdays();
  const [modal, setModal] = useState<ModalState>({ open: false, editing: null });
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setModal({ open: true, editing: null });
    setError(null);
  };
  const openEdit = (b: Birthday) => {
    setModal({ open: true, editing: b });
    setError(null);
  };
  const closeModal = () => {
    setModal({ open: false, editing: null });
    setError(null);
  };
  const submit = (data: BirthdayInput) => {
    try {
      setError(null);
      if (modal.editing) {
        birthdays.editBirthday(modal.editing.id, data);
      } else {
        birthdays.addBirthday(data);
      }
      closeModal();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  };

  const value: CtxValue = {
    ...birthdays,
    modal,
    openCreate,
    openEdit,
    closeModal,
    submit,
    error,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBirthdayContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("BirthdayProvider missing");
  return ctx;
}