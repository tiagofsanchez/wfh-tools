import React from "react"

import {
  IconButton,
  makeStyles,
  Card,
  Typography,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(4),
    height: "60px",
    backgroundColor: "#ffb74d",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.primary.main,
  },
  title: {
    padding: "10px 0 10px 20px",
    fontWeight: "900",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    borderBottom: "2px solid white",
  },
}))

const Featured = ({closeFeature}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <Typography variant="body1" className={classes.title}>
        Featured in UDACITY! Check out the{" "}
        <a
          className={classes.link}
          href="https://blog.udacity.com/2020/04/udacity-grad-crushing-wfh-creates-a-new-web-app.html"
          rel="noreferrer noopener"
          target="_blank"
          onClick={closeFeature}
        >
          blog post
        </a>{" "}
      </Typography>
      <IconButton onClick={closeFeature}>
        <CloseIcon />
      </IconButton>
    </Card>
  )
}

export default Featured
