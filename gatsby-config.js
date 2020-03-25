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
        icon: `./src/images/laptop.svg`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve:`gatsby-plugin-offline`,
      options: {
        precachePages: [`/search/`, `/`],
      },
  }
  ],
}
