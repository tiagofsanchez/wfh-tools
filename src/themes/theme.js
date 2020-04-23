import { createMuiTheme } from "@material-ui/core"
import { useState  } from "react"

const wfhTheme = {
  palette: {
    common: { black: "#000", white: "#fff" },
    type: 'dark',
    primary: {
      light: "rgba(236, 230, 255, 1)",
      main: "rgba(102, 51, 153, 1)",
      dark: "rgba(50, 5, 94, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "#f5f5f5",
      main: "#424242",
      dark: "#212121",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    
  }
}

export const useDarkMode = () => {
  const [theme, setTheme] = useState(wfhTheme)
  const toogleDarkMode = () => {
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
