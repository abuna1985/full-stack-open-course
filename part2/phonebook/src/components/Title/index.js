const Title = ({type, children}) => {
  if (type === "h3") {
    return <h3>{children}</h3>;
  } else if (type === "h2") {
    return <h2>{children}</h2>;
  }

  return <h1>{children}</h1>;
}

export default Title;