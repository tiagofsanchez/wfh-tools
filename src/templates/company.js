import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Img from "gatsby-image"

import Layout from "../components/layout"
import CallToAction from "../components/callToAction"
import Alternatives from "../components/alternatives"
import SEO from "../components/seo"

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
  background-color: #ece6ff;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  @media (max-width: 380px) {
    flex-direction: column;
    align-items: center;
  }
`
const Box = styled.div`
  flex: 1 1 33%;
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
  font-weight: 900;
  color: gray;
`

const Link = styled.a`
  color: rebeccapurple;
  font-weight: 900;
  text-decoration: none;
`

const Company = props => {
  const company = props.data.airtable.data
  const { alternatives } = props.pageContext

  const goodAlternatives = []
  alternatives.map(alternative => {
    if (
      (alternative.Type === company.Type) &
      (alternative.Name !== company.Name)
    ) {
      goodAlternatives.push({
        Type: alternative.Type,
        slug: alternative.slug,
        Thumbnail: alternative.Thumbnail,
        Name: alternative.Name,
      })
    }
  })

  const image = company.Thumbnail.localFiles[0].childImageSharp.fluid.src

  return (
    <Layout>
      <SEO
        title={`Crushing W.F.H. | ${company.Name}`}
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
      <Label>Other</Label>
      <Other>
        <Box>
          <Icon role="img" aria-label="source">
            💡
          </Icon>
          <Source>{company.Source}</Source>
        </Box>
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
          <Link href={company.Website}>webpage &#10132;</Link>
        </Box>
      </Other>
      <section>
        <Label>You might also be interested</Label>
        <Alternatives alternatives={goodAlternatives} />
      </section>
      <section style={{ marginTop: `80px` }}>
        <CallToAction />
      </section>
    </Layout>
  )
}

export const companyData = graphql`
  query company($slug: String) {
    airtable(data: { slug: { eq: $slug } }) {
      data {
        Name
        Description
        Type
        Website
        Source
        slug
        Costs
        Thumbnail {
          localFiles {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
        Screenshot {
          localFiles {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

export default Company
