import React, { FormEvent, useMemo, useState } from "react"
import { PageProps } from "gatsby"
import { Helmet } from "react-helmet"
import "../styles/bench.css"

type Platform = "x" | "instagram"
type TimelineItem = { date: string; phase: string; title: string; body: string; platform: Platform; url: string; tag: string }
type Profile = { name: string; handle: string; platform: Platform; role: string; accent: string; items: TimelineItem[] }

const sampleProfiles: Profile[] = [
  { name: "Christian Israel", handle: "Christianisrac", platform: "x", role: "3AK Track & Field · 공동 창업자", accent: "coral", items: [
    { date: "2024. 09", phase: "발견", title: "대학생의 불편을 그냥 지나치지 않기", body: "코딩을 전혀 몰랐던 시절에도, 트랙 선수들이 기록과 훈련을 관리하는 방식은 바뀔 수 있다고 생각했다.", platform: "x", url: "https://x.com/Christianisrac", tag: "문제 정의" },
    { date: "2025. 01", phase: "제작", title: "아이디어를 실제 화면으로 옮기기", body: "iOS 앱 부트캠프를 따라가며 첫 프로토타입을 만들고, 주변 선수들에게 매일 보여주며 고쳤다.", platform: "x", url: "https://x.com/Christianisrac", tag: "첫 프로토타입" },
    { date: "2025. 05", phase: "첫 공개", title: "만들고 있다는 사실을 먼저 알리기", body: "완성된 앱을 기다리게 하기보다 빌드 과정과 실험 결과를 공개하면서 초기 사용자를 모았다.", platform: "x", url: "https://x.com/Christianisrac", tag: "빌드 인 퍼블릭" },
    { date: "2025. 08", phase: "전환", title: "월 2만 달러 매출까지 이어진 반복", body: "선수의 실제 루틴에 맞는 기능을 하나씩 남기고, 쓰는 사람의 말로 다음 업데이트를 설명했다.", platform: "x", url: "https://x.com/Christianisrac", tag: "$20K / month" },
  ] },
  { name: "Braylin", handle: "Braylin2x", platform: "x", role: "3AK Track & Field · 공동 창업자", accent: "blue", items: [
    { date: "2024. 10", phase: "발견", title: "문제가 있는 곳에서 매일 듣기", body: "대학생 선수들이 어떤 순간에 기록을 놓치는지 관찰하고, 그 장면을 제품의 출발점으로 삼았다.", platform: "x", url: "https://x.com/Braylin2x", tag: "현장 인터뷰" },
    { date: "2025. 03", phase: "제작", title: "작은 기능 하나를 끝까지 다듬기", body: "기능 목록을 늘리는 대신 훈련 기록 하나가 더 빠르게 남는 흐름을 반복해서 검증했다.", platform: "x", url: "https://x.com/Braylin2x", tag: "좁은 문제" },
    { date: "2025. 06", phase: "반응", title: "첫 사용자와 함께 제품의 언어 만들기", body: "피드백을 모아 다음 업데이트를 만들고, 어떤 변화가 있었는지 다시 공개했다.", platform: "x", url: "https://x.com/Braylin2x", tag: "사용자 피드백" },
  ] },
]
const platformLabel: Record<Platform, string> = { x: "X", instagram: "Instagram" }
const parseHandle = (value: string): { platform: Platform; handle: string } => { const input = value.trim().replace(/^@/, ""); const platform: Platform = input.includes("instagram.com") ? "instagram" : "x"; const handle = input.replace(/^https?:\/\/(www\.)?(x\.com|twitter\.com|instagram\.com)\//, "").split(/[/?#]/)[0].replace(/^@/, ""); return { platform, handle } }
const genericProfile = (value: string): Profile => { const { platform, handle } = parseHandle(value); return { name: `@${handle}`, handle, platform, role: "새로 살펴볼 계정", accent: "gold", items: [{ date: "지금", phase: "탐색 시작", title: `${platformLabel[platform]}에서 @${handle}의 여정을 찾아보세요`, body: "이 계정의 초기 소개, 첫 제품 공개, 사용자 반응, 업데이트 순간을 직접 확인하면서 나만의 출시 순서를 기록해보세요.", platform, url: `${platform === "x" ? "https://x.com/" : "https://instagram.com/"}${handle}`, tag: "원문 열기" }] } }

const BenchPage = (_props: PageProps) => {
  const [input, setInput] = useState("")
  const [profiles, setProfiles] = useState<Profile[]>(sampleProfiles)
  const [activeHandle, setActiveHandle] = useState("샘플 여정")
  const allItems = useMemo(() => profiles.flatMap(profile => profile.items.map(item => ({ ...item, profile }))), [profiles])
  const addProfile = (event: FormEvent) => { event.preventDefault(); if (!input.trim()) return; const parsed = parseHandle(input); if (!profiles.find(profile => profile.handle.toLowerCase() === parsed.handle.toLowerCase())) setProfiles(current => [...current, genericProfile(input)]); setActiveHandle(`@${parsed.handle}`); setInput("") }
  return <><Helmet><title>Launch Trace — 만드는 사람의 출시 타임라인</title><meta name="description" content="앱을 만든 사람들이 처음 알리고, 배우고, 성장한 과정을 타임라인으로 훑어보세요." /></Helmet><main className="bench-shell">
    <nav className="bench-nav"><a href="/">SH</a><span>BENCHMARK / 01</span><a href="/about">ABOUT</a></nav>
    <section className="bench-hero"><p className="eyebrow">LAUNCH TRACE <span>↗</span></p><h1>만드는 사람의<br /><em>처음부터</em> 따라가기</h1><p className="hero-copy">앱을 만든 사람들은 언제 처음 알렸을까?<br />어떤 장면에서 사용자를 만났을까?</p><form className="handle-form" onSubmit={addProfile}><label htmlFor="handle">계정 추가</label><div className="input-row"><input id="handle" value={input} onChange={event => setInput(event.target.value)} placeholder="@handle 또는 프로필 URL" /><button type="submit">타임라인 보기 <span>→</span></button></div><small>X와 Instagram 링크를 넣을 수 있어요. 원문은 각 사건 옆에서 바로 열립니다.</small></form></section>
    <section className="trace-section" aria-labelledby="trace-title"><div className="section-heading"><div><p className="eyebrow">NOW READING</p><h2 id="trace-title">{activeHandle}</h2></div><span className="count">{allItems.length} moments</span></div><div className="profile-strip">{profiles.map(profile => <button key={profile.handle} className={`profile-pill ${activeHandle.includes(profile.handle) ? "active" : ""}`} onClick={() => setActiveHandle(`@${profile.handle}`)}><span className={`avatar ${profile.accent}`}>{profile.name.charAt(0)}</span><span><strong>{profile.name}</strong><small>@{profile.handle} · {platformLabel[profile.platform]}</small></span></button>)}</div><div className="timeline"><div className="timeline-line" />{allItems.map((item, index) => <article className="moment" key={`${item.profile.handle}-${item.date}`}><div className="moment-marker">{String(index + 1).padStart(2, "0")}</div><div className="moment-date">{item.date}<span>{item.phase}</span></div><div className="moment-content"><div className="moment-topline"><span className={`moment-tag ${item.profile.accent}`}>{item.tag}</span><a href={item.url} target="_blank" rel="noreferrer">{platformLabel[item.platform]} 원문 ↗</a></div><h3>{item.title}</h3><p>{item.body}</p><small className="byline">{item.profile.name} · @{item.profile.handle}</small></div></article>)}</div></section>
    <section className="closing-note"><p className="eyebrow">WHAT TO NOTICE</p><p>좋은 홍보는 한 번의 멋진 게시물이 아니라,<br /><strong>문제를 발견한 날부터 계속 쌓인 흔적</strong>에 가깝습니다.</p><span>다음에는 당신의 출시 여정을 기록해보세요.</span></section><footer className="bench-footer"><span>LAUNCH TRACE / A BENCHMARKING TOOL FOR MAKERS</span><a href="https://github.com/shdkej/shdkej.github.io">SOURCE ↗</a></footer>
  </main></>
}
export default BenchPage
