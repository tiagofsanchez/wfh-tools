import React from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import { useTheme } from "@material-ui/core"
import useFormInput from "../hooks/useFormInput"

import SEO from "../components/seo"
import SearcResults from "../components/searchResults"
import ResultsSummary from "../components/resultsSummary"

const Title = styled.h2`
  font-weight: 900;
  text-align: center;
  margin-bottom: 20px;
  line-height: 40px;
`

const Flex = styled.div`
display: flex;
flex-wrap:wrap;
margin:auto;
`

const SearchBar = styled.input`
  flex: 1 1 300px;
  width: 300px;
  margin:auto;
  margin:5px;
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
  flex: 1 1 270px;
  padding: 5px;
  margin: 5px;
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

const Search = props => {
  const theme = useTheme();
  const mode = theme.palette.type;
  const search = useFormInput("")
  const selectedSearch = useFormInput("All")

  const { data } = props
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
  if (selectedSearch.value !== "All") {
    selectedTypesArray = allCompaniesArray.filter(company =>
      company.node.data.Type.toLowerCase().includes(
        selectedSearch.value.toLowerCase()
      )
    )
  }

  // only searching the companies that the user wants
  let filteredCompanies = selectedTypesArray
  if (search.value !== null) {
    filteredCompanies = selectedTypesArray.filter(
      company =>
        company.node.data.Name.toLowerCase().includes(
          search.value.toLowerCase()
        ) ||
        company.node.data.Description.toLowerCase().includes(
          search.value.toLowerCase()
        ) ||
        company.node.data.Type.toLowerCase().includes(
          search.value.toLowerCase()
        )
    )
  }

  const numberOfCompanies = filteredCompanies.length

  return (
    <>
      <SEO title="Crushing WFH | Search" />
      <section style={{ marginBottom: `25px` }}>
        <Title
          style={
            mode === "dark"
              ? { color: theme.palette.primary.light }
              : { color: theme.palette.primary.main }
          }
        >
          Search your tools
        </Title>
        <Flex>
        <Select {...selectedSearch}>
          <option>All</option>
          {typesArray.map(type => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </Select>
        <SearchBar
          placeholder="Search company here..."
          type="text"
          style={mode ==='dark' ? {borderColor: theme.palette.primary.light} : {borderColor: theme.palette.primary.main}}
          {...search}
        />
        </Flex>
      </section>
      <section>
        <ResultsSummary numberOfCompanies={numberOfCompanies} />
        <SearcResults filteredCompanies={filteredCompanies} />
      </section>
    </>
  )
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
            Created_time(fromNow: true)
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
