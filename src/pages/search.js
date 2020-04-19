import React, { Component } from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SearcResults from "../components/searchResults"
import ResultsSummary from "../components/resultsSummary"

const Title = styled.h2`
  font-weight: 900;
  text-align: center;
  color: rebeccapurple;
  margin-bottom: 20px;
  line-height: 40px;
`

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid rebeccapurple;
  border-radius: 8px;
  &:focus {
    background-color: #ece6ff;
    border: 2px dashed rebeccapurple;
  }
`

const Select = styled.select`
  width: 270px;
  padding: 0px 0px 0px 5px;
  color: rebeccapurple;
  border: 2px solid #ece6ff;
  background-color: #ece6ff;
  border-radius: 8px;
  font-size: 19px;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='rebeccapurple' height='40' viewBox='0 0 24 24' width='40' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;
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

  selectOnChangeHandler(e) {
    const { value } = e.target
    this.setState(prevState => ({
      ...prevState,
      selectedSearch: value,
    }))
  }

  render() {
    const { data } = this.props
    const { search, selectedSearch } = this.state

    //TODO: need to create a util function that will take better care of the search
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
        <SEO title="Crushing WFH | Search" />
        <section style={{ marginBottom: `25px` }}>
          <Title>
            Search for{" "}
            <Select onChange={e => this.selectOnChangeHandler(e)}>
              <option>All</option>
              {typesArray.map(type => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>{" "}
            tools
          </Title>
          <SearchBar
            placeholder="Search company here..."
            type="text"
            value={search}
            onChange={e => this.searchHandler(e.target.value)}
          />
        </section>
        <section>
          <ResultsSummary numberOfCompanies={numberOfCompanies} />
          <SearcResults filteredCompanies={filteredCompanies} />
        </section>
      </Layout>
    )
  }
}

export const query = graphql`
  {
    allAirtable(
      filter: { data: { Publish: { eq: true } } }
      sort: { order: ASC, fields: data___Name }
    ) {
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

export default Search
