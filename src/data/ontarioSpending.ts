/**
 * Ontario spending tree for fiscal year 2025–26.
 *
 * Primary source: 2025 Ontario Budget expense outlook.
 * https://budget.ontario.ca/2025/chapter-3.html
 * https://budget.ontario.ca/2025/brief.html
 *
 * Denominator: $232.5B total expense (program $216.3B + interest $16.2B).
 * Nested children are illustrative sector splits that sum to each parent.
 */
import type { SpendingNode } from './types';
import { ONTARIO_TOTAL_EXPENSE_BILLIONS } from './fiscalMeta';

const T = ONTARIO_TOTAL_EXPENSE_BILLIONS;
const ON_BUDGET_URL = 'https://budget.ontario.ca/2025/chapter-3.html';
const ON_BRIEF_URL = 'https://budget.ontario.ca/2025/brief.html';

function shareOf(billions: number): number {
  return billions / T;
}

function node(
  partial: Omit<SpendingNode, 'share'> & { totalBillions: number },
): SpendingNode {
  return { ...partial, share: shareOf(partial.totalBillions) };
}

export const ONTARIO_SPENDING_TREE: SpendingNode[] = [
  node({
    id: 'on-health',
    name: 'Health',
    totalBillions: 91.1,
    oneLiner: 'Hospitals, OHIP, drugs, long-term care, and public health.',
    description:
      'Health sector expense ($91.1B) is the largest slice of the Ontario Budget.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
    children: [
      node({
        id: 'on-health-hospitals',
        name: 'Hospitals (approx.)',
        totalBillions: 32.0,
        oneLiner: 'Hospital operating funding and related supports.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative health-sector split',
      }),
      node({
        id: 'on-health-ohip',
        name: 'OHIP / physician services (approx.)',
        totalBillions: 22.0,
        oneLiner: 'Physician and related OHIP insured services.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative health-sector split',
      }),
      node({
        id: 'on-health-drugs',
        name: 'Ontario Public Drug Programs (approx.)',
        totalBillions: 8.5,
        oneLiner: 'Provincial drug benefits and related pharmacy programs.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative health-sector split',
      }),
      node({
        id: 'on-health-ltc',
        name: 'Long-term care (approx.)',
        totalBillions: 9.5,
        oneLiner: 'Long-term care homes and related capacity funding.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative health-sector split',
      }),
      node({
        id: 'on-health-other',
        name: 'Other health & public health (approx.)',
        totalBillions: 19.1,
        oneLiner: 'Home care, mental health, public health, and residual health.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative health-sector split',
      }),
    ],
  }),
  node({
    id: 'on-education',
    name: 'Education (K–12)',
    totalBillions: 41.0,
    oneLiner: 'Public elementary and secondary schools and school boards.',
    description:
      'Education sector expense ($41.0B) funds Ontario’s publicly funded K–12 system.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
    children: [
      node({
        id: 'on-education-grants',
        name: 'School board operating grants (approx.)',
        totalBillions: 32.0,
        oneLiner: 'Core Grants for Student Needs and related board funding.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative education split',
      }),
      node({
        id: 'on-education-other',
        name: 'Other K–12 programs (approx.)',
        totalBillions: 9.0,
        oneLiner: 'Ministry programs, capital supports booked here, and residuals.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative education split',
      }),
    ],
  }),
  node({
    id: 'on-social',
    name: 'Children, community & social services',
    totalBillions: 20.4,
    oneLiner: 'Ontario Works, developmental services, autism, and family supports.',
    sourceUrl: ON_BUDGET_URL,
    sourceLabel: '2025 Ontario Budget, Chapter 3',
    children: [
      node({
        id: 'on-social-ow',
        name: 'Ontario Works & income supports (approx.)',
        totalBillions: 8.5,
        oneLiner: 'Social assistance and related employment supports.',
        sourceUrl: ON_BUDGET_URL,
        sourceLabel: 'Illustrative social-services split',
      }),
      node({
        id: 'on-social-dev',
        name: 'Developmental services & autism (approx.)',
        totalBillions: 6.5,
        oneLiner: 'Developmental services and Ontario Autism Program supports.',
        sourceUrl: ON_BUDGET_URL,
        sourceLabel: 'Illustrative social-services split',
      }),
      node({
        id: 'on-social-other',
        name: 'Child welfare & other (approx.)',
        totalBillions: 5.4,
        oneLiner: 'Child welfare and remaining community / family programs.',
        sourceUrl: ON_BUDGET_URL,
        sourceLabel: 'Illustrative social-services split',
      }),
    ],
  }),
  node({
    id: 'on-debt',
    name: 'Interest on debt',
    totalBillions: 16.2,
    oneLiner: 'Interest Ontario pays to service its provincial debt.',
    description:
      'Interest and other debt-servicing charges ($16.2B). Ontario presents interest on a gross basis.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
  }),
  node({
    id: 'on-pse',
    name: 'Postsecondary education',
    totalBillions: 13.0,
    oneLiner: 'Colleges, universities, and student financial assistance.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
    children: [
      node({
        id: 'on-pse-inst',
        name: 'Colleges & universities (approx.)',
        totalBillions: 10.0,
        oneLiner: 'Operating grants and related institutional supports.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative PSE split',
      }),
      node({
        id: 'on-pse-aid',
        name: 'Student financial assistance (approx.)',
        totalBillions: 3.0,
        oneLiner: 'OSAP and related student aid.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative PSE split',
      }),
    ],
  }),
  node({
    id: 'on-justice',
    name: 'Justice & public safety',
    totalBillions: 6.7,
    oneLiner: 'Policing supports, courts, corrections, and public safety.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
    children: [
      node({
        id: 'on-justice-police',
        name: 'Policing supports (approx.)',
        totalBillions: 2.5,
        oneLiner: 'Provincial policing and related public-safety supports.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative justice split',
      }),
      node({
        id: 'on-justice-courts',
        name: 'Courts & prosecutions (approx.)',
        totalBillions: 2.0,
        oneLiner: 'Court services and criminal prosecutions.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative justice split',
      }),
      node({
        id: 'on-justice-corr',
        name: 'Corrections & other (approx.)',
        totalBillions: 2.2,
        oneLiner: 'Correctional services and residual justice programs.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative justice split',
      }),
    ],
  }),
  node({
    id: 'on-other',
    name: 'Other provincial programs',
    totalBillions: 44.1,
    oneLiner: 'Infrastructure, economic development, environment, and other ministries.',
    description:
      'Other programs ($44.1B) bundle remaining ministries outside the named sectors.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
    children: [
      node({
        id: 'on-other-infra',
        name: 'Transportation & infrastructure (approx.)',
        totalBillions: 16.0,
        oneLiner: 'Transit, highways, and infrastructure program spending.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative other-programs split',
      }),
      node({
        id: 'on-other-econ',
        name: 'Economic development & labour (approx.)',
        totalBillions: 10.0,
        oneLiner: 'Jobs, skills, and economic development programs.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative other-programs split',
      }),
      node({
        id: 'on-other-env',
        name: 'Environment & natural resources (approx.)',
        totalBillions: 6.0,
        oneLiner: 'Environment, energy, and natural-resources programs.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative other-programs split',
      }),
      node({
        id: 'on-other-rest',
        name: 'Remaining ministries & contingency (approx.)',
        totalBillions: 12.1,
        oneLiner: 'Other ministries, contingency, and residual items.',
        sourceUrl: ON_BRIEF_URL,
        sourceLabel: 'Illustrative other-programs split',
      }),
    ],
  }),
];
