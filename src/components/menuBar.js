import React from "react"
import { AppBar, Toolbar, IconButton, Typography , Badge } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import NotificationsIcon from "@material-ui/icons/Notifications"
import Notifications from "./notifications"
import MyDrawer from "./drawer"
import useStyles from "../themes/useStyles"
import { Link, graphql, useStaticQuery } from "gatsby"


const MenuBar = () => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      Type: allAirtable(
        filter: { data: { Created_time: { eq: null } } }
        sort: { order: ASC, fields: data___Name }
      ) {
        edges {
          node {
            data {
              IconName
              Name
              Icon {
                localFiles {
                  publicURL
                  childImageSharp {
                    fixed(width: 25, height: 25, grayscale: true) {
                      ...GatsbyImageSharpFixed
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

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [isNotOpen, setIsNotOpen] = React.useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const closeNotHandler = () => {
    setIsNotOpen(!isNotOpen)
  }


  

  return (
    <div className={classes.grow} >
      <MyDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        typeOfCompanies={data.Type.edges}
      />
      <Notifications onOpen={isNotOpen} onClose={closeNotHandler} />
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: `none`, color: `white` }}>
            <Typography className={classes.title} variant="h6" noWrap>
              {data.site.siteMetadata.title}
            </Typography>
          </Link>
          <div className={classes.grow} />
          <IconButton
            aria-label="show new notifications"
            color="inherit"
            onClick={closeNotHandler}
          >
            <Badge variant="dot" color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuBar
