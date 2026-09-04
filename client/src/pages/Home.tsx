import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import axios from "axios";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Database,
  FileCheck2,
  GitBranch,
  Landmark,
  Menu,
  Network,
  PanelTop,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

const blue = "#2d7dff";
const teal = "#43d9c5";

// Backend API base. Set VITE_API_BASE_URL in your build environment once
// the final domain/deployment is settled; falls back to the live Railway
// backend so this works today with no extra config.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://degeria-api-production.up.railway.app";

// Form's transaction-type labels -> backend's TransactionType enum values.
const transactionTypeMap: Record<string, string> = {
  "Import-linked export": "IMPORT_LINKED_EXPORT",
  "Export": "EXPORT",
  "Import": "IMPORT",
};

const supportedLocales = ["en", "tr", "ar", "de", "it", "zh", "fr", "pt"] as const;
type Locale = (typeof supportedLocales)[number];

const localeLabels: Record<Locale, string> = { en: "English", tr: "Türkçe", ar: "العربية", de: "Deutsch", it: "Italiano", zh: "中文", fr: "Français", pt: "Português" };
const localeFromPath = (path: string): Locale => {
  const candidate = path.split("/")[1] as Locale;
  return supportedLocales.includes(candidate) ? candidate : "en";
};
const copy: Record<Locale, { eyebrow: string; title: string; emphasis: string; titleEnd: string; question: string; lede: string; primary: string; secondary: string; explore: string }> = {
  en: { eyebrow: "Transaction intelligence for manufacturers", title: "Know what a transaction is", emphasis: "really worth", titleEnd: "before you commit.", question: "Should we accept this transaction — and under what terms?", lede: "DEĞERIA turns fragmented commercial, production, import, export and financial evidence into a continuously updated Economic Transaction Passport.", primary: "Evaluate a real transaction", secondary: "Explore the Passport", explore: "Explore the infrastructure" },
  tr: { eyebrow: "Üreticiler için işlem zekâsı", title: "Bir işlemin gerçekte", emphasis: "ne değer taşıdığını", titleEnd: "taahhüt etmeden önce bilin.", question: "Bu işlemi kabul etmeli miyiz — hangi şartlarla?", lede: "DEĞERIA; ticari, üretim, ithalat, ihracat ve finansal kanıtları sürekli güncellenen bir Ekonomik İşlem Pasaportunda birleştirir.", primary: "Gerçek bir işlemi değerlendirin", secondary: "Pasaportu keşfedin", explore: "Altyapıyı keşfedin" },
  ar: { eyebrow: "ذكاء المعاملات للمصنعين", title: "اعرف القيمة الحقيقية", emphasis: "للمعاملة", titleEnd: "قبل الالتزام بها.", question: "هل نقبل هذه المعاملة — وبأي شروط؟", lede: "تجمع DEĞERIA الأدلة التجارية والإنتاجية والاستيراد والتصدير والمالية في جواز معاملة اقتصادية محدث باستمرار.", primary: "قيّم معاملة حقيقية", secondary: "استكشف جواز المعاملة", explore: "استكشف البنية التحتية" },
  de: { eyebrow: "Transaktionsintelligenz für Hersteller", title: "Erkennen Sie, was eine Transaktion", emphasis: "wirklich wert ist", titleEnd: "bevor Sie sich festlegen.", question: "Sollen wir diese Transaktion annehmen — und zu welchen Bedingungen?", lede: "DEĞERIA verbindet fragmentierte kommerzielle, Produktions-, Import-, Export- und Finanznachweise zu einem laufend aktualisierten Wirtschaftstransaktionspass.", primary: "Eine echte Transaktion bewerten", secondary: "Den Pass erkunden", explore: "Infrastruktur erkunden" },
  it: { eyebrow: "Intelligence delle transazioni per i produttori", title: "Conosci il valore reale", emphasis: "di una transazione", titleEnd: "prima di impegnarti.", question: "Dovremmo accettare questa transazione — e a quali condizioni?", lede: "DEĞERIA trasforma le evidenze commerciali, produttive, di importazione, esportazione e finanziarie in un Passaporto della Transazione Economica aggiornato continuamente.", primary: "Valuta una transazione reale", secondary: "Esplora il Passaporto", explore: "Esplora l'infrastruttura" },
  zh: { eyebrow: "面向制造商的交易智能", title: "在承诺之前，了解一笔交易", emphasis: "真正的价值", titleEnd: "。", question: "我们应该接受这笔交易吗？条件是什么？", lede: "DEĞERIA 将分散的商业、生产、进口、出口和金融证据，转化为持续更新的经济交易护照。", primary: "评估一笔真实交易", secondary: "探索交易护照", explore: "探索基础设施" },
  fr: { eyebrow: "Intelligence transactionnelle pour les fabricants", title: "Connaissez la valeur réelle", emphasis: "d'une transaction", titleEnd: "avant de vous engager.", question: "Devons-nous accepter cette transaction — et à quelles conditions ?", lede: "DEĞERIA transforme les preuves commerciales, de production, d'importation, d'exportation et financières en un Passeport de Transaction Économique mis à jour en continu.", primary: "Évaluer une transaction réelle", secondary: "Explorer le Passeport", explore: "Explorer l'infrastructure" },
  pt: { eyebrow: "Inteligência de transações para fabricantes", title: "Saiba quanto uma transação", emphasis: "realmente vale", titleEnd: "antes de se comprometer.", question: "Devemos aceitar esta transação — e em quais condições?", lede: "A DEĞERIA transforma evidências comerciais, de produção, importação, exportação e financeiras fragmentadas em um Passaporte de Transação Econômica continuamente atualizado.", primary: "Avaliar uma transação real", secondary: "Explorar o Passaporte", explore: "Explorar a infraestrutura" },
};

