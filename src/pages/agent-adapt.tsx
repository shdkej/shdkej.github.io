import React, { useState } from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import "../styles/agent-adapt.css"

type Demo = {
  label: string
  prompt: string
  reply: string
  action: string
  detail: string
}

const demos: Demo[] = [
  {
    label: "미니멀 아이디어",
    prompt: "이 공간에 어울리는 조명을 골라줘",
    reply: "공간의 낮은 채도와 소재를 기준으로 3가지를 추렸어요.",
    action: "추천 결과를 화면에 띄웠습니다",
    detail: "제품 설명 · 재고 · 배송 조건을 함께 확인",
  },
  {
    label: "주주 라운드업",
    prompt: "지난 분기 AI 투자 글만 모아줘",
    reply: "사이트 전체에서 관련 글 8개를 찾고, 중복 주제를 묶었어요.",
    action: "검색 결과를 주제별로 정리했습니다",
    detail: "원문 링크 · 발행일 · 핵심 문장까지 연결",
  },
  {
    label: "커뮤니티",
    prompt: "이 자료를 바탕으로 글의 뼈대를 만들어줘",
    reply: "작성자의 기록을 바꾸지 않고, 초안의 구조만 먼저 잡았어요.",
    action: "초안 문서를 관리자 기록에 남겼습니다",
    detail: "사용자 대화 · 작업 결과 · 승인 상태를 보관",
  },
]

