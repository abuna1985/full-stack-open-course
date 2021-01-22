const Filter = ({val, handleChange}) => {
  return (
    <div>
      filter shown with: <input value={val} onChange={handleChange} />
    </div>
  )
}

export default Filter;