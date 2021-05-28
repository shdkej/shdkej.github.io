import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
import Popup from "../components/popup"

const LinkToPopup = (text) => {
    const matches = text.match(/\[\[(.+?)\]\]/g)
    return (
        <div>
        {matches && matches.map(match =>
            <Popup text={match}/>
        )}
        </div>
    )
}

const RandomPage = ({
    data: {
        allMarkdownRemark: { nodes, totalCount },
        site: {
            siteMetadata: { title },
        },
    },
}) => {
    const totalRandom = Math.floor(Math.random() * totalCount)
    const content = nodes[totalRandom].rawMarkdownBody
    const paragraph = content.split("\n#")
    const paragraphRandom = Math.floor(Math.random() * paragraph.length)
    const value = paragraph[paragraphRandom]

    return (
    <Layout title={title}>
      <h1>{nodes[totalRandom].frontmatter.title}</h1>
      {LinkToPopup(value)}
      <ReactMarkdown source={value}/>
    </Layout>
)}

export default RandomPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      totalCount
      nodes {
        rawMarkdownBody
        frontmatter{
            title
        }
      }
    }
  }
`
