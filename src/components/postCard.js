import React from "react"
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@material-ui/core"

const PostCard = ({ post }) => {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardMedia
          component="img"
          image={post.node.thumbnail.fluid.srcWebp}
          style={{ height: `300px` }}
        />
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
