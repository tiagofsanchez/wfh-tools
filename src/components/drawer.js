import React from "react"
import {withStyles} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { Link } from "gatsby"
import Img from "gatsby-image"
// import {  HomeWorkIcon , SearchIcon ,CloudDownloadIcon , AddIcon} from "@material-ui/icons"
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import AddIcon from '@material-ui/icons/Add'


const _ = require("lodash")

const primaryMenu = [
  { name: "Home", slug: "/", icon: <HomeWorkIcon fontSize="large" /> },
  { name: "Search", slug: "/search", icon: <SearchIcon fontSize="large" /> },
  { name: "Download tools", slug: "/downloadtools", icon: <CloudDownloadIcon fontSize="large" />}
]

const useStyles = makeStyles(theme => ({
  list: {
    width: 300,
    maxHeight: "100vh",
    overflow: "auto",
  },
  
}))



const WFHDrawer = withStyles({
  paper: {
    backgroundColor: `rebeccapurple`,
  },
})(Drawer)

const MyDrawer = React.memo(
  ({ isDrawerOpen, toggleDrawer, typeOfCompanies }) => {
    const classes = useStyles()

    const list = (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <List>
          {primaryMenu.map(item => (
            <Link
              to={item.slug}
              style={{ textDecoration: `none`, color: `white` }}
              key={item.name}
            >
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          ))}
            <a
            href="https://airtable.com/shrKIvCX7rU3tY3CN"
            rel="noreferrer noopener"
            target="_blank"
            style={{ color: `white`, textDecoration: `none` }}
          >
            <ListItem button>
              <ListItemIcon>
                <AddIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={"Add new tool"} />
            </ListItem>
          </a>
        </List>
        <Divider />
        <List>
          {typeOfCompanies.map(type => {
            const typeName = type.node.data.Name
            const typeSlug = `${_.kebabCase(typeName)}/`
            const img = type.node.data.Icon.localFiles[0].childImageSharp.fixed
            return (
              <Link
                to={typeSlug}
                style={{ textDecoration: `none`, color: `white` }}
                key={typeName}
              >
                <ListItem button>
                  <ListItemIcon>
                    <Img fixed={img} />
                  </ListItemIcon>
                  <ListItemText primary={typeName} />
                </ListItem>
              </Link>
            )
          })}
        </List>
      </div>
    )

    return (
      <WFHDrawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer} >
        {list}
      </WFHDrawer>
    )
  }
)
export default MyDrawer
