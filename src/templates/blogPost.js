import React from "react"
import { graphql } from "gatsby"

const BlogPost = props => {
  console.log(props)

  return <div>my blog post!</div>
}

export const blogPost = graphql`
  query post($slug: String) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
    }
  }
`
export default BlogPost
