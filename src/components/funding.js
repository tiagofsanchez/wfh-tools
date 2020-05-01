import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { Box, useTheme } from "@material-ui/core"
import FundingGraph from '../components/fundingGraph';

const Label = styled.h3`
  font-weight: 900;
`
const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: auto;
  flex-wrap: wrap;
  flex-direction: ${props => (props.column ? "column" : "row")};
`

const FundingFigures = styled.div`
  flex: 1 1 100px;
  padding: 20px;
  margin: 5px;
  border-radius: 4px;
`

const FundingSource = styled.div`
  padding: 20px;
  flex: 1 1 400px;
  margin: 5px;
  border-radius: 4px;
`
const GraphContainer = styled.div`
padding: 20px;
margin: 5px;
border-radius: 4px;
`

const Hlink = styled.a`
  font-weight: 900;
  text-decoration: none;
`

const Funding = ({ investors, funding, fundingSource , fundingHistory}) => {
  const theme = useTheme()
  const mode = theme.palette.type

  return (
    <div>
      <Label>Funding</Label>
      <FlexContainer>
        <FundingFigures  style={{backgroundColor: theme.palette.background.paper}}>
          <Box component="h2" align="center" style={{ marginBottom: `0` }}>
            $ {funding}
          </Box>
          <Box component="h6" align="center" style={{ marginBottom: `0` }}>
            (Musd)
          </Box>
        </FundingFigures>
        <FundingSource style={{backgroundColor:theme.palette.background.paper}}>
          <Box component="p" style={{ marginBottom: `5px` }}>
            {investors}
          </Box>
          <Hlink
            href={fundingSource}
            rel="noreferrer noopener"
            target="_blank"
            style={
              mode === "dark"
                ? { color: theme.palette.primary.light }
                : { color: theme.palette.primary.main }
            }
          >
            source &#10132;
          </Hlink>
        </FundingSource>
      </FlexContainer>
      <GraphContainer style={{backgroundColor:theme.palette.background.paper}}>
      <FundingGraph fundingHistory={fundingHistory} />
      </GraphContainer>
    </div>
  )
}

Funding.propTypes = {
  investors: PropTypes.string.isRequired,
  funding: PropTypes.number.isRequired,
  fundingSource: PropTypes.string.isRequired,
}

export default Funding
