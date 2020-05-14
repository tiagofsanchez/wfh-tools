import React from "react"
import { graphql } from "gatsby"
import { Typography , CardMedia } from '@material-ui/core'

const BlogPost = ({ data }) => {
  console.log(data.post.slug)

  const title = data.post.title

  return (
    <>
       <CardMedia
          component="img"
          image={data.post.thumbnail.fluid.srcWebp}
          style={{ height: `300px` }}
        />
      <Typography>{title}</Typography>
    </>
  )
}

export const blogPost = graphql`
  query post($slug: String) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      thumbnail {
        fluid {
          base64
          tracedSVG
          srcWebp
          srcSetWebp
        }
      }
      article {
        article
      }
    }
  }
`
export default BlogPost
