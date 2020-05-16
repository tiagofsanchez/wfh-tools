import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import { useTheme, Typography } from "@material-ui/core"

import PostCard from "../components/postCard"
import ContactForm from "../components/contactForm"

const Container = styled.div`
  margin: auto;
  width: 90%;
`
const _ = require("lodash")

const Articles = ({ data }) => {
  const postsArray = data.posts.edges
  const theme = useTheme()
  const mode = theme.palette.type

  return (
    <>
      <Container>
        <Typography
          variant="h5"
          gutterBottom={true}
          style={
            mode === "dark"
              ? { color: theme.palette.primary.light, fontWeight: `900` }
              : { color: theme.palette.primary.main, fontWeight: `900` }
          }
        >
          Articles
        </Typography>
        <Typography
          variant="body1"
          gutterBottom={true}
          style={
            mode === "dark"
              ? { color: theme.palette.secondary.light, fontWeight: `600` }
              : { color: theme.palette.secondary.main, fontWeight: `600` }
          }
        >
          Trying to document how the future of work will be like
        </Typography>
        <br />
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
      </Container>
      <section style={{ marginTop: `80px` }}>
        <ContactForm />
      </section>
    </>
  )
}

export const query = graphql`
  query blogPosts {
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

export default Articles
