import React from 'react'


const playAgainButton = (props) => {

  if (props.gameState === "start" && props.gameInstance === 1) {
    return (
      <button className="button--play" onClick={props.startGame}>
        &#9654; Play !
      </button>
    )
  }

  if (props.gameState === "won") {
    return (
      <button className="button--play" onClick={() => props.createNewGame("won")}>
        Next Level
      </button>
    )
  }

  if (props.gameState === "lost") {
    return (
      <button className="button--play" onClick={() => props.createNewGame("lost")}>
        Play Again
      </button>
    )
  }

}

const remainingCells = (props) => {

  if (props.gameState === "recall") {
    return (
      <div>
        Cells left: {props.activeCellsCount -  props.guessTrue.length}
      </div>
    )
  }

}

const gameStateAliases = () => {

  return {
    ready: "Get Ready",
    memorize: "Memorize",
    recall: "Recall",
    won: "Very Good !",
    lost: "Game Over !"
  }

}

const Footer = (props) => {

  const gameStates = gameStateAliases()

  return (
    <div>
      <h2>
        {gameStates[props.gameState]}
        {remainingCells(props)}
      </h2>
      {playAgainButton(props)}
    </div>
  )

}

export default Footer
