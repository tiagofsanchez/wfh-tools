const _ = require("lodash")

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allAirtable(filter: { data: { Publish: { eq: true } } }) {
        edges {
          node {
            data {
              Name
              slug
              Type
              Thumbnail {
                raw {
                  thumbnails {
                    small {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const allCompaniesArray = data.allAirtable.edges

  //data needed for my alternatives
  const alternatives = []
  allCompaniesArray.forEach(edge => {
    const data = edge.node.data
    alternatives.push({
      slug: data.slug,
      Type: data.Type,
      Thumbnail: data.Thumbnail,
      Name: data.Name,
    })
  })
  //creating the different pages for the companies and pushing the alternatives
  allCompaniesArray.forEach(edge => {
    const slug = edge.node.data.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/company.js`),
      context: { slug: slug, alternatives },
    })
  })

  //gets me all the types in an Array
  const typesArray = []
  allCompaniesArray.forEach(({ node }) => {
    const company = node
    if (typesArray.includes(company.data.Type) === false) {
      typesArray.push(company.data.Type)
    }
  })

  // creates all the pages for me programmatically
  typesArray.forEach(type => {
    actions.createPage({
      path: `${_.kebabCase(type)}/`,
      component: require.resolve(`./src/templates/companyByType.js`),
      context: { type },
    })
  })
}
