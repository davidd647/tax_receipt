export function Landing() {
  return (
    <section className="landing card" aria-labelledby="landing-heading">
      <h1 id="landing-heading">See where your tax dollars go</h1>
      <p>
        Enter your annual employment income. We estimate federal and Ontario income
        tax, then show a plain receipt: each major program’s share, your dollars,
        and the official source.
      </p>
      <ul className="landing__points">
        <li>Ontario residents (v1)</li>
        <li>Budget 2025–style categories with cited totals</li>
        <li>Estimates only — not tax advice</li>
      </ul>
    </section>
  );
}
