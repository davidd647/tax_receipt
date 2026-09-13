/**
 * Federal spending category shares for fiscal year 2025–26.
 *
 * Primary source: Budget 2025, Annex 1, Table A1.9 (Expense Outlook).
 * https://budget.canada.ca/2025/report-rapport/anx1-en.html
 *
 * Denominator: $580.9B total expenses excluding net actuarial losses.
 * National defence is carved from direct program expenses as an approximate
 * illustrative share (~$36B) so the receipt can show defence distinctly;
 * remaining direct program + pollution-pricing returns sit in “Other federal programs”.
 * Shares are computed from published $B figures and rounded; they sum to ~1.00.
 */
import type { SpendingCategory } from './types';
import { FEDERAL_TOTAL_EXPENSE_BILLIONS } from './fiscalMeta';

const T = FEDERAL_TOTAL_EXPENSE_BILLIONS;
const BUDGET_URL = 'https://budget.canada.ca/2025/report-rapport/anx1-en.html';
const PBO_URL =
  'https://www.pbo-dpb.ca/en/publications/RP-2526-003-S--government-expenditure-plan-main-estimates-2025-26--plan-depenses-gouvernement-budget-principal-depenses-2025-2026';

function shareOf(billions: number): number {
  return billions / T;
}

export const FEDERAL_SPENDING: SpendingCategory[] = [
  {
    id: 'fed-elderly',
    name: 'Elderly benefits',
    totalBillions: 83.1,
    share: shareOf(83.1),
    oneLiner: 'Old Age Security and Guaranteed Income Supplement for seniors.',
    description:
      'Elderly benefits ($83.1B in Budget 2025) are mainly Old Age Security (OAS) and the Guaranteed Income Supplement (GIS). Spending rises with the number of seniors and CPI indexation.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
  },
  {
    id: 'fed-health-transfer',
    name: 'Canada Health Transfer',
    totalBillions: 54.7,
    share: shareOf(54.7),
    oneLiner: 'Federal cash to provinces and territories for health care.',
    description:
      'The Canada Health Transfer ($54.7B) is the largest federal transfer supporting provincial and territorial health systems. Growth is legislated with a temporary 5% floor through 2027–28.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
  },
  {
    id: 'fed-debt',
    name: 'Public debt charges',
    totalBillions: 55.6,
    share: shareOf(55.6),
    oneLiner: 'Interest the federal government pays on its debt.',
    description:
      'Public debt charges ($55.6B) are the cost of servicing federal market debt and related interest. They are not program spending; they rise with the debt stock and interest rates.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
  },
  {
    id: 'fed-other-pt-transfers',
    name: 'Other transfers to provinces & territories',
    totalBillions: 56.1,
    share: shareOf(56.1),
    oneLiner: 'Equalization, social transfer, child care, and related fiscal transfers.',
    description:
      'This group is major transfers to provinces, territories, and municipalities minus the Canada Health Transfer ($110.8B − $54.7B = $56.1B). It includes Equalization, the Canada Social Transfer, early learning and child care transfers, Territorial Formula Financing, and related arrangements.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
  },
  {
    id: 'fed-defence',
    name: 'National defence (approx.)',
    totalBillions: 36.0,
    share: shareOf(36.0),
    oneLiner: 'Canadian Armed Forces operations, equipment, and readiness.',
    description:
      'Illustrative carve-out (~$36B) from direct program expenses so the receipt can show defence as its own line. Budget 2025 also proposes multi-year reinvestment in the Canadian Armed Forces. Exact DND totals vary between cash Estimates and accrual Public Accounts presentations.',
    sourceUrl: PBO_URL,
    sourceLabel: 'PBO Main Estimates 2025–26; Budget 2025 Ch. 4',
  },
  {
    id: 'fed-ei',
    name: 'Employment Insurance benefits',
    totalBillions: 30.5,
    share: shareOf(30.5),
    oneLiner: 'EI income support and related support measures for workers.',
    description:
      'Employment Insurance benefits ($30.5B) fund income support and related measures when people lose work or need certain leave. Budget 2025 projects a rise tied to a higher unemployment outlook.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
  },
  {
    id: 'fed-ccb',
    name: 'Canada Child Benefit',
    totalBillions: 30.1,
    share: shareOf(30.1),
    oneLiner: 'Tax-free monthly payments to help families raise children.',
    description:
      'The Canada Child Benefit ($30.1B) is a tax-free monthly payment based on family income and the number and ages of children. Amounts are indexed to consumer prices.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
  },
  {
    id: 'fed-other',
    name: 'Other federal programs & operations',
    totalBillions: 234.8,
    share: shareOf(234.8),
    oneLiner: 'Remaining departments, agencies, other transfers, and residual ops.',
    description:
      'Residual of direct program expenses after the defence carve-out, plus pollution-pricing proceeds returned ($265.8B − $36.0B + $5.0B = $234.8B). Includes Indigenous programs, infrastructure and industry transfers, CRA and other departmental operations, Crown corporations’ expenses recorded here, and related items.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
  },
];
