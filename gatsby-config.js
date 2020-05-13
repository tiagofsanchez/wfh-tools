require("dotenv").config({ path: ".env" })

module.exports = {
  siteMetadata: {
    title: `Crushing WFH`,
    description: `All the tools you need so that you can work from home!`,
    author: `Tiago Sanchez`,
    siteUrl: "https://crushingwfh.com",
    icon: `src/images/icon.png`,
    twitter: `@tiagofsanchez`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `rgba(102, 51, 153, 1)`,
        showSpinner: true,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`${__dirname}/src/components/layout`),
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `WFHTOOLS`,
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
    {
      resolve: `gatsby-source-contentful`,
      options: { 
        spaceId: `veix4kn3d9am`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, 
      }
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
        theme_color: `#663399`,
        display: `standalone`,
        icon: `./src/images/laptop.svg`,
      },
    },
    {
      resolve:`gatsby-plugin-offline`,
      options: {
        precachePages: [`/search/`, `/`],
      },
  }
  ],
}
