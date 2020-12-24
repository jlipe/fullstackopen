import React from 'react';

const Persons = (props) => {
  const people = props.filter
  ? props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
  : props.persons
  return(
    people.map((person, i) => {
      return(
        <p key={person.name}>{person.name} {person.number}</p>
      );
    })
  );
}

export default Persons;