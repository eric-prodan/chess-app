import React from 'react'
import "./navbar.css"

export const Navbar = (props) => {
    const {pieces, winner} = props

    let blackBishop = false;
    let blackQueen = false;
    let blackKnight = false;
    let whiteBishop = false;
    let whiteQueen = false;
    let whiteKnight = false;

    pieces.forEach(piece => {
      switch(piece.image) {
        case './assets/images/bishop_b.png' : blackBishop = true; break;
        case './assets/images/queen_b.png'  : blackQueen  = true; break;
        case './assets/images/knight_b.png' : blackKnight = true; break;
        case './assets/images/bishop_w.png' : whiteBishop = true; break;
        case './assets/images/queen_w.png'  : whiteQueen = true; break;
        case './assets/images/knight_w.png' : whiteKnight = true; break;
      }
    });

  return (
    <> 
     <div className='nav'>
      <div className="scoreIcons">
        {blackBishop ? <img src='./assets/images/bishop_b.png'></img> : <img src='./assets/images/bishop_b_x.png'></img>}
        {blackQueen  ? <img src='./assets/images/queen_b.png'></img>  : <img src='./assets/images/queen_b_x.png'></img>}
        {blackKnight ? <img src='./assets/images/knight_b.png'></img> : <img src='./assets/images/knight_b_x.png'></img>}
      </div>
      <div className='navbar'>{winner}</div>
      <div className="scoreIcons">
        {whiteBishop ? <img src='./assets/images/bishop_w.png'></img> : <img src='./assets/images/bishop_w_x.png'></img>}
        {whiteQueen  ? <img src='./assets/images/queen_w.png'></img>  : <img src='./assets/images/queen_w_x.png'></img>}
        {whiteKnight ? <img src='./assets/images/knight_w.png'></img> : <img src='./assets/images/knight_w_x.png'></img>}
      </div>
     </div>
    </>
    
  )
}
