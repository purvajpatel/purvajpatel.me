import { useState, useEffect } from "react";

const GOLD = "#C9A84C";
const BG = "#000";
const SURFACE = "#080808";
const BORDER = "#111";

const NAV = ["about", "experience", "projects", "awards", "contact"];

const EXPERIENCE = [
  {
    role: "Portfolio Management Intern",
    company: "Arrowstreet Capital",
    location: "Boston, MA",
    period: "Feb 2026 – Present",
    bullets: [],
    tag: "INCOMING",
  },
  {
    role: "Quantitative Strategist Summer Analyst",
    company: "Goldman Sachs",
    location: "Dallas, TX",
    period: "Jun 2025 – Aug 2025",
    bullets: [
      "Interned on Structured Finance Lending and Asset Financing Strats teams, focusing on pricing and risk modeling for private credit and consumer unsecured loan portfolios.",
      "Engineered pricing and valuation models for illiquid structured credit assets using regression, factor modeling, and scenario simulations.",
    ],
    tag: null,
  },
  {
    role: "Research Lead",
    company: "ACM UTD",
    location: "Richardson, TX",
    period: "Aug 2024 – Present",
    bullets: [
      "Developing a hybrid CNN-LSTM model for asset return forecasting, achieving 9% higher returns than baseline.",
      "Selected as Research Director for the next year.",
    ],
    tag: "PROMOTED",
  },
  {
    role: "Researcher",
    company: "ACM UTD",
    location: "Richardson, TX",
    period: "Aug 2024 – Present",
    bullets: [
      "Improving seizure detection via CNN-GNN hybrid model on EEG signals — 84% accuracy vs 65% baseline.",
      "Won best research project (1 of 9 teams) at symposium, advancing to publication.",
    ],
    tag: null,
  },
  {
    role: "Quantitative Research Intern",
    company: "Alpha Labs — Quant Research Group",
    location: "Dallas, TX",
    period: "Aug 2024 – Dec 2024",
    bullets: [
      "Engineered Python portfolio rebalancing algorithms, benchmarking Markowitz MPT against dynamic strategies using option-implied volatility and adaptive rebalancing to maximize Sharpe ratios.",
    ],
    tag: null,
  },
];

const PROJECTS = [
  {
    name: "CatchUp",
    stack: "Python · Flask · LangChain · GPT-4 · Tesseract OCR · Pandas",
    desc: "AI platform using RAG to recommend classes, clubs, and labs from transcript data.",
    award: "🏆 3rd Place General + Nebula Labs Track @ HackAI",
    color: "#6CAEDF",
  },
  {
    name: "Bread Bot",
    stack: "Python · TensorFlow · CNN-LSTM · Solidity · Web3.js · Flask",
    desc: "Full-stack fintech app for new investors with simulations, gamified risk education, a CNN-LSTM stock predictor, and a Solidity-based P2P crypto lending platform.",
    award: "🏆 Capital One Track @ WeHack 2025",
    color: "#4ade80",
  },
  {
    name: "Trading Bot",
    stack: "Python · VADER · Pandas · LumiBot API",
    desc: "Fetches and filters 100+ Reddit posts weekly from r/wallstreetbets, runs VADER sentiment analysis, and executes real-time trades via LumiBot with profit-loss visualization.",
    award: null,
    color: "#F5A623",
  },
  {
    name: "PWHL Playoff Simulator",
    stack: "React · Vite · Monte Carlo Simulation",
    desc: "10,000-simulation playoff odds engine using real PWHL standings and schedule data, with per-team breakdowns and projected points ranges.",
    award: null,
    color: "#C9A84C",
  },
];

const AWARDS = [
  { org: "Uber", title: "Uber Career Prep Fellow", detail: "50 accepted out of 2,000 applicants — year-long fellowship with Uber SWEs" },
  { org: "NMSC", title: "National Merit Scholar", detail: "1 of 2,500 recipients — $2,500 scholarship out of 16,000+ semifinalists" },
  { org: "FTC Robotics", title: "Inspire Award Divisional Winner", detail: "4 out of 10,000+ teams at the FTC World Championship" },
  { org: "SIG", title: "Women's Discovery Event", detail: "1 of 50 selected to learn from working traders at Susquehanna International Group" },
];

const SKILLS = ["C++", "Python", "Java", "JavaScript", "React", "Flask", "TensorFlow", "Node.js", "NumPy", "Pandas", "Solidity", "LangChain"];

