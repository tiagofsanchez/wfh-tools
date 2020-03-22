import React from "react"
import Img from "gatsby-image"
import styled from "@emotion/styled"

import ListOfCompanies from "./listOfCompanies"
import GoToSearch from './goToSearch';

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
  margin-top: 20px;
  @media (max-width: 680px) {
    width: 90px;
  }
`
const H1 = styled.h1`
  color: rebeccapurple;
  fontweight: 900;
`

const CompaniesSample = ({ companiesArray, icon, title, right }) => {
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
            <H1>{title}</H1>
            <SectionImage>
              <Img fluid={icon} alt={title} />
            </SectionImage>
          </ColumnFlex>
        </>
      ) : (
        <>
          <ColumnFlex>
            <H1>{title}</H1>
            <SectionImage>
              <Img fluid={icon} alt={title} />
            </SectionImage>
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
