 
 const samePosition = (p1, p2) => {
    return p1.x === p2.x && p1.y === p2.y;
  }

export const checkMove = (initialPosition, desiredPosition, color, boardState, type) => {
    if(type==="knight"){
     for (let i = -1; i<2; i+=2) {
        for (let j = -1; j < 2; j +=2){
            
            if (desiredPosition.y - initialPosition.y === 2*i) {
                if(desiredPosition.x - initialPosition.x === j) {
                   return true
                }
            }

            if (desiredPosition.x - initialPosition.x === 2*i) {
                if(desiredPosition.y - initialPosition.y ===j) {
                    return true
                }
            }

        }
    }
  } else if (type==="queen") {

    for(let i = 1; i < 8; i++) {
        //Diagonal
        let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
        let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;
  
        let passedPosition = {x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY)};
  
        if(samePosition(passedPosition, desiredPosition)) {
          return true
        } else {
          //break;
        }
      }

  } else if (type==="bishop") {
    for(let i = 1; i < 8; i++) {
        //Up right movement
        if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
          let passedPosition = {x: initialPosition.x + i, y: initialPosition.y + i};
          //Check if the tile is the destination tile
          if(samePosition(passedPosition, desiredPosition)) {
            //Dealing with destination tile
            return true
          } else {
            //Dealing with passing tile
            break;
          }
        }
          
        //Bottom right movement
        if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
          let passedPosition = {x: initialPosition.x + i, y: initialPosition.y - i};
          //Check if the tile is the destination tile
          if(samePosition(passedPosition, desiredPosition)) {
            //Dealing with destination tile
            return true
          } else {
           break
          }
        }
  
        //Bottom left movement
        if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
          let passedPosition = {x: initialPosition.x - i, y: initialPosition.y - i};
          //Check if the tile is the destination tile
          if(samePosition(passedPosition, desiredPosition)) {
            //Dealing with destination tile
            return true
          } else {
            //break
          }
        }
  
        //Top left movement
        if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
          let passedPosition = {x: initialPosition.x - i, y: initialPosition.y+i};
          //Check if the tile is the destination tile
          if(samePosition(passedPosition, desiredPosition)) {
            //Dealing with destination tile
            return true
          } else {
            //break
          }
        }
      }
  }
    return false
}
