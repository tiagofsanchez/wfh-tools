import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const CompanyByType = props => {
  console.log(props)
  return <Layout></Layout>
}

export const companyByType = graphql`
  query Type($type: String) {
    allAirtable(
      filter: { data: { Publish: { eq: true }, Type: { eq: $type } } }
      sort: { order: ASC, fields: data___Name }
    ) {
      edges {
        node {
          data {
            Name
            slug
            Thumbnail {
              id
            }
            Description
            Created_time(difference: "day")
            Type
          }
        }
      }
    }
  }
`

export default CompanyByType
