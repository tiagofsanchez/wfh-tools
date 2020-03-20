import React, { Component } from "react"
import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SearchIcon from "../components/serchIcon"
import CallToAction from "../components/callToAction"
import SEO from "../components/seo"

const IconContainer = styled.div`
  width: 80px;
  margin-bottom: 15px;
`
const Title = styled.h2`
  font-weight: 900;
  color: rebeccapurple;
  margin-bottom: 20px;
  line-height: 40px;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid rebeccapurple;
  border-radius: 8px;
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

const Button = styled.button`
  color: ${props => (props.clear ? "white" : "rebeccapurple")};
  background-color: ${props => (props.clear ? "rebeccapurple" : null)};
  border: none;
  padding: 5px 10px 5px 10px;
  margin: 5px 5px 10px 0px;
  border-radius: 8px;
  font-weight: 500;
  &:hover {
    background-color: rebeccapurple;
    color: white;
  }
`

const Span = styled.span`
  font-weight: 900;
  color: rebeccapurple;
  padding: 2px 10px 5px 10px;
  border-radius: 8px;
  background-color: #ece6ff;
`

class Search extends Component {
  state = {
    search: "",
    selectedSearch: "All",
  }

  searchHandler(value) {
    this.setState({ search: value })
  }

  onClickHandler(e) {
    const { name } = e.target
    this.setState(prevState => ({
      ...prevState,
      selectedSearch: name,
    }))
  }

  clearHandler() {
    this.setState(prevState => ({
      ...prevState,
      selectedSearch: "All",
    }))
  }

  render() {
    const { data } = this.props
    const { search, selectedSearch } = this.state

    //NOTE: need to create a util function that will take better care of the search
    //all data from the companies
    const allCompaniesArray = data.allAirtable.edges
    //Existing types into an array to create my buttons
    const typesArray = []
    allCompaniesArray.forEach(({ node }) => {
      const company = node
      if (typesArray.includes(company.data.Type) === false) {
        typesArray.push(company.data.Type)
      }
    })

    //select only the TYPES of companies
    let selectedTypesArray = allCompaniesArray
    if (selectedSearch !== "All") {
      selectedTypesArray = allCompaniesArray.filter(company =>
        company.node.data.Type.toLowerCase().includes(
          selectedSearch.toLowerCase()
        )
      )
    }

    // only searching the companies that the user wants
    let filteredCompanies = selectedTypesArray
    if (search !== null) {
      filteredCompanies = selectedTypesArray.filter(
        company =>
          company.node.data.Name.toLowerCase().includes(search.toLowerCase()) ||
          company.node.data.Description.toLowerCase().includes(
            search.toLowerCase()
          ) ||
          company.node.data.Type.toLowerCase().includes(search.toLowerCase())
      )
    }

    const numberOfCompanies = filteredCompanies.length

    return (
      <Layout>
        <SEO title="Crushing W.F.H. | Search" />
        <section style={{ marginBottom: `40px` }}>
          <IconContainer>
            <SearchIcon />
          </IconContainer>
          <Title>
            Search for <Span>{selectedSearch}</Span> companies
          </Title>
          <Button clear onClick={() => this.clearHandler()}>
            x
          </Button>
          {typesArray.map(type => (
            <Button
              key={type}
              type="button"
              name={type}
              onClick={e => this.onClickHandler(e)}
              style={{}}
            >
              {type}
            </Button>
          ))}
          <FlexBox>
            <SearchBar
              placeholder="Search for the name of the company..."
              type="text"
              value={search}
              onChange={e => this.searchHandler(e.target.value)}
            />
            <div style={{ flex: `1 1 70px`, textAlign: `center` }}>
              <Span style={{ fontSize: `29px` }}>{numberOfCompanies}</Span>
            </div>
          </FlexBox>
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
