const STORAGE_KEY = 'tax-receipt:v1';

export interface PersistedInputs {
  employmentIncome: string;
  federalTaxOverride: string;
  ontarioTaxOverride: string;
  useOverride: boolean;
}

const DEFAULTS: PersistedInputs = {
  employmentIncome: '',
  federalTaxOverride: '',
  ontarioTaxOverride: '',
  useOverride: false,
};

export function loadInputs(): PersistedInputs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<PersistedInputs>;
    return {
      employmentIncome: String(parsed.employmentIncome ?? ''),
      federalTaxOverride: String(parsed.federalTaxOverride ?? ''),
      ontarioTaxOverride: String(parsed.ontarioTaxOverride ?? ''),
      useOverride: Boolean(parsed.useOverride),
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveInputs(inputs: PersistedInputs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  } catch {
    // Ignore quota / private-mode failures.
  }
}
