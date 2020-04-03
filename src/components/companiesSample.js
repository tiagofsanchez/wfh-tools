import React from "react"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { Link } from "gatsby"

import ListOfCompanies from "./listOfCompanies"
import GoToSearch from "./goToSearch"

const _ = require("lodash")

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
  align-items: ${props => (props.start ? "flex-start" : "center")};
  flex: 1 1 280px;
`
const SectionImage = styled.div`
  width: 150px;
  margin: 20px 0px 0px 0px;
  @media (max-width: 680px) {
    width: 90px;
  }
`
const Description = styled.p`
  letter-spacing: 1px;
  color: rebeccapurple;
  padding: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0;
`

const H1 = styled.h1`
  color: rebeccapurple;
  fontweight: 900;
`


const CompaniesSample = ({
  companiesArray,
  icon,
  title,
  right,
  description,
}) => {
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
            <H1 >{title}</H1>
            <Link to={`${_.kebabCase(title)}/`}>
              <SectionImage >
                <Img fluid={icon} alt={title}  />
              </SectionImage>
            </Link>
            <Description>{description}</Description>
          </ColumnFlex>
        </>
      ) : (
        <>
          <ColumnFlex>
            <H1>{title}</H1>
            <Link to={`${_.kebabCase(title)}/`}>
              <SectionImage>
                <Img fluid={icon} alt={title} />
              </SectionImage>
            </Link>
            <Description>{description}</Description>
          </ColumnFlex>
          <ColumnFlex start="true">
            {companiesArray.map(company => {
              const { node } = company
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
