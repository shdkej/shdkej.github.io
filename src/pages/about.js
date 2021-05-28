import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="About" />
      <h1>About</h1>
      <article>
      <section>
      <p>계속 쓴다</p>
      <p>Keep writing</p>
      <br/>
      </section>
      </article>
      <p>shdkej@gmail.com</p>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
