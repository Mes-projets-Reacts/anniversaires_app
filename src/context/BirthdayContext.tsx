import { createContext, useContext } from "react";
import { useBirthdays } from "../hooks/useBirthdays";

const Ctx = createContext<ReturnType<typeof useBirthdays> | null>(null);

export function BirthdayProvider({ children }: { children: React.ReactNode }) {
  const value = useBirthdays();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBirthdayContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("BirthdayProvider missing");
  return ctx;
}