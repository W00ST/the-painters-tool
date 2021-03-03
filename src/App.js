import './App.css';
import { useState, useEffect } from 'react'
import SubtractionInput from './components/SubtractionInput'
import SubtractionList from './components/SubtractionList'


function App() {
  const [hwInputs, setHwInputs] = useState({})
  const [totalFootage, setTotalFootage] = useState(0)
  const [subtractionList, setSubtractionList] = useState([])
  const [isSubtracted, setIsSubtracted] = useState(false)

  const [rate, setRate] = useState(0)
  const [paintCost, setPaintCost] = useState(0)
  const [gallons, setGallons] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    findTotalCost()
  })

  const subtractFromTotal = (subtractionAmount) => {
    const newSquareFootage = totalFootage - subtractionAmount

    setTotalFootage(newSquareFootage)
  }

  const handleHWinputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    setHwInputs({...hwInputs, [name]: value})
  }

  const findSquareFeet = () => {
    const widthHeight = hwInputs.width * hwInputs.height
    const lengthHeight = hwInputs.length * hwInputs.height
      setTotalFootage(parseInt(widthHeight + lengthHeight) * 2)
  }

  const findRate = () => {
    const { rate } = hwInputs
    const newRate = (parseInt(rate) * parseInt(totalFootage))
    setRate(newRate)
  }

  const findNumOfGallons = () => {
    const { height, width, length } = hwInputs
    let totalArea = ((parseInt(width) + parseInt(length)) * 2) * parseInt(height) 
    let calcGallons = 0
    while (totalArea > 0) {
      totalArea -= 350
      calcGallons += 1
    }
    setGallons(calcGallons * 2)
  }

  const findGallonsCost = () => {
    const totalPaint = (gallons * 25)
    const totalPrimer = ((gallons / 2) * 25) 
    setPaintCost(totalPaint + totalPrimer)
  }

  const findTotalCost = () => {
    setTotalCost(rate + paintCost)
  }

  const calculate = () => {
    findSquareFeet()
    findNumOfGallons()
  }

  const calculateTotal = () => {
    findGallonsCost()
    findRate()
  }

  return (
    <div className="App">
      <div className="inputs">
        <input type="number" placeholder="length" name="length" onChange={handleHWinputs} />
        <div>ft.</div>
        <input type="number" placeholder="width" name="width" onChange={handleHWinputs} />
        <div>ft.</div>
        <input type="number" placeholder="height" name="height" onChange={handleHWinputs}  />
        <div>ft.</div>
        <input type="button" value="CALC SQ. FOOTAGE" onClick={calculate}/>
      </div>
      <div className="subtractions">
        {isSubtracted ? 
          <>
            <SubtractionInput subtractFromTotal={subtractFromTotal} subtractionList={subtractionList} setIsSubtracted={setIsSubtracted} setSubtractionList={setSubtractionList} />
          </>
          :
          <button className="subtract-button" onClick={() => setIsSubtracted(true)}>+ ADD SUBTRACTIONS FOR DOORS AND WINDOWS</button>
        }
      </div>

      <SubtractionList subtractionList={subtractionList} />
      
      <div className="info-container">
        <span className="info">{totalFootage} sq.ft.</span>
        <div>X</div>
        <div className="rate-container">
          <input type="number" placeholder="rate" name="rate" onChange={handleHWinputs} />
          <input type="button" value="ADD RATE + COST" onClick={calculateTotal} />
        </div>
        <div className="paint-container">
          <div>
            <div className="info">{gallons / 2} gal primer</div>
            <div className="info">{gallons} gal paint</div>
          </div>
          <div>X</div>
          <div>$25 per gallon</div>
        </div>
          <div className="small-print">[ 350 square feet per gallon ]</div>
      </div>
      <div className="totals">
        <div>cost of work </div>
        <div>$ {rate} </div>
        <div>estimate cost of paint </div>
        <div>$ {paintCost}</div>
        <div>total estimate </div>
        <div>$ {totalCost}</div>
      </div>
    </div>
  );
}

export default App;