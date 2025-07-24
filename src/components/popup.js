import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"

const Popup = props => {
  const [open, setOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
          rawMarkdownBody
        }
      }
    }
  `)

  const onPopup = () => {
    setOpen(true)
  }

  const offPopup = () => {
    setOpen(false)
  }

  const renderHeader = pages => {
    const input = props.text.split("#")
    const title = input[0].replace("[[", "").toLowerCase()
    const tag = input[1] ? input[1].replace("]]", "") : ""
    const content = pages.nodes.find(
      page => page.fields.slug === "/" + title + "/"
    )
    const paragraph = content
      ? content.rawMarkdownBody.split("\n#").find(t => t.includes(tag))
      : ""
    return paragraph
  }

  const text = props.text.toLowerCase()
  const url = text.replace(/ /g, "-")

  return (
    <div
      role="link"
      tabIndex="0"
      onMouseEnter={onPopup}
      onMouseLeave={offPopup}
    >
      <Link to={"/" + url}>
        {text.split("#").length > 1 ? text.split("#")[1] : text}
      </Link>
      <div
        role="link"
        tabIndex="0"
        onMouseDown={offPopup}
        style={{
          background: `#343a40`,
          position: `absolute`,
          zIndex: `1`,
          marginLeft: `100px`,
          width: `50%`,
        }}
      >
        {open ? (
          <ReactMarkdown>{renderHeader(data.allMarkdownRemark)}</ReactMarkdown>
        ) : null}
      </div>
    </div>
  )
}

export default Popup
