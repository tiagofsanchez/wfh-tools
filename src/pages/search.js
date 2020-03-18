import React, { Component } from "react"
import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SearchIcon from "../components/serchIcon"
import CallToAction from "../components/callToAction"

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
  margin: 5px;
  border-radius: 50%;
  margin-bottom: 0;
  margin-right: 20px;
`
const CompanyName = styled.h3`
  font-weight: 900;
  color: black;
  margin-bottom: 0;
  margin-right: 20px;
`

const HitContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
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
  flex: 1 1 400px;
`

const Description = styled.p`
  letter-spacing: 1px;
  color: gray;
  margin-bottom: 0;
`

class Search extends Component {
  state = {
    search: "",
  }

  searchHandler(value) {
    this.setState({ search: value })
  }
  render() {
    const { data } = this.props
    const { search } = this.state

    const AllCompaniesArray = data.allAirtable.edges
    let filteredCompanies = AllCompaniesArray
    if (search !== null) {
      filteredCompanies = AllCompaniesArray.filter(company =>
        company.node.data.Name.toLowerCase().includes(search.toLowerCase())
      )
    }

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
            value={search}
            onChange={e => this.searchHandler(e.target.value)}
          />
        </section>
        <section>
          {filteredCompanies.length === 0 ? (
            <CallToAction style={{ marginTop: `60px` }} />
          ) : (
            filteredCompanies.map(company => {
              const { data } = company.node
              let image = null
              if (data.Thumbnail.localFiles[0].childImageSharp !== null) {
                image = data.Thumbnail.localFiles[0].childImageSharp.fluid
              }
              const brief = data.Description

              return (
                <Link
                  to={`/${data.slug}`}
                  style={{ textDecoration: `none` }}
                  key={data.slug}
                >
                  <HitContainer>
                    <CompanyContainer>
                      <Thumbnail>
                        {image && (
                          <Img fluid={image} style={{ marginBottom: `0` }} />
                        )}
                      </Thumbnail>
                      <CompanyName>{data.Name}</CompanyName>
                    </CompanyContainer>
                    <ContentContainer>
                      <Description>{brief.slice(0, 100)}...</Description>
                    </ContentContainer>
                  </HitContainer>
                </Link>
              )
            })
          )}
        </section>
      </Layout>
    )
  }
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
