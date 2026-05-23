/* global React, Eyebrow */
const { useState: _fs, useRef: _fr, useEffect: _fe } = React;

// ============================================================
// FINAL CTA · with inline form
// ============================================================

const GRADE_OPTS = [
  "선택해주세요",
  "중학교 1학년",
  "중학교 2학년",
  "중학교 3학년",
  "고등학교 1학년",
  "고등학교 2학년",
  "고등학교 3학년",
  "성인 (재수 / N수 등)",
];

const TIME_OPTS = [
  "선택해주세요",
  "오전 (09:00~12:00)",
  "점심 (12:00~14:00)",
  "오후 (14:00~18:00)",
  "저녁 (18:00~21:00)",
  "아무 때나 가능",
];

const GENRE_OPTS = [
  "선택해주세요",
  "코레오",
  "힙합",
  "하우스",
  "락킹",
  "왁킹",
  "아직 정하지 못함",
  "기타",
];

const STATUS_OPTS = [
  "선택해주세요",
  "다른 학원 다니는 중 (옮길 예정)",
  "현재 학원에서 제대로 관리받고 있는지 모르겠다",
  "아직 입시 학원 시작 안 함",
  "학부모로서 상담 원함",
  "기타",
];

// Field wrapper — defined at MODULE scope so its identity is stable across
// ConsultForm renders. If declared inside the parent, React would treat each
// render's <F> as a different component type → unmount/remount the input on
// every keystroke → lost focus.
const Field = React.memo(function Field({ field, label, required, error, children }) {
  return (
    <div className="field" data-err={error ? "true" : "false"}>
      <label className="field-label">
        {label}
        {required ? <span className="req">*</span> : null}
      </label>
      {children}
      {error ? (
        <span style={{ fontSize: 12, color: "var(--red)", marginTop: 2 }}>필수 항목입니다.</span>
      ) : null}
    </div>
  );
});

