import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Utterances from "../components/utteranc"
import Popup from "../components/popup"
import BackLink from "../components/backlink"

const MarkDownLinkTohref = (text) => {
    //let href_text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="../$2">$2</a>')
    //href_text = href_text.replace(/\[\[(.+?)\]\]/g, `<a href="../$1">$1</a>`)
    const renders = text.split(/\[\[(.+?)\]\]/g).map(match => {
        if (!match.includes("</")) {
            return <Popup text={match} />
        }
        return <section dangerouslySetInnerHTML={{ __html: match }}></section>
    })

    return renders
}

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { slug, previous, next} = pageContext
  const slugWithoutSlush = slug.slice(0, -1)
  const blame = "https://github.com/shdkej/shdkej.github.io/blame/master/content" + slugWithoutSlush + ".md"

  //const tocHeader = <p className="content-toc">Table of Contents</p>
  const toc = <nav className="content-toc" dangerouslySetInnerHTML={{ __html: post.tableOfContents }}></nav>
  const tag = <>Tag: <Link to={`/tags/${post.frontmatter.tags}`}>{post.frontmatter.tags}</Link></>

  const parents = post.frontmatter.parent
  const parent_render = <p>parent: <Link to={`/${parents}`}>{parents}</Link></p>

  const backLinks = <BackLink text={post.frontmatter.title}></BackLink>
  const md = MarkDownLinkTohref(post.html)

  return (
    <Layout title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
      <article>
        <header>
          <h1>
            {post.frontmatter.title}
          </h1>
          <p>{post.frontmatter.summary}</p>
          <small style={{width: `50%`}}>
            created: {post.frontmatter.date},
              <a
                href={blame}
              >
              updated: {post.frontmatter.updated}
              </a>
          {parents ? parent_render : null}
          </small>
        </header>
        {toc}
        <p>---</p>
        { md }
        <hr/>
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
      <Utterances repo="shdkej/wiki-gatsby" />
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
        date(formatString: "MMMM DD, YYYY")
        updated(formatString: "MMMM DD, YYYY")
        tags
        parent
      }
      tableOfContents
    }
  }
`
