import React, { useState } from "react"
import AppsIcon from '@material-ui/icons/Apps';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { useTheme , IconButton } from "@material-ui/core"
import styled from "@emotion/styled"

import PropTypes from "prop-types"


const Container = styled.div`
width: 95%;
margin: auto;
border-bottom: 1px solid #eeeeee
`
const Flex = styled.div`
display: flex;
align-items: center; 
justify-content: space-between;
`

const SearchTitle = styled.h5`
  margin-top: 20px;
  text-align: center;
`
const Span = styled.span`
  font-weight: 900;
  color: rebeccapurple;
  margin: 0px 8px 0px 8px;
  padding: 2px 10px 5px 10px;
  border-radius: 8px;
  background-color: #ece6ff;
`

const ResultsSummary = ({ numberOfCompanies , viewType , type }) => {
  const [cardView , setCardView] = useState(true)
  const theme = useTheme()
  const mode = theme.palette.type
  
  viewType(cardView)

  const cardViewHandler = () => {
    setCardView(!cardView)
  }

  return (
    <Container>
      <Flex>
        <SearchTitle
          style={
            mode === "dark"
              ? { color: theme.palette.primary.light }
              : { color: theme.palette.primary.main }
          }
        >
          You have
          <Span>{numberOfCompanies}</Span>
          app's
        </SearchTitle>
        {type === undefined ? null : (
          <IconButton onClick={cardViewHandler}>
            {cardView ? <AppsIcon /> : <ViewModuleIcon />}
          </IconButton>
        )}
      </Flex>
    </Container>
  )
}

ResultsSummary.propTypes = {
  numberOfCompanies: PropTypes.number.isRequired,
  viewType: PropTypes.func.isRequired,
  type: PropTypes.string
}


export default ResultsSummary
