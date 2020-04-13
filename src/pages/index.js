import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import CountUp from "react-countup"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Logo from "../components/logo"
import ContactForm from "../components/contactForm"
import CompaniesSample from "../components/companiesSample"
import AddNewTool from "../components/addNewTool"

const _ = require("lodash")

const HeaderSection = styled.section`
  margin-bottom: 50px;
  padding: 0px 10px 20px 10px;
  background-color: #eeeeee;
  box-shadow: 0px 0px 6px 0px #eeeeee;
  border-radius: 10px;
`

const Span = styled.span`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, #ece6ff 40%);
  border-bottom: 2px solid rebeccapurple;
`

const IconContainer = styled.div`
  width: 100px;
  margin: auto;
  margin-bottom: 15px;
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
`

const CompanyCounter = styled.span`
  color: rebeccapurple;
  font-size: 49px;
  font-weight: 900;
  margin-right: 15px;
`

const Paragraph = styled.p`
  color: black;
  font-size: 18px;
  line-height: 40px;
  font-weight: 700;
  text-align: center;
  display: inline;
`

const Description = styled.p`
  font-size: 25px;
  letter-spacing: 1px;
  line-height: 40px;
  margin-bottom: 25px;
  font-weight: 700;
  text-align: center;
  color: gray;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: ${props => (props.right ? "wrap-reverse" : "wrap ")};
`
const SectionImage = styled.div`
  width: 200px;
  margin: 20px 0px 0px 0px;
  padding: 20px;
  margin: auto;
 
`
const New = styled.h2`
  margin: auto;
  color: rebeccapurple;
  background-color: #ece6ff;
  padding: 5px 10px 5px 10px;
  border-radius: 8px;
  font-weight: 900;
  display: block;
  width: max-content;
  margin-top: 20px;
`
const FeaturedSection = styled.section`
  width: 300px;
  padding: 20px;
  margin: 20px auto 50px auto;
  border-radius: 8px;
  box-shadow: 1px 1px 2px 2px rgba(204, 204, 204, 0.4);
  &:hover {
    box-shadow: 1px 1px 4px 4px rgba(102, 51, 153, 0.4);
  }

`

const Title = styled.h1`
  text-align: center;
  color: rebeccapurple;
  fontweight: 900;
`

const IndexPage = ({ data }) => {
  //TODO: this could probably be and UTIL (YES, Will need to use UTIL HERE, to messy)
  //TOD0 III: implement 'new companies' tag in the landing page
  const allCompaniesArray = data.allAirtable.edges
  const totalNumberOfCompanies = allCompaniesArray.length
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
      (VCArray.length < 3)
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
  //Creating an Object with all Icons
  const IArray = data.Icons.edges
  let Icons = {}
  IArray.forEach(icon => {
    const { node } = icon
    Icons[node.data.IconName] = node.data.Icon.localFiles[0]
  })

  console.log(Icons)

  return (
    <Layout>
      <SEO title="Crushing WFH" />
      <HeaderSection>
        <IconContainer>
          <Logo />
        </IconContainer>
        <Title>Crushing Work From Home</Title>
        <Flex>
          <CompanyCounter>
            <CountUp start={0} end={totalNumberOfCompanies} duration={8} />
          </CompanyCounter>
          <Paragraph>tools and counting!</Paragraph>
        </Flex>
        <Description>
          <Span>Search</Span> the tools{" "}
          <span role="img" aria-labelledby="Tools">
            ⚒️
          </span>{" "}
          you need to WFH!{" "}
        </Description>
        <Description>
          The tool that you love is not here? You can <Span>add the tool</Span>{" "}
          in!
        </Description>
        <AddNewTool />
      </HeaderSection>
      <FeaturedSection>
        <Title >For kids</Title>
        <Link to={`${_.kebabCase("kids")}/`}>
          <SectionImage>
            <Img fluid={Icons.Kids.childImageSharp.fluid} alt={"kids"} />
          </SectionImage>
        </Link>
        <New>New</New>
      </FeaturedSection>
      <section style={{ marginBottom: `50px` }}>
        <FlexBox right>
          <CompaniesSample
            companiesArray={PMArray}
            icon={Icons.ProjectManagement.childImageSharp.fluid}
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
