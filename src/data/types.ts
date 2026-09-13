/** Shared types for seeded fiscal spending categories. */

export type Jurisdiction = 'federal' | 'ontario';

export interface SpendingCategory {
  id: string;
  name: string;
  /** Share of that jurisdiction's total expenses (0–1). Categories must sum ≈ 1. */
  share: number;
  /** Program / category total in billions CAD for the labeled fiscal year. */
  totalBillions: number;
  /** One-line plain-English summary shown on the receipt. */
  oneLiner: string;
  /** Short expandable description. */
  description: string;
  /** Official source URL. */
  sourceUrl: string;
  /** Short source label for the UI. */
  sourceLabel: string;
}

export interface FiscalMeta {
  fiscalYearLabel: string;
  lastReviewed: string;
  province: 'Ontario';
  disclaimer: string;
  methodologySummary: string;
  sources: { label: string; url: string }[];
}
