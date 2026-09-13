/** Shared types for hierarchical fiscal spending trees. */

export type Jurisdiction = 'federal' | 'ontario';

/** A spending node; children[] nest 2–3 levels where data allows. */
export interface SpendingNode {
  id: string;
  name: string;
  /** Share of the jurisdiction's total expenses (0–1). */
  share: number;
  /** Category / program total in billions CAD for the labeled fiscal year. */
  totalBillions: number;
  /** Short plain-English summary. */
  oneLiner: string;
  /** Optional longer note shown when expanded. */
  description?: string;
  sourceUrl: string;
  sourceLabel: string;
  children?: SpendingNode[];
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface CoffersSnapshot {
  jurisdiction: Jurisdiction;
  label: string;
  fiscalYearLabel: string;
  /** Income taxes + other taxes/duties where published separately. */
  taxRevenueBillions?: number;
  revenueBillions: number;
  spendingBillions: number;
  deficitBillions: number;
  deficitNote: string;
  sources: SourceLink[];
}

export interface AverageEarnerSnapshot {
  label: string;
  employmentIncome: number;
  incomeNote: string;
  incomeSource: SourceLink;
  federalTaxApprox: number;
  ontarioTaxApprox: number;
  taxNote: string;
  taxSource: SourceLink;
}

export interface FiscalMeta {
  fiscalYearLabel: string;
  budgetLabel: string;
  lastReviewed: string;
  province: 'Ontario';
  disclaimer: string;
  methodologySummary: string;
  sources: SourceLink[];
}
