import { useId, useState } from 'react';
import type { CategoryReceiptLine } from '../lib/taxCalc';
import { formatBillions, formatCAD, formatPercent } from '../lib/format';

interface CategoryRowProps {
  line: CategoryReceiptLine;
  maxDollars: number;
  barClass: string;
}

export function CategoryRow({ line, maxDollars, barClass }: CategoryRowProps) {
  const uid = useId();
  const [expanded, setExpanded] = useState(false);
  const panelId = `${uid}-panel`;
  const width = maxDollars > 0 ? Math.max(4, (line.yourDollars / maxDollars) * 100) : 0;

  return (
    <article className="category">
      <button
        type="button"
        className="category__toggle"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="category__top">
          <div className="category__names">
            <h4 className="category__name">{line.category.name}</h4>
            <p className="category__one-liner">{line.category.oneLiner}</p>
          </div>
          <div className="category__figures">
            <p className="category__your">{formatCAD(line.yourDollars)}</p>
            <p className="category__meta">
              {formatPercent(line.percent)} · program {formatBillions(line.totalBillions)}
            </p>
          </div>
        </div>
        <div
          className="bar"
          role="img"
          aria-label={`${formatPercent(line.percent)} of this jurisdiction’s spending`}
        >
          <div className={`bar__fill ${barClass}`} style={{ width: `${width}%` }} />
        </div>
        <span className="category__hint">{expanded ? 'Hide details' : 'Show details'}</span>
      </button>

      {expanded && (
        <div id={panelId} className="category__detail">
          <p>{line.category.description}</p>
          <p>
            <a
              href={line.category.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source: {line.category.sourceLabel}
            </a>
          </p>
        </div>
      )}
    </article>
  );
}
