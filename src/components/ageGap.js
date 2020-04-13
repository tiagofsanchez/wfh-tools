import React from "react"
import styled from "@emotion/styled"

const AgeInfo = styled.h4`
font-weight: 900;
color: gray; 
text-align: center;
margin-bottom: 40px;
line-height: 25px;
`

const Age = styled.span`
padding: 1px 8px 1px 8px; 
background-color: #ece6ff;
border-radius: 3px;
`

function ages(array) {
  let ageArrayInt = []
  array.map(age => {
    ageArrayInt.push(Number(age))
  })
  return {
    minAge: Math.min(...ageArrayInt),
    maxAge: Math.max(...ageArrayInt),
  }
}

const AgeGap = props => {
  const { ageArray } = props
  const { minAge, maxAge } = ages(ageArray)

return (
  <AgeInfo>
    For kids between <Age>{minAge}</Age> and <Age>{maxAge}</Age> years old
  </AgeInfo>
)
}

export default AgeGap
