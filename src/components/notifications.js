import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Slide from "@material-ui/core/Slide"
import Typography from '@material-ui/core/Typography'
import SearchResults from "./searchResults"

import CloseIcon from "@material-ui/icons/Close"
import useStyles from "./useStyles"
import styled from "@emotion/styled"

const Layout = styled.div`
  margin: 0 auto 40px auto;
  margin-top: 90px;
  max-width: 960px;
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Notifications = ({ onOpen, onClose }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query Notifications {
      allAirtable(
        filter: { data: { Created_time: { ne: null }, Publish: { eq: true } } }
        sort: { order: DESC, fields: data___Created_time }
        limit: 15
      ) {
        edges {
          node {
            data {
              Name
              Description
              Created_time(fromNow: true)
              slug
              Type
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
    }
  `)

  const newCompanies = data.allAirtable.edges
  return (
    <Dialog fullScreen open={onOpen} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <ToolBar>
          <Typography className={classes.title} variant="h6" noWrap>
            Latest 15 tools added
          </Typography>
          <div className={classes.grow} />
          <IconButton
            aria-label="close notifications"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </ToolBar>
      </AppBar>
      <Layout>
        <SearchResults filteredCompanies={newCompanies} onClose={onClose} />
      </Layout>
    </Dialog>
  )
}

Notifications.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Notifications
