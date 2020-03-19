import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"


import Layout from "../components/layout"
import SEO from "../components/seo"
import CallToAction from "../components/callToAction"
import CompaniesSample from "../components/companiesSample"


const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: ${props => (props.right ? "wrap-reverse" : "wrap ")};
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


const IndexPage = ({ data }) => {
  console.log(data)

  const PMToolsArray = data.PM.edges
  const DESIGNToolsArray = data.DESIGN.edges
  const COLABToolsArray = data.COLAB.edges
  const PMIcon = data.PMIcon.edges[0].node.data.Icon.localFiles[0]
  const DIcon = data.DIcon.edges[0].node.data.Icon.localFiles[0]
  const CLIcon = data.CLIcon.edges[0].node.data.Icon.localFiles[0]

  //NOTE: I need to work on the SEO so that I can get the proper image and description there
  return (
    <Layout>
      <SEO title="Working from home" />
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
          <CompaniesSample
            companiesArray={COLABToolsArray}
            icon={CLIcon}
            title="Collaboration"
            right
          />
        </FlexBox>
      </section>
      <section style={{ marginBottom: `1.45rem` }}>
        <FlexBox>
          <CompaniesSample
            companiesArray={DESIGNToolsArray}
            icon={DIcon}
            title="Design"
          />
        </FlexBox>
      </section>
      <section style={{ marginBottom: `1.45rem` }}>
        <FlexBox right>
          <CompaniesSample
            companiesArray={PMToolsArray}
            icon={PMIcon}
            title="Project Management"
            right
          />
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
    allAirtable(filter: { data: { Publish: { eq: true } } }) {
      edges {
        node {
          data {
            Name
            slug
            Type
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
