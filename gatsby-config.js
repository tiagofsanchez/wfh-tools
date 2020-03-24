require("dotenv").config({ path: ".env" })

module.exports = {
  siteMetadata: {
    title: `💻 Crushing W.F.H.`,
    description: `All the tools you need so that you can work from home!`,
    author: `Tiago Sanchez`,
    siteUrl: "https://crushingwfh.com",
    icon: `src/images/icon.png`,
    twitter: `@tiagofsanchez`,
  },
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `WFH TOOLS`,
            mapping: { Screenshot: `fileNode`, Thumbnail: `fileNode` },
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Icon`,
            mapping: { Icon: `fileNode` },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `crushing working from home`,
        short_name: `crushingWFH`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-161261182-1",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `crushingWFH`,
        short_name: `crushingWFH`,
        start_url: `/?source=pwa'`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `./src/images/logo-icon.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