export default function Portfolio() {
  const [active, setActive] = useState("about");
  const [loaded, setLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredExp, setHoveredExp] = useState(null);
  const [asciiBg, setAsciiBg] = useState("");

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    const ASCII_CHARS = [".", ":", "*", "+", "=", "#", "@", "%"];
    let cols = Math.floor(window.innerWidth / 10);
    let rows = Math.floor(window.innerHeight / 18);

    const makeLine = () => Array.from({ length: cols }, () => ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]).join("");
    let lines = Array.from({ length: rows }, makeLine);
    setAsciiBg(lines.join("\n"));

    const tick = () => {
      lines = lines.slice(1);
      lines.push(makeLine());
      setAsciiBg(lines.join("\n"));
    };

    const interval = setInterval(tick, 160);

    const handleResize = () => {
      cols = Math.floor(window.innerWidth / 10);
      rows = Math.floor(window.innerHeight / 18);
      lines = Array.from({ length: rows }, makeLine);
      setAsciiBg(lines.join("\n"));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const s = {
    page: {
      background: BG, color: "#e8e8e8", minHeight: "100vh",
      fontFamily: "'DM Mono', 'Courier New', monospace",
    },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "#060709ee", backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${BORDER}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 40px",
    },
    navName: {
      fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
      letterSpacing: 3, color: GOLD,
    },
    navLinks: { display: "flex", gap: 24 },
    section: {
      maxWidth: 780, margin: "0 auto", padding: "100px 24px 60px",
      opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease",
    },
    label: {
      fontSize: 9, letterSpacing: 4, color: "#444", marginBottom: 8,
      fontFamily: "'DM Mono', monospace",
    },
    h2: {
      fontFamily: "'Bebas Neue', sans-serif", fontSize: 38,
      letterSpacing: 2, color: "#fff", margin: "0 0 32px",
      lineHeight: 1,
    },
    card: {
      background: "transparent", border: "none",
      padding: "12px 0", marginBottom: 14,
      transition: "none",
    },
    tag: (color) => ({
      fontSize: 8, letterSpacing: 2, padding: "2px 8px",
      background: color + "22", color, border: `1px solid ${color}44`,
      borderRadius: 20, fontFamily: "'DM Mono', monospace",
    }),
  };

  return (
    <div style={s.page}>
      <div style={{
        position: "fixed", inset: 0, zIndex: -2, pointerEvents: "none",
        fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: "14px",
        color: "rgba(255,255,255,0.06)", whiteSpace: "pre", overflow: "hidden",
      }}>
        {asciiBg}
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060709; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        a { color: inherit; text-decoration: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
        .fade-up-4 { animation: fadeUp 0.6s 0.4s ease both; }
        .nav-link { font-size: 10px; letter-spacing: 2px; color: #555; cursor: pointer; transition: color 0.15s; font-family: 'DM Mono', monospace; background: none; border: none; }
        .nav-link:hover, .nav-link.active { color: #C9A84C; }
        .exp-card:hover { border-color: #2a2a2a !important; background: #0f1012 !important; }
        .proj-card:hover { transform: translateY(-2px); }
        .skill-tag:hover { background: #C9A84C22 !important; color: #C9A84C !important; border-color: #C9A84C44 !important; }
      `}</style>


      {/* HERO / ABOUT */}
      <section id="about" style={{ ...s.section, paddingTop: 140, minHeight: "vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ ...s.label }} className="fade-up">COMPUTER SCIENCE + APPLIED MATHEMATICS</div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 10vw, 88px)", letterSpacing: 3, lineHeight: 0.9, margin: "0 0 24px",
          background: `linear-gradient(135deg, #fff 40%, ${GOLD})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          className="fade-up-1">
          PURVA<br />PATEL
        </h1>
        <div style={{ maxWidth: 520, fontSize: 13, color: "#aaa", lineHeight: 1.8, marginBottom: 28 }} className="fade-up-2">
          Student at <span style={{ color: "#fff" }}>UT Dallas</span> in the Computing Scholars Honors Program (top 3%).
          Incoming intern at <span style={{ color: "#fff" }}>Arrowstreet Capital</span>. 
          Previously <span style={{ color: "#fff" }}>Goldman Sachs</span> quant strats.
          I build things at the intersection of <span style={{ color: GOLD }}>quantitative finance</span> and <span style={{ color: GOLD }}>machine learning</span>.
        </div>

        {/* Skills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }} className="fade-up-3">
          {SKILLS.map(sk => (
            <div key={sk} className="skill-tag" style={{
              fontSize: 10, padding: "4px 10px", borderRadius: 20,
              background: "#111", border: `1px solid #222`, color: "#555",
              letterSpacing: 0.5, cursor: "default", transition: "all 0.15s",
            }}>{sk}</div>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 12 }} className="fade-up-4">
          {[
            { label: "GitHub", href: "https://github.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
            { label: "purva.patel@utdallas.edu", href: "mailto:purva.patel@utdallas.edu" },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              fontSize: 10, letterSpacing: 1, padding: "8px 16px",
              border: `1px solid #222`, borderRadius: 6, color: "#666",
              background: SURFACE, transition: "all 0.15s",
              fontFamily: "'DM Mono', monospace",
            }}
              onMouseEnter={e => { e.target.style.borderColor = GOLD + "66"; e.target.style.color = GOLD; }}
              onMouseLeave={e => { e.target.style.borderColor = "#222"; e.target.style.color = "#666"; }}>
              {label}
            </a>
          ))}
        </div>

        {/* Education strip */}
        <div style={{ marginTop: 48, padding: "16px 20px", background: SURFACE, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${GOLD}`, borderRadius: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: 1.5, color: "#fff" }}>
                UNIVERSITY OF TEXAS AT DALLAS
              </div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>
                B.S. Computer Science + Applied Mathematics · Expected May 2028
              </div>
            </div>
            <div style={{ ...s.tag(GOLD) }}>COMPUTING SCHOLARS · TOP 3%</div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={s.section}>
        <div style={s.label}>WORK</div>
        <h2 style={s.h2}>EXPERIENCE</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="exp-card" style={{
              ...s.card,
              borderLeft: `3px solid ${i === 0 ? GOLD : "#1a1a1a"}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: 1, color: "#fff" }}>
                      {exp.role}
                    </div>
                    {exp.tag && <div style={s.tag(GOLD)}>{exp.tag}</div>}
                  </div>
                  <div style={{ fontSize: 11, color: GOLD, marginBottom: 8, letterSpacing: 0.5 }}>
                    {exp.company} · {exp.location}
                  </div>
                  {exp.bullets.map((b, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                      <span style={{ color: "#333", marginTop: 1 }}>—</span>
                      <span style={{ fontSize: 11, color: "#888", lineHeight: 1.7 }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 9, color: "#444", letterSpacing: 1, whiteSpace: "nowrap", fontFamily: "'DM Mono', monospace" }}>
                  {exp.period}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={s.section}>
        <div style={s.label}>BUILDS</div>
        <h2 style={s.h2}>PROJECTS</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 10 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} className="proj-card"
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                ...s.card,
                borderLeft: `3px solid ${hoveredProject === i ? p.color : "#1a1a1a"}`,
                cursor: "default",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 1.5, color: hoveredProject === i ? p.color : "#fff", transition: "color 0.2s" }}>
                  {p.name}
                </div>
              </div>
              <div style={{ fontSize: 9, color: "#444", letterSpacing: 0.5, marginBottom: 10, lineHeight: 1.8 }}>
                {p.stack}
              </div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7, marginBottom: p.award ? 12 : 0 }}>
                {p.desc}
              </div>
              {p.award && (
                <div style={{ fontSize: 10, color: GOLD, background: GOLD + "11", border: `1px solid ${GOLD}22`, borderRadius: 5, padding: "5px 10px", letterSpacing: 0.5 }}>
                  {p.award}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section id="awards" style={s.section}>
        <div style={s.label}>RECOGNITION</div>
        <h2 style={s.h2}>AWARDS</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {AWARDS.map((a, i) => (
            <div key={i} style={{ ...s.card, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ minWidth: 48, height: 48, borderRadius: 6, background: GOLD + "15", border: `1px solid ${GOLD}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 9, color: GOLD, letterSpacing: 1, textAlign: "center", lineHeight: 1.3 }}>
                  {a.org.split(" ").map((w, i) => <div key={i}>{w}</div>)}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: 1, color: "#fff", marginBottom: 3 }}>
                  {a.title}
                </div>
                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>{a.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ ...s.section, paddingBottom: 120 }}>
        <div style={s.label}>GET IN TOUCH</div>
        <h2 style={s.h2}>CONTACT</h2>
        <div style={{ ...s.card, borderLeft: `3px solid ${GOLD}`, padding: "28px 24px" }}>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 24, maxWidth: 480 }}>
            I'm always open to talking about quant finance, ML research, or cool projects. Feel free to reach out.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "EMAIL", value: "purva.patel@utdallas.edu", href: "mailto:purva.patel@utdallas.edu" },
              { label: "GITHUB", value: "github.com/purvajpatel", href: "https://github.com/purvajpatel" },
              { label: "LINKEDIN", value: "linkedin.com/in/purva-patel", href: "https://linkedin.com/in/purva-patel" },
              { label: "PHONE", value: "972-876-9098", href: "tel:9728769098" },
            ].map(({ label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 14px", background: "#080809", border: `1px solid #161616`, borderRadius: 6, transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD + "44"; e.currentTarget.style.background = GOLD + "08"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#161616"; e.currentTarget.style.background = "#080809"; }}>
                <div style={{ fontSize: 8, letterSpacing: 2, color: "#444", minWidth: 60 }}>{label}</div>
                <div style={{ fontSize: 12, color: "#aaa" }}>{value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 8, color: "#2a2a2a", letterSpacing: 2 }}>PURVA PATEL © 2026</div>
        <div style={{ fontSize: 8, color: "#2a2a2a", letterSpacing: 1 }}>UT DALLAS · CS + APPLIED MATH</div>
      </div>
    </div>
  );
}
