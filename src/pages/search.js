import React from "react"
import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SearchIcon from "../components/serchIcon"

const IconContainer = styled.div`
  margin: auto;
  width: 100px;
  margin-bottom: 30px;
`
const Title = styled.h1`
  margin: auto;
  font-weight: 900;
  text-align: center;
  color: rebeccapurple;
  margin-bottom: 20px;
`

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid rebeccapurple;
  border-radius: 8px;
  margin-bottom: 40px;
  &:focus {
    background-color: #ece6ff;
  }
`

const Thumbnail = styled.div`
  width: 40px;
  height: 40px;
  margin: 5px;
  margin-bottom: 0;
  margin-right: 20px;
`
const CompanyName = styled.h3`
  font-weight: 900;
  color: gray;
  margin-bottom: 0;
  margin-right: 20px;
`

const HitContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:hover {
    background-color: #ece6ff;
    border-radius: 5px;
  }
`
const CompanyContainer = styled.div`
  flex: 1 1 120px;
  display: flex;
  align-items: center;
`

const ContentContainer = styled.div`
  flex: 1 1 720px;
`

const Description = styled.p`
  letter-spacing: 1px;
  color: black;
  margin-bottom: 0;
`

const Search = ({ data }) => {
  const AllCompaniesArray = data.allAirtable.edges
  console.log(AllCompaniesArray)

  return (
    <Layout>
      <section>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <Title>Your search</Title>
        <SearchBar
          placeholder="Search for the name of the company..."
          type="text"
        />
      </section>
      <section>
        {AllCompaniesArray.map(company => {
          const { data } = company.node
          let image = null
          if (data.Thumbnail.localFiles[0].childImageSharp !== null) {
            image = data.Thumbnail.localFiles[0].childImageSharp.fluid
          }
          const brief = data.Description

          return (
            <Link to={`/${data.slug}`} style={{ textDecoration: `none` }}>
              <HitContainer key={data.Name}>
                <CompanyContainer>
                  <Thumbnail>{image && <Img fluid={image} />}</Thumbnail>
                  <CompanyName>{data.Name}</CompanyName>
                </CompanyContainer>
                <ContentContainer>
                  <Description>{brief.slice(0, 100)}...</Description>
                </ContentContainer>
              </HitContainer>
            </Link>
          )
        })}
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    allAirtable(filter: { data: { Publish: { eq: true } } }) {
      edges {
        node {
          data {
            Name
            slug
            Description
            Type
            Thumbnail {
              localFiles {
                childImageSharp {
                  fluid(grayscale: true) {
                    ...GatsbyImageSharpFluid_tracedSVG
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

export default Search
