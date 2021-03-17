import React from 'react'
import { Form, Button } from 'react-bootstrap'

const PersonForm = (props) => {
  return(
    <>
      <h2>Add a New</h2>
      <Form onSubmit={props.addPerson}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            value={props.newName}
            onChange={props.handleNameChange}
          />
          {props.newName}
          <Form.Label>Number:</Form.Label>
          <Form.Control
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
          {props.newNumber}
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default PersonForm;