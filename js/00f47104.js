/* global React, Eyebrow */
const { useState: _us3, useEffect: _ue3, useRef: _ur3 } = React;

// ============================================================
// TRAINERS · icons only
// ============================================================

const TRAINER_ICONS = {
  career:
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 7h18v12H3z" /><path d="M9 7V4h6v3" /><path d="M3 12h18" />
    </svg>,

  kpop:
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="9" /><path d="M8 12a4 4 0 0 0 8 0" /><circle cx="9" cy="9" r="0.8" fill="currentColor" /><circle cx="15" cy="9" r="0.8" fill="currentColor" />
    </svg>,

  exam:
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 4h12l4 4v12H4z" /><path d="M16 4v4h4" /><path d="M8 12h8M8 16h6" />
    </svg>,

  stage:
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 18h18" /><path d="M5 18V9l7-4 7 4v9" /><path d="M10 18v-6h4v6" />
    </svg>

};

const TRAINERS = [
{ icon: "career", text: "10년+ 현직 안무가 출신", meta: "Choreographer" },
{ icon: "kpop", text: "K-POP 아이돌 안무 제작 다수 경력", meta: "K-POP Choreo" },
{ icon: "exam", text: "실용무용과 입시 지도 경력", meta: "Exam Coach" },
{ icon: "stage", text: "각 장르 전문 트레이너", meta: "Active Stage" }];


