import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useBirthdayContext } from "../../context/BirthdayContext";
import { BirthdayForm } from "../../components/BirthdayForm";
import { checkAndNotify } from "../../lib/notifications";

const navItems = [
  { to: "/", label: "Accueil", icon: "M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-10.5z" },
  { to: "/annuaire", label: "Annuaire", icon: "M4 6h16M4 12h16M4 18h16" },
  { to: "/reglages", label: "Réglages", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-5v2m0 14v2M5 12H3m18 0h-2" },
];

export function Layout() {
  const { modal, openCreate, closeModal, submit, error, birthdays } = useBirthdayContext();
  useEffect(() => {
    checkAndNotify(birthdays);
    const onVis = () => {
      if (document.visibilityState === "visible") checkAndNotify(birthdays);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [birthdays]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-20 md:flex-col md:items-center md:gap-6 md:border-r md:border-stone-200 md:bg-white/90 md:py-8 md:backdrop-blur">
        {navItems.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs transition ${isActive ? "text-red-700" : "text-stone-400 hover:text-stone-700"}`
            }
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={it.icon} />
            </svg>
            {it.label}
          </NavLink>
        ))}
      </aside>
      <div className="md:ml-20">
        <main className="mx-auto max-w-2xl px-4 py-6">
          <Outlet />
        </main>
        <footer className="mx-auto max-w-2xl px-4 py-6 text-center text-xs text-stone-400">
          <span className="font-[Outfit] font-semibold text-red-700">Anniversaires</span> · vos rappels d'anniversaire
        </footer>
      </div>
      <button
        onClick={openCreate}
        className="fixed bottom-20 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-red-700 text-2xl text-white shadow-lg transition hover:scale-105 hover:bg-red-600 md:bottom-8"
        aria-label="Ajouter"
      >
        +
      </button>
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-stone-200 bg-white/95 py-2 backdrop-blur md:hidden">
        {navItems.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-[10px] transition ${isActive ? "text-red-700" : "text-stone-400"}`
            }
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={it.icon} />
            </svg>
            {it.label}
          </NavLink>
        ))}
      </nav>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <BirthdayForm
              onSubmit={submit}
              initial={
                modal.editing
                  ? { name: modal.editing.name, birthdate: modal.editing.birthdate, note: modal.editing.note }
                  : null
              }
              onCancel={closeModal}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
}