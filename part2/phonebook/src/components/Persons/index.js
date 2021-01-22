const Persons = ({persons}) => {
    return persons.map(({name, number}) => <div key={name}>{name} {number}</div>);
}

export default Persons;