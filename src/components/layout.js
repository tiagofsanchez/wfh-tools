import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider, CssBaseline } from "@material-ui/core"

import { useDarkMode } from "../themes/theme"
import MenuBar from "./menuBar"
import Image from "./image"
import styled from "@emotion/styled"
import "./layout.css"

const ExternalLink = styled.a`
  padding: 2px 5px 2px 5px;
  background-color: #ece6ff;
  border-radius: 2px;
  text-decoration: none;
`

const Layout = React.memo(({ children }) => {
  const [theme, toogleDarkMode] = useDarkMode()
  console.log(theme.palette.type)

  return (
    <div className="app-wrapper">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <MenuBar toogleDarkMode={toogleDarkMode} />
          <div
            style={{
              margin: `0 auto`,
              marginTop: `120px`,
              maxWidth: 960,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <main>{children}</main>
            <footer style={{ textAlign: `center`, marginTop: `80px` }}>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">
                <Image />
              </a>
              , by{" "}
              <ExternalLink href="https://www.tiagofsanchez.com/">
                Tiago
              </ExternalLink>
            </footer>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </div>
  )
})

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
