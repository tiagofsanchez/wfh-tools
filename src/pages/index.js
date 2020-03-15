import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ListOfCompanies from "../components/listOfCompanies"

const SectionImage = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 20px;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 50px;
  align-items: center;
`

const IndexPage = ({ data }) => {
  console.log(data)
  const PMToolsArray = data.PM.edges
  const DESIGNToolsArray = data.DESIGN.edges
  const COLABToolsArray = data.COLAB.edges

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <section>
        <FlexBox>
          <div style={{ width: `50%` }}>
            {PMToolsArray.map(company => {
              const { node } = company
              return <ListOfCompanies company={node} key={node.id} />
            })}
          </div>
          <ColumnFlex>
            <h1 style={{ color: `gray`, fontWeight: `900` }}>
              Project Management
            </h1>
            <SectionImage
              src={"https://image.flaticon.com/icons/svg/1659/1659067.svg"}
              alt={"Project Management"}
            />
          </ColumnFlex>
        </FlexBox>
      </section>
      <section>
        <FlexBox>
          <ColumnFlex>
            <h1 style={{ color: `gray`, fontWeight: `900` }}>Design</h1>
            <SectionImage
              src={"https://image.flaticon.com/icons/svg/751/751429.svg"}
              alt={"Design"}
            />
          </ColumnFlex>
          <div style={{ width: `50%` }}>
            {DESIGNToolsArray.map(company => {
              const { node } = company
              return <ListOfCompanies company={node} key={node.id} />
            })}
          </div>
        </FlexBox>
      </section>
      <section>
        <FlexBox>
          <div style={{ width: `50%` }}>
            {COLABToolsArray.map(company => {
              const { node } = company
              return <ListOfCompanies company={node} key={node.id} />
            })}
          </div>
          <ColumnFlex>
            <h1 style={{ color: `gray`, fontWeight: `900` }}>Collaboration</h1>
            <SectionImage
              src={"https://image.flaticon.com/icons/svg/1189/1189188.svg"}
              alt={"Collaboration"}
            />
          </ColumnFlex>
        </FlexBox>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query workFromHome {
    PM: allAirtable(
      filter: {
        data: { Publish: { eq: true }, Type: { eq: "Project Management" } }
      }
    ) {
      edges {
        node {
          data {
            Name
            slug
            Thumbnail {
              localFiles {
                childImageSharp {
                  fixed(width: 30, height: 30, grayscale: true) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
    DESIGN: allAirtable(
      filter: { data: { Publish: { eq: true }, Type: { eq: "Design" } } }
    ) {
      edges {
        node {
          data {
            Name
            slug
            Thumbnail {
              localFiles {
                childImageSharp {
                  fixed(width: 30, height: 30, grayscale: true) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
    COLAB: allAirtable(
      filter: { data: { Publish: { eq: true }, Type: { eq: "Collaboration" } } }
    ) {
      edges {
        node {
          data {
            Name
            slug
            Thumbnail {
              localFiles {
                childImageSharp {
                  fixed(width: 30, height: 30, grayscale: true) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
