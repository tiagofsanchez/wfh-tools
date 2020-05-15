import React from "react"
import { graphql } from "gatsby"
import { Typography, CardMedia, useTheme } from "@material-ui/core"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Seo from '../components/seo';
import ContactForm from "../components/contactForm"

const BlogPost = ({ data }) => {
  const theme = useTheme()
  const mode = theme.palette.type
  const title = data.post.title
  const document = data.post.childContentfulBlogPostArticleRichTextNode.json
  const description = document.content[0].content[0].value

  return (
    <>
      <Seo 
      title={title}
      slug={data.post.slug}
      description={description}
      image={data.post.thumbnail.fluid.srcWebp}
      />
      <CardMedia
        component="img"
        image={data.post.thumbnail.fluid.srcWebp}
        style={{ height: `300px`, borderRadius: `4px` }}
      />

      <Typography
        variant="h4"
        gutterBottom={true}
        style={
          mode === "dark"
            ? { color: theme.palette.primary.light, fontWeight: `900` }
            : { color: theme.palette.primary.main, fontWeight: `900` }
        }
      >
        {title}
      </Typography>
      {documentToReactComponents(document)}
      <section style={{ marginTop: `80px` }}>
        <ContactForm />
      </section>
    </>
  )
}

export const blogPost = graphql`
  query post($slug: String) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      childContentfulBlogPostArticleRichTextNode {
        json
      }
      thumbnail {
        fluid {
          base64
          tracedSVG
          srcWebp
          srcSetWebp
        }
      }
    }
  }
`
export default BlogPost
