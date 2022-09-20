import React from 'react'
import "./scoretable.css"

export const ScoreTable = (props) => {
  const {tableMoves, moveLog, setPieces, setTableMoves} = props

  const clickTable = (idx) => {
     setPieces(moveLog[idx+1])
     let newTableMoves = []
     for(let i = 0; i<tableMoves.length; i++ ) {
      if(i<=idx) newTableMoves.push(tableMoves[i])
     }
    setTableMoves(newTableMoves)     
  }

  return (
    <div className='table' >
      
      <table>
          <thead>
            <tr>
              <th>Piece</th>
              <th>from</th>
              <th>to</th>
            </tr>
          </thead>
          <tbody>
             {
              tableMoves.map((move, idx)=> (
                <tr onClick={()=>clickTable(idx)}>
                   <td>{move.piece}</td>
                   <td className='data'>{move.from}</td>
                   <td className='data'>{move.to}</td>
                </tr>
              ))
             }
          </tbody>
        </table>

    </div>
    
  )
}
