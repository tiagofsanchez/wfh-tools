import React , { useEffect , useState, useCallback } from "react"
import { Breadcrumbs, makeStyles } from "@material-ui/core"
import { Link } from 'gatsby'

const useStyles = makeStyles(theme => ({
  navigation: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    fontWeight: "900",
    textDecoration: 'none'
  },
}))

const Navigation = () => {
  const [url, setUrl] = useState(new URL(window.location.href))  
  const classes = useStyles()

  useEffect(()=> {
    const handleURL = () => setUrl(new URL(window.location.href))  
    handleURL()
  } , [])
  

  console.log(url)
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link className={classes.navigation} to="/">home</Link>
      <Link className={classes.navigation} to={url.pathname}>{url.pathname}</Link>
    </Breadcrumbs>
  )
}

export default Navigation
