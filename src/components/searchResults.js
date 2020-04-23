import React from "react"
import { Link } from "gatsby"
import { useTheme } from "@material-ui/core"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import PropTypes from "prop-types"

import CallToAction from "./callToAction"

const Thumbnail = styled.div`
  width: 40px;
  margin: 5px;
  border-radius: 50%;
  margin-bottom: 0;
  margin-right: 20px;
`
const CompanyName = styled.h3`
  font-weight: 900;
  margin-bottom: 0;
  margin-right: 20px;
`
const Container = styled.div`
  margin: 8px auto;
  padding: 8px;
  &:hover {
    background-color: #ece6ff;
    border-radius: 5px;
  }
`

const HitContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`
const TitleTag = styled.div`
  display: inline-block;
  float: left;
  font-weight: 900;
  color: rebeccapurple;
  background-color: #cccccc;
  padding: 2px 5px 2px 5px;
  border-radius: 4px;
  text-decoration: none;
`

const CreatedDays = styled.div`
  margin-left: 5px;
  font-size: 15px;
  color: gray;
`

const Flex = styled.div`
  display: flex;
  margin-top: 5px;
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
  font-weight: 600;
  margin-bottom: 10px;
`

const SearchResults = ({ filteredCompanies, onClose }) => {
  return (
    <>
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
              style={{ textDecoration: `none`, color:'inherit' }}
              key={data.slug}
              onClick={onClose}
            >
              <Container>
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
                    <Flex>
                      <TitleTag>{data.Type}</TitleTag>
                      <CreatedDays> Published: {data.Created_time}</CreatedDays>
                    </Flex>
                  </ContentContainer>
                </HitContainer>
              </Container>
            </Link>
          )
        })
      )}
    </>
  )
}

SearchResults.propTypes = {
  filteredCompanies: PropTypes.array.isRequired,
}

export default SearchResults
