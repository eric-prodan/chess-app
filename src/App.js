
import './App.css';
import { Board } from './components/Board/Board';
import { Navbar } from './components/Navbar';
import { ScoreTable } from './components/ScoreTable';
import { useState } from 'react';


function App() {

  const [tableMoves, setTableMoves] = useState([])
  const [moveLog, setMoveLog] = useState([])
  const [pieces, setPieces] = useState([{}])
  const [winner, setWinner] = useState("CHESS")

  return (
      <div id="mainBoard">
        <Navbar pieces={pieces} winner={winner}/>
        <Board pieces={pieces}
               setPieces={setPieces}
               setTableMoves={setTableMoves} 
               tableMoves={tableMoves}
               setMoveLog={setMoveLog}
               moveLog={moveLog}
               setWinner={setWinner}/>
        <ScoreTable tableMoves={tableMoves} 
                    moveLog={moveLog} 
                    setPieces={setPieces}
                    setTableMoves={setTableMoves}/>
      </div>
       
     
  );
}

export default App;
