import { useState } from "react";
import { notificationsEnabled, setNotificationsEnabled, requestPermission } from "../lib/notifications";

export default function Reglages() {
  const [enabled, setEnabled] = useState(notificationsEnabled());
  const [permission, setPermission] = useState(
    "Notification" in window ? Notification.permission : "denied",
  );

  const toggle = async () => {
    if (!enabled) {
      const p = await requestPermission();
      setPermission(p);
      if (p === "granted") {
        setNotificationsEnabled(true);
        setEnabled(true);
      }
    } else {
      setNotificationsEnabled(false);
      setEnabled(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[Outfit] text-2xl font-bold text-stone-800">Réglages</h1>
        <p className="text-sm text-stone-500">Personnalisez votre application</p>
      </div>

      <section className="rounded-3xl bg-white p-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600/13 text-red-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="font-[Outfit] text-lg font-semibold text-stone-800">Notifications d'anniversaire</h2>
            <p className="mt-1 text-sm text-stone-500">
              Rappel la veille et message festif le jour même.
            </p>
            <p className="mt-2 text-xs text-stone-400">Permission navigateur : {permission}</p>
          </div>
          <button
            onClick={toggle}
            className={`relative h-7 w-12 rounded-full transition ${enabled ? "bg-red-700" : "bg-stone-300"}`}
            aria-label="Activer les notifications"
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${enabled ? "left-5" : "left-0.5"}`}
            />
          </button>
        </div>
        <p className="mt-4 text-xs text-stone-400">
          Les notifications en arrière-plan dépendent du navigateur/OS et ne sont pas garanties lorsque l'application est fermée.
        </p>
      </section>
    </div>
  );
}