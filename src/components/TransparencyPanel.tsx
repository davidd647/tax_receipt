import { FISCAL_META } from '../data/fiscalMeta';
import {
  FEDERAL_BPA_2025,
  ONTARIO_BPA_2025,
  TAX_YEAR_LABEL,
} from '../data/taxBrackets';
import { formatDateISO } from '../lib/format';

export function TransparencyPanel() {
  return (
    <section
      id="transparency"
      className="card transparency"
      aria-labelledby="transparency-heading"
    >
      <h2 id="transparency-heading">Transparency</h2>

      <dl className="meta-list">
        <div>
          <dt>Fiscal year</dt>
          <dd>{FISCAL_META.fiscalYearLabel}</dd>
        </div>
        <div>
          <dt>Tax year used for brackets</dt>
          <dd>{TAX_YEAR_LABEL}</dd>
        </div>
        <div>
          <dt>Province</dt>
          <dd>{FISCAL_META.province}</dd>
        </div>
        <div>
          <dt>Last reviewed</dt>
          <dd>{formatDateISO(FISCAL_META.lastReviewed)}</dd>
        </div>
      </dl>

      <h3>Methodology (plain English)</h3>
      <p>{FISCAL_META.methodologySummary}</p>
      <ul className="plain-list">
        <li>
          Federal basic personal amount modeled at {FEDERAL_BPA_2025.toLocaleString('en-CA')}{' '}
          CAD × 14.5% credit rate.
        </li>
        <li>
          Ontario basic personal amount modeled at {ONTARIO_BPA_2025.toLocaleString('en-CA')}{' '}
          CAD × 5.05% credit rate (Ontario surtax not modeled).
        </li>
        <li>
          Your $ for a category = (your tax for that government) × (category’s share of that
          government’s total expenses).
        </li>
        <li>
          Program totals ($B) are the Budget figures for that category in {FISCAL_META.fiscalYearLabel}.
        </li>
      </ul>

      <h3>Sources</h3>
      <ul className="source-list">
        {FISCAL_META.sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.label}
            </a>
          </li>
        ))}
      </ul>

      <h3>Disclaimer</h3>
      <p className="disclaimer">{FISCAL_META.disclaimer}</p>
    </section>
  );
}
