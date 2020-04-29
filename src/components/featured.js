import React from "react"

import { IconButton, Card, Typography } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

// const useStyles = makeStyles({
//   root: {
//     width: "100%",
//     marginBottom: "50px",
//     height: "60px",
//     backgroundColor: "#ffb74d",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     padding: "10px 0 10px 20px",
//     fontWeight: "900",
//     color: "rgba(102, 51, 153, 1)",
//   },
//   link: {
//     textDecoration: "none",
//     borderBottom: "2px solid white",
//   },
// })

const Featured = ({ closeFeature }) => {
  // const classes = useStyles()
  return (
    <Card
      style={{
        width: "100%",
        marginBottom: "50px",
        height: "60px",
        backgroundColor: "#ffb74d",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body1"
        style={{
          padding: "10px 0 10px 20px",
          fontWeight: "900",
          color: "rgba(102, 51, 153, 1)",
        }}
      >
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
