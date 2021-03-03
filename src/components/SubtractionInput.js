import React, { useState } from 'react'

const SubtractionInput = ({ subtractFromTotal, subtractionList, setSubtractionList, setIsSubtracted}) => {
  const [subtractionInput, setSubtractionInput] = useState([])

  const handleSubInput = (e) => {
    const value = e.target.value
    setSubtractionInput([...subtractionInput, value])
  }

  const inputSubmit = () => {
    const sqFtOfReduced = subtractionInput.reduce((acc, dimension) => acc * dimension)
    setSubtractionList([...subtractionList, sqFtOfReduced])
    subtractFromTotal(sqFtOfReduced)
    setIsSubtracted(false)
  }

  return (
    <div onChange={handleSubInput} >
      <input 
        type="number"
        className="subtraction-input"
        name="height-subtraction" 
        placeholder="height" 
        required
      />
      <input 
      type="number"
        className="subtraction-input"
        name="width-subtraction" 
        placeholder="width" 
        required
      />
      <input type="button" value="+ subtraction" onClick={inputSubmit}/>
    </div>
  )
}

export default SubtractionInput
