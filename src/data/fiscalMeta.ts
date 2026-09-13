import type { FiscalMeta } from './types';

/**
 * App-wide fiscal labeling and transparency copy.
 * Fiscal year: federal Budget 2025 / Ontario Budget 2025 projections for 2025–26.
 */
export const FISCAL_META: FiscalMeta = {
  fiscalYearLabel: '2025–26',
  lastReviewed: '2026-09-12',
  province: 'Ontario',
  disclaimer:
    'These figures are estimates for education and transparency only. They are not tax advice, not an official Canada Revenue Agency or Ontario Ministry of Finance calculation, and not a substitute for your Notice of Assessment or a tax professional.',
  methodologySummary:
    'We estimate your federal and Ontario personal income tax from annual employment income using simplified 2025 brackets and basic personal amounts, or we use your optional tax override. Your dollar share of each spending category is: (your tax for that jurisdiction) × (category share of that jurisdiction’s total expenses). Category shares come from Budget 2025–style expense totals. We omit most credits, deductions, CPP/EI premiums, Ontario surtax details, and GST/HST so the math stays readable.',
  sources: [
    {
      label: 'Budget 2025 — Annex 1 (federal expense outlook)',
      url: 'https://budget.canada.ca/2025/report-rapport/anx1-en.html',
    },
    {
      label: 'PBO — Main Estimates 2025–26',
      url: 'https://www.pbo-dpb.ca/en/publications/RP-2526-003-S--government-expenditure-plan-main-estimates-2025-26--plan-depenses-gouvernement-budget-principal-depenses-2025-2026',
    },
    {
      label: '2025 Ontario Budget — Chapter 3 (expense outlook)',
      url: 'https://budget.ontario.ca/2025/chapter-3.html',
    },
    {
      label: 'CRA — Federal and provincial tax rates and brackets (2025)',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/last-year.html',
    },
    {
      label: 'CRA — Basic personal amount (2025)',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-30000-basic-personal-amount.html',
    },
  ],
};

/** Denominator for federal category shares: total expenses excl. net actuarial losses, Budget 2025 Table A1.9. */
export const FEDERAL_TOTAL_EXPENSE_BILLIONS = 580.9;

/** Denominator for Ontario category shares: total expense, 2025 Ontario Budget outlook for 2025–26. */
export const ONTARIO_TOTAL_EXPENSE_BILLIONS = 232.5;
