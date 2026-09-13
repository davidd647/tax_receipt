/** Display helpers for CAD amounts and percentages. */

export function formatCAD(amount: number, opts?: { cents?: boolean }): string {
  const maximumFractionDigits = opts?.cents === false ? 0 : 2;
  const minimumFractionDigits = opts?.cents === false ? 0 : 2;
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(amount);
}

export function formatCADCompact(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return formatCAD(amount, { cents: false });
  }
  return formatCAD(amount);
}

export function formatBillions(billions: number): string {
  const formatted = new Intl.NumberFormat('en-CA', {
    maximumFractionDigits: billions >= 10 ? 1 : 1,
    minimumFractionDigits: 1,
  }).format(billions);
  return `$${formatted}B`;
}

export function formatPercent(share: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'percent',
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(share);
}

export function formatDateISO(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
