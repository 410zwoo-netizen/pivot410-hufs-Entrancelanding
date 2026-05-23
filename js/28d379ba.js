/* global React, Eyebrow */
const { useState: _u2 } = React;

// ============================================================
// DIAGNOSIS · paper section with mock report card
// ============================================================

const SCORES = [
{ key: "리듬 & 그루브", val: 8.5, tag: "우수", level: "good" },
{ key: "아이솔레이션", val: 7.0, tag: "양호", level: "fair" },
{ key: "표현력", val: 7.5, tag: "양호", level: "fair" },
{ key: "습득력", val: 8.0, tag: "우수", level: "good" },
{ key: "잠재력", val: 9.0, tag: "우수", level: "good" }];


function RadarChart() {
  // 5-axis radar, normalized 0-10
  const cx = 100,cy = 100,R = 78;
  const axes = SCORES.map((s, i) => {
    const ang = Math.PI * 2 * i / SCORES.length - Math.PI / 2;
    return {
      label: s.key,
      x: cx + Math.cos(ang) * R,
      y: cy + Math.sin(ang) * R,
      vx: cx + Math.cos(ang) * R * (s.val / 10),
      vy: cy + Math.sin(ang) * R * (s.val / 10),
      ang
    };
  });
  const rings = [0.25, 0.5, 0.75, 1];
  const polyAxis = axes.map((a) => `${a.x},${a.y}`).join(" ");
  const polyVal = axes.map((a) => `${a.vx},${a.vy}`).join(" ");

  return (
    <svg className="radar" viewBox="0 0 200 200" aria-hidden="true">
      {rings.map((r, i) =>
      <polygon
        key={i}
        points={axes.map((a) => `${cx + (a.x - cx) * r},${cy + (a.y - cy) * r}`).join(" ")}
        fill="none"
        stroke="#E5DECE"
        strokeWidth={i === rings.length - 1 ? 0.8 : 0.5} />

      )}
      {axes.map((a, i) =>
      <line key={i} x1={cx} y1={cy} x2={a.x} y2={a.y} stroke="#E5DECE" strokeWidth="0.5" />
      )}
      <polygon points={polyVal} fill="rgba(245,200,75,0.35)" stroke="#F5C84B" strokeWidth="1.5" />
      {axes.map((a, i) =>
      <circle key={i} cx={a.vx} cy={a.vy} r="2.2" fill="#C8202C" />
      )}
      {axes.map((a, i) => {
        const lx = cx + Math.cos(a.ang) * (R + 14);
        const ly = cy + Math.sin(a.ang) * (R + 14);
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="7"
            fontWeight="600"
            fill="#1A2847"
            fontFamily="'Pretendard Variable', sans-serif">
            
            {a.label}
          </text>);

      })}
    </svg>);

}

