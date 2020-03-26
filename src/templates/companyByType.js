import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import GoToSearch from "../components/goToSearch"
import CompanyCard from "../components/companyCard"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const PageTitle = styled.h1`
  color: rebeccapurple;
  font-weight: 900;
  text-align: center;
  margin-bottom: 40px;
`

const CompanyByType = ({ data, pageContext }) => {
  const companies = data.allAirtable.edges
  console.log(pageContext)

  return (
    <Layout>
      <Container>
        <PageTitle>{pageContext.type}</PageTitle>
        <Container>
          {companies.map(({ node }) => {
            const company = node.data
            const icon = node.data.Thumbnail.localFiles[0].childImageSharp.fluid
            const brief = company.Description
            return (
              <CompanyCard
                big={true}
                key={company.Name}
                name={company.Name}
                brief={brief}
                icon={icon}
                slug={company.slug}
              />
            )
          })}
        </Container>
        <div style={{ marginTop: `40px` }}>
          <GoToSearch />
        </div>
      </Container>
    </Layout>
  )
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
            Description
            Created_time(difference: "day")
            Type
            Thumbnail {
              localFiles {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CompanyByType
