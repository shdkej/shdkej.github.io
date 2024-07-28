import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout title={title}>
    <h1>Index</h1>
    <div className="square-field">
      {group.map(tag => (
        <div className="square">
          {tag.fieldValue}
          <ul>
            {tag.nodes.map(node => (
              <li>
                <Link to={node.fields.slug} key={tag.fieldValue}>
                  {node.frontmatter.title}(
                  {node.timeToRead > 30 ? (
                    <span style={{ color: `purple` }}>{node.timeToRead}</span>
                  ) : (
                    node.timeToRead
                  )}
                  min)
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="square-center">Evolve</div>
    </div>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        nodes {
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
