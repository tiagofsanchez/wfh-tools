import React from "react"
import Img from "gatsby-image"
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@material-ui/core"

const PostCard = ({ post }) => {
  console.log(post)
  return (
    <Card variant="outlined">
      <CardActionArea>
      
          <Img fluid={post.node.thumbnail.fluid} />
    
        <CardContent>
          <Typography component="h5" variant="h5">
            {post.node.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PostCard
