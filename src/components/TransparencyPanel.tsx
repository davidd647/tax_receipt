import {
  FEDERAL_TOTAL_EXPENSE_BILLIONS,
  FISCAL_META,
  ONTARIO_TOTAL_EXPENSE_BILLIONS,
} from '../data/fiscalMeta';
import { formatBillions, formatDateISO } from '../lib/format';

export function TransparencyPanel() {
  return (
    <section className="panel panel--transparency" aria-labelledby="transparency-heading">
      <div className="panel__head">
        <h2 id="transparency-heading">Transparency</h2>
        <p className="panel__lede">
          Methodology, fiscal year, sources, and disclaimer. Every number is an
          estimate or Budget published figure — not a personal CRA allocation.
        </p>
      </div>

      <dl className="meta-grid">
        <div>
          <dt>Fiscal year</dt>
          <dd>
            {FISCAL_META.budgetLabel} / FY {FISCAL_META.fiscalYearLabel}
          </dd>
        </div>
        <div>
          <dt>Last reviewed</dt>
          <dd>{formatDateISO(FISCAL_META.lastReviewed)}</dd>
        </div>
        <div>
          <dt>Federal expense denominator</dt>
          <dd>
            {formatBillions(FEDERAL_TOTAL_EXPENSE_BILLIONS)} (excl. net actuarial
            losses)
          </dd>
        </div>
        <div>
          <dt>Ontario expense denominator</dt>
          <dd>{formatBillions(ONTARIO_TOTAL_EXPENSE_BILLIONS)} total expense</dd>
        </div>
        <div>
          <dt>Province focus</dt>
          <dd>{FISCAL_META.province}</dd>
        </div>
      </dl>

      <h3>Methodology</h3>
      <p>{FISCAL_META.methodologySummary}</p>

      <h3>Sources</h3>
      <ul className="source-list">
        {FISCAL_META.sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <h3>Disclaimer</h3>
      <p className="disclaimer">{FISCAL_META.disclaimer}</p>
    </section>
  );
}
