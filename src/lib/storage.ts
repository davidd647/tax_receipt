/** localStorage for UI prefs only (expanded nodes, jurisdiction focus). */

const STORAGE_KEY = 'tax-receipt:ui:v2';

export type JurisdictionFocus = 'federal' | 'ontario';

export interface UiPrefs {
  focus: JurisdictionFocus;
  expandedIds: string[];
}

const DEFAULTS: UiPrefs = {
  focus: 'federal',
  expandedIds: [],
};

export function loadUiPrefs(): UiPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS, expandedIds: [] };
    const parsed = JSON.parse(raw) as Partial<UiPrefs>;
    const focus: JurisdictionFocus =
      parsed.focus === 'ontario' ? 'ontario' : 'federal';
    const expandedIds = Array.isArray(parsed.expandedIds)
      ? parsed.expandedIds.filter((id): id is string => typeof id === 'string')
      : [];
    return { focus, expandedIds };
  } catch {
    return { ...DEFAULTS, expandedIds: [] };
  }
}

export function saveUiPrefs(prefs: UiPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore quota / private-mode failures.
  }
}
