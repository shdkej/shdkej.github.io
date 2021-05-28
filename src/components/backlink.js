import React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

class BackLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    findLinks = (pages) => {
        const contents = pages.nodes.filter(page => page.rawMarkdownBody.includes(this.props.text));
        const content = contents.map(c => c.fields.slug)
        return content
    }

    Matches = (text) => {
        return text.match(/\[\[(.+?)\]\]/g)
    }

    render() {
        return (
            <StaticQuery
                query={graphql`
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
                `}
            render={data => (
                <div>
                {this.findLinks(data.allMarkdownRemark).map(link =>
                    <span>
                    <Link to={link}>
                        {link}
                    </Link>
                    ,
                    </span>
                )}
                </div>
                )}
            />
        )
    }
}

export default BackLink;
