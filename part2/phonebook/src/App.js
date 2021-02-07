import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from './components/Title';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // will only run once 
  useEffect(() => {
    // set loading state to true
    setIsLoading(true);
    // make the GET request
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // add the persons array
        setPersons(response.data);
        // stop loading state
        setIsLoading(false);
        // if error state is active, reset it
        if (isError) {
          setIsError(false);
        }
      })
      .catch((err) => {
        // set error to true
        setIsError(true);
        // stop loading state
        setIsLoading(false);
        // log the error
        console.error(err);
      });
  // eslint-disable-next-line 
  }, [])

   // If searchName exists, filter with the current searchName
  // Else default to the person state array
  const personsToShow = searchName ? persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())) : persons;

  // Event Handler when user types in the <input> element
  const handleNameChange = (event) => {
    // console.log('handleNameChange value', event.target.value);
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    // console.log('handlePhoneChange value', event.target.value);
    setNewPhoneNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    // console.log('handleSearchChange value', event.target.value);
    setSearchName(event.target.value);
  }

  // Event Handler when the button nested in the <form> is clicked
  const addName = (event) => {
    const nameObj = {
      name: newName,
      number: newPhoneNumber,
    };
    // prevent <form> default
    event.preventDefault();

    // If the value in the <input> matches any names in the persons array
    // Make an alert and return the function before we add the name
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return false;
    }
    
    setPersons(persons.concat(nameObj));
    setNewName('');
    setNewPhoneNumber('');
  }

 
  return (
    <div>
      <Title>Phonebook</Title>
      <Filter val={searchName} handleChange={handleSearchChange} />
      <Title type="h2">Add a new</Title>
      < PersonForm 
        handleSubmit={addName}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange} 
        nameVal={newName}
        phoneVal={newPhoneNumber}
      />
      <Title type="h2">Numbers</Title>
      {/* iff Error, show this */}
      {isError && <p>Something went wrong ...</p>}
      {/* if loading, show loading state */}
      {/* else show the list of persons */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Persons persons={personsToShow} />
      )
      }
    </div>
  );
}

export default App;
