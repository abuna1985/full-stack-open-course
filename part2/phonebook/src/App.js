import React, { useState } from 'react'
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Michael Scott'
    },
    {
      name: 'Jim Halpert'
    },
    {
      name: 'Dwight Schrute'
    }
  ]);
  const [newName, setNewName] = useState('');

  // Event Handler when user types in the <input> element
  const handleNameChange = (event) => {
    // console.log('handleNameChange value', event.target.value);
    setNewName(event.target.value);
  }

  // Event Handler when the button nested in the <form> is clicked
  const addName = (event) => {
    event.preventDefault();
    const nameObj = {
      name: newName
    };
    setPersons(persons.concat(nameObj));
    setNewName('');
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({name}) => <div key={name}>{name}</div>)}
    </div>
  );
}

export default App;
