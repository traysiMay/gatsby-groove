/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Groove Devotion",
    author: "Ariel Klevecz",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    // "gatsby-transformer-sharp",
    // "gatsby-plugin-sharp",
    // {
    //   resolve: "gatsby-transformer-remark",
    //   options: {
    //     plugins: [
    //       "gatsby-remark-relative-images",
    //       {
    //         resolve: "gatsby-remark-images",
    //         options: {
    //           maxWidth: 750,
    //           linkImagesToOriginal: false,
    //         },
    //       },
    //     ],
    //   },
    // },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.spaceId,
        accessToken: process.env.accessToken,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Groove Devotion`,
        short_name: `groove-devotion`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#FF0000`,
        display: `minimal-ui`,
        icon: `static/logo.svg`,
      },
    },
  ],
}
