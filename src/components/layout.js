import React from "react"
import PropTypes from "prop-types"

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

const Layout = ({ children }) => {

  return (
    <>
      <MenuBar  />
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
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
