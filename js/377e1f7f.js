/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// Shared atoms
// ============================================================

const Eyebrow = ({ children, onPaper }) => (
  <span className={"eyebrow" + (onPaper ? " on-paper" : "")}>{children}</span>
);

// Split headline into per-char spans with sequential reveal
function SplitHeadline({ text, className, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className={"split-headline " + (className || "")}>
      {[...text].map((c, i) => (
        <span
          key={i}
          className="ch"
          style={{ transitionDelay: (delay + i * 25) + "ms" }}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

// ============================================================
// Countdown timer
// ============================================================
function Countdown({ deadline }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(deadline).getTime();
  const diff = target - now;

  if (isNaN(target)) return null;
  if (diff <= 0) {
    return (
      <div className="countdown ended">
        <span className="countdown-label">EVENT</span>
        <div className="countdown-clock">마감되었습니다</div>
      </div>
    );
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="countdown">
      <span className="countdown-label">마감까지</span>
      <div className="countdown-clock">
        <span className="cd-cell"><span className="num">{pad(d)}</span><span className="unit">일</span></span>
        <span className="cd-cell"><span className="num">{pad(h)}</span><span className="unit">시간</span></span>
        <span className="cd-cell"><span className="num">{pad(m)}</span><span className="unit">분</span></span>
        <span className="cd-cell"><span className="num">{pad(s)}</span><span className="unit">초</span></span>
      </div>
    </div>
  );
}

// ============================================================
// Header
// ============================================================

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"site-header" + (scrolled ? " scrolled" : "")}>
      <a href="#top" className="brand">
        <img className="brand-mark" src={(window.__resources && window.__resources.logoWhite) || "assets/logo-white.png"} alt="PIVOT410" />
        <span className="brand-text">
          <span className="main">PIVOT410 STUDIO</span>
          <span className="branch">HUFS BRANCH · 외대점</span>
        </span>
      </a>
      <a href="#contact" className="nav-cta">상담 신청 →</a>
    </header>
  );
}

// ============================================================
// HERO  (no V watermark; single inline event flow)
// ============================================================

function Hero({ event, onCta }) {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <span className="hero-label reveal in">실용무용과 입시 · 외대점</span>

        <h1 className="hero-title reveal in" data-delay="1">
          지금 학원,<br />
          <em>확신</em>하세요?
        </h1>

        <div className="hero-sub-stack reveal in" data-delay="2">
          <p className="hero-sub">지금 학원이 답답하다면, 아직 시작하지 않았다면.</p>
          <p className="urgent">얼른 선택해야 할 때입니다.</p>
        </div>

        {event ? (
          <div className="hero-event-block reveal in" data-delay="3">
            <span className="event-tag">
              <span className="bolt">⚡</span>
              {event.tag}
            </span>

            <h2 className="event-headline">{event.headline}</h2>

            <p className="event-sub">
              {event.sub.split(" · ").map((s, i) => (
                <span key={i}>{s.trim()}</span>
              ))}
            </p>

            <Countdown deadline={event.deadline} />

            <a
              href="#contact"
              className="cta-red magnetic"
              onClick={(e) => {
                e.preventDefault();
                onCta && onCta();
              }}
            >
              <span>선착순 10명 · 6월 한정</span>
              <span className="pipe">|</span>
              <span>상담 신청 바로가기</span>
              <span className="arrow">→</span>
            </a>
          </div>
        ) : null}
      </div>

      <div className="scroll-hint">SCROLL</div>
    </section>
  );
}

// ============================================================
// PROBLEMS
// ============================================================

const PROBLEMS = [
  "지금 학원에서 내 실력이 정말 늘고 있는지 모르겠다.",
  "학부모님이 학생의 성장 과정을 공유 받지 못하고 있다.",
  "학원을 다니고 있지만 관리를 제대로 받고 있는지 모르겠다.",
  "아직 입시 준비를 시작 못했고,\n어디로 가야 할지 막막하다.",
];;

function Problems() {
  return (
    <section className="section" id="problems">
      <div className="section-inner">
        <div className="section-head">
          <Eyebrow>혹시 이런 상황이신가요?</Eyebrow>
          <h2 className="h2 reveal">한 번이라도 이런 생각,<br/>해보신 적 있다면.</h2>
        </div>

        <div className="problem-grid reveal">
          {PROBLEMS.map((text, i) => (
            <div className="problem-card" key={i}>
              <div className="problem-num">상황 0{i + 1}</div>
              <p className="problem-text" style={{ whiteSpace: "pre-line" }}>{text}</p>
            </div>
          ))}
        </div>

        <p className="section-note reveal">
          입시 학년 전 학생<span className="accent">(중1·2 / 고1·2)</span>도 미리 시작할 수 있습니다.
        </p>
      </div>
    </section>
  );
}

// ============================================================
// RESPONSIBILITY
// ============================================================

const RESP = [
  { cadence: "매주", title: "실기 주 평가", desc: "주 1회 평가와 개별 피드백.\n부족한 부분을 즉시 보완합니다." },
  { cadence: "매달", title: "실전 매월 모의고사", desc: "입시 당일이 6번째 무대.\n실전 무대 경험을 미리 쌓습니다." },
  { cadence: "매달", title: "성장 리포트", desc: "객관적인 성장 지표를\n학부모님과 공유합니다." },
  { cadence: "상시", title: "전문 트레이너 상주", desc: "전문 트레이너 상주.\n언제든 피드백 받을 수 있는 환경." },
];

function Responsibility() {
  return (
    <section className="section" id="system" style={{ background: "var(--navy-deep)" }}>
      <div className="section-inner">
        <div className="section-head">
          <Eyebrow>5개월의 책임</Eyebrow>
          <h2 className="h2 reveal">강사 개인이 아닌,<br/>시스템으로 책임집니다.</h2>
          <p className="lead reveal" data-delay="1">
            외대점은 검증된 트레이너 시스템으로 운영됩니다.
          </p>
        </div>

        <div className="resp-grid">
          {RESP.map((r, i) => (
            <div className="resp-card reveal" data-delay={(i % 4) + 1} key={i}>
              <span className="resp-cadence">{r.cadence}</span>
              <h3 className="resp-title">{r.title}</h3>
              <p className="resp-desc" style={{ whiteSpace: "pre-line" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Header, Hero, Problems, Responsibility, Eyebrow, SplitHeadline, Countdown });
