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
      posts: allContentfulBlogPost {
        edges {
          node {
            title
            slug
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

  // creates all the pages for me programmatically
  typesArray.forEach(type => {
    actions.createPage({
      path: `${_.kebabCase(type)}/`,
      component: require.resolve(`./src/templates/companyByType.js`),
      context: { type },
    })
  })

  const allPosts = data.posts.edges
  allPosts.forEach(edge => {
    console.log(edge);
    const slug = edge.node.slug
    actions.createPage({
      path: `/articles/${slug}/`,
      component: require.resolve(`./src/templates/blogPost.js`),
      context: { slug: slug },
    })
  })
}
