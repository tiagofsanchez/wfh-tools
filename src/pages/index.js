import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Logo from "../components/logo"
import CallToAction from "../components/callToAction"
import CompaniesSample from "../components/companiesSample"

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: ${props => (props.right ? "wrap-reverse" : "wrap ")};
`

const IconContainer = styled.div`
  width: 100px;
  margin: auto;
  margin-bottom: 15px;
`

const Description = styled.p`
  font-size: 25px;
  letter-spacing: 1px;
  line-height: 40px;
  margin-bottom: 5px;
  font-weight: 700;
  text-align: center;
  color: gray;
`

const Title = styled.h1`
  text-align: center;
  color: rebeccapurple;
  fontweight: 900;
`

const IndexPage = ({ data }) => {
  console.log(data)

  //Note this could probably be and UTIL
  const allCompaniesArray = data.allAirtable.edges

  const PMToolsArray = data.PM.edges
  const DESIGNToolsArray = data.DESIGN.edges
  const COLABToolsArray = data.COLAB.edges
  const PMIcon = data.PMIcon.edges[0].node.data.Icon.localFiles[0]
  const DIcon = data.DIcon.edges[0].node.data.Icon.localFiles[0]
  const CLIcon = data.CLIcon.edges[0].node.data.Icon.localFiles[0]

  return (
    <Layout>
      <SEO title="Crushing W.F.H." />
      <section style={{ marginBottom: `50px` }}>
        <IconContainer>
          <Logo />
        </IconContainer>
        <Title>Crushing Work From Home</Title>
        <Description>
          All the tools{" "}
          <span role="img" aria-label="Tools">
            ⚒️
          </span>{" "}
          you will need to W.F.H. in one place!
        </Description>
      </section>
      <section style={{ marginBottom: `50px` }}>
      <FlexBox right>
          <CompaniesSample
            companiesArray={PMToolsArray}
            icon={PMIcon}
            title="Project Management"
            right
          />
        </FlexBox>
       
      </section>
      <section style={{ marginBottom: `50px` }}>
        <FlexBox>
          <CompaniesSample
            companiesArray={DESIGNToolsArray}
            icon={DIcon}
            title="Design"
          />
        </FlexBox>
      </section>
      <section style={{ marginBottom: `50px` }}>
      <FlexBox right>
          <CompaniesSample
            companiesArray={COLABToolsArray}
            icon={CLIcon}
            title="Collaboration"
            right
          />
        </FlexBox>
      </section>
      <section style={{ marginTop: `90px` }}>
        <CallToAction />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query workFromHome {
    allAirtable(filter: { data: { Publish: { eq: true } , Created_time: {ne:null} } }) {
      edges {
        node {
          data {
            Name
            slug
            Type
            Created_time (difference: "days")
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
    PM: allAirtable(
      limit: 4,
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
      limit: 4,
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
      limit: 4,
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
