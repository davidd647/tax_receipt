import type { TaxEstimate } from '../lib/taxCalc';
import { federalReceipt, ontarioReceipt } from '../lib/taxCalc';
import { formatCAD } from '../lib/format';
import { FISCAL_META } from '../data/fiscalMeta';
import { CategoryRow } from './CategoryRow';

interface ReceiptProps {
  estimate: TaxEstimate;
}

export function Receipt({ estimate }: ReceiptProps) {
  const fedLines = federalReceipt(estimate.federalTax);
  const onLines = ontarioReceipt(estimate.ontarioTax);
  const fedMax = Math.max(...fedLines.map((l) => l.yourDollars), 0);
  const onMax = Math.max(...onLines.map((l) => l.yourDollars), 0);

  return (
    <section className="receipt card" aria-labelledby="receipt-heading">
      <div className="receipt__header">
        <h2 id="receipt-heading">Your tax receipt</h2>
        <p className="muted">
          Fiscal year {FISCAL_META.fiscalYearLabel}
          {estimate.usedOverride ? ' · using your tax override' : ' · simplified 2025 bracket estimate'}
        </p>
      </div>

      <div className="totals" role="group" aria-label="Tax totals">
        <div className="totals__item">
          <p className="totals__label">Federal tax</p>
          <p className="totals__value">{formatCAD(estimate.federalTax)}</p>
        </div>
        <div className="totals__item">
          <p className="totals__label">Ontario tax</p>
          <p className="totals__value">{formatCAD(estimate.ontarioTax)}</p>
        </div>
        <div className="totals__item totals__item--emphasis">
          <p className="totals__label">Total</p>
          <p className="totals__value">{formatCAD(estimate.totalTax)}</p>
        </div>
      </div>

      <div className="receipt__section">
        <h3 className="section-title section-title--federal">Federal</h3>
        <p className="section-note">
          Your federal income tax allocated by Budget 2025 expense shares.
        </p>
        <div className="category-list">
          {fedLines.map((line) => (
            <CategoryRow
              key={line.category.id}
              line={line}
              maxDollars={fedMax}
              barClass="bar__fill--federal"
            />
          ))}
        </div>
      </div>

      <div className="receipt__section">
        <h3 className="section-title section-title--ontario">Ontario</h3>
        <p className="section-note">
          Your Ontario income tax allocated by 2025 Ontario Budget expense shares.
        </p>
        <div className="category-list">
          {onLines.map((line) => (
            <CategoryRow
              key={line.category.id}
              line={line}
              maxDollars={onMax}
              barClass="bar__fill--ontario"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
