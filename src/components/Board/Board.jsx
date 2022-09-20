import React from 'react'
import "./board.css"
import { Square } from '../Square/Square'
import { LetterBar } from './LetterBar'
import { NumberBar } from './NumberBar'
import { useRef } from 'react'
import { InnerBoard } from './InnerBoard'
import {checkMove} from './rules'
import {generateMoveLabel, isEmpty} from "../generateMoveLabel"

//setting the parameters for creating the board
 const x = ["a", "b", "c", "d", "e", "f", "g", "h"]
 const y = ["1","2","3","4","5","6","7","8"]

 let gameOver = false;
 
 
export const Board = (props) => {

  const {pieces, setPieces, setTableMoves, tableMoves, setMoveLog, moveLog, setWinner} = props

  //storing all potential pieces with their locations, types and colors in a state variable


  //when the "New Simulation" button is pressed
  const startAgain = () => {

    setMoveLog([])
    setWinner("CHESS")

    //stopping the previous game and resetting the table
    gameOver = true
    let newTableMoves = []
    setTableMoves(newTableMoves)
    

   //randomly choosing positions for each of the 6 starting pieces
   let newPieces = []
   newPieces.push(
    {image: "./assets/images/bishop_b.png", x: Math.floor(Math.random()*8), y: Math.floor(Math.random()*8), type: "bishop", color: "black" },
    {image: "./assets/images/bishop_w.png", x: Math.floor(Math.random()*8), y: Math.floor(Math.random()*8), type: "bishop", color: "white" },
    {image: "./assets/images/knight_b.png", x: Math.floor(Math.random()*8), y: Math.floor(Math.random()*8), type: "knight", color: "black" },
    {image: "./assets/images/knight_w.png", x: Math.floor(Math.random()*8), y: Math.floor(Math.random()*8), type: "knight", color: "white" },
    {image: "./assets/images/queen_b.png", x: Math.floor(Math.random()*8), y: Math.floor(Math.random()*8), type: "queen", color: "black" },
    {image: "./assets/images/queen_w.png", x: Math.floor(Math.random()*8), y: Math.floor(Math.random()*8), type: "queen", color: "white" },
   )

   //checking if one of no two pieces are on the same square 
   let isDuplicate = false;
   newPieces.forEach(piece => {
      newPieces.forEach(checkPiece=>{
        if(piece.image!==checkPiece.image){
          if(piece.x===checkPiece.x&&piece.y===checkPiece.y) isDuplicate=true;
        }   
      })
   })
   if(isDuplicate===false) {
     setPieces(newPieces)
   }
  }

  const movePiece = (color) => {

    let isValidMove = false
    let movingPieces = []
    let movingPiece = {}
    let newPieces = []
    let capturedPiece = null
    let newPiecesCapture = []
    let newX = 0
    let newY = 0 

    //we look for moves until we find a valid one

    while ( !isValidMove ){

      
        //randomly picking a piece to move
         movingPieces = pieces.filter(piece=> piece.color===color)
         movingPiece = movingPieces[Math.floor(Math.random()*movingPieces.length)]

        if(movingPiece) {
          //randomly picking a potential new location for the piece
        newX = Math.floor(Math.random()*8)
        newY = Math.floor(Math.random()*8)
        const desiredPosition = { x: newX, y: newY}
        const initalPosition =  { x: movingPiece.x, y: movingPiece.y}
        //checking if the move fits the chosen piece
        isValidMove = checkMove(initalPosition, desiredPosition, movingPiece.color, pieces, movingPiece.type)

        //invalidating the move if the square is occupied
        movingPieces.forEach(piece=>{
          if(piece.x===newX&&piece.y===newY) {
            isValidMove = false
            }
          })

         } else { isValidMove = true }
        
       }
       
       //removing the opponent's piece if the move is a capture
       let otherPieces = pieces.filter(piece=> piece.color!==color)
       otherPieces.forEach(piece=>{
        if (piece.x===newX&&piece.y===newY) {         
          pieces.forEach((p)=>{
             if(p.x===newX&&p.y===newY) capturedPiece = p
          })

          newPiecesCapture = pieces.filter( p=> p!==capturedPiece )
        }
       })

    //save new and old position for the table
    if(movingPiece) {
      let changePiece = { fromX: movingPiece.x, fromY: movingPiece.y, toX: newX, toY: newY, type: movingPiece.type, color: movingPiece.color }
    if(!isEmpty(changePiece)){
      const moveFromLabel = generateMoveLabel(changePiece.fromX, changePiece.fromY)
      const moveToLabel = generateMoveLabel(changePiece.toX, changePiece.toY)
      const piece = changePiece.color + " " + changePiece.type
  
      const tableRow = {piece: piece, from: moveFromLabel, to: moveToLabel}

      let newTableMoves = tableMoves
      newTableMoves.push(tableRow)
      setTableMoves(newTableMoves)
  
     }
    }
    

    //updating the move log
    const newMoveLog = JSON.parse(JSON.stringify(pieces))
    setMoveLog([...moveLog, newMoveLog])

    if(movingPiece) {
      //updating the position
    movingPiece.x = newX
    movingPiece.y = newY
    //if the move was a capture, we remove the piece from the current piece array
    if(capturedPiece===null) {
    newPieces = pieces.filter(piece=> piece.image!==movingPiece.image)
    newPieces.push(movingPiece);
    setPieces(newPieces) 
    } else {
      setPieces(newPiecesCapture)
    }
    }
    

    //checking if the game should stop or not
    let blackPieces = pieces.filter(p=> p.color==="black")
    let whitePieces = pieces.filter(p=> p.color==="white")
    if(blackPieces.length===0||whitePieces.length===0) {
      gameOver = true
      if(pieces[0].color==="white") setWinner("White Wins!")
      else setWinner("Black Wins!")
    //if there are 2 bishops on different colors the game should be a draw
    } else if (   blackPieces.length===1 
               && whitePieces.length===1 
               && blackPieces[0].type==="bishop" 
               && whitePieces[0].type==="bishop"
               && (
                    //white bishop on dark square and black bishop on light square
                    (  ((whitePieces[0].x+whitePieces[0].y)%2===0) && ((blackPieces[0].x+blackPieces[0].y)%2!==0)  ) 
                    //or white bishop on light square and black bishop on dark square
                    ||
                    (  ((whitePieces[0].x+whitePieces[0].y)%2!==0) && ((blackPieces[0].x+blackPieces[0].y)%2===0)  )
                  ) ) {
      setWinner("It's a draw.")
      gameOver = true
    }

  }

  const moveWhite =  () => {
     movePiece("white")
  }
  const moveBlack =  () => {
    movePiece("black")
 }

//////// calling the 2 functions above back and forth until someone wins the game
 const whiteButton = useRef(null);
    const blackButton = useRef(null);

    const clickWhite = () => {
      whiteButton.current.click()
    }
    const clickBlack = () => {
      blackButton.current.click()
    }

    const pause = () => {
      gameOver = true
    }

    const start = () => {

      gameOver = false
      
      async function DelayedAdjust(val, delayMs) {
        const delay = (ms) => new Promise(done => setTimeout(done, ms))
        const funcs = [ clickWhite, clickBlack ]
        let index = 0
        while( !val) { 
          
          val = funcs[index](val)
          index = Number(!index)
          await delay(delayMs)
          if(gameOver) break
        }
      }
      DelayedAdjust(0, 50)

    }

////////
// (re)creating the board with the pieces currently existing in the piece array
    let board  = []
    
    for (let j = y.length-1; j>=0; j-- ){
    for(let i = 0; i<x.length; i++){
        const nr = j + i + 2
        let image = undefined
        pieces.forEach(p => {
          if(p.x === i && p.y === j){
            image = p.image;
          }
        })
       
        board.push(<Square key={`${i},${j}`} image={image} colorNr={nr}/>)
    }
}
    //rednering the board and the menu
  return (
    <>
    <div className='numberBar'><NumberBar/></div>
    <div className='boardContainer'>
      <div className='letterBar'> <LetterBar/> </div>
      <div id="board"> <InnerBoard board={board}/> </div>
      <div className='letterBar'> <LetterBar/> </div>
    </div>
    <div id='bottomNumberBar' className='numberBar'><NumberBar/></div>
    <div className='menu'>
         <button className='move' id='white' onClick={moveWhite} ref={whiteButton}> Move White </button>
         <button className='action' onClick={startAgain}> New Simulation </button>
         <button className='action' onClick={start} > Start </button>
         <button className='action' onClick={pause}> Pause </button>
         <button className='move' id='black' onClick={moveBlack} ref={blackButton}> Move Black </button>
    </div>
    </>
    
  )
}
