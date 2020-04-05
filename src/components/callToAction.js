import React from "react"
import styled from '@emotion/styled'
import AddNewTool from './addNewTool';

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
        <span role="img" aria-label="Tools">
          ⚒️
        </span>{" "}
        that you love?
      </H1>
      <Paragraph>
        Don't worry! Let us know the tool you would like to see in the
        database. We can add it for you!
      </Paragraph>
      <AddNewTool />
    </>
  )
}

export default CallToAction
