import React from "react"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core"

const _ = require("lodash")

const SectionImage = styled.div`
  width: 150px;
  margin: auto;
  padding: 20px;
`

const CompaniesSample = ({ icon, title, description }) => {
  return (
    <Card style={{ flex: `1 1 280px`, padding: `20px`, margin: `10px` }}>
      <CardContent style={{ height: `80px` }}>
        <Typography
          variant="h5"
          component="h5"
          align="center"
          style={{ fontWeight: `600` }}
        >
          {title}
        </Typography>
      </CardContent>
      <SectionImage>
        <Img fluid={icon} alt={title} />
      </SectionImage>
      <CardContent style={{ height: `150px` }}>
        <Typography component="body1" variant="body1">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" style={{ fontWeight: `900` }} variant="outlined" >
          <Link
            style={{ textDecoration: `none`, color: `inherit` }}
            to={`${_.kebabCase(title)}/`}
          >
            Learn More
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
}

export default CompaniesSample