function ConsultForm() {
  const [data, setData] = _fs({
    name: "", grade: "", phone: "", time: "",
    school: "", genre: "", status: "", note: "",
    agree: false,
  });
  const [submitted, setSubmitted] = _fs(false);
  const [errors, setErrors] = _fs({});

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData((d) => ({ ...d, [k]: v }));
  };

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = true;
    if (!data.grade || data.grade === GRADE_OPTS[0]) e.grade = true;
    if (!data.phone.trim()) e.phone = true;
    if (!data.time || data.time === TIME_OPTS[0]) e.time = true;
    if (!data.school.trim()) e.school = true;
    if (!data.genre || data.genre === GENRE_OPTS[0]) e.genre = true;
    if (!data.status || data.status === STATUS_OPTS[0]) e.status = true;
    if (!data.agree) e.agree = true;
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const eMap = validate();
    if (Object.keys(eMap).length) {
      setErrors(eMap);
      const first = document.querySelector("[data-err='true']");
      if (first) first.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    setErrors({});

    // Submit to Google Forms (no-cors — response is opaque, but submission succeeds)
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSffmM7TnevfCNaKSG7bZbk-HQCN_79Ehzf3osRdF4rJM9YDpQ/formResponse";
    const fd = new FormData();
    fd.append("entry.26799566", data.name);
    fd.append("entry.1310360363", data.grade);
    fd.append("entry.168940407", data.phone);
    fd.append("entry.1599919304", data.time);
    fd.append("entry.1023671533", data.school);
    fd.append("entry.868928136", data.genre);
    fd.append("entry.443966409", data.status);
    fd.append("entry.280330258", data.note || "");

    fetch(FORM_URL, { method: "POST", mode: "no-cors", body: fd }).catch(() => {
      // no-cors responses are opaque; errors here are network-level only
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-card">
        <div className="form-success">
          <div className="mark">✓</div>
          <h4>상담 신청이 접수되었습니다.</h4>
          <p>1~2일 내 전문 트레이너가 직접 연락드립니다.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="form-head">
        <h3>1분 상담 신청</h3>
        <p className="sub">
          아래 정보 입력 시 1~2일 내 전문 트레이너가 직접 연락드립니다.<br/>
          <b>6월 등록 시 작품비 전액 면제</b> 이벤트 적용 대상입니다.<br/>
          <span style={{ color: "var(--red)" }}>중1·2 / 고1·2 예비 입시생도 신청 가능합니다.</span>
        </p>
      </div>

      <div className="form-row split">
        <Field field="name" label="학생 이름" required error={errors.name}>
          <input
            className="form-input"
            type="text"
            value={data.name}
            onChange={set("name")}
            placeholder="예: 김지우"
          />
        </Field>
        <Field field="grade" label="학년" required error={errors.grade}>
          <select className="form-select" value={data.grade} onChange={set("grade")}>
            {GRADE_OPTS.map((o) => <option key={o} value={o === GRADE_OPTS[0] ? "" : o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <div className="form-row split">
        <Field field="phone" label="연락처 (휴대폰 번호)" required error={errors.phone}>
          <input
            className="form-input"
            type="tel"
            value={data.phone}
            onChange={set("phone")}
            placeholder="010-0000-0000"
          />
        </Field>
        <Field field="time" label="연락 가능한 시간대" required error={errors.time}>
          <select className="form-select" value={data.time} onChange={set("time")}>
            {TIME_OPTS.map((o) => <option key={o} value={o === TIME_OPTS[0] ? "" : o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <div className="form-divider">
        <span className="label">입시 관련 정보</span>
        <div className="line" />
      </div>

      <div className="form-row">
        <Field field="school" label="희망 학교" required error={errors.school}>
          <input
            className="form-input"
            type="text"
            value={data.school}
            onChange={set("school")}
            placeholder="예: 서경대, 서울예대, 한림예고, 서공예 등"
          />
        </Field>
      </div>

      <div className="form-row split">
        <Field field="genre" label="희망 장르" required error={errors.genre}>
          <select className="form-select" value={data.genre} onChange={set("genre")}>
            {GENRE_OPTS.map((o) => <option key={o} value={o === GENRE_OPTS[0] ? "" : o}>{o}</option>)}
          </select>
        </Field>
        <Field field="status" label="현재 상황" required error={errors.status}>
          <select className="form-select" value={data.status} onChange={set("status")}>
            {STATUS_OPTS.map((o) => <option key={o} value={o === STATUS_OPTS[0] ? "" : o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <div className="form-row">
        <Field field="note" label="추가로 전하고 싶은 말 (선택)" error={errors.note}>
          <textarea
            className="form-textarea"
            value={data.note}
            onChange={set("note")}
            placeholder="궁금한 점, 현재 실기 경험, 학습 상황 등 자유롭게 작성해주세요."
          />
        </Field>
      </div>

      <label className="form-checkbox" data-err={errors.agree ? "true" : "false"}>
        <input type="checkbox" checked={data.agree} onChange={set("agree")} />
        <span className="box" />
        <span>
          개인정보 수집 및 이용에 동의합니다.<br/>
          (이름·연락처는 상담 목적으로만 사용되며, 상담 종료 후 파기됩니다.)
        </span>
      </label>

      <button type="submit" className="form-submit">
        상담 신청하기 <span className="arrow">→</span>
      </button>
    </form>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="ring r2" />
      <div className="ring" />
      <div className="final-inner">
        <Eyebrow>지금 시작하세요</Eyebrow>
        <h2 className="final-title reveal">
          입시까지 <em>5개월.</em><br/>
          진단부터 시작하세요.
        </h2>
        <p className="final-sub reveal" data-delay="1">신청은 1분이면 끝납니다.</p>
        <ConsultForm />
      </div>
    </section>
  );
}

Object.assign(window, { FinalCTA, ConsultForm });
