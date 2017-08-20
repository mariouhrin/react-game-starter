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
			let rowKey = (cell + 1) / props.columns

      return (
        <div className="row" key={rowKey}>
          {renderMatrixRow}
        </div>
      )
    }
  })

  return <div className="grid">{matrixBoard}</div>

}

export default Matrix
