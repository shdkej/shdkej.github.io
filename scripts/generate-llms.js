#!/usr/bin/env node
/**
 * content/ 의 마크다운을 스캔해 static/llms.txt 를 생성한다.
 * llms.txt 규격: https://llmstxt.org
 *
 * slug 규칙은 gatsby-node.js 와 동일하게 "파일명 마지막 segment 소문자" 를 따른다.
 * 재생성: `node scripts/generate-llms.js` 또는 `yarn llms`
 */
const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const SITE_URL = "https://shdkej.com"
const CONTENT_DIR = path.join(ROOT, "content")
const OUT = path.join(ROOT, "static", "llms.txt")

// 같은 도메인의 다른 레포가 서빙하는 영역(자동 스캔 불가, 수동 관리).
// 각 영역이 자체 llms.txt 를 갖고 있으면 그 링크를 함께 둔다.
const EXTRA_SECTIONS = [
  {
    label: "Agent Wiki",
    note: "에이전트가 원본 노트를 기반으로 유지·정리하는 지식 레이어 (개념/종합/비교/매핑 노트). 별도 레포(shdkej/agent-wiki).",
    links: [
      ["Agent Wiki", `${SITE_URL}/agent-wiki/`, "지식 랩 인덱스"],
      ["Agent Wiki llms.txt", `${SITE_URL}/agent-wiki/llms.txt`, "전체 페이지 목록"],
    ],
  },
]

// 그룹(최상위 폴더) 표시 순서와 사람이 읽기 좋은 라벨
const GROUP_ORDER = [
  ["Root", "Overview"],
  ["Fundamental", "Fundamental"],
  ["Deep Knowledge", "Deep Knowledge"],
  ["Integration", "Integration"],
  ["Communication", "Communication"],
  ["Meta", "Meta"],
  ["Idea", "Idea"],
  ["Human", "Human"],
  ["Health", "Health"],
  ["blog", "Blog"],
]

function walk(dir) {
  let out = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const stat = fs.statSync(p)
    if (stat.isDirectory()) out = out.concat(walk(p))
    else if (name.endsWith(".md")) out.push(p)
  }
  return out
}

function parse(file) {
  const txt = fs.readFileSync(file, "utf8")
  const fm = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  let title = null
  let summary = ""
  if (fm) {
    const t = fm[1].match(/^title:\s*(.+)$/m)
    if (t) title = t[1].trim()
    const s = fm[1].match(/^summary:\s*(.+)$/m)
    if (s) summary = s[1].trim()
  }
  const base = path.basename(file, ".md")
  if (!title) title = base
  // 잘못 들어간 summary(예: "date: ...") 는 버린다
  if (/^date:/i.test(summary)) summary = ""

  const rel = path.relative(CONTENT_DIR, file)
  const parts = rel.split(path.sep)
  const group = parts.length > 1 ? parts[0] : "Root"
  const slug = "/" + base.toLowerCase() + "/"
  return { title, summary, group, slug }
}

const entries = walk(CONTENT_DIR).map(parse)

// 그룹별로 묶기
const byGroup = {}
for (const e of entries) (byGroup[e.group] = byGroup[e.group] || []).push(e)

const lines = []
lines.push("# SH's Wiki")
lines.push("")
lines.push(
  "> 7년차 DevOps/백엔드 엔지니어 노성호(Noh)의 개인 위키. " +
    "인프라, 백엔드, 아키텍처, 모니터링, AI 오케스트레이션을 중심으로 " +
    "학습과 경험을 미니멀리즘 관점에서 정리한 지식 저장소입니다."
)
lines.push("")
lines.push(
  "주요 키워드: Kubernetes, AWS(EKS/Lambda), Terraform, GitOps(ArgoCD), " +
    "Clean Architecture, 모니터링/관측가능성, Node.js, Next.js, LLM 에이전트."
)
lines.push("")

const seen = new Set()
for (const [key, label] of GROUP_ORDER) {
  const items = byGroup[key]
  if (!items || !items.length) continue
  lines.push(`## ${label}`)
  lines.push("")
  items.sort((a, b) => a.title.localeCompare(b.title))
  for (const it of items) {
    const url = SITE_URL + it.slug
    if (seen.has(url)) continue // slug 중복 방지
    seen.add(url)
    const desc = it.summary ? `: ${it.summary}` : ""
    lines.push(`- [${it.title}](${url})${desc}`)
  }
  lines.push("")
}

// 다른 레포가 서빙하는 영역
for (const sec of EXTRA_SECTIONS) {
  lines.push(`## ${sec.label}`)
  lines.push("")
  if (sec.note) {
    lines.push(`> ${sec.note}`)
    lines.push("")
  }
  for (const [title, url, desc] of sec.links) {
    lines.push(`- [${title}](${url})${desc ? `: ${desc}` : ""}`)
  }
  lines.push("")
}

fs.writeFileSync(OUT, lines.join("\n").trimEnd() + "\n", "utf8")
console.log(`generated ${OUT} (${seen.size} links)`)
