import { makeStyles, } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "rebeccapurple",
    marginBottom: '50px'
  },
  list: {
    width: 280,
    maxHeight: '100vh', 
    overflow: 'auto'
  },
  title: { 
    fontWeight: '900'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

export default useStyles;
