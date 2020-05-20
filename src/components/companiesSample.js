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
const Content = styled.div`
height: 100px; 
padding: 8px;
@media (max-width: 600px) { 
  height: 150px;
}
`

const CompaniesSample = ({ icon, title, description }) => { 
  

  return (
    <Card style={{ flex: `0 0 280px`, padding: `20px`, margin: `10px` }}>
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
      <Content >
        <Typography variant='subtitle1'>
          {description}
        </Typography>
      </Content>
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
