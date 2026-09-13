/**
 * Simplified 2025 personal income tax parameters for estimate-only use.
 *
 * Sources:
 * - CRA tax rates and brackets (2025):
 *   https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/last-year.html
 * - CRA basic personal amount (2025):
 *   https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-30000-basic-personal-amount.html
 *
 * Simplifications (documented on the transparency panel):
 * - Employment income only; taxable income ≈ employment income.
 * - Federal BPA fixed at $16,129 (full amount; no high-income phase-down).
 * - Ontario BPA $12,747; Ontario credit rate 5.05% only (no surtax gross-up).
 * - No other credits, RRSP, childcare, medical, or Ontario Health Premium.
 * - No CPP/EI premium modeling; no GST/HST.
 */

export interface TaxBracket {
  upTo: number; // exclusive upper bound; Infinity for top bracket
  rate: number;
}

export const FEDERAL_BRACKETS_2025: TaxBracket[] = [
  { upTo: 57_375, rate: 0.145 },
  { upTo: 114_750, rate: 0.205 },
  { upTo: 177_882, rate: 0.26 },
  { upTo: 253_414, rate: 0.29 },
  { upTo: Infinity, rate: 0.33 },
];

export const ONTARIO_BRACKETS_2025: TaxBracket[] = [
  { upTo: 52_886, rate: 0.0505 },
  { upTo: 105_775, rate: 0.0915 },
  { upTo: 150_000, rate: 0.1116 },
  { upTo: 220_000, rate: 0.1216 },
  { upTo: Infinity, rate: 0.1316 },
];

export const FEDERAL_BPA_2025 = 16_129;
export const FEDERAL_BPA_CREDIT_RATE = 0.145;

export const ONTARIO_BPA_2025 = 12_747;
export const ONTARIO_BPA_CREDIT_RATE = 0.0505;

export const TAX_YEAR_LABEL = '2025';