const evidenceTabs = [
  { id: "commercial", label: "COMMERCIAL", value: "€2,500,000", sub: "Sales contract", status: "OBSERVED", color: "blue" },
  { id: "import", label: "IMPORT", value: "€640,000", sub: "Supplier quotes", status: "RECONCILED", color: "teal" },
  { id: "production", label: "PRODUCTION", value: "78%", sub: "Batch progress", status: "OBSERVED", color: "blue" },
  { id: "export", label: "EXPORT", value: "READYING", sub: "Shipment readiness", status: "CALCULATED", color: "teal" },
  { id: "finance", label: "FINANCE", value: "€640,000", sub: "Cash requirement", status: "CALCULATED", color: "blue" },
  { id: "risk", label: "RISK", value: "EUR / TRY", sub: "FX exposure", status: "ASSUMED", color: "amber" },
  { id: "outcome", label: "OUTCOME", value: "8.7%", sub: "Actual margin", status: "ACTUAL", color: "coral" },
];

const graphNodes = [
  { label: "CONTRACT", detail: "Sales contract", value: "€2.5M", source: "Customer agreement", status: "OBSERVED" },
  { label: "MATERIAL", detail: "Supplier quote", value: "€640K", source: "Supplier quote 03", status: "OBSERVED" },
  { label: "PRODUCTION", detail: "Batch 24-B", value: "78%", source: "Production event", status: "OBSERVED" },
  { label: "PRODUCT", detail: "Industrial equipment", value: "240 units", source: "BOM + batch record", status: "RECONCILED" },
  { label: "EXPORT", detail: "Shipment readiness", value: "87%", source: "Export evidence", status: "CALCULATED" },
  { label: "RECEIVABLE", detail: "Payment terms", value: "120 days", source: "Contract clause 8.2", status: "OBSERVED" },
  { label: "FINANCE", detail: "Cash requirement", value: "€640K", source: "Economics engine", status: "CALCULATED" },
  { label: "INSURANCE", detail: "Review readiness", value: "82%", source: "Evidence index", status: "CALCULATED" },
  { label: "CASH", detail: "Settlement event", value: "Pending", source: "Outcome stream", status: "PREDICTED" },
  { label: "OUTCOME", detail: "Actual margin", value: "8.7%", source: "Outcome record", status: "ACTUAL" },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-label="DEĞERIA home">
      <img src="/manus-storage/IMG-20260903-WA0246_3895bb80.jpg" alt="DEĞERIA — Economic Transaction Infrastructure" />
    </span>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const currentLocale = localeFromPath(location);
  useEffect(() => {
    document.documentElement.lang = currentLocale;
    document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";
  }, [currentLocale]);
  const links = [
    ["Product", "/#passport"],
    ["How it works", "/#mechanism"],
    ["Manufacturers", "/manufacturers"],
    ["Institutions", "/institutions"],
    ["Technology", "/technology"],
    ["Research", "/research"],
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/"><BrandMark /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={label} href={href} className={location === href ? "active" : ""}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <label className="locale-picker"><span className="sr-only">Language</span><select aria-label="Select language" value={currentLocale} onChange={(event) => { window.location.href = `/${event.target.value}`; }}>{supportedLocales.map((locale) => <option key={locale} value={locale}>{locale.toUpperCase()} · {localeLabels[locale]}</option>)}</select></label>
          <Link href="/evaluate" className="header-cta">Evaluate a transaction <ArrowUpRight size={14} /></Link>
          <button className="mobile-menu-button" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {open && <div className="mobile-nav"><nav aria-label="Mobile navigation">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}<ChevronRight size={15} /></a>)}<Link href="/evaluate" onClick={() => setOpen(false)} className="mobile-eval">Evaluate a transaction <ArrowUpRight size={15} /></Link></nav></div>}
    </header>
  );
}

