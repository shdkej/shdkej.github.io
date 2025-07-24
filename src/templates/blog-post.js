import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Utterances from "../components/utteranc"
import Popup from "../components/popup"
import BackLink from "../components/backlink"

const MarkDownLinkTohref = (text, slug) => {
  // [[#태그]] 형태를 현재 페이지의 앵커 링크로 처리
  let processedText = text.replace(/\[\[#(.+?)\]\]/g, (match, tag) => {
    const currentSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "")
      .replace(/\s+/g, "-")
    const processedTag = tag.toLowerCase().replace(/\s+/g, "-")
    return `<a href="/${currentSlug}/#${processedTag}">${tag}</a>`
  })

  // [[페이지#태그]] 형태를 처리
  processedText = processedText.replace(
    /\[\[(.+?)#(.+?)\]\]/g,
    (match, page, tag) => {
      const lowercasePage = page
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "")
        .replace(/\s+/g, "-")
      const processedTag = tag.toLowerCase().replace(/\s+/g, "-")
      return `<a href="/${lowercasePage}/#${processedTag}">${page}#${tag}</a>`
    }
  )

  // [[링크]] 형태를 처리 (띄어쓰기를 대시로 변환)
  processedText = processedText.replace(/\[\[(.+?)\]\]/g, (match, link) => {
    const lowercaseLink = link
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "")
      .replace(/\s+/g, "-")
    return `<a href="/${lowercaseLink}/">${link}</a>`
  })

  return <section dangerouslySetInnerHTML={{ __html: processedText }}></section>
}

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { slug, previous, next, filePath } = pageContext

  // filePath를 사용하여 GitHub blame 링크 생성
  const blame =
    "https://github.com/shdkej/shdkej.github.io/blame/master/content/" +
    filePath

  const toc = (
    <nav className="content-toc">
      <strong>Table of Contents</strong>
      <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
    </nav>
  )
  const tag = (
    <>
      Tag: <Link to={`/tags`}>{post.frontmatter.tags}</Link>
    </>
  )

  const parents = post.frontmatter.parent
  const parent_render = (
    <p>
      parent: <Link to={`/${parents}`}>{parents}</Link>
    </p>
  )

  const backLinks = <BackLink text={post.frontmatter.title}></BackLink>
  const md = MarkDownLinkTohref(post.html, slug)

  return (
    <Layout title={siteTitle}>
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.summary}</p>
          <small style={{ width: `50%` }}>
            Created: {post.frontmatter.date} &gt;
            <a href={blame}>Updated: {post.frontmatter.updated}</a>
            {parents ? parent_render : null}
          </small>
        </header>
        {toc}
        <div
          style={{
            borderTop: `1px solid`,
            align: `center`,
          }}
        ></div>
        {md}
        <hr />
      </article>
      <nav>
        {backLinks}
        {post.frontmatter.tags ? tag : null}
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Utterances repo="shdkej/shdkej.github.io" />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      htmlAst
      rawMarkdownBody
      frontmatter {
        title
        summary
        date(formatString: "YYYY, MM DD")
        updated(formatString: "YYYY, MM DD")
        tags
        parent
      }
      tableOfContents
    }
  }
`
