export function TransitArt() {
  return <div className="transit-art" aria-hidden="true">
    <div className="art-caption"><span className="micro-cross">+</span> A WAY FROM IDEA TO IMPACT <span>01—03</span></div>
    <svg className="transit-map" viewBox="0 0 500 430" fill="none">
      <defs>
        <pattern id="dot-grid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill="#A5ADBE" opacity=".4" /></pattern>
        <linearGradient id="rail-fade" x1="60" y1="370" x2="450" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#2454E6" stopOpacity=".2" /><stop offset=".4" stopColor="#2454E6" /><stop offset="1" stopColor="#2454E6" /></linearGradient>
      </defs>
      <rect width="500" height="430" fill="url(#dot-grid)" />
      <path d="M-30 170h172c44 0 53 65 104 65h270M80 460V318c0-31 25-56 56-56h165c29 0 52-24 52-53V-30" stroke="#D9DEE8" strokeWidth="2" />
      <path d="M-20 390h112c35 0 54-16 54-48v-85c0-36 22-59 60-59h85c39 0 64-22 64-59v-28c0-34 24-58 60-58h105" stroke="url(#rail-fade)" strokeWidth="6" strokeLinecap="round" />
      <path d="M64 465V372c0-34 23-59 57-59h118c39 0 58-21 58-57V100c0-42 28-70 70-70h154" stroke="#C7D2F1" strokeWidth="2" />
      <circle cx="146" cy="330" r="10" fill="#F7F7F2" stroke="#2454E6" strokeWidth="5" />
      <circle cx="247" cy="198" r="11" fill="#F7F7F2" stroke="#2454E6" strokeWidth="5" />
      <circle className="destination-halo" cx="414" cy="53" r="25" fill="#2454E6" opacity=".08" />
      <circle cx="414" cy="53" r="10" fill="#2454E6" /><circle cx="414" cy="53" r="3" fill="white" />
      <circle cx="80" cy="376" r="4" fill="#F7F7F2" stroke="#BBC5D9" strokeWidth="2" />
      <circle cx="353" cy="231" r="4" fill="#F7F7F2" stroke="#BBC5D9" strokeWidth="2" />
      <path d="m352 127 3-4 3 4" stroke="white" strokeWidth="1.5" />
      <text x="18" y="299" className="transit-stop-kicker">01 / THE START</text>
      <text x="18" y="318" className="transit-stop-title">A real problem.</text>
      <text x="154" y="162" className="transit-stop-kicker">02 / THE WORK</text>
      <text x="154" y="181" className="transit-stop-title">Build. Ship. Learn.</text>
      <text x="368" y="91" className="transit-stop-kicker">03 / THE POINT</text>
      <text x="368" y="110" className="transit-stop-title impact">Real people.</text>
    </svg>
    <div className="art-product"><span className="app-glyph"><svg viewBox="0 0 24 24" fill="none"><path d="M5 19V5l7 8 7-8v14" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg></span><div><strong>Egy Metro Guide</strong><span>From an idea to 250K+ downloads</span></div><span className="art-product-arrow">↗</span></div>
    <div className="art-footnote"><span className="blue-dot" />THE JOURNEY IS THE WORK.</div>
  </div>;
}
