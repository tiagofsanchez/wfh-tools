import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import GoToSearch from "../components/goToSearch"
import CompanyCard from "../components/companyCard"
import ContactForm from "../components/contactForm"
import Seo from "../components/seo"

const _ = require("lodash")

const Thumbnail = styled.div`
  width: 100px;
  margin: auto;
  margin-bottom: 30px;
  @media (max-width: 450px) {
    width: 100px;
    hight: 100px;
  }
`
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`
const TagLine = styled.p`
  letter-spacing: 1px;
  color: gray;
  padding: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const PageTitle = styled.h1`
  color: rebeccapurple;
  font-weight: 900;
  text-align: center;
  margin-bottom: 0;
`

const CompanyByType = ({ data, pageContext }) => {
  const companies = data.allAirtable.edges
  const type=pageContext.type
  const typeSlug=`${_.kebabCase(type)}/`

  const iconThumbnail =
    data.Type.edges[0].node.data.Icon.localFiles[0]
  const tagLine = data.Type.edges[0].node.data.TagLine
  

  return (
    <Layout>
      <Seo
        title={`Crushing WFH | ${type}`}
        description={tagLine}
        image={iconThumbnail.publicURL}
        slug={typeSlug}
      />
      <Container>
        <Flex>
          <Thumbnail>
            <Img fluid={iconThumbnail.childImageSharp.fluid} />
          </Thumbnail>
          <PageTitle>{type}</PageTitle>
          <TagLine>{tagLine}</TagLine>
        </Flex>
        <section>
          <Flex>
          <Container>
            {companies.map(({ node }) => {
              const company = node.data
              const icon =
                node.data.Thumbnail.localFiles[0].childImageSharp.fluid
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
          <div style={{ marginTop: `40px`, alignSelf:`center`  }}>
            <GoToSearch />
          </div>
          </Flex>
        </section>
      </Container>
      <section>
        <ContactForm />
      </section>
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
            Age
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
    Type: allAirtable(
      filter: { data: { Created_time: { eq: null }, Name: { eq: $type } } }
    ) {
      edges {
        node {
          data {
            IconName
            Name
            TagLine
            Icon {
              localFiles {
                publicURL
                childImageSharp {
                  fluid(grayscale: true) {
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
