import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const GoHomeContainer = styled.div`
  position: fixed;
  width: 40px;
  color: rebeccacolor;
  background-color: #ece6ff;
  border-radius: 50%;
  padding: 8px;
  font-size: 20px;
  font-weight: 900;
  bottom: 0;
  margin-bottom: 20px;
  z-index: 1000;
  @media (min-width: 380px) {
    display: none;
  }
`

const GoHome = () => (
  <Link to="/" style={{ textDecoration: `none` }}>
    <GoHomeContainer> &#11152;</GoHomeContainer>
  </Link>
)

export default GoHome