function ReportCard() {
  return (
    <div className="report-frame" aria-label="PIVOT 진단서 미리보기">
      <div className="report-card" style={{ padding: "32px" }}>
        <div className="report-head">
          <img className="report-logo" src={(window.__resources && window.__resources.logoBlack) || "assets/logo-black.png"} alt="PIVOT410" />
          <div className="report-meta">
            진단일자 · <b>2026 . 06 . XX</b><br />
            진단번호 · <b>2026-001</b><br />
            진단 트레이너 · <span className="red">XXX</span>
          </div>
        </div>
        <div className="report-tag">PIVOT 진단 시스템</div>
        <h3 className="report-title">
          PIVOT STUDIO 진단서
          <span className="chip-track">입시 트랙</span>
        </h3>

        <div className="report-fields">
          <div>
            <div className="label">STUDENT</div>
            <div className="value">김지우</div>
          </div>
          <div>
            <div className="label">GRADE</div>
            <div className="value">고2</div>
          </div>
          <div>
            <div className="label">GENRE</div>
            <div className="value">코레오 · 힙합</div>
          </div>
          <div>
            <div className="label">BRANCH</div>
            <div className="value">외대점</div>
          </div>
        </div>

        <div className="report-section-label">진단 결과 · DIAGNOSIS</div>
        <div className="report-chart-row">
          <RadarChart />
          <div className="score-list">
            {SCORES.map((s) =>
              <div className="score-row" key={s.key}>
                <span className="name">{s.key}</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: s.val * 10 + "%" }} />
                </div>
                <span className="score-val">{s.val.toFixed(1)}</span>
                <span className={"score-chip" + (s.level === "fair" ? " fair" : "")}>
                  {s.tag}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="report-avg">
          <span className="label">5개 항목 평균</span>
          <span className="big">8.0</span>
          <span className="score-chip">우수</span>
        </div>

        {/* Legend */}
        <div style={{
          marginTop: 16,
          padding: "10px 14px",
          background: "var(--paper)",
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
          gap: 12,
          fontSize: 9,
          color: "#5A6478"
        }}>
          <span>■ 기초 (0~3.5)</span>
          <span>■ 발전 (4~5.5)</span>
          <span>■ 양호 (6~7.5)</span>
          <span style={{ color: "#1A2847", fontWeight: 700 }}>■ 우수 (8~9)</span>
          <span style={{ color: "var(--red)", fontWeight: 700 }}>■ 탁월 (9.5~10)</span>
        </div>

        {/* SUMMARY — labels visible, values blurred */}
        <div style={{ marginTop: 22 }} className="report-section-label">종합 진단 · SUMMARY</div>
        <div className="report-summary-grid">
          <div className="report-summary-box">
            <div className="sbox-label">현재 수준</div>
            <div className="sbox-value blur-value">평균 8.0점 · 상위 30% · 우수</div>
          </div>
          <div className="report-summary-box dark">
            <div className="sbox-label">학생 목표</div>
            <div className="sbox-value blur-value">서경대 · 서울예대</div>
          </div>
          <div className="report-summary-box">
            <div className="sbox-label">강점</div>
            <div className="sbox-value blur-value">잠재력 우수 · 리듬감 우수</div>
          </div>
          <div className="report-summary-box warn">
            <div className="sbox-label">보완 필요</div>
            <div className="sbox-value blur-value">아이솔레이션 강화</div>
          </div>
        </div>

        {/* Quote — fully blurred */}
        <div className="report-quote blur-value">
          타고난 음악성과 잠재력이 우수합니다. 아이솔레이션 보강에 집중하면 큰 성장이 기대됩니다.
        </div>

        {/* Prescription — labels visible, values blurred */}
        <div style={{ marginTop: 8 }} className="report-section-label">맞춤 처방 · PRESCRIPTION</div>
        <div className="report-presc">
          <div className="report-presc-head">
            <span className="title">PIVOT 맞춤 커리큘럼</span>
            <span className="num">No. 2026-001</span>
          </div>
          <div className="report-presc-grid">
            <div className="report-presc-field">
              <div className="label">CLASS</div>
              <div className="value blur-value">입시 전문반 · 코레오 중급</div>
            </div>
            <div className="report-presc-field">
              <div className="label">TRAINER</div>
              <div className="value blur-value">XXX · YYY 트레이너</div>
            </div>
            <div className="report-presc-field">
              <div className="label">FOCUS</div>
              <div className="value blur-value">아이솔레이션 강화 · 표현력 보강</div>
            </div>
            <div className="report-presc-field">
              <div className="label">SCHEDULE</div>
              <div className="value blur-value">주 3회</div>
            </div>
          </div>
        </div>
      </div>

      {/* Centered floating lock badge */}
      <div className="report-lock-badge">
        <div className="report-lock-icon">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="4" y="11" width="16" height="10" rx="1.5" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            <circle cx="12" cy="16" r="1.2" fill="currentColor" />
          </svg>
        </div>
        <div className="report-lock-tag">PIVOT STUDIO DIAGNOSIS</div>
        <p className="report-lock-headline">전체 진단서는<br />테스트 방문 시 공개됩니다.</p>
      </div>
    </div>
  );
}

