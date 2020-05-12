import React from "react"
import Img from "gatsby-image"
import { useTheme, Typography, Box } from "@material-ui/core"
import styled from "@emotion/styled"

import RangeSlider from "../components/rangeSlider"
import ResultsSummary from "../components/resultsSummary"

const Thumbnail = styled.div`
  width: 100px;
  margin: auto;
  margin-bottom: 30px;
  @media (max-width: 450px) {
    width: 100px;
    hight: 100px;
  }
`
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`
const TagLine = styled.h4`
  letter-spacing: 1px;
  color: gray;
  padding: 20px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 0;
`

const CompanyByTypeHeader = ({filteredCompanies , filterByAge , iconThumbnail, type, tagLine}) => {
  const theme = useTheme()
  const mode = theme.palette.type
  return (
    <Flex>
      <Thumbnail>
        <Img fluid={iconThumbnail.childImageSharp.fluid} />
      </Thumbnail>
      <Typography
        variant="h4"
        align="center"
        style={
          mode === "light"
            ? { color: theme.palette.primary.main }
            : { color: theme.palette.primary.light }
        }
      >
        <Box fontWeight={900}>{type}</Box>
      </Typography>
      <TagLine>{tagLine}</TagLine>
      {type === "kids" ? (
        <>
          <RangeSlider minAge={2} maxAge={15} onAgeSelection={filterByAge} />
          <ResultsSummary numberOfCompanies={filteredCompanies.length} />
        </>
      ) : (
        <ResultsSummary numberOfCompanies={filteredCompanies.length} />
      )}
    </Flex>
  )
}

export default CompanyByTypeHeader
