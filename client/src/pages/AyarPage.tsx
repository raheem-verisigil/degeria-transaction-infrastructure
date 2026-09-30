import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, CircleAlert, FileCheck2, GitBranch, ShieldCheck, Sparkles } from "lucide-react";

const siteOrigin = "https://degeria.com";

function upsertMeta(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertProperty(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.content = content;
}

function AyarHeader() {
  return (
    <header className="ayar-header">
      <Link href="/" className="ayar-brand" aria-label="DEĞERIA home">
        <img src="/degeria-logo.jpg" alt="DEĞERIA" />
      </Link>
      <nav aria-label="AYAR navigation">
        <a href="#gate">The gate</a>
        <a href="#karne">Karne</a>
        <a href="#evidence">Evidence spine</a>
        <Link href="/evaluate" className="ayar-nav-cta">Bring a product <ArrowRight size={14} /></Link>
      </nav>
    </header>
  );
}

const vector = [
  ["COMPLIANCE", "Official sources first"],
  ["LABELING", "Label and artwork"],
  ["EVIDENCE", "Traceable inputs"],
  ["PACKAGING", "Pack format and claims"],
  ["PRODUCT FIT", "Identity and function"],
  ["MARKET FIT", "Target-market context"],
  ["MANUFACTURING", "Process readiness"],
  ["ECONOMICS", "Transparent assumptions"],
  ["CUSTOMER VALUE", "Outcome potential"],
];

export default function AyarPage() {
  useEffect(() => {
    const title = "ÜRETIVA AYAR — Market readiness before the transaction | DEĞERIA";
    const description = "AYAR turns product, market and evidence inputs into a transparent readiness brief with findings, provenance, corrective actions and human review flags.";
    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", "index,follow");
    upsertProperty("og:title", title);
    upsertProperty("og:description", description);
    upsertProperty("og:type", "website");
    upsertProperty("og:url", `${siteOrigin}/ayar`);
    upsertProperty("og:site_name", "DEĞERIA");
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${siteOrigin}/ayar`;
  }, []);

  return (
    <div className="ayar-page">
      <AyarHeader />
      <main>
        <section className="ayar-hero">
          <div className="ayar-hero-grid">
            <div>
              <div className="ayar-kicker"><span>ÜRETIVA / 01</span><i /> PRODUCT INTELLIGENCE VERTICAL</div>
              <h1>Before a product becomes a transaction, make it <em>ready.</em></h1>
              <p className="ayar-hero-lede">AYAR is DEĞERIA's market-readiness gate. It connects product identity, target market and evidence into a transparent Karne — so the next change is visible before execution begins.</p>
              <div className="ayar-actions"><Link href="/evaluate" className="ayar-button ayar-button-primary">Bring one product <ArrowRight size={16} /></Link><a href="#gate" className="ayar-button ayar-button-ghost">See the gate <ArrowRight size={16} /></a></div>
              <div className="ayar-proof"><span><ShieldCheck size={15} /> Evidence-aware</span><span><CircleAlert size={15} /> No false certainty</span><span><GitBranch size={15} /> DEĞERIA-native</span></div>
            </div>
            <div className="ayar-hero-card" aria-label="Illustrative AYAR assessment">
              <div className="ayar-card-top"><span>AYAR / KARNE</span><b>REVIEW REQUIRED</b></div>
              <div className="ayar-card-product"><span>PRODUCT</span><strong>Industrial control cabinet</strong><small>Target market · Germany</small></div>
              <div className="ayar-score-row"><div><span>READINESS SIGNAL</span><strong>68<span>/100</span></strong></div><div className="ayar-score-ring"><div /></div></div>
              <div className="ayar-card-list"><span><CheckCircle2 size={14} /> Product identity <b>KNOWN</b></span><span><CheckCircle2 size={14} /> Market target <b>PROVIDED</b></span><span className="warning"><CircleAlert size={14} /> Label evidence <b>REVIEW</b></span></div>
              <div className="ayar-card-foot"><FileCheck2 size={15} /> Findings remain linked to their source and confidence.</div>
            </div>
          </div>
        </section>

        <section id="gate" className="ayar-section ayar-light">
          <div className="ayar-container">
            <div className="ayar-section-heading"><div><div className="ayar-kicker dark"><span>ÜRETIVA / 02</span><i /> THE AYAR GATE</div><h2>From product inputs to a <em>decision-ready brief.</em></h2></div><p>AYAR does not replace a regulator, bank, insurer, customs broker or qualified expert. It makes the product context and the open questions explicit.</p></div>
            <div className="ayar-flow"><div><span>01</span><strong>IDENTIFY</strong><small>Product, category, materials</small></div><ArrowRight size={18} /><div className="active"><span>02</span><strong>ASSESS</strong><small>Market, label, packaging</small></div><ArrowRight size={18} /><div><span>03</span><strong>SPECIFY</strong><small>Corrective action path</small></div><ArrowRight size={18} /><div><span>04</span><strong>EXECUTE</strong><small>DEĞERIA transaction loop</small></div></div>
            <div className="ayar-three-grid"><article><Sparkles size={19} /><h3>Understand</h3><p>Build a canonical product identity before interpretation starts.</p></article><article><GitBranch size={19} /><h3>Trace</h3><p>Keep every meaningful finding tied to evidence, source and confidence.</p></article><article><ShieldCheck size={19} /><h3>Review</h3><p>Surface ambiguity instead of turning an estimate into a fact.</p></article></div>
          </div>
        </section>

        <section id="karne" className="ayar-section ayar-dark">
          <div className="ayar-container"><div className="ayar-section-heading"><div><div className="ayar-kicker"><span>ÜRETIVA / 03</span><i /> THE KARNE</div><h2>A report that shows <em>what is known.</em></h2></div><p>Headline signals are useful only when the dimensions underneath remain visible. AYAR keeps the vector open for product, market and human review.</p></div>
            <div className="ayar-vector"><div className="ayar-vector-card"><div className="ayar-vector-head"><span>AYAR VECTOR / v0.1</span><b>9 DIMENSIONS</b></div>{vector.map(([label, detail], index) => <div className="ayar-vector-row" key={label}><span>0{index + 1}</span><strong>{label}</strong><small>{detail}</small><i style={{ width: `${54 + (index * 5) % 37}%` }} /></div>)}</div><div className="ayar-findings"><div className="ayar-findings-top"><span>FINDINGS</span><b>03 OPEN</b></div><div className="finding finding-block"><span>BLOCKING</span><strong>Label evidence is missing</strong><p>Provide the current label or artwork for market-specific review.</p><small>PROVENANCE · UNKNOWN / HUMAN REVIEW</small></div><div className="finding"><span>IMPORTANT</span><strong>Packaging evidence is incomplete</strong><p>Add packaging photographs or technical documentation.</p><small>PROVENANCE · CUSTOMER PROVIDED</small></div><div className="finding finding-note"><CircleAlert size={16} /><span>AYAR is a readiness signal, not approval or certification.</span></div></div></div>
          </div>
        </section>

        <section id="evidence" className="ayar-section ayar-light">
          <div className="ayar-container"><div className="ayar-split"><div><div className="ayar-kicker dark"><span>ÜRETIVA / 04</span><i /> KANIT OMURGASI</div><h2>Every conclusion needs a <em>source.</em></h2><p>AYAR uses DEĞERIA's existing evidence spine rather than inventing a second store. Product documents, observations, official sources and human review can remain part of the same economic history.</p><Link href="/technology" className="ayar-text-link">Explore the DEĞERIA architecture <ArrowRight size={15} /></Link></div><div className="ayar-evidence-stack"><div><span>01</span><strong>Customer document</strong><b>CUSTOMER PROVIDED</b></div><div><span>02</span><strong>Official market source</strong><b>REVIEW REQUIRED</b></div><div><span>03</span><strong>Human observation</strong><b>KNOWN</b></div><div><span>04</span><strong>AYAR conclusion</strong><b>INFERRED</b></div></div></div></div>
        </section>

        <section className="ayar-cta"><div className="ayar-container"><div className="ayar-kicker"><span>ÜRETIVA / 05</span><i /> START WITH THE REAL THING</div><h2>Bring one real product. Leave with the next <em>change.</em></h2><p>Start with a product, a target market and the evidence you already have. The first output is a structured conversation, not a claim of approval.</p><Link href="/evaluate" className="ayar-button ayar-button-primary">Request an AYAR pilot <ArrowRight size={16} /></Link><div className="ayar-cta-foot"><span>NO SECOND LOGIN</span><span>NO ERP REPLACEMENT</span><span>HUMAN REVIEW AVAILABLE</span></div></div></section>
      </main>
    </div>
  );
}
