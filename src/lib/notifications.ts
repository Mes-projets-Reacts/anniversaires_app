import type { Birthday } from "../types/birthday";
import { daysUntil } from "./dates";

const ENABLED_KEY = "notifications-enabled";
const NOTIFIED_KEY = "notifications-sent";

function localDateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function notificationsEnabled(): boolean {
  return localStorage.getItem(ENABLED_KEY) === "true";
}

export function setNotificationsEnabled(value: boolean): void {
  localStorage.setItem(ENABLED_KEY, String(value));
}

function notifiedSet(): Set<string> {
  try {
    const raw = localStorage.getItem(NOTIFIED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveNotified(set: Set<string>): void {
  localStorage.setItem(NOTIFIED_KEY, JSON.stringify([...set]));
}

export async function requestPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) return "denied";
  if (Notification.permission === "default") {
    return Notification.requestPermission();
  }
  return Notification.permission;
}

export function canNotify(): boolean {
  return "Notification" in window && Notification.permission === "granted" && notificationsEnabled();
}

export function checkAndNotify(birthdays: Birthday[]): void {
  if (!canNotify()) return;
  const keyDate = localDateKey();
  const sent = notifiedSet();
  for (const b of birthdays) {
    const d = daysUntil(b.birthdate);
    if (d === 1) {
      const key = `eve:${b.id}:${keyDate}`;
      if (!sent.has(key)) {
        new Notification("Anniversaire demain", { body: `${b.name} fête son anniversaire demain.` });
        sent.add(key);
      }
    }
    if (d === 0) {
      const key = `day:${b.id}:${keyDate}`;
      if (!sent.has(key)) {
        new Notification("Joyeux anniversaire !", { body: `${b.name} fête son anniversaire aujourd'hui 🎉` });
        sent.add(key);
      }
    }
  }
  saveNotified(sent);
}