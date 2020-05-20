import React from "react"
import { graphql , Link } from "gatsby"
import styled from "@emotion/styled"
import { useTheme, Typography } from "@material-ui/core"
import SEO from "../components/seo"
import LandingPageAction from "../components/landingPageAction"
import Carousel from "../components/carousel"
import PostCard from '../components/postCard'
import ContactForm from "../components/contactForm"

const _ = require("lodash")

const IndexPage = ({ data }) => {
  const theme = useTheme()
  const mode = theme.palette.type
  const postsArray = data.posts.edges

  //TODO: this could probably be UTIL
  //TOD0 III: implement 'new companies' tag in the landing page
  const allCompaniesArray = data.allAirtable.edges
  const totalNumberOfCompanies = allCompaniesArray.length

  //Creating an Object with all Icons
  const IArray = data.Icons.edges
  let Icons = []
  IArray.forEach(icon => {
    Icons.push({
      name: icon.node.data.Name,
      description: icon.node.data.TagLine,
      icon: icon.node.data.Icon.localFiles[0].childImageSharp.fluid,
    })
  })

  return (
    <>
      <SEO title="Crushing WFH" />
      <section style={{ marginBottom: `70px` }}>
        <LandingPageAction totalNumberOfCompanies={totalNumberOfCompanies} />
      </section>
      <section style={{ marginBottom: `70px` }}>
        <Typography
          variant="h4"
          component="h4"
          align="center"
          gutterBottom={true}
          style={
            mode === "dark"
              ? { color: theme.palette.primary.light, fontWeight: `900` }
              : { color: theme.palette.primary.main, fontWeight: `900` }
          }
        >
          Type of tools
        </Typography>
        <Typography
          variant='subtitle1'
          align="center"
          gutterBottom={true}
        >
          Check out the different tools that we have, just swip...
        </Typography>
        <Carousel icons={Icons} />
      </section>
      <section style={{width: `90%` , margin: `auto`}}> 
        <Typography
        variant="h4"
        component="h4"
        align="center"
        gutterBottom={true}
        style={
          mode === "dark"
            ? { color: theme.palette.primary.light, fontWeight: `900`, marginBottom: `40px` }
            : { color: theme.palette.primary.main, fontWeight: `900`, marginBottom: `40px` }
        }
      >
        Latest articles
      </Typography>
      {postsArray.map(post => (
          <>
            <Link
              to={`articles/${_.kebabCase(post.node.slug)}`}
              style={{ textDecoration: `none`, color: `inherit` }}
            >
              <PostCard key={post.node.title} post={post} />
            </Link>
            <br />
          </>
        ))}
      </section>
      <section style={{ marginTop: `90px` }}>
        <ContactForm />
      </section>
    </>
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
    Icons: allAirtable(
      filter: { data: { Created_time: { eq: null } } }
      sort: { order: ASC, fields: data___Name }
    ) {
      edges {
        node {
          data {
            IconName
            Name
            TagLine
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
    posts: allContentfulBlogPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          thumbnail {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          slug
          childContentfulBlogPostTextTextNode {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
  }
`

export default IndexPage
