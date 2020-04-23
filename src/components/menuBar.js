import React from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  useTheme,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import NotificationsIcon from "@material-ui/icons/Notifications"
import WbSunnyIcon from "@material-ui/icons/WbSunny"
import NightsStayIcon from "@material-ui/icons/NightsStay"

import Notifications from "./notifications"
import MyDrawer from "./drawer"
import { Link, graphql, useStaticQuery } from "gatsby"




const MenuBar = ({ toogleDarkMode }) => {
  const theme = useTheme()
  const type = theme.palette.type

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
    <div style={{flexGrow: `1`}}>
      <MyDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        typeOfCompanies={data.Type.edges}
      />
      <Notifications onOpen={isNotOpen} onClose={closeNotHandler} />
      <AppBar position="fixed" style={{ marginBottom: `50px`}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: `none`, color: `white` }}>
            <Typography variant="h6" style={{fontWeight: `900`}} noWrap>
              {data.site.siteMetadata.title}
            </Typography>
          </Link>
          <div style={{flexGrow: `1`}} />
          <IconButton
            aria-label="toogle theme"
            color="inherit"
            onClick={toogleDarkMode}
          >
            {type === "light" ? (
              <WbSunnyIcon fontSize="small" />
            ) : (
              <NightsStayIcon fontSize="small" />
            )}
          </IconButton>
          <IconButton
            aria-label="show new notifications"
            color="inherit"
            onClick={closeNotHandler}
          >
            <Badge variant="dot" color="secondary">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuBar
