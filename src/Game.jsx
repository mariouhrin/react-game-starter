import React from 'react'
import sampleSize from 'lodash-es/sampleSize'

import Footer from './Footer'
import Matrix from './Matrix'


class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gameState: 'start',
      guessTrue: [],
      guessFalse: []
    }

    let totalNumOfCells = this.props.rows * this.props.columns
    this.cells = Array.from(Array(totalNumOfCells).keys())
    this.activeCells = sampleSize(this.cells, this.props.activeCellsCount)

    this.finishGame = this.finishGame.bind(this)
    this.guessStates= this.guessStates.bind(this)
    this.startGame = this.startGame.bind(this)
    this.startRecallMode = this.startRecallMode.bind(this)

  }


  startGame() {
      this.setState({ gameState: "ready" })
  }


  componentDidMount() {

    if (this.props.gameInstance > 1) {
      this.setState({ gameState: "ready" })
    }

  }


  componentDidUpdate() {

    if (this.state.gameState === "ready") {
      this.memorizedTimer = setTimeout(() => this.setState({ gameState: "memorize" }, () => {
        this.recallTimer = setTimeout(this.startRecallMode, 1000)
      }), 1000)
    }

  }


  guessStates({ isCellActive, cellID }) {

    let { guessTrue, guessFalse, gameState } = this.state

    if (isCellActive) {
        guessTrue.push(cellID)
        if (guessTrue.length === this.props.activeCellsCount) {
          gameState = this.finishGame("won")
        }
    }
    else {
        guessFalse.push(cellID)
        if (guessFalse.length > this.props.maxWrongGuess) {
          gameState = this.finishGame("lost")
        }
    }

    this.setState({ guessTrue, guessFalse, gameState })

  }


  startRecallMode() {

    this.setState({ gameState: "recall" }, () => {

      let gameTimeLimit = this.props.timeLimit

      this.gameInterval = setInterval(() => {
        if (--gameTimeLimit === 0 ) {
          this.setState({ gameState: this.finishGame("lost")})
        }
      }, 1000)
    })

  }


  componentWillUnmount() {

    clearTimeout(this.memorizedTimer)
    clearTimeout(this.recallTimer)
    this.finishGame()

  }


  finishGame(gameState) {

    clearInterval(this.gameInterval)
    return gameState

  }


  render() {

    // do the calculations only once and pass it to the Cell component
    let showActiveCells = ["memorize", "lost"].indexOf(this.state.gameState) !== -1

    // check current gameState for Container component
    this.props.checkGameState(this.state.gameState)

    return (
      <div className="grid">
        <Matrix
          {...this.state}
          activeCells={this.activeCells}
          cells={this.cells}
          columns={this.props.columns}
          guessStates={this.guessStates}
          showActiveCells={showActiveCells}
        />
        <Footer
          {...this.state}
          activeCellsCount={this.props.activeCellsCount}
          createNewGame={this.props.createNewGame}
          gameInstance={this.props.gameInstance}
          startGame={this.startGame}
        />
      </div>
    )
  }
}


Game.defaultProps = {
  maxWrongGuess: 2,
  timeLimit: 10
}

export default Game
