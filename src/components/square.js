import React from "react"
import { StaticQuery, graphql } from 'gatsby'

import "./layout.css"

class Square extends React.Component {
    constructor(props) {
        super(props);
        const color = ["#ff2c2c","#ff842c","#f3e435","#39ff2c","#2c32ff","#732cff","#ff2cc8","#df2cff","#2cceff"]
        this.state = {
            color: color,
            title: '<a href="#">Goal</a>',
        }
    }
    changeSquare = (i, body) => {
        const paragraph = body.rawMarkdownBody.split('\n#');
        const content = paragraph[i+1].split('*');
        const title = content.shift()
        this.setState({
            subject: content,
            title: title
        })
    }

    reset = (md) => {
        const headers = md.headings.map(header => header.value);
        const title = headers.shift()
        this.setState({
            subject: headers,
            title: '<a href="#">' + title + '</a>',
        })
    }

    render() {
        const edges = Array(8).fill(null);

        return (
            <StaticQuery
                query={graphql`
                query {
                    markdownRemark(fileAbsolutePath: {eq: "/app/content/index.md"}) {
                        frontmatter {
                            title
                        }
                        headings {
                            value
                        }
                        rawMarkdownBody
                    }
                }
                `}
            render={data => {
                const md = data.markdownRemark;
                return (
                <div className="square-box">
                  {edges.map((node, i) => {
                      return (
                          <button className="square"
                            onClick={() => this.changeSquare(i, md)}
                            style={{ backgroundColor : this.state.color[i] }}
                            dangerouslySetInnerHTML={{
                                __html: this.state.subject ? this.state.subject[i] : ''
                            }}
                          >
                          </button>
                      )
                  })}
                  <button
                    onClick={() => this.reset(md)}
                    style={{
                        backgroundColor : `white`,
                        display: `block`,
                    }}
                    dangerouslySetInnerHTML={{ __html: this.state.title }}
                  >
                  </button>
                </div>
                )
            }}
            />
        )
    }
}

export default Square
