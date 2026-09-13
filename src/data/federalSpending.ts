/**
 * Federal spending tree for fiscal year 2025–26.
 *
 * Primary source: Budget 2025, Annex 1, Table A1.9 (Expense Outlook).
 * https://budget.canada.ca/2025/report-rapport/anx1-en.html
 *
 * Denominator: $580.9B total expenses excluding net actuarial losses.
 * Nested children are illustrative Budget/PBO-style carve-outs that sum to
 * each parent; lines marked “approx.” are not standalone Budget table rows.
 */
import type { SpendingNode } from './types';
import { FEDERAL_TOTAL_EXPENSE_BILLIONS } from './fiscalMeta';

const T = FEDERAL_TOTAL_EXPENSE_BILLIONS;
const BUDGET_URL = 'https://budget.canada.ca/2025/report-rapport/anx1-en.html';
const PBO_URL =
  'https://www.pbo-dpb.ca/en/publications/RP-2526-003-S--government-expenditure-plan-main-estimates-2025-26--plan-depenses-gouvernement-budget-principal-depenses-2025-2026';

function shareOf(billions: number): number {
  return billions / T;
}

function node(
  partial: Omit<SpendingNode, 'share'> & { totalBillions: number },
): SpendingNode {
  return { ...partial, share: shareOf(partial.totalBillions) };
}

