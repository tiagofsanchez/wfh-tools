import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Img from "gatsby-image"

import Layout from "../components/layout"

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
  color: gray;
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
  background-color: rgb(204, 204, 204, 0.15);
  width: 100%;
  padding-top: 40px;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
`
const Box = styled.div`
  width: 50%;
  margin-top: 40px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Icon = styled.div`
  font-size: 50px;
  margin-bottom: 30px;
`
const Source = styled.div`
  font-weight: 900;
  color: gray;
`

const Link = styled.a`
  color: #d23669;
  font-weight: 900;
  text-decoration: none;
`

const Company = ({ data }) => {
  const company = data.airtable.data

  return (
    <Layout>
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
          <Icon>💡</Icon>
          <Source>{company.Source}</Source>
        </Box>
        <Box>
          <Icon>🕸️</Icon>
          <Link href={company.Website}>webpage &#10132;</Link>
        </Box>
      </Other>
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
