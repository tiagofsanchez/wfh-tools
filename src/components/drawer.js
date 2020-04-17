import React from "react"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import useStyles from "./useStyles"
import { withStyles } from "@material-ui/core/styles";
import { Link } from "gatsby"

const _ = require("lodash")

const primaryMenu = [
  { name: "Home", slug: "/" },
  { name: "Search", slug: "/search" },
]

const WFHDrawer = withStyles({
    paper: {
      backgroundColor: `rebeccapurple`,
    },
  })(Drawer)

const MyDrawer = ({ isDrawerOpen, toggleDrawer, typeOfCompanies }) => {
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
          return (
            <Link
              to={typeSlug}
              style={{ textDecoration: `none`, color: `white` }}
              key={typeName}
            >
              <ListItem button>
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
    </WFHDrawer >
  )
}

export default MyDrawer
