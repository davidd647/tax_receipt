import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './components/Header';
import { CoffersPanel } from './components/CoffersPanel';
import { AverageEarnerPanel } from './components/AverageEarnerPanel';
import { SpendingTree } from './components/SpendingTree';
import { TransparencyPanel } from './components/TransparencyPanel';
import {
  AVERAGE_EARNER,
  FEDERAL_COFFERS,
  ONTARIO_COFFERS,
} from './data/fiscalMeta';
import { FEDERAL_SPENDING_TREE } from './data/federalSpending';
import { ONTARIO_SPENDING_TREE } from './data/ontarioSpending';
import {
  loadUiPrefs,
  saveUiPrefs,
  type JurisdictionFocus,
} from './lib/storage';
import { collectExpandableIds } from './lib/tree';
import './index.css';

export default function App() {
  const initial = loadUiPrefs();
  const [focus, setFocus] = useState<JurisdictionFocus>(initial.focus);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(initial.expandedIds),
  );
  const transparencyRef = useRef<HTMLDivElement>(null);

  const tree = focus === 'federal' ? FEDERAL_SPENDING_TREE : ONTARIO_SPENDING_TREE;
  const averageTax =
    focus === 'federal'
      ? AVERAGE_EARNER.federalTaxApprox
      : AVERAGE_EARNER.ontarioTaxApprox;

  const expandableIds = useMemo(() => collectExpandableIds(tree), [tree]);

  useEffect(() => {
    saveUiPrefs({
      focus,
      expandedIds: Array.from(expandedIds),
    });
  }, [focus, expandedIds]);

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const jumpTransparency = () => {
    transparencyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app">
      <Header onJumpTransparency={jumpTransparency} />
      <main className="main">
        <section className="hero">
          <h1>Where Canadian tax dollars go</h1>
          <p>
            A transparency explorer for <strong>Budget 2025 / FY 2025–26</strong>.
            See national coffers, an Ontario average-earner snapshot, and a
            tap-to-expand spending tree — with no personal income forms.
          </p>
        </section>

        <CoffersPanel federal={FEDERAL_COFFERS} ontario={ONTARIO_COFFERS} />

        <AverageEarnerPanel
          earner={AVERAGE_EARNER}
          focus={focus}
          topCategories={tree}
        />

        <SpendingTree
          focus={focus}
          onFocusChange={setFocus}
          nodes={tree}
          averageTax={averageTax}
          expandedIds={expandedIds}
          onToggle={handleToggle}
          onExpandAll={() => setExpandedIds(new Set(expandableIds))}
          onCollapseAll={() => setExpandedIds(new Set())}
        />

        <div ref={transparencyRef}>
          <TransparencyPanel />
        </div>
      </main>
      <footer className="site-footer">
        <p>
          Tax Receipt · transparency explorer · not affiliated with any government
        </p>
      </footer>
    </div>
  );
}
