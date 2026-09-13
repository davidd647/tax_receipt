interface IncomeFormProps {
  employmentIncome: string;
  useOverride: boolean;
  federalTaxOverride: string;
  ontarioTaxOverride: string;
  onEmploymentIncome: (value: string) => void;
  onUseOverride: (value: boolean) => void;
  onFederalOverride: (value: string) => void;
  onOntarioOverride: (value: string) => void;
  onSubmit: () => void;
}

export function IncomeForm({
  employmentIncome,
  useOverride,
  federalTaxOverride,
  ontarioTaxOverride,
  onEmploymentIncome,
  onUseOverride,
  onFederalOverride,
  onOntarioOverride,
  onSubmit,
}: IncomeFormProps) {
  return (
    <section className="card form-card" aria-labelledby="income-heading">
      <h2 id="income-heading">Your income</h2>
      <p className="muted">Province is fixed to Ontario for this version.</p>

      <form
        className="income-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label className="field">
          <span className="field__label">Annual employment income (CAD)</span>
          <input
            className="field__input"
            type="number"
            inputMode="decimal"
            min="0"
            step="100"
            placeholder="e.g. 75000"
            value={employmentIncome}
            onChange={(e) => onEmploymentIncome(e.target.value)}
            disabled={useOverride}
            required={!useOverride}
          />
        </label>

        <label className="check">
          <input
            type="checkbox"
            checked={useOverride}
            onChange={(e) => onUseOverride(e.target.checked)}
          />
          <span>I already know my estimated federal + Ontario income tax</span>
        </label>

        {useOverride && (
          <div className="override-grid">
            <label className="field">
              <span className="field__label">Federal income tax paid (CAD)</span>
              <input
                className="field__input"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                placeholder="e.g. 12000"
                value={federalTaxOverride}
                onChange={(e) => onFederalOverride(e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span className="field__label">Ontario income tax paid (CAD)</span>
              <input
                className="field__input"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                placeholder="e.g. 5500"
                value={ontarioTaxOverride}
                onChange={(e) => onOntarioOverride(e.target.value)}
                required
              />
            </label>
          </div>
        )}

        <button type="submit" className="btn-primary">
          Show my receipt
        </button>
      </form>
    </section>
  );
}
