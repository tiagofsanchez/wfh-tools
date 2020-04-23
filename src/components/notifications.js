import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import { useTheme, Button } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Slide from "@material-ui/core/Slide"
import Typography from "@material-ui/core/Typography"
import SearchResults from "./searchResults"

import CloseIcon from "@material-ui/icons/Close"
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
  const theme = useTheme()
  const mode = theme.palette.type
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
      <AppBar position="fixed" style={{ marginBottom: `50px`}} >
        <ToolBar>
          <Typography variant="h6" noWrap>
            Notifications
          </Typography>
          <div style={{flexGrow: `1`}} />
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
        <Typography
          variant="h3"
          align="center"
          style={
            mode === "dark"
              ? { color: theme.palette.primary.light, fontWeight: `900` }
              : { color: theme.palette.primary.main, fontWeight: `900` }
          }
        >
          Latest tools added
        </Typography>
        <div style={{ textAlign: `center` }}>
          <Typography
            variant="h6"
            align="center"
            gutterBottom={true}
            style={
              mode === "dark"
                ? { color: theme.palette.secondary.light, fontWeight: `600` }
                : { color: theme.palette.secondary.main, fontWeight: `600` }
            }
          >
            Help us by contributing to this list
          </Typography>
          <Button
            href="https://airtable.com/shrKIvCX7rU3tY3CN"
            rel="noreferrer noopener"
            target="_blank"
            variant="outlined"
          >
            Contribute
          </Button>
        </div>
        <br />
        <div
          style={{
            borderBottom: `1px solid #eeeeee`,
            width: `80%`,
            margin: `auto`,
          }}
        />
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
