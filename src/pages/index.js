import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ListOfCompanies from "../components/listOfCompanies"
import CallToAction from "../components/callToAction"

const SectionImage = styled.div`
  width: 150px;
  height: 150px;
  margin-top: 20px;
  @media (max-width: 680px) {
    width: 90px;
    hight: 90px;
  }
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: ${props => (props.right ? "wrap-reverse" : "wrap ")};
`
const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
  align-items: center;
  flex: 1 1 280px;
`
const Description = styled.p`
  font-size: 25px;
  letter-spacing: 1px;
  line-height: 30px;
  margin-bottom: 5px;
  font-weight: 600;
  text-align: center;
`

const Paragraph = styled.p`
  letter-spacing: 1px;
  color: gray;
  padding: 20px;
  font-weight: 600;
  text-align: center;
`

const Span = styled.span`
  padding: 2px 5px 2px 5px;
  background-color: #ece6ff;
  border-radius: 2px;
`

const H1 = styled.h1`
  color: rebeccapurple;
  fontweight: 900;
`

const IndexPage = ({ data }) => {
  const PMToolsArray = data.PM.edges
  const DESIGNToolsArray = data.DESIGN.edges
  const COLABToolsArray = data.COLAB.edges
  const PMIcon = data.PMIcon.edges[0].node.data.Icon.localFiles[0]
  const DIcon = data.DIcon.edges[0].node.data.Icon.localFiles[0]
  const CLIcon = data.CLIcon.edges[0].node.data.Icon.localFiles[0]

  return (
    <Layout>
      <SEO title="Home" />
      <section style={{ marginTop: `60px` }}>
        <Description>
          Hi there, this is the place where you will find all the tools{" "}
          <span>⚒️</span> you will need to work from home. Check them out!
        </Description>
        <Paragraph>
          I have decided to start this database due to the covid-19 outbreak and
          the fact that most of us are now working from home. This is a{" "}
          <Span>beta</Span> version, and I am counting on everyone's help to
          grow this database and share it.
        </Paragraph>
      </section>
      <section style={{ marginBottom: `1.45rem` }}>
        <FlexBox right>
          <ColumnFlex>
            {PMToolsArray.map(company => {
              const { node } = company
              return <ListOfCompanies company={node} key={node.id} />
            })}
          </ColumnFlex>
          <ColumnFlex>
            <H1>Project Management</H1>
            <SectionImage>
              <Img
                fluid={PMIcon.childImageSharp.fluid}
                alt={"Project Management"}
              />
            </SectionImage>
          </ColumnFlex>
        </FlexBox>
      </section>
      <section style={{ marginBottom: `1.45rem` }}>
        <FlexBox>
          <ColumnFlex>
            <H1>Design</H1>
            <SectionImage>
              <Img fluid={DIcon.childImageSharp.fluid} alt={"Design"} />
            </SectionImage>
          </ColumnFlex>
          <ColumnFlex>
            {DESIGNToolsArray.map(company => {
              const { node } = company
              return <ListOfCompanies company={node} key={node.id} />
            })}
          </ColumnFlex>
        </FlexBox>
      </section>
      <section style={{ marginBottom: `1.45rem` }}>
        <FlexBox right>
          <ColumnFlex>
            {COLABToolsArray.map(company => {
              const { node } = company
              return <ListOfCompanies company={node} key={node.id} />
            })}
          </ColumnFlex>
          <ColumnFlex>
            <H1>Collaboration</H1>
            <SectionImage>
              <Img fluid={CLIcon.childImageSharp.fluid} alt={"Collaboration"} />
            </SectionImage>
          </ColumnFlex>
        </FlexBox>
      </section>
      <section style={{ marginTop: `40px` }}>
        <CallToAction />
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
    PMIcon: allAirtable(
      filter: { data: { IconName: { eq: "Program Management" } } }
    ) {
      edges {
        node {
          data {
            Icon {
              localFiles {
                childImageSharp {
                  fluid(grayscale: true) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
    DIcon: allAirtable(filter: { data: { IconName: { eq: "Design" } } }) {
      edges {
        node {
          data {
            Icon {
              localFiles {
                childImageSharp {
                  fluid(grayscale: true) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
    CLIcon: allAirtable(
      filter: { data: { IconName: { eq: "Collaboration" } } }
    ) {
      edges {
        node {
          data {
            Icon {
              localFiles {
                childImageSharp {
                  fluid(grayscale: true) {
                    ...GatsbyImageSharpFluid_tracedSVG
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
