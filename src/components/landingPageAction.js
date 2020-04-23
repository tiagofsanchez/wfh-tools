import React from "react"
import styled from "@emotion/styled"
import CountUp from "react-countup"
import { Typography, useTheme, Button, Box, Paper } from "@material-ui/core"
import { Link } from 'gatsby'

import Logo from "../components/logo"

const IconContainer = styled.div`
  width: 100px;
  margin: auto;
  margin-bottom: 15px;
`

const CompanyCounter = styled.span`
  font-size: 70px;
  font-weight: 900;
  text-align: center;
  display: block;
`

const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px;
`

const LandingPageAction = ({ totalNumberOfCompanies }) => {
  const theme = useTheme()
  const mode = theme.palette.type
  return (
    <>
      <IconContainer>
        <Logo />
      </IconContainer>
      <Typography
        variant="h3"
        align="center"
        gutterBottom="true"
        style={
          mode === "dark"
            ? { color: theme.palette.primary.light, fontWeight: `900` }
            : { color: theme.palette.primary.main, fontWeight: `900` }
        }
      >
        Crushing Work From Home
      </Typography>
      <Typography
        variant="h6"
        align="center"
        gutterBottom="true"
        style={
          mode === "dark"
            ? { color: theme.palette.secondary.light, fontWeight: `600` }
            : { color: theme.palette.secondary.main, fontWeight: `600` }
        }
      >
        A directory with all the tools that you need to know to improve the way
        you work from home!
      </Typography>
      <CompanyCounter>
        <CountUp start={0} end={totalNumberOfCompanies} duration={8} />
      </CompanyCounter>
      <Box align="center">Tools ⚒️ and counting</Box>
      <ButtonContainer>
        <Link to='/search' style={{textDecoration: `none`}}>
        <Button variant="contained" color="primary" size="large">
          Search tools
        </Button>
        </Link>
        <Button
         href="https://airtable.com/shrKIvCX7rU3tY3CN"
         rel="noreferrer noopener"
         target="_blank"
          variant="outlined"
          color="primary"
          size="large"
          style={
            mode === "dark"
              ? {
                  color: theme.palette.primary.light,
                  fontWeight: `900`,
                  marginLeft: `10px`,
                }
              : {
                  color: theme.palette.primary.main,
                  fontWeight: `900`,
                  marginLeft: `10px`,
                }
          }
        >
          Contribute
        </Button>
      </ButtonContainer>
    </>
  )
}

export default LandingPageAction
