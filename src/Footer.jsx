import React from 'react'


const playButton = (props) => {

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
      <div className="v-space">
        Remaining cells: {props.activeCellsCount -  props.correctGuess.length}
      </div>
    )
  }

}


const renderScore = (props) => {
	if (props.gameState === "lost") {
		return (
			<div className="v-space">
				Your Score: {props.score}
			</div>
		)
	}
}


const gameStateAliases = () => ({
    ready: "Get Ready",
    memorize: "Memorize",
    recall: "Try to recall",
    won: "Very Good !",
    lost: "Game Over !"
})


const Footer = (props) => {

  const gameStates = gameStateAliases()

  return (
    <div>
      <h2>
        {gameStates[props.gameState]}
      	{remainingCells(props)}
				{renderScore(props)}
      </h2>
      {playButton(props)}
    </div>
  )

}

export default Footer
