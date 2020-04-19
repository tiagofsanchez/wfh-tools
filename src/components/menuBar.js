import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
// import Badge from "@material-ui/core/Badge"
// import NotificationsIcon from "@material-ui/icons/Notifications"
import MoreIcon from "@material-ui/icons/MoreVert"
import MyDrawer from "./drawer"
import useStyles from "./useStyles"
import { Link , graphql , useStaticQuery } from "gatsby"

const MenuBar = () => {
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
                    fixed(
                      width: 25
                      height: 25
                      grayscale: true
                    ) {
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

  const classes = useStyles()
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge variant="dot" color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem>
        <Link to="/search" style={{ textDecoration: `none`, display: `flex` }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <p style={{ margin: `16px 0px` }}>Search</p>
        </Link>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <MyDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        typeOfCompanies={data.Type.edges}
      />
      <AppBar position="fixed" className={classes.appBar}>
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
          <div
            style={{
              margin: `auto`,
              display: `inline-flex`,
              justifyContent: `center`,
            }}
          >
            <Link to="/" style={{ textDecoration: `none`, color: `white` }}>
              <Typography className={classes.title} variant="h6" noWrap>
                {data.site.siteMetadata.title}
              </Typography>
            </Link>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/search">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Link>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge variant="dot" color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  )
}

export default MenuBar
