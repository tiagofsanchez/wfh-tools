import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"

import SearchIcon from "./serchIcon"

const SearchContainer = styled.div`
  width: 40px;
  @media (max-width: 380px) {
    z-index: 100;
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 0px 20px 20px 0;
    background-color: rebeccapurple;
    border-radius: 50%;
    width: 55px;
  }
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 380px) {
    justify-content: center;
  }
`

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <FlexBox>
        <h2 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h2>
        <SearchContainer>
          <Link to="/search">
            <SearchIcon />
          </Link>
        </SearchContainer>
      </FlexBox>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
