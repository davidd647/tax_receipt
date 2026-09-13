import type { CoffersSnapshot } from '../data/types';
import { FEDERAL_AFR_ACTUALS } from '../data/fiscalMeta';
import { formatBillions } from '../lib/format';

interface CoffersPanelProps {
  federal: CoffersSnapshot;
  ontario: CoffersSnapshot;
}

function CoffersCard({ data }: { data: CoffersSnapshot }) {
  const tone = data.jurisdiction === 'federal' ? 'federal' : 'ontario';
  return (
    <article className={`coffers-card coffers-card--${tone}`}>
      <header className="coffers-card__head">
        <h3>{data.label}</h3>
        <span className="pill pill--soft">FY {data.fiscalYearLabel}</span>
      </header>
      <dl className="coffers-grid">
        {data.taxRevenueBillions != null ? (
          <div>
            <dt>Tax revenue taken in</dt>
            <dd className="num">{formatBillions(data.taxRevenueBillions)}</dd>
          </div>
        ) : null}
        <div>
          <dt>Total revenue</dt>
          <dd className="num">{formatBillions(data.revenueBillions)}</dd>
        </div>
        <div>
          <dt>Total spending</dt>
          <dd className="num">{formatBillions(data.spendingBillions)}</dd>
        </div>
        <div>
          <dt>Deficit (borrowing)</dt>
          <dd className="num num--deficit">{formatBillions(data.deficitBillions)}</dd>
        </div>
      </dl>
      <p className="coffers-card__note">{data.deficitNote}</p>
      <ul className="source-list">
        {data.sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function CoffersPanel({ federal, ontario }: CoffersPanelProps) {
  return (
    <section className="panel" aria-labelledby="coffers-heading">
      <div className="panel__head">
        <h2 id="coffers-heading">Big picture coffers</h2>
        <p className="panel__lede">
          How much tax comes in, what else the coffers receive, what gets spent, and the
          borrowing gap for <strong>Budget 2025 / FY 2025–26</strong>. Deficit = borrowing
          (bonds), not the Bank of Canada printing money.
        </p>
      </div>
      <div className="coffers-pair">
        <CoffersCard data={federal} />
        <CoffersCard data={ontario} />
      </div>
      <aside className="coffers-actuals" aria-label="Last completed federal year">
        <h3>Last completed year (federal actuals)</h3>
        <p>
          FY {FEDERAL_AFR_ACTUALS.fiscalYearLabel}: tax revenue{' '}
          <strong>{formatBillions(FEDERAL_AFR_ACTUALS.taxRevenueBillions)}</strong>, total
          revenue <strong>{formatBillions(FEDERAL_AFR_ACTUALS.revenueBillions)}</strong>,
          deficit <strong>{formatBillions(FEDERAL_AFR_ACTUALS.deficitBillions)}</strong>{' '}
          (borrowing).
        </p>
        <a
          href={FEDERAL_AFR_ACTUALS.source.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {FEDERAL_AFR_ACTUALS.source.label}
        </a>
      </aside>
    </section>
  );
}
