import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Landing } from './components/Landing';
import { IncomeForm } from './components/IncomeForm';
import { Receipt } from './components/Receipt';
import { TransparencyPanel } from './components/TransparencyPanel';
import { estimateTaxes } from './lib/taxCalc';
import { loadInputs, saveInputs } from './lib/storage';
import './index.css';

function parseMoney(value: string): number {
  const n = Number(value.replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export default function App() {
  const initial = loadInputs();
  const [employmentIncome, setEmploymentIncome] = useState(initial.employmentIncome);
  const [useOverride, setUseOverride] = useState(initial.useOverride);
  const [federalTaxOverride, setFederalTaxOverride] = useState(initial.federalTaxOverride);
  const [ontarioTaxOverride, setOntarioTaxOverride] = useState(initial.ontarioTaxOverride);
  const [showReceipt, setShowReceipt] = useState(
    Boolean(initial.employmentIncome) ||
      (initial.useOverride &&
        Boolean(initial.federalTaxOverride) &&
        Boolean(initial.ontarioTaxOverride)),
  );
  const receiptRef = useRef<HTMLDivElement>(null);
  const transparencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveInputs({
      employmentIncome,
      federalTaxOverride,
      ontarioTaxOverride,
      useOverride,
    });
  }, [employmentIncome, federalTaxOverride, ontarioTaxOverride, useOverride]);

  const estimate = useMemo(
    () =>
      estimateTaxes({
        employmentIncome: parseMoney(employmentIncome),
        federalTaxOverride: useOverride ? parseMoney(federalTaxOverride) : null,
        ontarioTaxOverride: useOverride ? parseMoney(ontarioTaxOverride) : null,
      }),
    [employmentIncome, useOverride, federalTaxOverride, ontarioTaxOverride],
  );

  const handleSubmit = () => {
    setShowReceipt(true);
    requestAnimationFrame(() => {
      receiptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const jumpTransparency = () => {
    transparencyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app">
      <Header onJumpTransparency={jumpTransparency} />
      <main className="main">
        <Landing />
        <IncomeForm
          employmentIncome={employmentIncome}
          useOverride={useOverride}
          federalTaxOverride={federalTaxOverride}
          ontarioTaxOverride={ontarioTaxOverride}
          onEmploymentIncome={setEmploymentIncome}
          onUseOverride={setUseOverride}
          onFederalOverride={setFederalTaxOverride}
          onOntarioOverride={setOntarioTaxOverride}
          onSubmit={handleSubmit}
        />
        {showReceipt && (
          <div ref={receiptRef}>
            <Receipt estimate={estimate} />
          </div>
        )}
        <div ref={transparencyRef}>
          <TransparencyPanel />
        </div>
      </main>
      <footer className="site-footer">
        <p>Tax Receipt · personal transparency tool for Ontario · not affiliated with any government</p>
      </footer>
    </div>
  );
}
