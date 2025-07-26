import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"

class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }
  onPopup = () => {
    this.setState({
      open: true,
    })
  }

  offPopup = () => {
    this.setState({
      open: false,
    })
  }

  renderHeader = pages => {
    const input = this.props.text.split("#")
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

  render() {
    const text = this.props.text.toLowerCase()
    const url = text.replace(/ /g, "-")
    return (
      <StaticQuery
        query={graphql`
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
        `}
        render={data => (
          <div
            role="link"
            tabIndex="0"
            onMouseEnter={() => this.onPopup()}
            onMouseLeave={() => this.offPopup()}
          >
            <Link to={"/" + url}>
              {text.split("#").length > 1 ? text.split("#")[1] : text}
            </Link>
            <div
              role="link"
              tabIndex="0"
              onMouseDown={() => this.offPopup()}
              style={{
                background: `#343a40`,
                position: `absolute`,
                zIndex: `1`,
                marginLeft: `100px`,
                width: `50%`,
              }}
            >
              {this.state.open ? (
                <ReactMarkdown>
                  {this.renderHeader(data.allMarkdownRemark)}
                </ReactMarkdown>
              ) : null}
            </div>
          </div>
        )}
      />
    )
  }
}

export default Popup
