const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
          nodes {
            fileAbsolutePath
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  const nodes = result.data.allMarkdownRemark.nodes

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const slug = post.node.fields.slug.toLowerCase()

    createPage({
      path: slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let value = createFilePath({ node, getNode })
    value = value.toLowerCase()
    // 하위 폴더 경로 제거: 마지막 segment만 사용
    const segments = value.split("/").filter(Boolean)
    const last = segments[segments.length - 1]
    const newSlug = `/${last}/`
    createNodeField({
      name: `slug`,
      node,
      value: newSlug,
    })
  }
}
