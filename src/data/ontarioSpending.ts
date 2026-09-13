/**
 * Ontario spending category shares for fiscal year 2025–26.
 *
 * Primary source: 2025 Ontario Budget expense outlook.
 * https://budget.ontario.ca/2025/chapter-3.html
 * https://budget.ontario.ca/2025/brief.html
 *
 * Denominator: $232.5B total expense (program expense $216.3B + interest $16.2B).
 * Shares are computed from published $B figures and rounded; they sum to ~1.00.
 */
import type { SpendingCategory } from './types';
import { ONTARIO_TOTAL_EXPENSE_BILLIONS } from './fiscalMeta';

const T = ONTARIO_TOTAL_EXPENSE_BILLIONS;
const ON_BUDGET_URL = 'https://budget.ontario.ca/2025/chapter-3.html';
const ON_BRIEF_URL = 'https://budget.ontario.ca/2025/brief.html';

function shareOf(billions: number): number {
  return billions / T;
}

export const ONTARIO_SPENDING: SpendingCategory[] = [
  {
    id: 'on-health',
    name: 'Health',
    totalBillions: 91.1,
    share: shareOf(91.1),
    oneLiner: 'Hospitals, OHIP, drugs, long-term care, and public health.',
    description:
      'Health sector expense ($91.1B) is the largest slice of the Ontario Budget. It covers hospital funding, physician and OHIP services, the Ontario Public Drug Programs, long-term care, and related health services.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
  },
  {
    id: 'on-education',
    name: 'Education (K–12)',
    totalBillions: 41.0,
    share: shareOf(41.0),
    oneLiner: 'Public elementary and secondary schools and school boards.',
    description:
      'Education sector expense ($41.0B) funds Ontario’s publicly funded elementary and secondary school system, including school board operating grants and related education programs.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
  },
  {
    id: 'on-other',
    name: 'Other provincial programs',
    totalBillions: 44.1,
    share: shareOf(44.1),
    oneLiner: 'Infrastructure, economic development, environment, and other ministries.',
    description:
      'Other programs ($44.1B) bundle remaining provincial ministries and contingency items outside the named sectors—transportation and infrastructure supports, economic development, natural resources, environment, and similar program areas as presented in the Budget tables.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
  },
  {
    id: 'on-social',
    name: 'Children, community & social services',
    totalBillions: 20.4,
    share: shareOf(20.4),
    oneLiner: 'Ontario Works, developmental services, autism, and family supports.',
    description:
      'Children, Community and Social Services ($20.4B) includes income and employment supports such as Ontario Works, developmental services, child welfare, and programs like the Ontario Autism Program.',
    sourceUrl: ON_BUDGET_URL,
    sourceLabel: '2025 Ontario Budget, Chapter 3',
  },
  {
    id: 'on-debt',
    name: 'Interest on debt',
    totalBillions: 16.2,
    share: shareOf(16.2),
    oneLiner: 'Interest Ontario pays to service its provincial debt.',
    description:
      'Interest and other debt-servicing charges ($16.2B) are the cost of borrowing. Ontario now presents interest on a gross basis (interest income shown separately as revenue).',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
  },
  {
    id: 'on-pse',
    name: 'Postsecondary education',
    totalBillions: 13.0,
    share: shareOf(13.0),
    oneLiner: 'Colleges, universities, and student financial assistance.',
    description:
      'Postsecondary education sector expense ($13.0B) supports colleges and universities and student financial assistance programs.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
  },
  {
    id: 'on-justice',
    name: 'Justice',
    totalBillions: 6.7,
    share: shareOf(6.7),
    oneLiner: 'Policing supports, courts, corrections, and public safety.',
    description:
      'Justice sector expense ($6.7B) covers courts, correctional services, criminal prosecutions, and related public safety and justice administration.',
    sourceUrl: ON_BRIEF_URL,
    sourceLabel: '2025 Ontario Budget — In Brief',
  },
];