const AgentAdaptPage = () => {
  const [activeDemo, setActiveDemo] = useState(0)
  const demo = demos[activeDemo]

  return (
    <main className="agent-page">
      <Seo title="Agent Adapt — 사이트를 이해하는 에이전트" />
      <nav className="agent-nav">
        <Link to="/" className="agent-mark" aria-label="shdkej 홈으로">
          <span className="mark-dot" /> agent adapt
        </Link>
        <div className="nav-links">
          <a href="#how">작동 방식</a>
          <a href="#cases">사례</a>
          <a href="#trust">신뢰와 기록</a>
        </div>
        <a
          className="nav-cta"
          href="mailto:hello@shdkej.com?subject=Agent%20Adapt%20문의"
        >
          구축 문의 <span>↗</span>
        </a>
      </nav>

      <section className="agent-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> your site, ready to talk
          </p>
          <h1>
            사이트가
            <br />
            <em>대화할 수 있다면.</em>
          </h1>
          <p className="hero-lede">
            Agent Adapt는 이미 운영 중인 사이트를 읽고, 설명하고, 직접 움직이는
            에이전트로 바꿉니다.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="mailto:hello@shdkej.com?subject=Agent%20Adapt%20구축%20문의"
            >
              내 사이트에 대입해보기 <span>→</span>
            </a>
            <a className="text-link" href="#how">
              어떻게 작동하나요?
            </a>
          </div>
          <p className="hero-note">
            관리자 에이전트와 소비자 에이전트가 하나의 기록 위에서 함께
            움직입니다.
          </p>
        </div>

        <div
          className="agent-stage"
          aria-label="소비자 대화와 사이트 에이전트 작업 예시"
        >
          <div className="stage-glow" />
          <div className="stage-label stage-label-top">
            consumer agent <span>↗</span>
          </div>
          <div className="conversation-panel">
            <div className="panel-header">
              <span className="live-indicator" /> <span>사이트에게 묻기</span>
              <span className="panel-menu">···</span>
            </div>
            <div className="message message-user">{demo.prompt}</div>
            <div className="message message-agent">
              <span className="agent-avatar">a</span>
              <div>
                <strong>사이트 에이전트</strong>
                <p>{demo.reply}</p>
              </div>
            </div>
            <div className="result-surface">
              <div className="result-top">
                <span>작업 완료</span>
                <span className="result-check">✓</span>
              </div>
              <strong>{demo.action}</strong>
              <small>{demo.detail}</small>
              <div className="result-bars">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="panel-input">
              다시 물어보세요 <span>⌘ ↵</span>
            </div>
          </div>
          <div className="stage-label stage-label-bottom">
            site agent / action log
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="stage-caption">
            대화가 끝나면
            <br />
            <b>작업이 시작됩니다.</b>
          </div>
        </div>
      </section>

      <section className="signal-strip">
        <span>DISCOVER</span>
        <i /> <span>UNDERSTAND</span>
        <i /> <span>ACT</span>
        <i /> <span>REMEMBER</span>
      </section>

      <section className="content-section how-section" id="how">
        <div className="section-intro">
          <p className="eyebrow">what changes</p>
          <h2>
            검색창을 넘어,
            <br />
            <span>사이트의 대리인으로.</span>
          </h2>
          <p>
            사람이 사이트의 구조를 배워야 했던 시간을 줄입니다. 에이전트는
            콘텐츠와 규칙을 이해하고, 사용자의 목적에 맞는 다음 행동까지
            이어갑니다.
          </p>
        </div>
        <div className="flow-list">
          <div className="flow-item">
            <span className="flow-no">01</span>
            <div>
              <h3>전체를 읽습니다</h3>
              <p>
                페이지, 상품, 글, 메타데이터, 운영 규칙을 사이트의 맥락으로
                연결합니다.
              </p>
            </div>
            <span className="flow-symbol">⌁</span>
          </div>
          <div className="flow-item">
            <span className="flow-no">02</span>
            <div>
              <h3>의도를 좁힙니다</h3>
              <p>
                사용자가 말한 목적을 확인하고, 필요한 정보와 선택지만 화면에
                불러옵니다.
              </p>
            </div>
            <span className="flow-symbol">◌</span>
          </div>
          <div className="flow-item">
            <span className="flow-no">03</span>
            <div>
              <h3>직접 움직입니다</h3>
              <p>
                검색, 비교, 작성, 신청처럼 사이트 안에서 실제로 필요한 작업을
                수행합니다.
              </p>
            </div>
            <span className="flow-symbol">↗</span>
          </div>
        </div>
      </section>

      <section className="content-section cases-section" id="cases">
        <div className="cases-head">
          <p className="eyebrow">one engine, many sites</p>
          <h2>
            사이트마다 다른 일을
            <br />
            <em>더 자연스럽게.</em>
          </h2>
        </div>
        <div className="demo-tabs" role="tablist" aria-label="사이트별 예시">
          {demos.map((item, index) => (
            <button
              key={item.label}
              className={index === activeDemo ? "active" : ""}
              onClick={() => setActiveDemo(index)}
              role="tab"
              aria-selected={index === activeDemo}
            >
              {item.label}
              <span>↗</span>
            </button>
          ))}
        </div>
        <div className="case-detail">
          <div className="case-number">0{activeDemo + 1}</div>
          <div>
            <p className="case-prompt">“{demo.prompt}”</p>
            <p>
              {demo.reply} {demo.detail}까지 한 흐름으로 연결됩니다.
            </p>
          </div>
          <div className="case-arrow">↘</div>
        </div>
      </section>

      <section className="trust-section" id="trust">
        <div className="trust-mark">◎</div>
        <div>
          <p className="eyebrow">built for accountable action</p>
          <h2>
            대화는 흔적을 남기고,
            <br />
            <span>권한은 경계를 지킵니다.</span>
          </h2>
          <p>
            고객 인증과 권한 확인을 먼저 거친 뒤에만 사이트를 조작합니다.
            소비자와 관리자의 대화, 수행한 작업, 승인 상태는 문서로 남아 다음
            운영의 자산이 됩니다.
          </p>
          <a
            className="text-link"
            href="mailto:hello@shdkej.com?subject=Agent%20Adapt%20신뢰%20구조%20문의"
          >
            신뢰 구조 문의하기 →
          </a>
        </div>
      </section>

      <section className="closing-section">
        <p className="eyebrow">the next interface is a conversation</p>
        <h2>
          당신의 사이트는
          <br />
          <em>무엇을 대신할 수 있나요?</em>
        </h2>
        <a
          className="button button-primary"
          href="mailto:hello@shdkej.com?subject=Agent%20Adapt%20구축%20문의"
        >
          구축 비용과 필요한 것 문의 <span>→</span>
        </a>
      </section>
      <footer className="agent-footer">
        <span>agent adapt / an shdkej experiment</span>
        <span>site becomes a participant</span>
      </footer>
    </main>
  )
}

export default AgentAdaptPage
