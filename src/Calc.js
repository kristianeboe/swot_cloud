import React from 'react'

const Calc = (props) => {

  const { strengths, weaknesses, opportunities, threats } = props
  console.log(props)
  console.log(strengths)
  strengths.reduce((accumulator, currentValue)=> {
    console.log(accumulator)
    console.log(currentValue)
    return accumulator.weight + currentValue.weight
  })
  var positives = strengths.reduce((accumulator, currentValue)=>accumulator.weight + currentValue.weight, 0) // + opportunities.reduce((accumulator, currentValue) => accumulator.weight + currentValue.weight, 0)
  var negatives = weaknesses.reduce((accumulator, currentValue) => accumulator.weight + currentValue.weight, 0)// + threats.reduce((accumulator, currentValue) => accumulator.weight + currentValue.weight, 0)
  var calc = positives - negatives
  console.log(positives, negatives, calc)
  return (
    <div style={{}}>
      {calc}
    </div>
  )
}

export default Calc