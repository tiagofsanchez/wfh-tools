require("dotenv").config({ path: ".env" })

module.exports = {
  siteMetadata: {
    title: `crushingwfh`,
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
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        mergeScriptHashes: true, // you can disable scripts sha256 hashes
        mergeStyleHashes: true, // you can disable styles sha256 hashes
        mergeDefaultDirectives: true,
        directives: {
          "script-src": "'self' www.google-analytics.com",
          "style-src": "'self' 'unsafe-inline'",
          "img-src": "'self' data: www.google-analytics.com"
          // you can add your directives or override defaults
        }
      }
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
    `gatsby-transformer-remark`,
    `gatsby-plugin-material-ui`,
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
