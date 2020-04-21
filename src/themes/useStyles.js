import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  rangeSlider: {
    width: 280,
    margin: `auto`,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: "50px",
  },
  list: {
    width: 300,
    maxHeight: "100vh",
    overflow: "auto",
  },
  title: {
    fontWeight: "900",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export default useStyles
