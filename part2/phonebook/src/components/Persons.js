import React from 'react';

const Persons = (props) => {
  const people = props.filter
  ? props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
  : props.persons
  return(
    people.map((person) => {
      return(
        <div key={person.id}>
          {person.name} {person.number}
          <button value={person.id} name={person.name} onClick={props.buttonDelete}>Delete</button>
        </div>
      );
    })
  );
}

export default Persons;