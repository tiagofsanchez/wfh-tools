import React from "react"
import {withStyles} from '@material-ui/core'
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import AddIcon from "@material-ui/icons/Add"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import useStyles from "../themes/useStyles"
import { Link } from "gatsby"
import Img from "gatsby-image"
import HomeWorkIcon from "@material-ui/icons/HomeWork"
import SearchIcon from "@material-ui/icons/Search"

const _ = require("lodash")

const primaryMenu = [
  { name: "Home", slug: "/", icon: <HomeWorkIcon fontSize="large" /> },
  { name: "Search", slug: "/search", icon: <SearchIcon fontSize="large" /> },
]

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
        <Divider />
        <List>
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
