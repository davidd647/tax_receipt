# Tax Receipt

**Where Canadian tax dollars go**

A Canadian tax-dollars **transparency explorer** focused on Ontario. Explore federal and Ontario Budget **2025–26** coffers, an average-earner snapshot (no personal salary inputs), and a tap-to-expand branched spending tree.

Built with **Vite 5 + React 18 + TypeScript 5** and plain CSS. Static cited data only — no APIs.

## Live (GitHub Pages)

https://davidd647.github.io/tax_receipt/

Deploys automatically from `main` via GitHub Actions.

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

Requires Node ~18+ (tested with Node ~22.9 on Mac). This project pins **Vite 5.x** and **TypeScript 5.x** for that compatibility.

## What you see (no personal info)

1. **Big picture coffers** — federal and Ontario revenue, spending, and deficit/borrowing for FY 2025–26, with plain-language notes (deficit ≠ money-printing) and source links.
2. **Average earner snapshot** — StatsCan Ontario median wage proxy, simplified federal + Ontario income-tax estimate, and that tax mapped onto top budget categories.
3. **Branched spending tree** — Federal | Ontario switch; tap categories to expand nested branches (2–3 levels). Each node shows % of jurisdiction budget, national $B, and the average earner’s dollar share.
4. **Transparency** — methodology, fiscal year, last reviewed, disclaimer, every source URL.

UI prefs only (expanded nodes + Federal/Ontario focus) are stored in `localStorage`. **No income forms.**

## Fiscal year & data

| Item | Value |
| --- | --- |
| Fiscal year label | **2025–26** |
| Budget label | **Budget 2025** |
| Last reviewed | **12 September 2026** |
| Federal revenue | **$507.5B** (Budget 2025) |
| Federal total expenses (incl. net actuarial losses) | **$585.9B** |
| Federal deficit | **$78.3B** |
| Federal expense denominator (shares) | **$580.9B** (excl. net actuarial losses) |
| Ontario revenue | **$219.9B** |
| Ontario total expense | **$232.5B** |
| Ontario deficit | **$14.6B** (incl. $2.0B reserve) |
| Avg earner income proxy | **$48,160** Ontario median wages (StatsCan 2023) |
| Avg federal tax (simplified) | **~$4,640** |
| Avg Ontario tax (simplified) | **~$1,790** |

Seeded modules:

- `src/data/fiscalMeta.ts` — coffers, average earner, meta, denominators
- `src/data/federalSpending.ts` — hierarchical federal tree (`children[]`)
- `src/data/ontarioSpending.ts` — hierarchical Ontario tree
- `src/data/types.ts` — shared types

Nested children marked **(approx.)** are illustrative carve-outs that sum to published parent totals.

## Methodology (plain English)

1. **Coffers** come from Budget 2025 (federal) and the 2025 Ontario Budget.
2. **Category share** = category $B ÷ jurisdiction expense denominator.
3. **Average-earner dollars** for a node = (jurisdiction average tax) × (node share).
4. Tax estimate uses simplified **2025** brackets and basic personal amounts only — no surtax, other credits, CPP/EI, or GST/HST.

## Sources

- [Budget 2025 — Annex 1](https://budget.canada.ca/2025/report-rapport/anx1-en.html)
- [PBO — Main Estimates 2025–26](https://www.pbo-dpb.ca/en/publications/RP-2526-003-S--government-expenditure-plan-main-estimates-2025-26--plan-depenses-gouvernement-budget-principal-depenses-2025-2026)
- [2025 Ontario Budget — Chapter 3](https://budget.ontario.ca/2025/chapter-3.html)
- [2025 Ontario Budget — In Brief](https://budget.ontario.ca/2025/brief.html)
- [Statistics Canada — median wages by province (2023)](https://www150.statcan.gc.ca/n1/daily-quotidien/250401/t001b-eng.htm)
- [CRA — Tax rates and brackets (2025)](https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/last-year.html)

## Disclaimer

These figures are **estimates for education and transparency only**. They are **not** a CRA personal allocation, not tax advice, and not a substitute for a Notice of Assessment or a tax professional.

## Project layout

```
src/
  components/   Coffers, average earner, spending tree, transparency, header
  data/         Typed hierarchical spending + fiscal meta
  lib/          Formatting, UI localStorage, tree helpers
  App.tsx
  index.css
```

## License

Personal project — use and adapt freely with attribution to the official Budget / StatsCan / CRA sources above.
