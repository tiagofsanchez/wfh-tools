import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Logo from "../components/logo"
import ContactForm from '../components/contactForm'
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
  //TODO: this could probably be and UTIL (YES, Will need to use UTIL HERE, to messy)
  //TOD0 III: implement 'new companies' tag in the landing page
  //TODO IV: small leaderboard on the landing page
  const allCompaniesArray = data.allAirtable.edges
  let PMArray = []
  let DArray = []
  let COArray = []
  let VCArray = []
  let TTArray = []
  let SCArray = []
  let PRArray = []
  allCompaniesArray.forEach(company => {
    const { node } = company
    if ((node.data.Type === "Project Management") & (PMArray.length < 3)) {
      PMArray.push(node)
    } else if ((node.data.Type === "Design") & (DArray.length < 3)) {
      DArray.push(node)
    } else if ((node.data.Type === "Collaboration") & (COArray.length < 3)) {
      COArray.push(node)
    } else if (
      (node.data.Type === "Video Conferencing") &
      (VCArray.length < 4)
    ) {
      VCArray.push(node)
    } else if ((node.data.Type === "Time Tracking") & (TTArray.length < 3)) {
      TTArray.push(node)
    } else if ((node.data.Type === "Scheduling") & (SCArray.length < 3)) {
      SCArray.push(node)
    } else if ((node.data.Type === "Productivity") & (PRArray.length < 3)) {
      PRArray.push(node)
    }
  })
  //Creating and Object with all Icons
  const IArray = data.Icons.edges
  let Icons = {}
  IArray.forEach(icon => {
    const { node } = icon
    Icons[node.data.IconName] = node.data.Icon.localFiles[0]
  })

  return (
    <Layout>
      <SEO title="Crushing W.F.H." />
      <section style={{ marginBottom: `50px` }}>
        <IconContainer>
          <Logo />
        </IconContainer>
        <Title>Crushing Work From Home</Title>
        <Description>
          Search all the tools{" "}
          <span role="img" aria-label="Tools">
            ⚒️
          </span>{" "}
          you will need to W.F.H. in one place!
        </Description>
      </section>
      <section style={{ marginBottom: `50px` }}>
        <FlexBox right>
          <CompaniesSample
            companiesArray={PMArray}
            icon={Icons.ProgramManagement.childImageSharp.fluid}
            title="Project Management"
            right
            description="Plan, organize and share your projects with teams and managers"
          />
        </FlexBox>
      </section>
      <section style={{ marginBottom: `50px` }}>
        <FlexBox>
          <CompaniesSample
            companiesArray={DArray}
            icon={Icons.Design.childImageSharp.fluid}
            title="Design"
            description="Improve your product UX and UI before jumping into code "
          />
        </FlexBox>
      </section>
      <section style={{ marginBottom: `50px` }}>
        <FlexBox right>
          <CompaniesSample
            companiesArray={COArray}
            icon={Icons.Collaboration.childImageSharp.fluid}
            title="Collaboration"
            right
            description="Work efficiently together without sending attachments and emails"
          />
        </FlexBox>
      </section>
      <section style={{ marginBottom: `50px` }}>
        <FlexBox>
          <CompaniesSample
            companiesArray={VCArray}
            icon={Icons.VideoConferencing.childImageSharp.fluid}
            title="Video Conferencing"
            description="Engage your team and clients with video wherever you are"
          />
        </FlexBox>
      </section>
      <section style={{ marginBottom: `50px` }}>
        <FlexBox right>
          <CompaniesSample
            companiesArray={TTArray}
            icon={Icons.TimeTracking.childImageSharp.fluid}
            title="Time Tracking"
            right
            description="Track your time and gain valuable insights on how to improve"
          />
        </FlexBox>
      </section>
      <section style={{ marginTop: `90px` }}>
        <ContactForm />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query workFromHome {
    allAirtable(
      filter: { data: { Publish: { eq: true }, Created_time: { ne: null } } }
      sort: { order: DESC, fields: data___Created_time }
    ) {
      edges {
        node {
          data {
            Name
            slug
            Type
            Created_time(difference: "days")
            Thumbnail {
              localFiles {
                childImageSharp {
                  fixed(width: 30, height: 30, grayscale: true) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
    Icons: allAirtable(filter: { data: { Created_time: { eq: null } } }) {
      edges {
        node {
          data {
            IconName
            Icon {
              localFiles {
                childImageSharp {
                  fluid(grayscale: true) {
                    ...GatsbyImageSharpFluid
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
