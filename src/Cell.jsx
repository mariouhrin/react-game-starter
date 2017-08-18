import React from 'react';

const isGuessCorrect = (props) => {

  if (props.guessTrue.indexOf(props.id) !== -1) {
    return true
  }
  if (props.guessFalse.indexOf(props.id) !== -1) {
    return false
  }

}

const handleCellClick = (props, isCellActive) => {

  if (props.gameState == "recall" && isGuessCorrect(props) === undefined) {
    props.guessStates({
      isCellActive,
      cellID: props.id
    })
  }

}

const Cell = (props) => {

  let cellStyle = "cell"
  let isCellActive = props.activeCells.indexOf(props.id) !== -1

  if (props.showActiveCells && isCellActive) {
    cellStyle = "cell active"
  }
  if (isGuessCorrect(props) !== undefined) {
    cellStyle = `cell guess-${isGuessCorrect(props)}`
  }

  return (
    <div
      className={cellStyle}
      onClick={() => handleCellClick(props, isCellActive)}>
    </div>
  )
}


export default Cell
