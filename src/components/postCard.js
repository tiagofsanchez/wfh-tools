import React from "react"
import Img from "gatsby-image"
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@material-ui/core"

const PostCard = ({ post }) => {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <Img fluid={post.node.thumbnail.fluid} style={{ height: `300px` }} />
        <CardContent>
          <Typography component="h5" variant="h5" gutterBottom="true">
            {post.node.title}
          </Typography>
          <Typography component="body1" variant="body1">
            {
              post.node.childContentfulBlogPostTextTextNode.childMarkdownRemark
                .excerpt
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PostCard
