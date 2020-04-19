import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import PropTypes from 'prop-types';

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

const SearchResults = ({ filteredCompanies , onClose }) => {
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
              style={{ textDecoration: `none` }}
              key={data.slug}
              onClick={onClose}
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
    </>
  )
}

SearchResults.propTypes = { 
  filteredCompanies: PropTypes.array.isRequired
}

export default SearchResults
