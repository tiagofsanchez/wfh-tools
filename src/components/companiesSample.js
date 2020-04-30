import React from "react"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { Typography } from "@material-ui/core"

const _ = require("lodash")

const ColumnFlex = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 380px;
  margin: 20px;
  padding: 5px;
  justify-content: space-between;
  @media (max-width: 680px) {
    height: auto;
  }
`
const SectionImage = styled.div`
  width: 150px;
  margin: 20px 0px 0px 0px;
  padding: 20px;
  @media (max-width: 680px) {
    width: 90px;
  }
`

const CompaniesSample = ({ icon, title, description }) => {

  return (
    <Link
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        textDecoration: `none`,
        color: `inherit`,
        padding: `10px`,
      }}
      to={`${_.kebabCase(title)}/`}
    >
      <ColumnFlex>
        <Typography variant="h4" align="center" style={{ fontWeight: `900` }}>
          {title}
        </Typography>

        <SectionImage>
          <Img fluid={icon} alt={title} />
        </SectionImage>
        <Typography component="h6" variant="h6" style={{ fontWeight: `600` }}>
          {description}
        </Typography>
      </ColumnFlex>
    </Link>
  )
}

export default CompaniesSample