function Trainers() {
  return (
    <section className="section" id="trainers" style={{ background: "var(--navy-deep)" }}>
      <div className="section-inner">
        <div className="section-head">
          <Eyebrow>검증된 트레이너 시스템</Eyebrow>
          <h2 className="h2 reveal">현직 트레이너가<br />상주합니다.</h2>
          <p className="lead reveal" data-delay="1">체계적으로 관리되는 시스템.</p>
        </div>

        <div className="trainer-grid">
          {TRAINERS.map((t, i) =>
          <div className="trainer-card" key={i}>
              <div className="trainer-icon">{TRAINER_ICONS[t.icon]}</div>
              <p className="trainer-text">{t.text}</p>
              <div className="trainer-meta">{t.meta}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ============================================================
// ENROLL STEPS
// ============================================================

const ENROLL_STEPS = [
{ title: "상담 신청", desc: "1~2일 내 직접 연락드립니다." },
{ title: "무료 진단 방문", desc: "30~60분 트레이너 직접 테스트." },
{ title: "PIVOT 진단서 처방", desc: "강점·보완·맞춤 커리큘럼 즉시 제공." },
{ title: "등록", desc: "" }];


function EnrollSteps() {
  return (
    <section className="section" id="enroll">
      <div className="section-inner">
        <div className="section-head">
          <Eyebrow>등록까지 4단계</Eyebrow>
          <h2 className="h2 reveal">부담 없이 시작하세요.</h2>
        </div>

        <div className="enroll-grid">
          {ENROLL_STEPS.map((s, i) =>
          <div className="enroll-card reveal" data-delay={i + 1} key={i}>
              <span className="enroll-num">0{i + 1}</span>
              <h3 className="enroll-title">{s.title}</h3>
              <p className="enroll-desc">{s.desc}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ============================================================
// GALLERY with real photos
// ============================================================

const GALLERY = [
{ kind: "tall", ko: "메인 연습실", en: "STUDIO · MAIN", id: "studioMain", fallback: "assets/studio-room-large.png" },
{ kind: "norm", ko: "외관 · 이문로 85", en: "EXTERIOR", id: "studioExterior", fallback: "assets/studio-exterior.png" },
{ kind: "norm", ko: "서브 연습실", en: "STUDIO · B", id: "studioSub", fallback: "assets/studio-room-small.png" },
{ kind: "norm", ko: "복도 · 대기실", en: "HALLWAY", id: "studioHallway", fallback: "assets/studio-hallway.png" }];


function Gallery() {
  return (
    <section className="section" id="studio">
      <div className="section-inner">
        <div className="section-head">
          <Eyebrow>피벗스튜디오 외대점</Eyebrow>
          <h2 className="h2 reveal">이곳에서 시작합니다.</h2>
        </div>

        <div className="gallery-grid reveal">
          {GALLERY.map((g, i) => {
            const src = (window.__resources && window.__resources[g.id]) || g.fallback;
            return (
            <div className={"gallery-cell " + (g.kind === "tall" ? "tall" : "")} key={i}>
              <div
              className="photo"
              style={{ backgroundImage: `url(${src})` }}
              aria-label={g.ko} />
            
              <div className="gallery-label">
                {g.en}
                <span className="ko">{g.ko}</span>
              </div>
            </div>);
          })}
        </div>
      </div>
    </section>);

}

// ============================================================
// FAQ
// ============================================================

const FAQ_DATA = [
{
  q: "아직 입시 학년이 아닌데 다닐 수 있나요? (중1·2 / 고1·2)",
  a: "네, 예비 입시생도 환영합니다.\n오히려 입시 학년이 되기 전에 미리 시작하는 것이 가장 좋습니다.\n외대점은 예비 입시생을 위한 기초 커리큘럼이 별도로 준비되어 있어, 입시 학년에 진입했을 때 바로 실전 준비에 들어갈 수 있도록 설계되어 있습니다."
},
{
  q: "지금 다른 학원에 다니고 있는데, 옮겨도 늦지 않을까요?",
  a: "10월 입시까지 5개월, 결코 짧은 시간이 아닙니다.\n다만 그 시간 동안 학생도 학원도 최선을 다해야 결과가 만들어집니다.\n외대점은 매주 평가와 매달 모의고사로 짧은 시간에도 실력이 누적되도록 설계되어 있고, 전문 트레이너가 입시 끝까지 1:1로 끝까지 케어합니다.\n함께 최선을 다해보세요."
},
{
  q: "중3·고3입니다. 지금 시작해서 예고·예대 갈 수 있나요?",
  a: "솔직하게 말씀드리면, 정말 급한 상황입니다.\n그만큼 학생도 죽을 각오로 임해야 하고, 학원도 그에 맞춰 모든 열정을 쏟아부어야 합니다.\n외대점은 지금 시작하는 학생을 위한 집중 커리큘럼이 따로 준비되어 있고, 매주 평가와 매달 모의로 짧은 시간 안에 실력이 만들어지도록 설계했습니다.\n가능 여부는 학생 현재 실력과 목표 학교에 따라 다르니, 상담에서 정확히 진단해드립니다."
},
{
  q: "학부모입니다. 자녀가 잘 하고 있는지 어떻게 알 수 있나요?",
  a: "매달 1회 성장 리포트를 학부모님께 직접 전달드립니다."
},
{
  q: "상담은 어떻게 진행되나요?",
  a: "아래 상담 신청 폼을 작성해주시면 1~2일 내 전문 트레이너가 직접 연락드립니다.\n부담 없이 학습 상황과 입시 목표를 편하게 이야기해주시면 됩니다."
},
{
  q: "위치가 어디인가요?",
  a: "한국외대 정문 인근에 위치하고 있습니다. 자세한 주소는 아래에 안내드립니다."
}];


function FAQ() {
  const [open, setOpen] = _us3(0);
  return (
    <section className="section" id="faq" style={{ background: "var(--navy-deep)" }}>
      <div className="section-inner">
        <div className="section-head">
          <Eyebrow>자주 묻는 질문</Eyebrow>
          <h2 className="h2 reveal">궁금한 점, 먼저 답해드립니다.</h2>
        </div>

        <div className="faq-list reveal">
          {FAQ_DATA.map((f, i) =>
          <div className={"faq-item" + (open === i ? " open" : "")} key={i}>
              <button
              className="faq-q"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}>
              
                <span className="qnum">Q{i + 1}</span>
                <span>{f.q}</span>
                <span className="toggle" aria-hidden="true" />
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">
                  <div className="faq-a-content">
                    <div>{f.a}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ============================================================
// LOCATION · illustrated map (HUFS gate → studio)
// ============================================================

function IllustratedMap() {
  return (
    <div className="map-illustration map-photo">
      <img src={(window.__resources && window.__resources.mapNaver) || "assets/map-naver.png"} alt="PIVOT410 외대점 위치 — 한국외대 정문 인근, 이문로 85, 3층" />
      {/* Overlay: subtle navy tint + corner brand badge so the bright map blends with the dark site theme */}
      <div className="map-tint" aria-hidden="true" />
      <div className="map-badge">
        <span className="dot" />
        <div>
          <div className="t1">PIVOT410 · 외대점</div>
          <div className="t2">이문로 85, 3층</div>
        </div>
      </div>
      <div className="map-attrib">정문 도보 3분 · 외대앞역 1호선 도보 5분</div>
    </div>
  );
}

function Location() {
  return (
    <section className="section" id="location">
      <div className="section-inner">
        <div className="section-head">
          <Eyebrow>오시는 길</Eyebrow>
          <h2 className="h2 reveal">PIVOT STUDIO 외대점</h2>
        </div>

        <div className="location-layout">
          <div className="reveal"><IllustratedMap /></div>

          <div className="location-info reveal" data-delay="1">
            <div className="info-block">
              <span className="label">ADDRESS</span>
              <span className="value">서울 동대문구 이문로 85, 3층</span>
              <span className="sub">한국외대 정문에서 도보 약 3분</span>
            </div>
            <div className="info-block">
              <span className="label">SUBWAY</span>
              <span className="value">외대앞역 (1호선)</span>
              <span className="sub">도보 약 5분 · 1번 출구 방향</span>
            </div>
            <div className="info-block">
              <span className="label">INSTAGRAM</span>
              <span className="value">@pivot410studio_hufs</span>
              <span className="sub">방배점 · @pivot410studio_bangbae</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ============================================================
// FOOTER
// ============================================================

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <img className="brand-mark" src={(window.__resources && window.__resources.logoWhite) || "assets/logo-white.png"} alt="PIVOT410" style={{ height: 40, filter: "brightness(0) invert(1)" }} />
          <div className="branch">외대점 · HUFS BRANCH</div>
          <div className="addr">서울 동대문구 이문로 85, 3층</div>
        </div>
        <div className="footer-right">
          <span className="ig">@pivot410studio_hufs</span>
          <span className="home">www.pivot410.com</span>
        </div>
      </div>
      <div className="footer-copy">
        <span>© 2026 PIVOT410 STUDIO</span>
        <span>HUFS BRANCH · 실용무용 입시 전문</span>
      </div>
    </footer>);

}

Object.assign(window, { Trainers, EnrollSteps, Gallery, FAQ, Location, Footer });