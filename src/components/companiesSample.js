import React from "react"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { Typography, useTheme } from "@material-ui/core"

const _ = require("lodash")

const ColumnFlex = styled.div`
  width: 320px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 380px;
  margin: 20px;
  padding: 5px;
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
const Description = styled.p`
  letter-spacing: 1px;
  padding: 20px;
  font-weight: 600;
  margin-bottom: 0;
`

const CompaniesSample = ({ icon, title, description }) => {
  const theme = useTheme()
  const type = theme.palette.type

  return (
      <div style={{display: `flex`, flexWrap: `wrap`}}>
      <ColumnFlex>
        <Typography
          variant="h4"
          align="center"
          style={
            type === "light"
              ? { color: theme.palette.primary.main, fontWeight: `900` }
              : { color: theme.palette.primary.light, fontWeight: `900` }
          }
        >
          {title}
        </Typography>
        <Link to={`${_.kebabCase(title)}/`}>
          <SectionImage>
            <Img fluid={icon} alt={title} />
          </SectionImage>
        </Link>
        <Description
          style={
            type === "light" ? { color: theme.palette.primary.dark } : null
          }
        >
          {description}
        </Description>
      </ColumnFlex>
      </div>
  )
}

export default CompaniesSample
