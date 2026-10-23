import { NavLink, Outlet } from "react-router-dom";

const items = [
  { to: "/", label: "Accueil" },
  { to: "/annuaire", label: "Annuaire" },
  { to: "/reglages", label: "Réglages" },
];

export function Layout() {
  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-800">
      <aside className="hidden w-16 flex-col items-center gap-4 border-r border-stone-200 bg-white py-6 md:flex">
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} className="text-xs text-stone-500 hover:text-red-700">
            {it.label}
          </NavLink>
        ))}
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-stone-200 bg-white py-2 md:hidden">
        {items.slice(0, 2).map((it) => (
          <NavLink key={it.to} to={it.to} className="text-xs text-stone-500">
            {it.label}
          </NavLink>
        ))}
        <NavLink
          to="/"
          className="flex h-12 w-12 -translate-y-4 items-center justify-center rounded-full bg-red-700 text-2xl text-white shadow"
        >
          +
        </NavLink>
        {items.slice(2).map((it) => (
          <NavLink key={it.to} to={it.to} className="text-xs text-stone-500">
            {it.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}