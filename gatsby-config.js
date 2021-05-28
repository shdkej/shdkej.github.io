module.exports = {
  siteMetadata: {
    title: `SH`,
    author: {
      name: `Noh`,
      summary: `Compititve`
    },
    description: `SH's wiki`,
    siteUrl: `https://shdkej.com`,
    social: {
      twitter: `shdkej`
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
        /*
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              showCaptions: true,
            }
          },
        */
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
                exclude: "Table of Contents",
                tight: false,
                fromHeading: 1,
                toHeading: 6
            }
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-images-anywhere`,
          },
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    /*
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SH`,
        short_name: `SH`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      }
    },
    */
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
          trackingId: "UA-110967461-3",
      },
    },
    `gatsby-plugin-sitemap`,
    {
        resolve: `gatsby-plugin-google-adsense`,
        options: {
            publisherId: `ca-pub-8002857692825455`
        }
    },
  ]
}
