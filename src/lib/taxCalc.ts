import {
  FEDERAL_BPA_2025,
  FEDERAL_BPA_CREDIT_RATE,
  FEDERAL_BRACKETS_2025,
  ONTARIO_BPA_2025,
  ONTARIO_BPA_CREDIT_RATE,
  ONTARIO_BRACKETS_2025,
  type TaxBracket,
} from '../data/taxBrackets';
import { FEDERAL_SPENDING } from '../data/federalSpending';
import { ONTARIO_SPENDING } from '../data/ontarioSpending';
import type { SpendingCategory } from '../data/types';

export interface TaxEstimateInput {
  employmentIncome: number;
  /** Optional override: estimated federal income tax paid (CAD). */
  federalTaxOverride?: number | null;
  /** Optional override: estimated Ontario income tax paid (CAD). */
  ontarioTaxOverride?: number | null;
}

export interface TaxEstimate {
  employmentIncome: number;
  federalTax: number;
  ontarioTax: number;
  totalTax: number;
  usedOverride: boolean;
}

export interface CategoryReceiptLine {
  category: SpendingCategory;
  yourDollars: number;
  percent: number;
  totalBillions: number;
}

function taxOnBrackets(taxableIncome: number, brackets: TaxBracket[]): number {
  let remaining = Math.max(0, taxableIncome);
  let lower = 0;
  let tax = 0;
  for (const bracket of brackets) {
    const span = Math.min(remaining, bracket.upTo - lower);
    if (span <= 0) break;
    tax += span * bracket.rate;
    remaining -= span;
    lower = bracket.upTo;
  }
  return tax;
}

/** Simplified federal income tax after basic personal amount credit. */
export function estimateFederalTax(employmentIncome: number): number {
  const gross = taxOnBrackets(employmentIncome, FEDERAL_BRACKETS_2025);
  const credit = FEDERAL_BPA_2025 * FEDERAL_BPA_CREDIT_RATE;
  return Math.max(0, gross - credit);
}

/** Simplified Ontario income tax after basic personal amount credit (no surtax). */
export function estimateOntarioTax(employmentIncome: number): number {
  const gross = taxOnBrackets(employmentIncome, ONTARIO_BRACKETS_2025);
  const credit = ONTARIO_BPA_2025 * ONTARIO_BPA_CREDIT_RATE;
  return Math.max(0, gross - credit);
}

export function estimateTaxes(input: TaxEstimateInput): TaxEstimate {
  const income = Math.max(0, input.employmentIncome || 0);
  const hasFed =
    input.federalTaxOverride !== null &&
    input.federalTaxOverride !== undefined &&
    !Number.isNaN(input.federalTaxOverride);
  const hasOn =
    input.ontarioTaxOverride !== null &&
    input.ontarioTaxOverride !== undefined &&
    !Number.isNaN(input.ontarioTaxOverride);

  const usedOverride = hasFed || hasOn;
  const federalTax = hasFed
    ? Math.max(0, input.federalTaxOverride as number)
    : estimateFederalTax(income);
  const ontarioTax = hasOn
    ? Math.max(0, input.ontarioTaxOverride as number)
    : estimateOntarioTax(income);

  return {
    employmentIncome: income,
    federalTax,
    ontarioTax,
    totalTax: federalTax + ontarioTax,
    usedOverride,
  };
}

export function buildReceiptLines(
  taxForJurisdiction: number,
  categories: SpendingCategory[],
): CategoryReceiptLine[] {
  return categories
    .map((category) => ({
      category,
      yourDollars: taxForJurisdiction * category.share,
      percent: category.share,
      totalBillions: category.totalBillions,
    }))
    .sort((a, b) => b.yourDollars - a.yourDollars);
}

export function federalReceipt(federalTax: number): CategoryReceiptLine[] {
  return buildReceiptLines(federalTax, FEDERAL_SPENDING);
}

export function ontarioReceipt(ontarioTax: number): CategoryReceiptLine[] {
  return buildReceiptLines(ontarioTax, ONTARIO_SPENDING);
}
