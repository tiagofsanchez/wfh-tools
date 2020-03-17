import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`
const Card = styled.div`
  margin: 10px;
  padding: 10px;
  flex: 1 1 100px;
  align-items: center;
  border-radius: 4px;
`

const Alternatives = ({ alternatives }) => {
  return (
    <Container>
      {alternatives.map(alternative => {
        return (
          <Link
            key={alternative.Name}
            to={`/${alternative.slug}`}
            style={{
              textDecoration: `none`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              margin: `10px`,
              padding: `10px`,
              flex: `1 1 60px`,
              height: `80px`,
              width: `100%`,
              boxShadow: `0 0 1px 2px rgba(0, 0, 0, 0.1)`,
            }}
          >
            <Card>
              <img
                src={alternative.Thumbnail.raw[0].thumbnails.small.url}
                atl={alternative.Name}
                style={{ marginBottom: `0` }}
              />
            </Card>
          </Link>
        )
      })}
    </Container>
  )
}

export default Alternatives
