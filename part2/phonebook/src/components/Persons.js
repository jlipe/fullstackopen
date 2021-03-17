import React from "react";
import { Button, Table } from "react-bootstrap";

const Persons = (props) => {
  const people = props.filter
    ? props.persons.filter((person) =>
        person.name.toLowerCase().includes(props.filter.toLowerCase())
      )
    : props.persons;
  return (
    <div>
    <h2>Numbers</h2>
    <Table size="sm" striped>
      <tbody>
      {people.map((person) => {
        return (
          <tr key={person.id}>
            <td>
              {person.name}
            </td>
            <td>
              {person.number}
            </td>
            <td>
              <Button
                variant="secondary"
                size="sm"
                value={person.id}
                name={person.name}
                onClick={props.buttonDelete}
              >
                Delete
              </Button>
            </td>
          </tr>
      )})}
    </tbody>
    </Table>
    </div>
  )
}

export default Persons;
