export function parseDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function ageOn(birthdate: string, now: Date = new Date()): number {
  const b = parseDate(birthdate);
  let age = now.getFullYear() - b.getFullYear();
  const hadBirthdayThisYear =
    now.getMonth() > b.getMonth() ||
    (now.getMonth() === b.getMonth() && now.getDate() >= b.getDate());
  if (!hadBirthdayThisYear) age -= 1;
  return Math.max(0, age);
}

export function nextBirthday(birthdate: string, now: Date = new Date()): Date {
  const b = parseDate(birthdate);
  const thisYear = new Date(now.getFullYear(), b.getMonth(), b.getDate());
  if (thisYear >= startOfDay(now)) {
    return thisYear;
  }
  return new Date(now.getFullYear() + 1, b.getMonth(), b.getDate());
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function daysUntil(birthdate: string, now: Date = new Date()): number {
  const next = nextBirthday(birthdate, now);
  const diff = next.getTime() - startOfDay(now).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function delayLabel(birthdate: string, now: Date = new Date()): string {
  const d = daysUntil(birthdate, now);
  if (d === 0) return "aujourd'hui";
  if (d === 1) return "demain";
  return `dans ${d} jours`;
}