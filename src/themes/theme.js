import { createMuiTheme } from "@material-ui/core"
import { useState  } from "react"

const wfhTheme = {
  palette: {
    primary: {
      main: "#663399",
    },
    secondary: {
      main: "#ece6ff",
    },
  },
}

export const useDarkMode = () => {
  const [theme, setTheme] = useState(wfhTheme)
  const toogleDarkMode = () => {
    console.log("CLICKED")
    setTheme({
      ...theme,
      palette: {
        ...theme.palette,
        type: theme.palette.type === "dark" ? "light" : "dark",
      },
    })
     
  }
  return [createMuiTheme(theme) , toogleDarkMode]
}