function SectionLabel({ index, children, light = false }: { index: string; children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? "light" : ""}`}><span>{index}</span><i />{children}</div>;
}

function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <a href={href} className={`arrow-link ${light ? "light" : ""}`}>{children}<ArrowUpRight size={15} /></a>;
}

function Metric({ label, value, accent = "blue", note }: { label: string; value: string; accent?: string; note?: string }) {
  return <div className="metric"><div className="metric-label"><span className={`dot ${accent}`} />{label}</div><strong>{value}</strong>{note && <small>{note}</small>}</div>;
}

function HeroTransactionVisual() {
  const evidence = ["CONTRACT", "BOM", "SUPPLIER QUOTE", "FREIGHT", "FX", "PAYMENT TERMS"];
  return <div className="hero-visual" aria-label="Animation showing evidence becoming a transaction passport">
    <div className="visual-grid" />
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <div className="evidence-cloud">{evidence.map((item, index) => <div key={item} className={`evidence-pill pill-${index}`}><span className="pill-dot" />{item}</div>)}</div>
    <div className="core-node"><div className="core-pulse" /><Network size={19} /><span>ECONOMIC<br /><b>TRANSACTION</b></span></div>
    <div className="passport-mini"><div className="passport-mini-top"><span>TRANSACTION PASSPORT</span><span className="status-badge">ASSESSING</span></div><div className="passport-id">DGR-TRX-DEMO-001</div><div className="passport-line"><span>ECONOMIC STATE</span><b>VISIBLE</b></div><div className="passport-bar"><i /></div><div className="passport-line"><span>EVIDENCE TRAIL</span><b>87%</b></div><div className="mini-outcomes"><span>ECONOMICS</span><span>RISK</span><span>READINESS</span></div></div>
    <div className="visual-caption"><span className="live-dot" />ILLUSTRATIVE DEMO · SYNTHETIC DATA</div>
  </div>;
}

function Hero() {
  const [location] = useLocation();
  const t = copy[localeFromPath(location)];
  return <section className="hero" id="top"><div className="hero-noise" /><div className="container hero-inner"><div className="hero-copy"><SectionLabel index="01" light>{t.eyebrow}</SectionLabel><h1>{t.title} <em>{t.emphasis}</em> {t.titleEnd}</h1><p className="hero-question">{t.question}</p><p className="hero-lede">{t.lede}</p><div className="hero-ctas"><Link href="/evaluate" className="button button-primary">{t.primary} <ArrowUpRight size={16} /></Link><a href="#passport" className="button button-ghost">{t.secondary} <ArrowDown size={16} /></a></div><div className="hero-proof"><span><CheckCircle2 size={15} /> Evidence-linked</span><span><CheckCircle2 size={15} /> Traceable</span><span><CheckCircle2 size={15} /> Decision-support</span></div></div><HeroTransactionVisual /></div><div className="hero-bottom container"><div>ONE TRANSACTION <span>·</span> ONE EVIDENCE TRAIL <span>·</span> ONE ECONOMIC HISTORY</div><div className="scroll-cue"><span />Scroll to explore</div></div></section>;
}

function FragmentedEvidence() {
  const sources = ["EMAIL", "ERP", "EXCEL", "PDF", "BANK", "INSURER", "CUSTOMS", "PRODUCTION"];
  return <section className="section dark-section problem-section" id="mechanism"><div className="container"><SectionLabel index="02" light>The problem</SectionLabel><div className="split-heading"><h2>Important transactions rarely live in <em>one system.</em></h2><p>The contract may be in email. The BOM may be in the ERP. Supplier costs may be in spreadsheets. Financing may sit with a bank. The actual economic outcome arrives last.</p></div><div className="fragment-map"><div className="source-stack">{sources.map((source, index) => <div className={`source-chip source-${index}`} key={source}><span>{String(index + 1).padStart(2, "0")}</span>{source}</div>)}</div><div className="map-threads">{sources.slice(0, 6).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</div><div className="question-node"><span>?</span><small>ECONOMIC<br />CONTEXT</small></div><div className="degeria-reveal"><div className="reveal-top"><span className="brand-symbol small"><span /></span><span>DEĞERIA</span></div><strong>Evidence →<br /><em>Economic Transaction Passport</em></strong><ArrowRight size={18} /></div></div></div></section>;
}

function Invention() {
  const layers = ["ERP", "PRODUCTION", "SUPPLIER", "LOGISTICS", "ACCOUNTING", "IMPORT", "EXPORT", "BANK", "INSURANCE"];
  return <section className="section invention-section"><div className="container"><SectionLabel index="03">The invention</SectionLabel><div className="invention-heading"><h2>We don't replace the systems that run the factory.</h2><h2 className="accent-line">We connect the economic evidence they produce.</h2></div><div className="invention-diagram"><div className="system-orbit">{layers.map((layer, index) => <span key={layer} style={{ "--index": index } as React.CSSProperties}>{layer}</span>)}</div><div className="invention-center"><span className="brand-symbol"><span /></span><b>DEĞERIA</b><small>evidence layer</small></div><div className="invention-output"><Network size={18} /><span>ECONOMIC TRANSACTION<br /><b>PASSPORT</b></span></div></div><div className="invention-footer"><p>DEĞERIA creates an evidence-linked economic representation of a transaction without requiring the manufacturer to replace its existing systems.</p><ArrowLink href="#passport">See how the Passport works</ArrowLink></div></div></section>;
}

function PassportSection() {
  const [active, setActive] = useState(evidenceTabs[0]);
  return <section className="section passport-section" id="passport"><div className="container"><div className="passport-intro"><div><SectionLabel index="04" light>Live passport</SectionLabel><h2>Every important transaction gets an <em>economic identity.</em></h2></div><div className="passport-intro-note"><span className="live-dot" />ILLUSTRATIVE DEMO · SYNTHETIC DATA<br /><small>DGR-TRX-DEMO-001 · Client-side deterministic model</small></div></div><div className="passport-workspace"><div className="passport-main"><div className="passport-card"><div className="passport-card-head"><div><span className="card-eyebrow">TRANSACTION</span><h3>DGR-TRX-DEMO-001</h3></div><span className="status-badge blue-badge">EVIDENCE_REVIEW</span></div><div className="passport-card-grid"><div><span className="card-label">BUYER</span><strong>████████ Industries GmbH</strong></div><div><span className="card-label">ROUTE</span><strong>Germany <ArrowRight size={14} /> Türkiye</strong></div><Metric label="VALUE" value="€2,500,000" /><Metric label="PAYMENT" value="120 DAYS" accent="teal" /><Metric label="PRODUCTION" value="78%" accent="teal" /><Metric label="EVIDENCE" value="87%" note="11 / 13 objects" /></div><div className="passport-card-bottom"><span><span className="dot blue" />STATUS <b>ASSESSING</b></span><span><span className="dot teal" />UPDATED 03 SEP 2026 · 14:32 UTC</span></div></div><div className="passport-tabs" role="tablist" aria-label="Passport evidence categories">{evidenceTabs.map(tab => <button key={tab.id} role="tab" aria-selected={active.id === tab.id} className={active.id === tab.id ? "active" : ""} onClick={() => setActive(tab)}>{tab.label}</button>)}</div><div className="passport-insight"><div><span className="card-eyebrow">SELECTED EVIDENCE LAYER</span><h3>{active.value}</h3><p>{active.sub}</p></div><div className="insight-divider" /><div><span className="card-label">STATUS</span><strong className={`text-${active.color}`}>{active.status}</strong></div><div><span className="card-label">SOURCE</span><p>{active.id === "commercial" ? "Sales contract · clause 8.2" : active.id === "outcome" ? "Outcome record · settlement" : "Evidence object · reconciled"}</p></div><ArrowUpRight size={17} /></div></div><aside className="passport-aside"><div className="aside-label"><span>TRANSACTION STATE</span><span className="pulse-label"><i /> LIVE</span></div><div className="state-rail"><div className="state-item complete"><span>01</span><b>Evidence</b><small>87% linked</small></div><div className="rail-line filled" /><div className="state-item active"><span>02</span><b>Economic State</b><small>Calculating</small></div><div className="rail-line" /><div className="state-item"><span>03</span><b>Decision</b><small>Awaiting human input</small></div><div className="rail-line" /><div className="state-item"><span>04</span><b>Outcome</b><small>To be recorded</small></div></div><div className="aside-foot"><Sparkles size={15} /><span>One transaction. One evidence trail. One economic history.</span></div></aside></div></div></section>;
}

function Provenance() {
  const trace = [
    ["EXPECTED MARGIN", "14.1%", "CALCULATED", "Economics engine v0.1"],
    ["SALES CONTRACT", "€2,500,000", "OBSERVED", "Sales contract · 03 Sep 2026"],
    ["BOM", "€1,180,000", "OBSERVED", "BOM revision 06 · Production"],
    ["SUPPLIER QUOTES", "€640,000", "RECONCILED", "Supplier quote set · 4 sources"],
    ["FREIGHT", "€85,000", "OBSERVED", "Freight quote · MSC-04"],
    ["FX ASSUMPTION", "1 EUR = 48.2 TRY", "ASSUMED", "Treasury assumption"],
    ["CALCULATED", "14.1%", "CALCULATED", "Economics engine v0.1"],
  ];
  const [selected, setSelected] = useState(0);
  return <section className="section provenance-section"><div className="container"><div className="split-heading"><div><SectionLabel index="05">Evidence provenance</SectionLabel><h2>Every important number has a <em>story.</em></h2></div><p>Trace a value backwards through the evidence that supports it. Nothing important should appear as a black box.</p></div><div className="trace-layout"><div className="trace-rail">{trace.map((item, index) => <button key={item[0] + index} className={`trace-row ${selected === index ? "selected" : ""}`} onClick={() => setSelected(index)}><span className="trace-index">{String(index + 1).padStart(2, "0")}</span><span><b>{item[0]}</b><strong>{item[1]}</strong></span><i className={`status-dot ${item[2].toLowerCase()}`} /></button>)}</div><div className="trace-detail"><div className="detail-connector" /><span className="card-eyebrow">SELECTED VALUE · {trace[selected][2]}</span><h3>{trace[selected][1]}</h3><div className="detail-grid"><div><span className="card-label">SOURCE</span><b>{trace[selected][3]}</b></div><div><span className="card-label">TIMESTAMP</span><b>03 SEP 2026 · 14:32 UTC</b></div><div><span className="card-label">CALCULATION</span><b>{selected === 0 || selected === 6 ? "Economics Engine v0.1" : "Direct evidence"}</b></div><div><span className="card-label">PROVENANCE</span><b className="text-teal"><Check size={14} /> Complete</b></div></div><div className="detail-footer"><FileCheck2 size={16} /> Evidence object reconciled <span>↗</span></div></div></div></div></section>;
}

function EconomicGraph() {
  const [selected, setSelected] = useState(2);
  const node = graphNodes[selected];
  return <section className="section graph-section"><div className="container"><div className="split-heading"><div><SectionLabel index="06" light>The economic graph</SectionLabel><h2>From documents to <em>economic understanding.</em></h2></div><p>Move through the transaction graph. Each node reveals its source, event, value, timestamp, status and relationship.</p></div><div className="graph-layout"><div className="graph-visual"><div className="graph-line" />{graphNodes.map((item, index) => <button key={item.label} className={`graph-node graph-${index} ${selected === index ? "selected" : ""}`} onClick={() => setSelected(index)}><span className="graph-node-index">{String(index + 1).padStart(2, "0")}</span><span className="graph-node-label">{item.label}</span><span className="graph-node-value">{item.value}</span></button>)}</div><div className="graph-detail"><div className="detail-top"><span className="card-eyebrow">NODE {String(selected + 1).padStart(2, "0")} · {node.status}</span><span className="graph-corner"><GitBranch size={15} /> TRACEABLE</span></div><h3>{node.detail}</h3><div className="graph-value">{node.value}</div><div className="graph-meta"><span><span className="card-label">SOURCE</span>{node.source}</span><span><span className="card-label">EVENT</span>Transaction update</span><span><span className="card-label">TIMESTAMP</span>03 SEP 2026</span></div><div className="graph-relationship"><ArrowDown size={16} /><span>Relationship</span><b>{selected < 5 ? "supports → economic state" : "feeds → outcome memory"}</b></div></div></div></div></section>;
}

function ScenarioSimulator() {
  const [days, setDays] = useState(60);
  const [supplier, setSupplier] = useState(false);
  const [freight, setFreight] = useState(false);
  const [result, setResult] = useState<{ marginPct: number; cash: number; assessment: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(`${API_BASE_URL}/api/v1/public/scenario-demo`, {
          payment_days: days,
          supplier_increase: supplier,
          freight_increase: freight,
        });
        if (!cancelled) {
          setResult({
            marginPct: data.margin_percentage.value,
            cash: data.cash_requirement.value,
            assessment: data.assessment,
          });
          setOffline(false);
        }
      } catch (err) {
        if (!cancelled) setOffline(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300); // debounce rapid slider/toggle changes
    return () => { cancelled = true; clearTimeout(timer); };
  }, [days, supplier, freight]);

  const formatEUR = (v: number) => `€${(v / 1000).toFixed(0)}K`;
  const marginLabel = result ? `${result.marginPct.toFixed(1)}%` : "—";
  const cashLabel = result ? formatEUR(result.cash) : "—";
  const assessment = result?.assessment ?? "PROCEED TO REVIEW";
  const isBaseline = !supplier && !freight && days === 60;

  return <section className="section simulator-section"><div className="container"><div className="split-heading"><div><SectionLabel index="07">Before commitment</SectionLabel><h2>See the transaction before it becomes a <em>problem.</em></h2></div><p>Change assumptions and see the economic consequences before scarce working capital is committed.</p></div><div className="simulator"><div className="sim-control"><div className="sim-control-head"><span>SCENARIO ENGINE <span className="version">v0.1</span></span><span className="status-badge blue-badge">{offline ? "OFFLINE · SHOWING LAST KNOWN VALUES" : "LIVE CALCULATION · ILLUSTRATIVE BASE CASE"}</span></div><div className="sim-base"><Metric label="ORDER" value="€2.5M" /><Metric label="MARGIN" value={marginLabel} accent={isBaseline ? "teal" : "coral"} /><Metric label="PAYMENT" value={`${days} DAYS`} accent="teal" /><Metric label="CASH NEED" value={cashLabel} /></div><div className="slider-block"><div className="slider-title"><span>Payment term</span><strong>{days} days</strong></div><input type="range" min="60" max="120" step="30" value={days} onChange={e => setDays(Number(e.target.value))} aria-label="Payment term" /><div className="slider-labels"><span>60</span><span>90</span><span>120</span></div></div><div className="toggles"><button className={supplier ? "on" : ""} onClick={() => setSupplier(!supplier)}><span className="toggle-box">{supplier && <Check size={12} />}</span><span>Supplier cost +5%</span><small>{loading ? "Calculating..." : supplier ? `${marginLabel} margin` : "No change"}</small></button><button className={freight ? "on" : ""} onClick={() => setFreight(!freight)}><span className="toggle-box">{freight && <Check size={12} />}</span><span>Freight +20%</span><small>{loading ? "Calculating..." : freight ? `${marginLabel} margin` : "No change"}</small></button></div></div><div className="assessment"><div className="assessment-orbit"><div className="assessment-ring"><span>{marginLabel}</span><small>PROJECTED<br />MARGIN</small></div></div><div className="assessment-copy"><span className="card-eyebrow">DEĞERIA ASSESSMENT</span><h3>{assessment}</h3><p>Primary drivers detected in the current model.</p><div className="driver-list"><span><i />payment exposure</span><span><i />supplier cost sensitivity</span><span><i />freight sensitivity</span></div><div className="recommendation"><span>Possible action</span><b>{assessment === "RESTRUCTURE" ? "Renegotiate payment terms or adjust price" : "Proceed to evidence review"}</b></div></div></div></div><p className="disclaimer">Decision support only. Final commercial, financial and institutional decisions remain with authorized parties.</p></div></section>;
}

function Readiness() {
  return <section className="section readiness-section"><div className="container"><div className="readiness-grid"><div><SectionLabel index="08" light>Institutional readiness</SectionLabel><h2>Ready for review is not the same as <em>approved.</em></h2><p>DEĞERIA prepares evidence and readiness. Banks, insurers and authorized institutions make their own decisions.</p><ArrowLink href="/institutions" light>Designed for institutional integration</ArrowLink></div><div className="readiness-card"><div className="readiness-head"><span>FINANCEABILITY READINESS</span><span className="readiness-score">82<small>%</small></span></div><div className="readiness-ring"><div><strong>82%</strong><small>READY FOR<br />REVIEW</small></div></div><div className="readiness-list"><span><Check size={14} />Commercial evidence <b>✓</b></span><span><Check size={14} />Buyer information <b>✓</b></span><span><Check size={14} />Production evidence <b>✓</b></span><span><Check size={14} />Receivable visibility <b>✓</b></span><span className="partial"><span>◐</span>Shipment evidence <b>◐</b></span><span><Check size={14} />Financial requirement <b>✓</b></span><span className="partial"><span>◐</span>Documentation <b>◐</b></span></div><div className="review-status"><ShieldCheck size={17} /><b>READY FOR INSTITUTIONAL REVIEW</b></div></div></div></div></section>;
}

function InsuranceAndFile() {
  return <section className="section light-surface"><div className="container"><div className="insurance-grid"><div className="insurance-copy"><SectionLabel index="09">Insurance readiness</SectionLabel><h2>Make risk visible before asking someone else to <em>carry it.</em></h2><p>Structure the transaction context, evidence index and known gaps for an informed review. Not an approval.</p><div className="risk-object"><div className="risk-line"><span>BUYER</span><b>Germany</b></div><div className="risk-line"><span>PAYMENT</span><b>120 days</b></div><div className="risk-line"><span>VALUE</span><b>€2.5M</b></div><div className="risk-line"><span>EVIDENCE</span><b className="text-teal">87%</b></div><div className="risk-readiness"><ShieldCheck size={16} /><span>INSURANCE INFORMATION</span><b>READY FOR REVIEW</b></div></div><ArrowLink href="/evaluate">Build the transaction file</ArrowLink></div><div className="evidence-file-wrap"><SectionLabel index="10">Institutional evidence output</SectionLabel><h2>One transaction. One <em>evidence file.</em></h2><div className="evidence-file"><div className="file-header"><BrandMark /><span>TRANSACTION EVIDENCE FILE<br /><small>PRE-VERIFICATION DEMO</small></span></div><div className="file-title"><span>DGR-TRX-DEMO-001</span><b>87%</b></div><div className="file-items">{["COMMERCIAL", "PRODUCTION", "QUALITY", "EXPORT", "PAYMENT TERMS", "FINANCIAL POSITION", "RISK"].map(item => <span key={item}><CheckCircle2 size={13} />{item}<b>✓</b></span>)}</div><div className="file-footer"><span>EVIDENCE INDEX <b>87%</b></span><span>EXCEPTIONS <b>02</b></span><span>PROVENANCE <b className="text-teal">COMPLETE</b></span></div></div><small className="file-note">This demonstration is labelled a Transaction Evidence File. "Verified Export Asset File" will be used only after verification standards are established.</small></div></div></div></section>;
}

function OutcomeMemory() {
  return <section className="section outcome-section"><div className="container"><div className="split-heading"><div><SectionLabel index="11">After the transaction</SectionLabel><h2>The transaction does not end when the shipment <em>leaves.</em></h2></div><p>DEĞERIA remembers what actually happened. That is the beginning of a durable decision memory.</p></div><div className="outcome-compare"><div className="outcome-card predicted"><div className="outcome-head"><span className="card-eyebrow">PREDICTED</span><span className="status-badge">AT COMMITMENT</span></div><Metric label="MARGIN" value="14.1%" /><Metric label="PAYMENT" value="60 days" accent="teal" /><Metric label="FREIGHT" value="€85K" /></div><div className="variance-column"><TrendingUp size={18} /><span>VARIANCE</span><strong>-5.4 <small>pp</small></strong><i /><span>OUTCOME RECORDED</span></div><div className="outcome-card actual"><div className="outcome-head"><span className="card-eyebrow">ACTUAL</span><span className="status-badge coral-badge">OUTCOME_RECORDED</span></div><Metric label="MARGIN" value="8.7%" accent="coral" /><Metric label="PAYMENT" value="97 days" accent="coral" /><Metric label="FREIGHT" value="€102K" accent="coral" /></div></div><div className="causes"><span>CAUSES</span><b>Payment delay</b><b>Supplier cost</b><b>Freight increase</b></div><h3 className="memory-statement">DEĞERIA <em>remembers</em> what actually happened.</h3></div></section>;
}

function DecisionMemory() {
  return <section className="section decision-section"><div className="container"><SectionLabel index="12" light>Decision memory</SectionLabel><div className="split-heading"><h2>What did you know? What did you decide? <em>What happened?</em></h2><p>A transaction becomes more valuable when its assumptions, human decisions and actual outcomes remain connected.</p></div><div className="decision-timeline"><div className="timeline-line" />{[{label: "BEFORE", accent: "blue", items: ["Evidence available", "Assumptions", "Risk", "Scenario", "Recommendation"]}, {label: "DECISION", accent: "teal", items: ["Human decision", "Actor · CFO", "Reason", "03 Sep 2026"]}, {label: "AFTER", accent: "coral", items: ["Shipment", "Payment", "Actual cost", "Actual margin", "Variance"]}].map((column, index) => <div className={`timeline-column ${column.accent}`} key={column.label}><div className="timeline-dot" /><span className="card-eyebrow">0{index + 1}</span><h3>{column.label}</h3><div>{column.items.map(item => <span key={item}>{item}<ChevronRight size={13} /></span>)}</div></div>)}</div><div className="decision-foot"><Database size={16} /><span>DECISION MEMORY</span><small>Evidence · human action · outcome</small></div></div></section>;
}

function PrincipleAndPositioning() {
  return <><section className="section principle-section"><div className="container"><SectionLabel index="13" light>Technology principle</SectionLabel><div className="principle-heading"><h2><span>AI <em>interprets.</em></span><span>Systems <em>calculate.</em></span><span>Humans <em>decide.</em></span></h2></div><div className="principle-columns">{[{icon: Sparkles, label: "AI", items: ["Extract", "Classify", "Reconcile", "Explain", "Assist"]}, {icon: Zap, label: "ENGINE", items: ["Calculate", "Validate", "Simulate", "Apply policy", "Measure"]}, {icon: Landmark, label: "HUMAN / INSTITUTION", items: ["Approve", "Commit", "Finance", "Insure", "Escalate"]}].map(({ icon: Icon, label, items }, index) => <div key={label} className={`principle-column p-${index}`}><Icon size={19} /><span className="card-eyebrow">0{index + 1}</span><h3>{label}</h3>{items.map(item => <span key={item}><i />{item}</span>)}</div>)}</div></div></section><section className="section positioning-section"><div className="container"><div className="positioning-heading"><SectionLabel index="14">Not another ERP</SectionLabel><h2>Keep your ERP. Keep your bank. <em>Keep your insurer.</em></h2></div><div className="positioning-diagram"><div className="your-systems"><span>YOUR SYSTEMS</span>{["ERP", "Accounting", "Production", "CRM", "Logistics", "Bank", "Insurance"].map(x => <b key={x}>{x}</b>)}</div><div className="positioning-arrow"><ArrowDown size={22} /><span>evidence layer</span></div><div className="positioning-passport"><span className="brand-symbol"><span /></span><b>DEĞERIA</b><small>Economic Transaction<br />Passport</small></div></div><p className="positioning-copy">DEĞERIA is designed as an economic intelligence and evidence layer—not a replacement for the systems that already run the business.</p></div></section></>;
}

function AudiencesAndResearch() {
  return <section className="section audiences-section"><div className="container"><div className="split-heading"><div><SectionLabel index="15" light>Who it is for</SectionLabel><h2>Built for the people who carry the <em>economic decision.</em></h2></div><p>One shared transaction language across the manufacturer, the institution and the systems around them.</p></div><div className="audience-grid">{[{label: "MANUFACTURERS", icon: PanelTop, copy: "Understand the economics of important transactions before committing scarce working capital.", href: "/manufacturers"}, {label: "FINANCE & INSURANCE", icon: Scale, copy: "Receive structured, evidence-linked transaction information for institutional review.", href: "/institutions"}, {label: "INDUSTRIAL PARTNERS", icon: Network, copy: "Connect existing systems and evidence without replacing the manufacturer's core infrastructure.", href: "/technology"}].map(({ label, icon: Icon, copy, href }, index) => <Link href={href} key={label} className={`audience-object a-${index}`}><div><span className="object-number">0{index + 1}</span><Icon size={20} /></div><span className="card-eyebrow">{label}</span><h3>{copy}</h3><span className="object-link">Explore the pathway <ArrowUpRight size={15} /></span></Link>)}</div><div className="research-strip"><div><SectionLabel index="16" light>Research</SectionLabel><h2>Build the evidence around the infrastructure.</h2></div><div className="research-topics">{["Economic transaction infrastructure", "Manufacturing finance", "Trade evidence", "Industrial digitalization", "Transaction risk", "Economic decision intelligence"].map((topic, index) => <span key={topic}><b>0{index + 1}</b>{topic}<ArrowUpRight size={14} /></span>)}</div><ArrowLink href="/research" light>Explore research</ArrowLink></div></div></section>;
}

function FinalCTA() {
  return <section className="final-cta"><div className="final-glow" /><div className="container"><SectionLabel index="17" light>Start with the real thing</SectionLabel><h2>Bring us <em>one real transaction.</em></h2><p>We are validating DEĞERIA with manufacturers using real economic transactions—not hypothetical demos.</p><Link href="/evaluate" className="button button-primary">Evaluate a real transaction <ArrowUpRight size={16} /></Link><div className="cta-foot"><span>NO ERP REPLACEMENT REQUIRED</span><span>NO SENSITIVE DOCUMENTS ON FIRST CONTACT</span><span>DEMO MODE AVAILABLE</span></div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><div><BrandMark /><p>Economic Transaction<br />Infrastructure</p></div><div className="footer-links"><div><span>Explore</span><a href="#passport">Product</a><a href="#mechanism">How it works</a><a href="/manufacturers">Manufacturers</a><a href="/institutions">Institutions</a><a href="/technology">Technology</a><a href="/research">Research</a></div><div><span>Company</span><a href="/evaluate">Contact</a><a href="/evaluate">Careers</a></div><div><span>Legal</span><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Security</a></div></div></div><div className="footer-bottom"><span>© 2026 DEĞERIA</span><span className="footer-status"><i />DEMO INFRASTRUCTURE · v0.1</span></div><p className="footer-disclaimer">DEĞERIA provides technology, evidence, analytical and decision-support services. It does not itself provide banking, insurance, lending, customs, tax or regulated financial services unless separately authorized.</p></div></footer>;
}

export default function Home() {
  return <div className="site-shell"><SiteHeader /><main><Hero /><FragmentedEvidence /><Invention /><PassportSection /><Provenance /><EconomicGraph /><ScenarioSimulator /><Readiness /><InsuranceAndFile /><OutcomeMemory /><DecisionMemory /><PrincipleAndPositioning /><AudiencesAndResearch /><FinalCTA /></main><Footer /></div>;
}

function SubpageShell({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro: string; children: React.ReactNode }) {
  return <div className="site-shell"><SiteHeader /><main className="subpage"><section className="subpage-hero"><div className="container"><SectionLabel index="00" light>{eyebrow}</SectionLabel><h1>{title}</h1><p>{intro}</p></div></section>{children}</main><Footer /></div>;
}

export function TechnologyPage() {
  const layers = ["EVIDENCE", "EVENT", "ECONOMIC STATE", "ASSESSMENT", "POLICY", "RECOMMENDATION", "DECISION", "ACTION", "OUTCOME", "MEASUREMENT", "LEARNING"];
  return <SubpageShell eyebrow="Technology architecture" title={<>An economic transaction has a <em>memory.</em></>} intro="A deterministic evidence graph and transaction passport turn fragmented records into a traceable economic history—without replacing the systems that produce it."><section className="subpage-section"><div className="container"><div className="architecture-rail">{layers.map((layer, i) => <div key={layer} className={i === 2 || i === 8 ? "highlight" : ""}><span>{String(i + 1).padStart(2, "0")}</span><b>{layer}</b>{i < layers.length - 1 && <ArrowDown size={15} />}</div>)}</div><div className="tech-primitives">{[{title: "Evidence Graph", question: "What supports the information?", icon: GitBranch}, {title: "Transaction Passport", question: "What is the current economic state?", icon: PanelTop}, {title: "Deterministic Economics", question: "How was the number calculated?", icon: CircleDollarSign}, {title: "Policy Engine", question: "Which rule was applied?", icon: Scale}, {title: "Decision Memory", question: "What did the human choose?", icon: Database}, {title: "Outcome Engine", question: "What actually happened?", icon: TrendingUp}].map(({ title, question, icon: Icon }, i) => <div className="tech-primitive" key={title}><span className="object-number">0{i + 1}</span><Icon size={18} /><h3>{title}</h3><p>{question}</p><ArrowUpRight size={15} /></div>)}</div></div></section><section className="subpage-dark-band"><div className="container"><SectionLabel index="01" light>Technology principle</SectionLabel><h2>AI <em>interprets.</em><br />Systems <em>calculate.</em><br />Humans <em>decide.</em></h2><ArrowLink href="/evaluate" light>Evaluate a real transaction</ArrowLink></div></section></SubpageShell>;
}

export function ManufacturersPage() {
  return <SubpageShell eyebrow="For manufacturers" title={<>Your transaction is more than an <em>order number.</em></>} intro="Understand the full economic position of important orders—from imported input through production, export, receivable and outcome."><section className="subpage-section"><div className="container"><div className="manufacturer-flow">{["IMPORT", "PRODUCTION", "EXPORT", "FINANCE", "OUTCOME"].map((item, i) => <div key={item}><span>0{i + 1}</span><b>{item}</b>{i < 4 && <ArrowRight size={18} />}</div>)}</div><div className="benefit-grid">{["Know your economic position", "See cash requirements", "Understand payment exposure", "Trace important evidence", "Compare scenarios", "Prepare institutional review files", "Measure prediction vs reality"].map((item, i) => <div key={item}><span>0{i + 1}</span><h3>{item}</h3><CheckCircle2 size={17} /></div>)}</div><div className="subpage-cta"><h2>Start with one real transaction.</h2><p>No ERP replacement required.</p><Link href="/evaluate" className="button button-primary">Evaluate one real transaction <ArrowUpRight size={16} /></Link></div></div></section></SubpageShell>;
}

export function InstitutionsPage() {
  return <SubpageShell eyebrow="For institutions" title={<>Better transaction evidence. Better <em>review context.</em></>} intro="DEĞERIA is designed to prepare structured, evidence-linked transaction information for institutional review—not to replace institutional judgment."><section className="subpage-section"><div className="container"><div className="institution-panel"><div><span className="card-eyebrow">DESIGNED FOR INSTITUTIONAL INTEGRATION</span><h2>Context that travels with the transaction.</h2><p>Potential future users include banks, insurers, export-credit institutions, trade-finance providers and approved professional intermediaries.</p></div><div className="institution-stack">{["COMMERCIAL EVIDENCE", "PRODUCTION EVIDENCE", "RECEIVABLE VISIBILITY", "RISK CONTEXT", "READINESS INDEX"].map((x, i) => <span key={x}><span>0{i + 1}</span>{x}<Check size={14} /></span>)}</div></div><div className="institution-note"><ShieldCheck size={20} /><div><b>Review-ready is not approved.</b><p>Banks, insurers and authorized institutions make their own decisions. DEĞERIA provides evidence, analytical and decision-support infrastructure.</p></div></div></div></section></SubpageShell>;
}

export function ResearchPage() {
  const topics = ["Economic Transaction Infrastructure", "Manufacturing Finance", "Trade Evidence", "Industrial Digitalization", "Transaction Risk", "Economic Decision Intelligence"];
  return <SubpageShell eyebrow="Research / 2026" title={<>The transaction is becoming the <em>unit of understanding.</em></>} intro="Architecture papers, pilot findings, anonymized transaction research and methodology for a new category of economic infrastructure."><section className="subpage-section"><div className="container"><div className="research-list">{topics.map((topic, i) => <article key={topic}><div><span className="object-number">0{i + 1}</span><span className="status-badge">METHODOLOGY</span></div><h3>{topic}</h3><p>Foundational notes on how evidence, economics, decisions and outcomes remain connected across a transaction lifecycle.</p><ArrowUpRight size={18} /></article>)}</div><div className="research-method"><div><SectionLabel index="01">Methodology</SectionLabel><h2>Credibility comes from <em>traceability.</em></h2></div><p>DEĞERIA avoids unsupported claims. Every output uses controlled status language: observed, calculated, assumed, predicted, recommended, decided and actual.</p></div></div></section></SubpageShell>;
}

export function EvaluatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>(["Margin"]);
  const options = ["Margin", "Cash requirement", "FX exposure", "Buyer/payment risk", "Financing readiness", "Insurance readiness", "Evidence gaps", "Other"];
  const toggle = (item: string) => setSelected(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const typeLabel = String(form.get("type") || "");

    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/v1/evaluation-requests`, {
        company: String(form.get("company") || ""),
        country: String(form.get("country") || "") || null,
        industry: String(form.get("industry") || "") || null,
        transaction_type: transactionTypeMap[typeLabel] || "EXPORT",
        transaction_size: String(form.get("size") || "") || null,
        payment_term: String(form.get("payment") || "") || null,
        focus_areas: selected,
      });
      setSubmitted(true);
    } catch (err) {
      setError("We couldn't submit this right now. Please try again in a moment, or reach out directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return <SubpageShell eyebrow="Pilot evaluation" title={<>Bring us one <em>real transaction.</em></>} intro="We are validating DEĞERIA with manufacturers using real economic transactions—not hypothetical demos."><section className="subpage-section evaluate-section"><div className="container"><div className="evaluate-layout"><div className="evaluate-aside"><span className="card-eyebrow">DEĞERIA / PILOT 001</span><h2>Start with the question behind the <em>transaction.</em></h2><p>Do not send sensitive documents on the first form. After contact, secure document exchange can be established.</p><div className="evaluate-stats"><Metric label="MODEL" value="DGR-TRX-DEMO-001" /><Metric label="MODE" value="DEMO + PILOT" accent="teal" /><Metric label="RESPONSE" value="HUMAN REVIEW" /></div></div>{submitted ? <div className="success-panel"><CheckCircle2 size={30} /><span className="card-eyebrow">REQUEST RECEIVED</span><h2>We'll review the transaction context with you.</h2><p>Your first step is a conversation—not a document upload. The DEĞERIA team will follow up using the contact details provided.</p><Link href="/" className="button button-primary">Return to the infrastructure <ArrowRight size={16} /></Link></div> : <form className="evaluate-form" onSubmit={submit}><div className="form-grid"><label>Company<input required name="company" placeholder="Your company" /></label><label>Country<select name="country" defaultValue=""><option value="" disabled>Select country</option><option>Türkiye</option><option>Germany</option><option>United Kingdom</option><option>Other</option></select></label><label>Industry<input name="industry" placeholder="e.g. industrial equipment" /></label><label>Transaction type<select name="type" defaultValue=""><option value="" disabled>Select type</option><option>Import-linked export</option><option>Export</option><option>Import</option></select></label><label>Approximate transaction size<input name="size" placeholder="e.g. €2.5M" /></label><label>Payment term<input name="payment" placeholder="e.g. 120 days" /></label></div><fieldset><legend>What do you want to understand?</legend><div className="checkbox-grid">{options.map(item => <button type="button" key={item} className={selected.includes(item) ? "checked" : ""} onClick={() => toggle(item)}><span>{selected.includes(item) && <Check size={12} />}</span>{item}</button>)}</div></fieldset>{error && <p className="form-disclaimer" style={{ color: "#e5484d" }}>{error}</p>}<button type="submit" className="button button-primary submit-button" disabled={submitting}>{submitting ? "Submitting..." : "Request a transaction evaluation"} <ArrowUpRight size={16} /></button><p className="form-disclaimer">By submitting, you are requesting an exploratory conversation. This is not a financing, insurance or eligibility application.</p></form>}</div></div></section></SubpageShell>;
}
