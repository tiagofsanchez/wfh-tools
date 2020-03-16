import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import Img from "gatsby-image"

const Container = styled.div`
  padding: 10px;
  width: 100%;
  &:hover {
    background-color: #ece6ff;
    border-radius: 5px;
  }
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`

const ListOfCompanies = ({ company }) => {
  return (
    <Container>
      <Link
        to={`/${company.data.slug}`}
        style={{ textDecoration: `none`, color: `black` }}
      >
        <FlexBox>
          <Img
            fixed={company.data.Thumbnail.localFiles[0].childImageSharp.fixed}
            alt={company.data.Name}
            style={{ margin: `10px` }}
          />
          <h3 style={{ fontWeight: `600`, marginBottom: `0` }}>
            {company.data.Name}
          </h3>
        </FlexBox>
      </Link>
    </Container>
  )
}

export default ListOfCompanies
