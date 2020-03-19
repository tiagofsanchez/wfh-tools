import React from "react"
import styled from "@emotion/styled"

const Button = styled.a`
  background-color: rebeccapurple;
  border: 2px solid rebeccapurple;
  color: white;
  padding: 13px;
  border-radius: 8px;
  font-weight: 900;
  text-decoration: none;
  display: block;
  width: max-content;
  margin: auto;
  &:hover {
    background-color: #ece6ff;
    color: rebeccapurple;
  }
`

const H1 = styled.h1`
  color: rebeccapurple;
  fontweight: 900;
`

const Paragraph = styled.p`
  letter-spacing: 1px;
  color: gray;
  padding: 20px;
  font-weight: 600;
  text-align: center;
`

const CallToAction = () => {
  return (
    <>
      <H1 style={{ textAlign: `center` }}>
        Don't find the tool{" "}
        <span role="img" aria-label="tools">
          ⚒️
        </span>{" "}
        that you love?
      </H1>
      <Paragraph>
        Don't worry! Let us know the tool you would like to see in the
        database. We can add it for you!
      </Paragraph>
      <Button href="https://airtable.com/shrKIvCX7rU3tY3CN">
        Add new tool
      </Button>
    </>
  )
}

export default CallToAction
