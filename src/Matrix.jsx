import React from 'react'

import Cell from './Cell'


const Matrix = (props) => {

  let matrixRow = []

  const matrixBoard = props.cells.map( cell => {

    matrixRow.push(cell)

    if (matrixRow.length === props.columns) {

      const renderMatrixRow = matrixRow.map( cellOfRow => (

        <Cell
          key={cellOfRow}
          id={cellOfRow}
          {...props}
        />

      ))

      matrixRow = []

      return (
        <div className="row" key={cell+1}>
          {renderMatrixRow}
        </div>
      )
    }
  })

  return <div className="grid" key="1">{matrixBoard}</div>

}

export default Matrix
