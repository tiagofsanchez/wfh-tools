import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Img from "gatsby-image"

import Layout from "../components/layout"
import GoToSearch from "../components/goToSearch"
import CompanyCard from "../components/companyCard"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const CardContainer = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 1px 1px 2px 2px rgba(204, 204, 204, 0.4);
  &:hover {
    box-shadow: 1px 1px 4px 4px rgba(102, 51, 153, 0.4);
  }
`
const LogoContainer = styled.div`
  margin-top: 20px;
  width: 150px;
  height: 150px;
`

const CompanyName = styled.h2`
  color: rebeccapurple;
  width: 100%;
  margin-top: 15px;
  text-align: center;
`
const Description = styled.p`
  letter-spacing: 1px;
  color: gray;
  margin-bottom: 0;
  padding: 0px 8px 0px 18px;
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
