/* global React, ReactDOM,
   Header, Hero, Problems, Responsibility,
   DiagnosisSystem, DiagnosisProcess,
   Trainers, EnrollSteps, Gallery, FAQ, Location, FinalCTA, Footer,
   TweaksPanel, useTweaks, TweakSection, TweakText, TweakToggle */
const { useEffect: _ue, useRef: _ur } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "eventTag": "EVENT · 실용무용과 입시반 오픈 이벤트",
  "eventHeadline": "작품비 0원",
  "eventSub": "전액 면제 · 무료 테스트 · 고1·2 / 중 1·2 예비 입시생 환영",
  "showEvent": true,
  "deadline": "2026-06-30T23:59:59+09:00"
}/*EDITMODE-END*/;

// ============================================================
// Magnetic hover — element pulls toward cursor when within range
// (NO following cursor element — global mousemove only updates
//  elements currently being hovered)
// ============================================================
function useMagnetic() {
  _ue(() => {
    // Skip on touch / coarse pointer
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const SEL = ".magnetic, .cta-gold, .cta-red, .nav-cta, .form-submit";
    const STRENGTH = 0.22;  // how much the element pulls
    const RANGE = 18;       // expand range outside element by this px

    const handlers = new WeakMap();

    function attach(el) {
      if (handlers.has(el)) return;
      el.classList.add("magnetic");
      let raf = 0;
      let active = false;
      let resetTimer;

      const update = (e) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        // Only animate when cursor is within RANGE px of the bounding box
        const inside =
          e.clientX >= r.left - RANGE && e.clientX <= r.right + RANGE &&
          e.clientY >= r.top - RANGE && e.clientY <= r.bottom + RANGE;
        if (!inside) {
          if (active) {
            active = false;
            el.classList.remove("hot");
            el.style.transform = "";
          }
          return;
        }
        if (!active) { active = true; el.classList.add("hot"); }
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px) scale(1.04)`;
        });
      };

      const leave = () => {
        active = false;
        el.classList.remove("hot");
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => { el.style.transform = ""; }, 30);
      };

      const onMove = (e) => update(e);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", leave);
      handlers.set(el, { onMove, leave });
    }

    // Initial pass
    document.querySelectorAll(SEL).forEach(attach);

    // Re-attach when new elements appear (Tweaks panel toggles)
    const mo = new MutationObserver(() => {
      document.querySelectorAll(SEL).forEach(attach);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
}

// ============================================================
// Section divider (gold sweep when in view)
// ============================================================
function Divider() {
  const ref = _ur(null);
  _ue(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.unobserve(el);
        }
      }),
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="section-divider" />;
}

// ============================================================
// App
// ============================================================
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useMagnetic();

  // Global reveal observer
  _ue(() => {
    const update = () => {
      const els = document.querySelectorAll(".reveal:not(.in)");
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 60) el.classList.add("in");
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const event = t.showEvent
    ? {
        tag: t.eventTag,
        headline: t.eventHeadline,
        sub: t.eventSub,
        deadline: t.deadline,
      }
    : null;

  return (
    <>
      <Header />
      <main>
        <Hero event={event} onCta={scrollToContact} />
        <Problems />
        <Divider />
        <Responsibility />
        <DiagnosisSystem />
        <DiagnosisProcess />
        <Divider />
        <Trainers />
        <EnrollSteps />
        <Gallery />
        <FAQ />
        <Location />
        <FinalCTA />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="이벤트 배지 (히어로)">
          <TweakToggle label="배지 노출" value={t.showEvent} onChange={(v) => setTweak("showEvent", v)} />
          <TweakText label="작은 라벨" value={t.eventTag} onChange={(v) => setTweak("eventTag", v)} />
          <TweakText label="골드 헤드라인" value={t.eventHeadline} onChange={(v) => setTweak("eventHeadline", v)} />
          <TweakText label="서브 카피" value={t.eventSub} onChange={(v) => setTweak("eventSub", v)} />
        </TweakSection>
        <TweakSection label="카운트다운">
          <TweakText label="마감 시각 (ISO)" value={t.deadline} onChange={(v) => setTweak("deadline", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
