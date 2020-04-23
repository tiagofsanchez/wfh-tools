import React from "react"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { Typography, useTheme, Box } from "@material-ui/core"

import ListOfCompanies from "./listOfCompanies"
import GoToSearch from "./goToSearch"

const _ = require("lodash")

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 320px;
  margin: 20px;
  padding: 5px;
  align-items: ${props => (props.start ? "flex-start" : "center")};
  justify-content: center;
  flex: 1 1 280px;
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

const CompaniesSample = ({
  companiesArray,
  icon,
  title,
  right,
  description,
}) => {
  const theme = useTheme()
  const type = theme.palette.type

  return (
    <>
      {right ? (
        <>
          <ColumnFlex start="true">
            {companiesArray.map(company => {
              return <ListOfCompanies company={company} key={company.id} />
            })}
            <GoToSearch />
          </ColumnFlex>
          <ColumnFlex>
            <Typography
              variant="h4"
              align="center"
              style={
                type === "light"
                  ? { color: theme.palette.primary.main }
                  : { color: theme.palette.primary.light }
              }
            >
              <Box fontWeight={900}>{title}</Box>
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
        </>
      ) : (
        <>
          <ColumnFlex>
            <Typography
              variant="h4"
              align="center"
              style={
                type === "light"
                  ? { color: theme.palette.primary.main }
                  : { color: theme.palette.primary.light }
              }
            >
              <Box fontWeight={900}>{title}</Box>
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
          <ColumnFlex start="true">
            {companiesArray.map(company => {
              return <ListOfCompanies company={company} key={company.id} />
            })}
            <GoToSearch />
          </ColumnFlex>
        </>
      )}
    </>
  )
}

export default CompaniesSample
