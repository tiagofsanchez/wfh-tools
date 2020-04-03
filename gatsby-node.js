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
            }
          }
        }
      }
    }
  `)

  const allCompaniesArray = data.allAirtable.edges
  //creating the different pages for the companies
  allCompaniesArray.forEach(edge => {
    const slug = edge.node.data.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/company.js`),
      context: { slug: slug },
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
  console.log(typesArray);
  

  // creates all the pages for me programmatically
  typesArray.forEach(type => {
    actions.createPage({
      path: `${_.kebabCase(type)}/`,
      component: require.resolve(`./src/templates/companyByType.js`),
      context: { type },
    })
  })
}
