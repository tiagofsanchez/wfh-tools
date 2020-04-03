import React, { Component } from "react"
import styled from "@emotion/styled"

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

class ContactForm extends Component {
  state = {
    name: "",
    email: "",
    sent: false,
  }

  //for email validation
  emailValidation = email => {
    const re = /^.+@.+\..+$/
    return re.test(email)
  }

  formChangeHandler = (e, name, value) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  formSubmitHandler = e => {
    e.preventDefault()
    const { name, email } = this.state

    if (this.emailValidation(email) === true) {
      addEmail(name, email)
      this.setState({
        name: "",
        email: "",
        sent: true,
      })
    } else {
      window.alert("Please, enter a correct email")
    }
  }

  render() {
    const { name, email, sent } = this.state

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
      <FormContainer onSubmit={e => this.formSubmitHandler(e)}>
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
              <Input
                type="text"
                placeholder="Your name"
                name="name"
                value={name}
                onChange={(e, name, value) =>
                  this.formChangeHandler(e, name, value)
                }
              />
              <Input
                type="email"
                placeholder="your.email@example.com"
                name="email"
                value={email}
                onChange={(e, name, value) =>
                  this.formChangeHandler(e, name, value)
                }
              />

              <Button
                onSubmit={e => this.formSubmitHandler(e)}
                disabled={disabled}
              >
                Subscribe
              </Button>
            </>
          )}
        </Flex>
      </FormContainer>
    )
  }
}

export default ContactForm
