import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification'

import personService from '../services/person'

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ message, setMessage ] = useState(null)

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
      .then(response => {
        setPersons(persons.map(p => p.id !== response.id ? p : updatedPerson))
        setMessage(
          `Person '${updatedPerson.name}' was updated`
        )
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setMessage(null)
        }, 5000)})
      .catch(error => {
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})
  }

  const addPerson = (event) => {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input')
    if (persons.map(v => v.name).includes(newName)){
      const response = window.confirm(`${newName} is already in the phone book, replace old number?`)
      if (!response) {
        return
      } else {
        updatePerson(persons.find(p => p.name === newName).id)
        for (let i of inputs) {
          i.value = ""
        }
      }
    } else {
      const newPerson = { name: newName, number: newNumber}
      personService
        .create(newPerson)
        .then(response => {
          for (let i of inputs) {
            i.value = ""
          }
          setPersons(persons.concat(response))
          setMessage(
            `Person '${newPerson.name}' was added`
          )
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      .catch(error => {
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      .remove(id, name)
    setPersons(persons.filter(p => p.id !== id))
    setMessage(
      `Person '${name}' was removed`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  return (
    <div className="container">
      <h2>Phonebook</h2>

      {errorMessage ? <Notification message={errorMessage} className={"error"} /> : null}
      {message ? <Notification message={message} className={"success"} /> : null}

      <Filter handleFilterChange={handleFilterChange} filter={filter} />

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
        addPerson={addPerson}
      />
      {persons 
      ? <Persons persons={persons} filter={filter} buttonDelete={deletePerson}></Persons>
      : null}
    </div>
  )
}

export default App