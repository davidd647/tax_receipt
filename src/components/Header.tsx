import { FISCAL_META } from '../data/fiscalMeta';

interface HeaderProps {
  onJumpTransparency: () => void;
}

export function Header({ onJumpTransparency }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            $
          </span>
          <div>
            <p className="brand__title">Tax Receipt</p>
            <p className="brand__subtitle">Where Canadian tax dollars go</p>
          </div>
        </div>
        <div className="site-header__meta">
          <span className="pill">
            {FISCAL_META.budgetLabel} · FY {FISCAL_META.fiscalYearLabel}
          </span>
          <button type="button" className="link-btn" onClick={onJumpTransparency}>
            Sources &amp; method
          </button>
        </div>
      </div>
    </header>
  );
}
