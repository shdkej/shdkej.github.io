/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `SH`,
    author: {
      name: `Noh`,
      summary: `Compititve`,
    },
    description: `SH's wiki`,
    siteUrl: `https://shdkej.com`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-check-links`,
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              fromHeading: 1,
              toHeading: 6,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
              showCaptions: true,
              wrapperStyle: "margin: 0 0 50px auto;",
            },
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "UA-110967461-3",
    //   },
    // },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `G-GPKPTMNVF5`,
        head: true,
      },
    },
  ],
}
