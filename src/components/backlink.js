import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const BackLink = props => {
  const [open, setOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          headings {
            value
          }
          fields {
            slug
          }
          rawMarkdownBody
        }
      }
    }
  `)

  const findLinks = pages => {
    const contents = pages.nodes.filter(page =>
      page.rawMarkdownBody.includes(props.text)
    )
    const content = contents.map(c => c.fields.slug)
    return content
  }

  const Matches = text => {
    return text.match(/\[\[(.+?)\]\]/g)
  }

  return (
    <div style={{ maxWidth: `90%` }}>
      {findLinks(data.allMarkdownRemark).map(link => (
        <span key={link}>
          <Link to={link}>{link}</Link>,
        </span>
      ))}
    </div>
  )
}

export default BackLink
