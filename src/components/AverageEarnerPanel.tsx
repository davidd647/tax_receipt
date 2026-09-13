import type { AverageEarnerSnapshot, Jurisdiction } from '../data/types';
import type { SpendingNode } from '../data/types';
import { formatCAD, formatBillions, formatPercent } from '../lib/format';
import { earnerShare } from '../lib/tree';

interface AverageEarnerPanelProps {
  earner: AverageEarnerSnapshot;
  focus: Jurisdiction;
  topCategories: SpendingNode[];
}

export function AverageEarnerPanel({
  earner,
  focus,
  topCategories,
}: AverageEarnerPanelProps) {
  const averageTax =
    focus === 'federal' ? earner.federalTaxApprox : earner.ontarioTaxApprox;
  const taxLabel = focus === 'federal' ? 'federal income tax' : 'Ontario income tax';
  const topFive = [...topCategories]
    .sort((a, b) => b.totalBillions - a.totalBillions)
    .slice(0, 6);

  return (
    <section className="panel" aria-labelledby="earner-heading">
      <div className="panel__head">
        <h2 id="earner-heading">Average earner snapshot</h2>
        <p className="panel__lede">
          No personal salary inputs. We map a cited Ontario median wage onto Budget
          category shares so you can see “if that average tax were a pile of dollars…”
        </p>
      </div>

      <div className="earner-stats">
        <div className="stat-card">
          <p className="stat-card__label">Median employment income (ON)</p>
          <p className="stat-card__value num">
            {formatCAD(earner.employmentIncome, { cents: false })}
          </p>
          <p className="stat-card__hint">{earner.incomeNote}</p>
          <a
            href={earner.incomeSource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {earner.incomeSource.label}
          </a>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Approx. federal income tax</p>
          <p className="stat-card__value num">
            {formatCAD(earner.federalTaxApprox, { cents: false })}
          </p>
          <p className="stat-card__label" style={{ marginTop: '0.75rem' }}>
            Approx. Ontario income tax
          </p>
          <p className="stat-card__value num">
            {formatCAD(earner.ontarioTaxApprox, { cents: false })}
          </p>
          <p className="stat-card__hint">{earner.taxNote}</p>
          <a href={earner.taxSource.url} target="_blank" rel="noopener noreferrer">
            {earner.taxSource.label}
          </a>
        </div>
      </div>

      <div className="earner-map">
        <h3>
          If that average {taxLabel} ({formatCAD(averageTax, { cents: false })}) were
          a pile of dollars…
        </h3>
        <p className="panel__lede">
          Top slices of the current focus ({focus === 'federal' ? 'Federal' : 'Ontario'}
          ). Expand the spending tree below for every branch.
        </p>
        <ul className="earner-map__list">
          {topFive.map((cat) => (
            <li key={cat.id}>
              <div className="earner-map__row">
                <span className="earner-map__name">{cat.name}</span>
                <span className="earner-map__pct">{formatPercent(cat.share)}</span>
                <span className="earner-map__nat">{formatBillions(cat.totalBillions)}</span>
                <span className="earner-map__you num">
                  {formatCAD(earnerShare(cat, averageTax))}
                </span>
              </div>
              <div
                className="earner-map__bar"
                style={{ width: `${Math.max(cat.share * 100, 1.5)}%` }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
