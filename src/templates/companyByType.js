import React, { useState } from "react"
import { graphql } from "gatsby"

import {
  Card,
} from "@material-ui/core"
import styled from "@emotion/styled"

import GoToSearch from "../components/goToSearch"
import CompanyCard from "../components/companyCard"
import ContactForm from "../components/contactForm"
import Seo from "../components/seo"
import CompanyByTypeHeader from "../components/companyByTypeHeader"

const _ = require("lodash")

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;`


const CompanyByType = ({ data, pageContext }) => {

  const companies = data.allAirtable.edges
  const [filteredCompanies, setFilteredCompanies] = useState(companies)
  const [ big , setBig] = useState(true)

  const type = pageContext.type
  const typeSlug = `${_.kebabCase(type)}/`

  const iconThumbnail = data.Type.edges[0].node.data.Icon.localFiles[0]
  const tagLine = data.Type.edges[0].node.data.TagLine

  function filterByAge(array) {
    let companiesWip = []
    companies.forEach(({ node }) => {
      const company = node.data
      const icon = node.data.Thumbnail.localFiles[0].childImageSharp.fluid
      const Description = company.Description
      const slug = company.slug
      companiesWip.push({
        node: {
          data: {
            Name: company.Name,
            ageMax: Math.max(...company.Age),
            ageMin: Math.min(...company.Age),
            Description,
            icon,
            slug,
          },
        },
      })
    })
    let filteredByAge = companiesWip
    const ageMax = Math.max(...array)
    const ageMin = Math.min(...array)
    filteredByAge = companiesWip.filter(
      company =>
        company.node.data.ageMax >= ageMin && ageMax >= company.node.data.ageMin
    )
    setFilteredCompanies(filteredByAge)
  }
 
  const viewType = changedBig => {
    setBig(changedBig)
  } 

  return (
    <>
      <Seo
        title={`Crushing WFH | ${type}`}
        description={tagLine}
        image={iconThumbnail.publicURL}
        slug={typeSlug}
      />
      <Container>
        <CompanyByTypeHeader
          filteredCompanies={filteredCompanies}
          filterByAge={filterByAge}
          iconThumbnail={iconThumbnail}
          type={type}
          tagLine={tagLine}
          viewType={viewType}
        />
        <section>
          <Flex>
            <Container>
              {filteredCompanies.map(({ node }) => {
                const company = node.data
                let icon = ""
                node.data.Thumbnail === undefined
                  ? (icon = company.icon)
                  : (icon =
                      node.data.Thumbnail.localFiles[0].childImageSharp.fluid)
                const brief = company.Description
                return (
                  <Card style={{ margin: "5px" }} key={company.Name}>
                    <CompanyCard
                      big={big}
                      name={company.Name}
                      brief={big && brief}
                      icon={icon}
                      slug={company.slug}
                    />
                  </Card>
                )
              })}
            </Container>
            <div style={{ marginTop: `40px`, alignSelf: `center` }}>
              <GoToSearch />
            </div>
          </Flex>
        </section>
      </Container>
      <section>
        <ContactForm />
      </section>
    </>
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
