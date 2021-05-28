import React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import ReactMarkdown from "react-markdown"

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    onPopup = () => {
        this.setState({
            open: true
        });
    }

    offPopup = () => {
        this.setState({
            open: false
        });
    }

    renderHeader = (pages) => {
        const input = this.props.text.split("#")
        const title = input[0].replace('[[','')
        const tag = input[1] ? input[1].replace(']]','') : ''
        const content = pages.nodes.find(page => page.fields.slug === '/' + title + '/');
        const paragraph = content ? content.rawMarkdownBody
                                            .split("\n#")
                                            .find(t => t.includes(tag))
                                  : ''
        return paragraph
    }

    render() {
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
                    style={{
                        display: `inline`,
                    }}
                >
                    <Link to={'/'+this.props.text}>
                        {this.props.text.split("#").length > 1 ? this.props.text.split("#")[1] : this.props.text }
                    </Link>
                    <div
                        role="link"
                        tabIndex="0"
                        onMouseDown={() => this.offPopup()}
                        style={{
                            background: `grey`,
                            position: `absolute`,
                            zIndex: `1`,
                            marginRight: `20px`,
                        }}
                    >
                    {this.state.open ? <ReactMarkdown
                        source={this.renderHeader(data.allMarkdownRemark)}/> : null}
                    </div>
                </div>
                )}
            />
        )
    }
}

export default Popup;
