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
  const alternatives = []
  data.allAirtable.edges.forEach(edge => {
    const data = edge.node.data
    alternatives.push({
      slug: data.slug,
      Type: data.Type,
      Thumbnail: data.Thumbnail,
      Name: data.Name,
    })
  })
  data.allAirtable.edges.forEach(edge => {
    const slug = edge.node.data.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/company.js`),
      context: { slug: slug, alternatives },
    })
  })
}
