import React from "react"
import styled from "@emotion/styled"
import {Link} from 'gatsby';
import Img from "gatsby-image"
import PropTypes from "prop-types"

const CardContainer = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 1px 1px 2px 2px rgba(204, 204, 204, 0.4);
  &:hover {
    box-shadow: 1px 1px 4px 4px rgba(102, 51, 153, 0.4);
  }
`
const LogoContainer = styled.div`
  margin-top: 20px;
  width: 150px;
  height: 150px;
`
const CompanyName = styled.h2`
  color: rebeccapurple;
  width: 100%;
  margin-top: 15px;
  text-align: center;
`

const Description = styled.p`
  letter-spacing: 1px;
  color: gray;
  margin-bottom: 0;
  padding: 0px 8px 0px 18px;
`

const CompanyCard = ({ name, brief, icon, slug, big }) => {
  return (
    <Link to={slug} style={{ textDecoration: `none` }}>
      <CardContainer>
        <LogoContainer>
          <Img fluid={icon} alt={name} />
        </LogoContainer>
        <CompanyName>{name}</CompanyName>
        <Description>{brief.slice(0, 100)}...</Description>
      </CardContainer>
    </Link>
  )
}

CompanyCard.propTypes ={
    Name: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    brief: PropTypes.string,

}

export default CompanyCard;