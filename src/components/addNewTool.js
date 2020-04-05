import React from 'react'; 
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

const AddNewTool = props => {
  return (
    <Button href="https://airtable.com/shrKIvCX7rU3tY3CN">Add a new tool</Button>
  )
}

export default AddNewTool;