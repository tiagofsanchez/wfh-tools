import React from "react"
import { graphql} from "gatsby"
import styled from "@emotion/styled"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CompanyCard from "../components/companyCard"
import ContactForm from "../components/contactForm"
import AgeGap from "../components/ageGap"

const Thumbnail = styled.div`
  width: 200px;
  hight: 200px;
  margin: auto;
  margin-bottom: 30px;
  @media (max-width: 450px) {
    width: 100px;
    hight: 100px;
  }
`
const CompanyName = styled.h1`
  margin: auto;
  font-weight: 900;
  text-align: center;
  color: rebeccapurple;
  margin-bottom: 20px;
`

const Label = styled.h3`
  font-weight: 900;
`

const Screenshot = styled.div`
  width: 100%;
  margin: 5px;
  margin-bottom: 30px;
  padding: 10px;
`

const Description = styled.p`
  font-size: 25px;
  letter-spacing: 1px;
  line-height: 40px;
  margin-bottom: 30px;
  padding: 10px;
`

const Other = styled.div`
  width: 90%;
  display: flex;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 1px 1px 2px 2px rgba(204, 204, 204, 0.4);
  @media (max-width: 380px) {
    flex-direction: column;
    align-items: center;
  }
`
const Box = styled.div`
  flex: 1 1 80px;
  padding: 15px 0 5px 0;
  margin-top: 40px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const Icon = styled.span`
  font-size: 50px;
  margin-bottom: 30px;
`
const Source = styled.div`
  font-weight: 600;
  color: gray;
`

const Hlink = styled.a`
  color: rebeccapurple;
  font-weight: 900;
  text-decoration: none;
`

const AltFlexBox = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
width: 95%;
margin: auto;
@media (max-width: 380px) {
 width: 100%
}
`


const Company = props => {
  const company = props.data.company.data

  const allCompaniesArray = props.data.alternatives.edges
  const alternativesArray = []
  allCompaniesArray.map(alternative => {
    const { node } = alternative
    if ((node.data.Type === company.Type) & (node.data.Name !== company.Name)) {
      alternativesArray.push({
        Type: node.data.Type,
        slug: node.data.slug,
        Thumbnail: node.data.Thumbnail,
        Name: node.data.Name,
      })
    }
  })
   
  const image = company.Thumbnail.localFiles[0].publicURL

  return (
    <Layout>
      <SEO
        title={`Crushing WFH | ${company.Name}`}
        description={company.Description}
        image={image}
        slug={company.slug}
      />
      <Thumbnail>
        <Img
          fluid={company.Thumbnail.localFiles[0].childImageSharp.fluid}
          alt={company.Name}
        />
      </Thumbnail>
      <CompanyName>{company.Name}</CompanyName>
      {company.Age && <AgeGap ageArray={company.Age}/>}
      <Label>Description</Label>
      <Description>{company.Description}</Description>
      {company.Screenshot && (
        <>
          <Label>Screenshot</Label>
          <Screenshot>
            <Img
              fluid={company.Screenshot.localFiles[0].childImageSharp.fluid}
              alt={company.Name}
            />
          </Screenshot>
        </>
      )}
      <Label>Price and webpage</Label>
      <Other>
        <Box>
          <Icon role="img" aria-lable="costs">
            💰
          </Icon>
          <Source>{company.Costs}</Source>
        </Box>
        <Box>
          <Icon role="img" aria-label="webpage">
            🕸️
          </Icon>
          <Hlink href={company.Website}>webpage &#10132;</Hlink>
        </Box>
      </Other>
      <section>
        <Label>You might also like</Label>
        <AltFlexBox>
          {alternativesArray.map(company => {
            return (
              <CompanyCard
                key={company.Name}
                name={company.Name}
                slug={company.slug}
                icon={company.Thumbnail.localFiles[0].childImageSharp.fluid}
              />
            )
          })}
        </AltFlexBox>
      </section>
      <section style={{ marginTop: `80px` }}>
        <ContactForm />
      </section>
    </Layout>
  )
}

export const companyData = graphql`
  query company($slug: String) {
    company: airtable(data: { slug: { eq: $slug } }) {
      data {
        Name
        Description
        Type
        Website
        Source
        slug
        Costs
        Age
        Thumbnail {
          localFiles {
            publicURL
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        Screenshot {
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
    alternatives: allAirtable(filter: { data: { Publish: { eq: true } } }) {
      edges {
        node {
          data {
            Name
            Type
            slug
            Thumbnail {
              localFiles {
                publicURL
                childImageSharp {
                  fluid (grayscale: true) {
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

export default Company
