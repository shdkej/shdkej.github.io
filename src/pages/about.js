import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const AboutPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <h1>About</h1>
      <article>
        <section>
          <p>Balance, Evolve, Feedback, Clear</p>
          <strong>모으고 정리한다</strong>
          <p>오타니의 만다라트표와</p>
          <p>Johngrib님의 wiki blog를 보고 구조를 짜고</p>
          <p>Ariejan 님의 블로그 디자인을 차용해서 만듦.</p>
          <p>8개의 카테고리 안의 8개의 문서 내에서 업데이트하며 작성 중</p>
        </section>
      </article>
      <p>shdkej@gmail.com</p>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
