import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const Go = styled.div`
  background-color: #ece6ff;
  color: rebeccapurple;
  padding: 2px 8px 2px 8px;
  border-radius: 8px;
  font-weight: 900;
  text-decoration: none;
  display: block;
  width: max-content;
  margin: 20px 0px 0px 20px;
  &:hover {
    background-color: rebeccapurple;
    color: white;
  }
`

const goToSearch = () => {
  return (
    <Link to={"/search"} style={{ textDecoration: `none` }}>
      <Go>Search all &#10132;</Go>
    </Link>
  )
}

export default goToSearch