export const FEDERAL_SPENDING_TREE: SpendingNode[] = [
  node({
    id: 'fed-elderly',
    name: 'Elderly benefits',
    totalBillions: 83.1,
    oneLiner: 'Old Age Security and Guaranteed Income Supplement for seniors.',
    description:
      'Elderly benefits ($83.1B in Budget 2025) are mainly OAS and GIS. Spending rises with the number of seniors and CPI indexation.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
    children: [
      node({
        id: 'fed-elderly-oas',
        name: 'Old Age Security (approx.)',
        totalBillions: 70.0,
        oneLiner: 'Monthly OAS pensions for eligible seniors.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Budget 2025 (illustrative split of elderly benefits)',
      }),
      node({
        id: 'fed-elderly-gis',
        name: 'GIS & Allowance (approx.)',
        totalBillions: 13.1,
        oneLiner: 'Income-tested top-ups for lower-income seniors.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Budget 2025 (illustrative split of elderly benefits)',
      }),
    ],
  }),
  node({
    id: 'fed-health',
    name: 'Health transfers',
    totalBillions: 54.7,
    oneLiner: 'Canada Health Transfer to provinces and territories.',
    description:
      'The Canada Health Transfer ($54.7B) is the largest federal cash transfer supporting provincial and territorial health systems.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
    children: [
      node({
        id: 'fed-health-cht',
        name: 'Canada Health Transfer',
        totalBillions: 54.7,
        oneLiner: 'Legislated federal health cash to PTs; temporary 5% growth floor through 2027–28.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
      }),
    ],
  }),
  node({
    id: 'fed-pt-transfers',
    name: 'Other transfers to provinces & territories',
    totalBillions: 56.1,
    oneLiner: 'Equalization, social transfer, child care, and related fiscal transfers.',
    description:
      'Major transfers to PTs and municipalities minus CHT ($110.8B − $54.7B = $56.1B). Child splits below are illustrative.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
    children: [
      node({
        id: 'fed-pt-eq',
        name: 'Equalization (approx.)',
        totalBillions: 26.2,
        oneLiner: 'Unconditional fiscal capacity equalization among provinces.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Budget 2025 (illustrative carve-out)',
      }),
      node({
        id: 'fed-pt-cst',
        name: 'Canada Social Transfer (approx.)',
        totalBillions: 17.0,
        oneLiner: 'Support for social services, post-secondary, and child programs.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Budget 2025 (illustrative carve-out)',
      }),
      node({
        id: 'fed-pt-childcare',
        name: 'Early learning & child care (approx.)',
        totalBillions: 7.5,
        oneLiner: 'Federal transfers supporting $10-a-day style child-care agreements.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Budget 2025 (illustrative carve-out)',
      }),
      node({
        id: 'fed-pt-other',
        name: 'Territorial & other PT transfers (approx.)',
        totalBillions: 5.4,
        oneLiner: 'Territorial Formula Financing and remaining municipal/PT transfers.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Budget 2025 (illustrative carve-out)',
      }),
    ],
  }),
  node({
    id: 'fed-debt',
    name: 'Public debt charges',
    totalBillions: 55.6,
    oneLiner: 'Interest the federal government pays on its debt.',
    description:
      'Public debt charges ($55.6B) service federal market debt. Not program spending; they rise with the debt stock and interest rates.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
  }),
  node({
    id: 'fed-defence',
    name: 'National defence (approx.)',
    totalBillions: 36.0,
    oneLiner: 'Canadian Armed Forces operations, equipment, and readiness.',
    description:
      'Illustrative carve-out (~$36B) from direct program expenses. Exact DND totals vary between cash Estimates and accrual Public Accounts.',
    sourceUrl: PBO_URL,
    sourceLabel: 'PBO Main Estimates 2025–26; Budget 2025',
    children: [
      node({
        id: 'fed-defence-ops',
        name: 'Personnel & operations (approx.)',
        totalBillions: 22.0,
        oneLiner: 'Pay, benefits, readiness, and day-to-day CAF operations.',
        sourceUrl: PBO_URL,
        sourceLabel: 'Illustrative split of defence carve-out',
      }),
      node({
        id: 'fed-defence-capital',
        name: 'Equipment & capital (approx.)',
        totalBillions: 14.0,
        oneLiner: 'Ships, aircraft, vehicles, infrastructure, and related capital.',
        sourceUrl: PBO_URL,
        sourceLabel: 'Illustrative split of defence carve-out',
      }),
    ],
  }),
  node({
    id: 'fed-ei',
    name: 'Employment Insurance benefits',
    totalBillions: 30.5,
    oneLiner: 'EI income support and related measures for workers.',
    description:
      'Employment Insurance benefits ($30.5B) fund income support when people lose work or need certain leave.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
  }),
  node({
    id: 'fed-children',
    name: 'Children & families',
    totalBillions: 30.1,
    oneLiner: 'Canada Child Benefit and related family supports in this line.',
    description:
      'Canada Child Benefit ($30.1B) is a tax-free monthly payment based on family income and children’s ages.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
    children: [
      node({
        id: 'fed-ccb',
        name: 'Canada Child Benefit',
        totalBillions: 30.1,
        oneLiner: 'Tax-free monthly payments to help families raise children.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Budget 2025, Annex 1, Table A1.9',
      }),
    ],
  }),
  node({
    id: 'fed-indigenous',
    name: 'Indigenous services & relations (approx.)',
    totalBillions: 28.0,
    oneLiner: 'ISC, Crown–Indigenous Relations, and related Indigenous program spending.',
    description:
      'Illustrative carve-out from remaining direct program expenses for Indigenous-focused departments and transfers.',
    sourceUrl: PBO_URL,
    sourceLabel: 'PBO / Budget 2025 (illustrative carve-out)',
    children: [
      node({
        id: 'fed-indigenous-isc',
        name: 'Indigenous Services (approx.)',
        totalBillions: 20.0,
        oneLiner: 'Health, housing, education, and community infrastructure supports.',
        sourceUrl: PBO_URL,
        sourceLabel: 'Illustrative carve-out',
      }),
      node({
        id: 'fed-indigenous-cirn',
        name: 'Crown–Indigenous Relations & other (approx.)',
        totalBillions: 8.0,
        oneLiner: 'Treaties, self-government, and related CIRNAC spending.',
        sourceUrl: PBO_URL,
        sourceLabel: 'Illustrative carve-out',
      }),
    ],
  }),
  node({
    id: 'fed-safety',
    name: 'Public safety (approx.)',
    totalBillions: 14.0,
    oneLiner: 'RCMP, CBSA, corrections, and related federal safety agencies.',
    sourceUrl: PBO_URL,
    sourceLabel: 'PBO / Budget 2025 (illustrative carve-out)',
    children: [
      node({
        id: 'fed-safety-rcmp',
        name: 'RCMP & policing (approx.)',
        totalBillions: 7.0,
        oneLiner: 'Federal policing and contract policing supports.',
        sourceUrl: PBO_URL,
        sourceLabel: 'Illustrative carve-out',
      }),
      node({
        id: 'fed-safety-cbsa',
        name: 'Border & CBSA (approx.)',
        totalBillions: 3.5,
        oneLiner: 'Border services, customs, and immigration enforcement at ports.',
        sourceUrl: PBO_URL,
        sourceLabel: 'Illustrative carve-out',
      }),
      node({
        id: 'fed-safety-corr',
        name: 'Corrections & other safety (approx.)',
        totalBillions: 3.5,
        oneLiner: 'CSC and remaining public-safety program spending.',
        sourceUrl: PBO_URL,
        sourceLabel: 'Illustrative carve-out',
      }),
    ],
  }),
  node({
    id: 'fed-international',
    name: 'International assistance (approx.)',
    totalBillions: 8.0,
    oneLiner: 'Official development assistance and related international programs.',
    sourceUrl: PBO_URL,
    sourceLabel: 'PBO / Budget 2025 (illustrative carve-out)',
  }),
  node({
    id: 'fed-ops',
    name: 'Federal operations & other programs',
    totalBillions: 184.8,
    oneLiner: 'Remaining departments, agencies, transfers, and residual ops.',
    description:
      'Residual after named carve-outs from direct program expenses / other lines ($234.8B prior residual − $28B Indigenous − $14B safety − $8B international = $184.8B). Includes CRA, infrastructure and industry supports, Crown corps recorded here, pollution-pricing returns, and similar items.',
    sourceUrl: BUDGET_URL,
    sourceLabel: 'Budget 2025 residual after illustrative carve-outs',
    children: [
      node({
        id: 'fed-ops-cra',
        name: 'Tax administration & benefits delivery (approx.)',
        totalBillions: 12.0,
        oneLiner: 'CRA operations and related benefit administration.',
        sourceUrl: PBO_URL,
        sourceLabel: 'Illustrative carve-out',
      }),
      node({
        id: 'fed-ops-infra',
        name: 'Infrastructure & industry supports (approx.)',
        totalBillions: 40.0,
        oneLiner: 'Infrastructure funding, innovation, and economic development transfers.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Illustrative carve-out',
      }),
      node({
        id: 'fed-ops-other',
        name: 'All other federal programs (approx.)',
        totalBillions: 132.8,
        oneLiner: 'Remaining ministries, agencies, Crown expenses, and residuals.',
        sourceUrl: BUDGET_URL,
        sourceLabel: 'Budget 2025 residual',
      }),
    ],
  }),
];