function DiagnosisSystem() {
  return (
    <section className="section paper" id="diagnosis">
      <div className="section-inner">
        <div className="section-head">
          <Eyebrow onPaper>진단부터 시작하세요</Eyebrow>
          <h2 className="h2 reveal">당신의 진짜 실력부터,<br />객관적으로 진단합니다.</h2>
        </div>

        <div className="diagnosis-layout">
          <div className="reveal"><ReportCard /></div>
          <div className="diag-copy reveal" data-delay="1">
            <div className="diag-list">
              <div className="diag-item">
                <div className="num">01</div>
                <div>
                  <h4>5각 레이더 차트로 시각화</h4>
                  <p>리듬 · 아이솔레이션 · 표현력 · 습득력 · 잠재력.<br />5개 항목으로 현재 위치를 한눈에 확인합니다.</p>
                </div>
              </div>
              <div className="diag-item">
                <div className="num">02</div>
                <div>
                  <h4>강점 / 보완 필요 객관 분석</h4>
                  <p>주관적인 평가가 아닌, 정량화된 지표로<br />지금 무엇을 키워야 하는지 분명해집니다.</p>
                </div>
              </div>
              <div className="diag-item">
                <div className="num">03</div>
                <div>
                  <h4>목표에 맞춘 맞춤 커리큘럼</h4>
                  <p>지망 대학과 전공에 맞춰<br />주 단위 훈련 계획을 처방받습니다.</p>
                </div>
              </div>
            </div>

            <div className="gold-callout">무료 진단만 받아도, 자신의 위치가 명확해집니다.
매달 진단서 제공 / 성장 시각화
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ============================================================
// DIAGNOSIS PROCESS · 3 steps
// ============================================================

const DIAG_STEPS = [
{
  title: "준비물",
  items: [
  "자신 있는 안무 1개 준비",
  "준비가 안되어 있어도 괜찮습니다."]

},
{
  title: "테스트 진행",
  items: [
  "기본기 테스트 (자세 · 리듬 · 아이솔레이션)",
  "안무 습득력 테스트 (즉석 안무 티칭)",
  "전문 트레이너가 직접 진행",
  "상담까지 총 30~60분 소요"]

},
{
  title: "진단서 처방",
  items: [
  "진단서 즉시 제공",
  "강점 · 보완점 객관 분석",
  "목표별 맞춤 커리큘럼 제안",
  "본인의 현재 상황 파악"]

}];


function DiagnosisProcess() {
  return (
    <section className="section" id="process">
      <div className="section-inner">
        <div className="section-head">
          <Eyebrow>무료 진단이 진행되는 방식</Eyebrow>
          <h2 className="h2 reveal">이렇게 진행됩니다.</h2>
        </div>

        <div className="steps-3">
          {DIAG_STEPS.map((s, i) =>
          <React.Fragment key={i}>
              <div className="step-card reveal" data-delay={i + 1}>
                <div className="step-num">0{i + 1}</div>
                <h3 className="step-title">{s.title}</h3>
                <ul className="step-list">
                  {s.items.map((t, k) => <li key={k}>{t}</li>)}
                </ul>
              </div>
              {i < DIAG_STEPS.length - 1 ?
            <div className="step-arrow" aria-hidden="true">
                  <span className="chev">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 2l5 4-5 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div> :
            null}
            </React.Fragment>
          )}
        </div>

        <p className="fine-print reveal">
          진단서는 등록 여부와 무관하게 무료 제공됩니다.<br/>
          예비 입시생<span style={{ color: "var(--gold)" }}>(중1·2 / 고1·2)</span>도 부담 없이 신청 가능합니다.
        </p>
      </div>
    </section>);

}

Object.assign(window, { DiagnosisSystem, DiagnosisProcess, ReportCard, RadarChart });