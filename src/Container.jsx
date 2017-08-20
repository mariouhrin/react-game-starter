import React from 'react'
import '../styles/index.scss'

import Game from "./Game"


class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameInstance: 1,
      columns: 3,
      rows: 3,
			score: 0
    }

		this.falseGuessStore = []
		this.scoreStorage = []
		this.trueGuessStore = []

		this.calculateScore = this.calculateScore.bind(this)
    this.createNewGame = this.createNewGame.bind(this)

  }


  createNewGame(gameResult) {

    let { rows, columns, gameInstance } = this.state
		let { maxCellsInRow } = this.props

    gameInstance = gameInstance + 1

    if (gameResult === "won" && columns < maxCellsInRow) {
      rows = rows + 1
      columns = columns + 1
    }

    if (gameResult === "lost") {
      rows = 3
      columns = 3
    }

    this.setState({ rows, columns, gameInstance })

  }


	calculateScore({ correctGuess, incorrectGuess, gameState, rows }) {

		if (gameState === "won") {

			// calculate points for correct and incorrect guesses
			const trueGuessPoints =  correctGuess.length * this.props.correctGuessPoints
			const falseGuessPoints = incorrectGuess.length * this.props.incorrectGuessPoints

			// calculate final score and save it to the storage
			const score = trueGuessPoints - falseGuessPoints + this.props.bonusScore[rows]
			this.scoreStorage.push(score)
			console.log('rows', rows)
			console.log(this.props.bonusScore[rows])
			console.log('true', this.scoreStorage)

		}

		if (gameState === "lost" && rows > 3) {

			// add to final score only points for correct guesses
			const trueGuessPoints = correctGuess.length * this.props.correctGuessPoints
			this.scoreStorage.push(trueGuessPoints)
			console.log('false', this.scoreStorage)

			// final score for rendering in Footer component
			const finalScore = this.scoreStorage.reduce((a, b) => a + b)
			this.setState({ score: finalScore})

			// clear score storage for new game instance
			this.scoreStorage = []

		}

		if (gameState === "lost" && rows === 3) {
			this.setState({ score: 0 })
		}

	}


  render() {

    let activeCellsCount = this.state.rows + 1

    return (
      <div>
        <Game
					{...this.state}
          key={this.state.gameInstance}
          activeCellsCount={activeCellsCount}
          createNewGame={this.createNewGame}
					calculateScore={this.calculateScore}
					renderScore={this.renderScore}
        />
      </div>
    );
  }
}


Container.defaultProps = {
	maxCellsInRow: 8,
	bonusScore: {
		"3": 100,
		"4": 300,
		"5": 600,
		"6": 1000,
		"7": 1500,
		"8": 2500
	},
	correctGuessPoints: 20,
	incorrectGuessPoints: 40
}

export default Container
