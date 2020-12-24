import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

import personService from '../services/person'

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(result => {
        setPersons(result);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const updatePerson = id => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, number: newNumber }
    personService
      .update(updatedPerson.id, updatedPerson)
      .then(response =>
        setPersons(persons.map(p => p.id !== response.id ? p : updatedPerson)))
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map(v => v.name).includes(newName)){
      const response = window.confirm(`${newName} is already in the phone book, replace old number?`)
      if (!response) {
        return
      } else {
        updatePerson(persons.find(p => p.name === newName).id)
      }
    } else {
      const newPerson = { name: newName, number: newNumber}
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
      })
    }
  }

  const deletePerson = (event) => {
    event.preventDefault()
    const id = event.target.value
    const name = event.target.name
    const response = window.confirm(`Delete user ${name}?`)
    if (!response) {
      return
    }
    personService
      .remove(event.target.value, event.target.name)
    setPersons(persons.filter(p => p.id !== +id))
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} filter={filter} />

      <h2>Add a New</h2>

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      {persons 
      ? <Persons persons={persons} filter={filter} buttonDelete={deletePerson}></Persons>
      : null}
    </div>
  )
}

export default App