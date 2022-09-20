

export const generateMoveLabel = (xPosition, yPosition) => {

    let label = ""

    switch(xPosition) {
        case 0: label+= "A"; break;
        case 1: label+= "B"; break;
        case 2: label+= "C"; break;
        case 3: label+= "D"; break;
        case 4: label+= "E"; break;
        case 5: label+= "F"; break;
        case 6: label+= "G"; break;
        case 7: label+= "H"; break;
    }
    switch(yPosition) {
        case 0: label+= "1"; break;
        case 1: label+= "2"; break;
        case 2: label+= "3"; break;
        case 3: label+= "4"; break;
        case 4: label+= "5"; break;
        case 5: label+= "6"; break;
        case 6: label+= "7"; break;
        case 7: label+= "8"; break;
    }


    return label

}


export function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  }