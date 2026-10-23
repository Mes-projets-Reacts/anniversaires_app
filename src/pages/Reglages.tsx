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
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Réglages</h1>
      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
        <div>
          <p className="font-medium">Notifications d'anniversaire</p>
          <p className="text-sm text-stone-500">Permission : {permission}</p>
        </div>
        <button
          onClick={toggle}
          className={`rounded-full px-4 py-2 text-white ${enabled ? "bg-red-700" : "bg-stone-400"}`}
        >
          {enabled ? "Activées" : "Désactivées"}
        </button>
      </div>
      <p className="mt-4 text-xs text-stone-400">
        Note : les notifications en arrière-plan dépendent du navigateur/OS et ne sont pas garanties lorsque l'application est fermée.
      </p>
    </div>
  );
}