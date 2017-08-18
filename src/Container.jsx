import React from 'react'
import '../styles/index.scss'

import Game from "./Game"


class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameInstance: 1,
      rows: 3,
      columns: 3
    }

    this.createNewGame = this.createNewGame.bind(this)
    this.checkGameState = this.checkGameState.bind(this)

  }


  createNewGame(gameResult) {

    let { rows, columns, gameInstance } = this.state

    gameInstance = gameInstance + 1

    if (gameResult === "won") {
      rows = rows + 1
      columns = columns + 1
    }

    if (gameResult === "lost") {
      rows = 3
      columns = 3
    }

    this.setState({ rows, columns, gameInstance })
  }


  checkGameState(gameState) {

    let { rows, columns } = this.state

    if (gameState === "won") {
      rows = rows + 1
      columns = columns + 1
      return { rows, columns }
    }

    if (gameState === "lost") {
      rows = 3
      columns = 3
      return { rows, columns }
    }

  }


  render() {

    let activeCellsCount = this.state.rows + 1

    return (
      <div>
        <Game
          key={this.state.gameInstance}
          activeCellsCount={activeCellsCount}
          checkGameState={this.checkGameState}
          columns={this.state.columns}
          createNewGame={this.createNewGame}
          gameInstance={this.state.gameInstance}
          rows={this.state.rows}
        />
      </div>
    );
  }
}


export default Container
