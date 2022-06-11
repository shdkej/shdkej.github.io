import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Box from "../components/box";

const WikiPage = ({
    data: {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    },
}) => (
    <Layout title={title}>
        <h1>Index</h1>
        <div className="">
            <Box />
            {group.map((tag) => (
                <div className="">
                    {tag.fieldValue}
                    <ul>
                        {tag.nodes.map((node) => (
                            <li>
                                <Link
                                    to={node.fields.slug}
                                    key={tag.fieldValue}
                                >
                                    {node.frontmatter.title}(
                                    {node.timeToRead > 30 ? (
                                        <span style={{ color: `purple` }}>
                                            {node.timeToRead}
                                        </span>
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
);

export default WikiPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark {
            group(field: frontmatter___tags) {
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
`;
