import React, { useState } from 'react'
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

  // Event Handler when user types in the <input> element
  const handleNameChange = (event) => {
    // console.log('handleNameChange value', event.target.value);
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    // console.log('handleNameChange value', event.target.value);
    setNewPhoneNumber(event.target.value);
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
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhoneNumber} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({name, number}) => <div key={name}>{name} {number}</div>)}
    </div>
  );
}

export default App;
