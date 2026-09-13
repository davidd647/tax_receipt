# Tax Receipt

**Where your Canadian tax dollars go**

A personal Canadian tax-dollars transparency tracker for Ontario residents. Enter annual employment income (or override with estimated federal + Ontario income tax), then see a plain receipt showing how those dollars map onto major federal and Ontario spending categories.

Built with **Vite + React + TypeScript** and clean CSS. Static cited data only — no APIs.

## Run locally

```bash
cd tax_receipt
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

## Who it’s for

Ontario resident **David** (and anyone else in Ontario who wants a readable spending receipt). Province is fixed to Ontario in v1.

## What you get

1. Short landing explanation
2. Income input, or optional federal + Ontario tax override
3. Receipt with estimated federal tax, Ontario tax, and total
4. Separate **Federal** and **Ontario** sections with % share, **your $**, program totals ($B), and one-line descriptions
5. Expand any category for a short description + official source link
6. Transparency panel: fiscal year, methodology, every source URL, last reviewed date, disclaimer
7. Last inputs persisted in `localStorage`

## Fiscal year & data

| Item | Value |
| --- | --- |
| Fiscal year label | **2025–26** |
| Tax brackets year | **2025** |
| Last reviewed | **12 September 2026** |
| Federal expense denominator | **$580.9B** (Budget 2025 Table A1.9, total expenses excl. net actuarial losses) |
| Ontario expense denominator | **$232.5B** (2025 Ontario Budget total expense) |

Seeded category modules live in:

- `src/data/federalSpending.ts`
- `src/data/ontarioSpending.ts`
- `src/data/fiscalMeta.ts`
- `src/data/taxBrackets.ts`

Each category includes `share`, `totalBillions`, description, and source URL comments.

### Federal categories (Budget 2025–style)

Elderly benefits; Canada Health Transfer; public debt charges; other transfers to provinces & territories; national defence (illustrative carve-out from direct program expenses); Employment Insurance; Canada Child Benefit; other federal programs & operations.

### Ontario categories (2025 Ontario Budget)

Health; education (K–12); other provincial programs; children, community & social services; interest on debt; postsecondary education; justice.

## Methodology (plain English)

1. **Estimate tax** from annual employment income using simplified **2025** federal and Ontario brackets and basic personal amounts, **or** use the optional tax override.
2. **Allocate** your federal tax across federal categories by each category’s share of federal total expenses. Same idea for Ontario tax and Ontario categories.
3. **Your dollars** for a category = `(your tax for that jurisdiction) × (category share)`.
4. **Program totals ($B)** are the Budget figures shown beside each line.

### Tax estimate simplifications

Documented on the in-app transparency panel and here:

- Employment income only; taxable income ≈ employment income
- Federal BPA **$16,129** × **14.5%** credit (no high-income BPA phase-down)
- Ontario BPA **$12,747** × **5.05%** credit
- **Ontario surtax not modeled**
- No other credits/deductions, no CPP/EI premiums, no Ontario Health Premium, no GST/HST

Federal rates (2025): 14.5% / 20.5% / 26% / 29% / 33%  
Ontario rates (2025): 5.05% / 9.15% / 11.16% / 12.16% / 13.16%

## Sources

- [Budget 2025 — Annex 1 (federal expense outlook)](https://budget.canada.ca/2025/report-rapport/anx1-en.html)
- [PBO — Main Estimates 2025–26](https://www.pbo-dpb.ca/en/publications/RP-2526-003-S--government-expenditure-plan-main-estimates-2025-26--plan-depenses-gouvernement-budget-principal-depenses-2025-2026)
- [2025 Ontario Budget — Chapter 3](https://budget.ontario.ca/2025/chapter-3.html)
- [2025 Ontario Budget — In Brief](https://budget.ontario.ca/2025/brief.html)
- [CRA — Tax rates and brackets (2025)](https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/last-year.html)
- [CRA — Basic personal amount (2025)](https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-30000-basic-personal-amount.html)

## Disclaimer

These figures are **estimates for education and transparency only**. They are **not tax advice**, not an official CRA or Ontario Ministry of Finance calculation, and not a substitute for a Notice of Assessment or a tax professional.

## Project layout

```
src/
  components/     UI: landing, form, receipt, category rows, transparency
  data/           Typed seeded spending + tax brackets + fiscal meta
  lib/            Tax math, formatting, localStorage
  App.tsx
  index.css
```

## License

Personal project — use and adapt freely with attribution to the official Budget / CRA sources above.
