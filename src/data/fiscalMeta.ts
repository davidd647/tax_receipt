import type {
  AverageEarnerSnapshot,
  CoffersSnapshot,
  FiscalMeta,
} from './types';

/**
 * App-wide fiscal labeling and transparency copy.
 * Fiscal year: federal Budget 2025 / Ontario Budget 2025 projections for 2025–26.
 * Last reviewed: 12 September 2026 (America/Toronto).
 */
export const FISCAL_META: FiscalMeta = {
  fiscalYearLabel: '2025–26',
  budgetLabel: 'Budget 2025',
  lastReviewed: '2026-09-12',
  province: 'Ontario',
  disclaimer:
    'These figures are estimates and approximations for education and transparency only. They are not a CRA personal tax allocation, not tax advice, and not an official Canada Revenue Agency or Ontario Ministry of Finance calculation. Category carve-outs marked “approx.” are illustrative groupings from Budget totals.',
  methodologySummary:
    'National coffers figures come from Budget 2025 (federal) and the 2025 Ontario Budget for fiscal year 2025–26. Category shares are each line’s $B divided by that jurisdiction’s total expense denominator. The “average earner” panel uses a cited Ontario median employment-income proxy and a simplified 2025 federal + Ontario income-tax estimate (basic personal amounts only; no surtax, credits beyond BPA, CPP/EI, or GST/HST). Each spending node’s “average-earner share” is (that jurisdiction’s average tax) × (node $B ÷ jurisdiction total $B). Nested children sum to their parent. The deficit is the gap between spending and revenue financed mainly by borrowing — not the same thing as Bank of Canada money creation.',
  sources: [
    {
      label: 'Budget 2025 — Annex 1 (federal fiscal outlook)',
      url: 'https://budget.canada.ca/2025/report-rapport/anx1-en.html',
    },
    {
      label: 'PBO — Main Estimates 2025–26',
      url: 'https://www.pbo-dpb.ca/en/publications/RP-2526-003-S--government-expenditure-plan-main-estimates-2025-26--plan-depenses-gouvernement-budget-principal-depenses-2025-2026',
    },
    {
      label: '2025 Ontario Budget — Chapter 3',
      url: 'https://budget.ontario.ca/2025/chapter-3.html',
    },
    {
      label: '2025 Ontario Budget — In Brief',
      url: 'https://budget.ontario.ca/2025/brief.html',
    },
    {
      label: 'Statistics Canada — median wages by province (2023)',
      url: 'https://www150.statcan.gc.ca/n1/daily-quotidien/250401/t001b-eng.htm',
    },
    {
      label: 'CRA — Tax rates and brackets (2025)',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/last-year.html',
    },
  ],
};

/** Denominator for federal category shares: total expenses excl. net actuarial losses (Budget 2025 Table A1.9). */
export const FEDERAL_TOTAL_EXPENSE_BILLIONS = 580.9;

/** Denominator for Ontario category shares: total expense, 2025 Ontario Budget 2025–26. */
export const ONTARIO_TOTAL_EXPENSE_BILLIONS = 232.5;

export const FEDERAL_COFFERS: CoffersSnapshot = {
  jurisdiction: 'federal',
  label: 'Canada (federal)',
  fiscalYearLabel: '2025–26',
  revenueBillions: 507.5,
  spendingBillions: 585.9,
  deficitBillions: 78.3,
  deficitNote:
    'Budget 2025 projects a $78.3B budgetary deficit for 2025–26 (about 2.5% of GDP). That gap is financed mainly by government borrowing — selling bonds and bills — not by “printing money.” Bank of Canada monetary operations and money creation are a separate topic from the annual budget deficit. For the last completed year (2024–25 AFR), federal tax revenues were $416.7B, total revenues $511.0B, and the deficit $36.3B.',
  sources: [
    {
      label: 'Budget 2025 — Annex 1 (revenues, expenses, balance)',
      url: 'https://budget.canada.ca/2025/report-rapport/anx1-en.html',
    },
    {
      label: 'Annual Financial Report 2024–25 (actuals)',
      url: 'https://www.canada.ca/en/department-finance/services/publications/annual-financial-report/2025.html',
    },
  ],
};

/** Last completed year — Annual Financial Report (actuals, not Budget projections). */
export const FEDERAL_AFR_ACTUALS = {
  fiscalYearLabel: '2024–25',
  taxRevenueBillions: 416.7,
  revenueBillions: 511.0,
  deficitBillions: 36.3,
  source: {
    label: 'Annual Financial Report of the Government of Canada 2024–25',
    url: 'https://www.canada.ca/en/department-finance/services/publications/annual-financial-report/2025.html',
  },
} as const;

export const ONTARIO_COFFERS: CoffersSnapshot = {
  jurisdiction: 'ontario',
  label: 'Ontario',
  fiscalYearLabel: '2025–26',
  revenueBillions: 219.9,
  spendingBillions: 232.5,
  deficitBillions: 14.6,
  deficitNote:
    'The 2025 Ontario Budget projects a $14.6B deficit for 2025–26 (including a $2.0B reserve). Like the federal deficit, this is financed primarily by provincial borrowing, not by creating money at a central bank.',
  sources: [
    {
      label: '2025 Ontario Budget — Chapter 3',
      url: 'https://budget.ontario.ca/2025/chapter-3.html',
    },
  ],
};

/**
 * Ontario-focused average / median earner snapshot.
 * Income: StatsCan median wages, salaries and commissions, Ontario, both sexes, 2023 ($48,160).
 * Tax: simplified 2025 federal + Ontario brackets with basic personal amounts only.
 */
export const AVERAGE_EARNER: AverageEarnerSnapshot = {
  label: 'Approximate Ontario median wage earner',
  employmentIncome: 48160,
  incomeNote:
    'Statistics Canada median wages, salaries and commissions for Ontario wage earners (both sexes), 2023 constant dollars: $48,160. Used here as a transparent “average earner” proxy — not your personal income.',
  incomeSource: {
    label: 'Statistics Canada — median wages by province (2023)',
    url: 'https://www150.statcan.gc.ca/n1/daily-quotidien/250401/t001b-eng.htm',
  },
  federalTaxApprox: 4640,
  ontarioTaxApprox: 1790,
  taxNote:
    'Simplified 2025 estimate on ~$48,160 employment income: federal ≈ $4,640 and Ontario ≈ $1,790 after basic personal amount credits only. Omits Ontario surtax, other credits/deductions, CPP/EI premiums, Ontario Health Premium, and GST/HST. Not a CRA calculation.',
  taxSource: {
    label: 'CRA — Tax rates and brackets (2025)',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/last-year.html',
  },
};
