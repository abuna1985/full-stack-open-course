import Part from '../Part';

const Content = ({parts}) => {
  return (
    <>
    {parts.map(({id, name, exercises}) => <Part key={id} name={name} exercises={exercises} /> )}
    </>
  );
}

export default Content