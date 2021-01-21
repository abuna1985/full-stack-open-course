import Header from '../Header';
import Content from '../Content';

const Course = ({courses}) => {
  
  return (
    <>
      {courses.map(({name, id, parts}) => {
        return (
          <div key={id}>
            <Header>{name}</Header>
            <Content parts={parts} />
          </div>
        )
      })}
    </>
  );
}

export default Course;