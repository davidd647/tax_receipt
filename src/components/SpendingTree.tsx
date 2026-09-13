import type { Jurisdiction, SpendingNode } from '../data/types';
import { formatBillions, formatCAD, formatPercent } from '../lib/format';
import { earnerShare } from '../lib/tree';

interface SpendingTreeProps {
  focus: Jurisdiction;
  onFocusChange: (focus: Jurisdiction) => void;
  nodes: SpendingNode[];
  averageTax: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

interface NodeRowProps {
  node: SpendingNode;
  depth: number;
  averageTax: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
}

function NodeRow({ node, depth, averageTax, expandedIds, onToggle }: NodeRowProps) {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isOpen = expandedIds.has(node.id);
  const dollars = earnerShare(node, averageTax);

  return (
    <li className={`tree-node tree-node--depth-${Math.min(depth, 3)}`}>
      <div className="tree-node__row">
        {hasChildren ? (
          <button
            type="button"
            className="tree-node__toggle"
            aria-expanded={isOpen}
            aria-controls={`children-${node.id}`}
            onClick={() => onToggle(node.id)}
          >
            <span className="tree-node__chevron" aria-hidden="true">
              {isOpen ? '▼' : '▶'}
            </span>
            <span className="tree-node__name">{node.name}</span>
          </button>
        ) : (
          <div className="tree-node__leaf">
            <span className="tree-node__chevron tree-node__chevron--spacer" aria-hidden="true">
              •
            </span>
            <span className="tree-node__name">{node.name}</span>
          </div>
        )}
        <div className="tree-node__metrics">
          <span className="metric">
            <span className="metric__label">Share</span>
            <span className="metric__value">{formatPercent(node.share)}</span>
          </span>
          <span className="metric">
            <span className="metric__label">National</span>
            <span className="metric__value">{formatBillions(node.totalBillions)}</span>
          </span>
          <span className="metric metric--you">
            <span className="metric__label">Avg earner</span>
            <span className="metric__value num">{formatCAD(dollars)}</span>
          </span>
        </div>
      </div>
      <p className="tree-node__blurb">{node.oneLiner}</p>
      {isOpen && node.description ? (
        <p className="tree-node__desc">
          {node.description}{' '}
          <a href={node.sourceUrl} target="_blank" rel="noopener noreferrer">
            {node.sourceLabel}
          </a>
        </p>
      ) : null}
      {hasChildren && isOpen ? (
        <ul id={`children-${node.id}`} className="tree-node__children">
          {node.children!.map((child) => (
            <NodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              averageTax={averageTax}
              expandedIds={expandedIds}
              onToggle={onToggle}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function SpendingTree({
  focus,
  onFocusChange,
  nodes,
  averageTax,
  expandedIds,
  onToggle,
  onExpandAll,
  onCollapseAll,
}: SpendingTreeProps) {
  return (
    <section className="panel panel--tree" aria-labelledby="tree-heading">
      <div className="panel__head panel__head--row">
        <div>
          <h2 id="tree-heading">Branched spending tree</h2>
          <p className="panel__lede">
            Tap a category to expand subordinate funding. Each node shows % of the
            jurisdiction budget, national $B, and the average earner’s dollar share.
          </p>
        </div>
        <div className="focus-switch" role="group" aria-label="Spending focus">
          <button
            type="button"
            className={focus === 'federal' ? 'focus-switch__btn is-active' : 'focus-switch__btn'}
            aria-pressed={focus === 'federal'}
            onClick={() => onFocusChange('federal')}
          >
            Federal
          </button>
          <button
            type="button"
            className={focus === 'ontario' ? 'focus-switch__btn is-active' : 'focus-switch__btn'}
            aria-pressed={focus === 'ontario'}
            onClick={() => onFocusChange('ontario')}
          >
            Ontario
          </button>
        </div>
      </div>

      <div className="tree-toolbar">
        <p className="tree-toolbar__hint">
          Showing{' '}
          <strong>{focus === 'federal' ? 'federal' : 'Ontario'}</strong> spending · avg
          tax pile {formatCAD(averageTax, { cents: false })}
        </p>
        <div className="tree-toolbar__actions">
          <button type="button" className="ghost-btn" onClick={onExpandAll}>
            Expand all
          </button>
          <button type="button" className="ghost-btn" onClick={onCollapseAll}>
            Collapse all
          </button>
        </div>
      </div>

      <ul className="spending-tree">
        {nodes.map((n) => (
          <NodeRow
            key={n.id}
            node={n}
            depth={0}
            averageTax={averageTax}
            expandedIds={expandedIds}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  );
}
