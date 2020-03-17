import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`
const CompanyName = styled.h4`
  font-weight: 900;
  color: gray;
  margin-bottom: 0;
`

const Card = styled.div`
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 1 1 100px;
  box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.1);
  align-items: center;
  border-radius: 4px;
`

const Alternatives = ({ alternatives }) => {
  return (
    <Container>
      {alternatives.map(alternative => {
        return (
          <Card key={alternative.Name}>
            <CompanyName>{alternative.Name}</CompanyName>
            <Link
              to={`/${alternative.slug}`}
              style={{ textDecoration: `none` }}
            >
              &#10132;
            </Link>
          </Card>
        )
      })}
    </Container>
  )
}

export default Alternatives
