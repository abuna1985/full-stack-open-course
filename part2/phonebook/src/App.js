import React, { useState } from 'react'
import Title from './components/Title';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Michael Scott',
      number: '555-123-4567',
    },
    {
      name: 'Jim Halpert',
      number: '555-888-5212',
    },
    {
      name: 'Dwight Schrute',
      number: '555-555-5555',
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchName, setSearchName] = useState('');

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
      <Persons persons={personsToShow} />
    </div>
  );
}

export default App;
