import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Utterances from "../components/utteranc"
import Popup from "../components/popup"
import BackLink from "../components/backlink"

const MarkDownLinkTohref = text => {
  //const href_text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="../$2" target="_blank">$1</a>')
  //href_text = href_text.replace(/\[\[(.+?)\]\]/g, `<a href="../$1">$1</a>`)
  const renders = text.split(/\[\[(.+?)\]\]/g).map(match => {
    if (!match.includes("</")) {
      return <Popup key={match} text={match} />
    }
    return (
      <section
        key={match}
        dangerouslySetInnerHTML={{ __html: match }}
      ></section>
    )
  })

  return renders
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
  const md = MarkDownLinkTohref(post.html)

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
