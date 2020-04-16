import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import NotificationsIcon from "@material-ui/icons/Notifications"
import MoreIcon from "@material-ui/icons/MoreVert"
import MyDrawer from "./drawer"
import useStyles from "./useStyles"
import PropTypes from "prop-types"
import styled from '@emotion/styled'
import { Link } from "gatsby"


const Beta = styled.div`
font-size: 12px; 
padding: 0px 5px 0px 5px;
border-radius: 3px;
font-weight: 900;
color: rebeccapurple; 
background-color: #ece6ff
`


const MenuBar = ({ siteTitle }) => {
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
      <Link to='/search' style={{textDecoration: `none`, display: `flex`}}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <p style={{margin:`16px 0px`}}>Search</p>
        </Link>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <MyDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <AppBar position="static" className={classes.appBar}>
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
          <Link to='/' style={{textDecoration: `none`,   color: `white`}}>
          <Typography className={classes.title} variant="h5" noWrap>
            {siteTitle}
          </Typography>
          </Link>
          <Beta>BETA</Beta>
          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
           <Link to='/search'>
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

MenuBar.propTypes = {
  siteTitle: PropTypes.string,
}

MenuBar.defaultProps = {
  siteTitle: ``,
}

export default MenuBar
