import React from "react"
import styled from "@emotion/styled"
import { useTheme } from "@material-ui/core"
import AddNewTool from "./addNewTool"

const H1 = styled.h1`
  fontweight: 900;
  margin-top: 50px;
  text-align: center;
`

const Paragraph = styled.p`
  letter-spacing: 1px;
  color: gray;
  padding: 20px;
  font-weight: 600;
  text-align: center;
`

const CallToAction = () => {
  const theme = useTheme()
  const mode = theme.palette.type

  return (
    <>
      <H1
        style={
          mode === "dark"
            ? { color: theme.palette.primary.light }
            : { color: theme.palette.primary.main }
        }
      >
        Don't find the tool{" "}
        <span role="img" aria-label="Tools">
          ⚒️
        </span>{" "}
        that you love?
      </H1>
      <Paragraph>
        Don't worry! Let us know the tool you would like to see in the database.
        We can add it for you!
      </Paragraph>
      <AddNewTool />
    </>
  )
}

export default CallToAction
