import React from "react"
import { Typography } from "@material-ui/core"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"

//mudar
const CardContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: ${props => (props.big ? "300px" : "130px")};
  height: ${props => (props.big ? "400px" : "200px")};
`

const LogoContainer = styled.div`
  margin-top: ${props => (props.big ? "20px" : "10px")};
  width: ${props => (props.big ? "150px" : "80px")};
  height: ${props => (props.big ? "150px" : "80px")};
`

const CompanyName = styled.h2`
  width: 100%;
  margin-top: 15px;
  text-align: center;
  font-size: ${props => (props.big ? null : "12px")};
`

const CompanyCard = ({ name, brief, icon, slug, big }) => {
  return (
    <Link to={slug} style={{ textDecoration: `none`, color: `inherit` }}>
      <CardContainer big={big}>
        <LogoContainer big={big}>
          <Img fluid={icon} alt={name} />
        </LogoContainer>
        <CompanyName big={big}>{name}</CompanyName>
        {brief && <Typography component='p' variant='body1'>{brief.slice(0, 100)}...</Typography >}
      </CardContainer>
    </Link>
  )
}

CompanyCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  brief: PropTypes.string,
}

export default CompanyCard
