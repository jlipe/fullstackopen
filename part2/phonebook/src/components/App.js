import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(result => {
      setPersons(result.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map(v => v.name).includes(newName)){
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersons = [...persons, { name: newName, number: newNumber }];
      setPersons(newPersons);
    }
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
      ? <Persons persons={persons} filter={filter}></Persons>
      : null}
    </div>
  )
}

export default App