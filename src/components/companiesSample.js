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
  height: 150px;
  margin-top: 20px;
  @media (max-width: 680px) {
    width: 90px;
    hight: 90px;
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
          <ColumnFlex start>
            {companiesArray.map(company => {
              const { node } = company
              return <ListOfCompanies company={node} key={node.id} />
            })}
            <GoToSearch />
          </ColumnFlex>
          <ColumnFlex>
            <H1>{title}</H1>
            <SectionImage>
              <Img fluid={icon.childImageSharp.fluid} alt={title} />
            </SectionImage>
          </ColumnFlex>
        </>
      ) : (
        <>
          <ColumnFlex>
            <H1>{title}</H1>
            <SectionImage>
              <Img fluid={icon.childImageSharp.fluid} alt={title} />
            </SectionImage>
          </ColumnFlex>
          <ColumnFlex start>
            {companiesArray.map(company => {
              const { node } = company
              return <ListOfCompanies company={node} key={node.id} />
            })}
            <GoToSearch />
          </ColumnFlex>
        </>
      )}
    </>
  )
}

export default CompaniesSample
