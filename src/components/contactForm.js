import React, { useState } from "react"
import styled from "@emotion/styled"

import useFormInput from "../hooks/useFormInput"
import { addEmail } from "../utils/airtableApi"

const Input = styled.input`
  border-radius: 8px;
  border: none;
  flex: 1 1 100%;
  margin-right: 5px;
  background-color: white;
  color: rebeccapurple;
  padding: 13px;
  &:focus {
    border: 1px solid rebeccapurple;
    background-color: #ece6ff;
  }
  @media (max-width: 680px) {
    width: 100%;
    padding: 13px;
    margin-bottom: 10px;
  }
`
const Button = styled.button`
  background-color: rebeccapurple;
  border: 2px solid rebeccapurple;
  color: white;
  padding: 13px;
  border-radius: 8px;
  font-weight: 900;
  width: max-content;
  &:active {
    background-color: #ece6ff;
    color: rebeccapurple;
  }
`
const Flex = styled.div`
  display: flex;
  @media (max-width: 680px) {
    flex-wrap: wrap;
  }
`
const FormContainer = styled.form`
  padding: 30px 20px 30px 20px;
  background-color: #c9a0dc;
  border-radius: 10px;
  height: 170px;
  @media (max-width: 680px) {
    height: 315px;
  }
`
const Title = styled.h4`
  color: rebeccapurple;
  fontweight: 900;
`

const Message = styled.h4`
  color: white;
  fontweight: 900;
`

const ContactForm = () => {
  const name = useFormInput("")
  const email = useFormInput("")
  const [sent, setSent] = useState(false)

  //for email validation
  const emailValidation = email => {
    const re = /^.+@.+\..+$/
    return re.test(email)
  }

  const formSubmitHandler = e => {
    e.preventDefault()
    if (emailValidation(email.value) === true) {
      addEmail(name.value, email.value)
      setSent(true)
    } else {
      window.alert("Please, enter a correct email")
    }
  }

  let disabled = true
  if (name !== "" && email !== "") {
    disabled = false
  }

  let gotEmailMessage = ""
  if (sent === true) {
    gotEmailMessage = (
      <Message>
        Thank you! Expect new tools every Wendsday in your inbox!
      </Message>
    )
  }

  return (
    <FormContainer onSubmit={formSubmitHandler}>
      <Flex>
        <Title>
          Want to keep up with the latest tools? Subscribe to the newsletter!
        </Title>
      </Flex>
      <Flex>
        {sent ? (
          gotEmailMessage
        ) : (
          <>
            <Input type="text" placeholder="Your name" {...name} />
            <Input
              type="email"
              placeholder="your.email@example.com"
              {...email}
            />
            <Button onSubmit={formSubmitHandler} disabled={disabled}>
              Subscribe
            </Button>
          </>
        )}
      </Flex>
    </FormContainer>
  )
}

export default ContactForm
