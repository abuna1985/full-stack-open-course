const PersonForm = ({ handleSubmit, handleNameChange, handlePhoneChange, nameVal, phoneVal }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={nameVal} onChange={handleNameChange} />
      </div>
      <div>
        phone: <input value={phoneVal} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;