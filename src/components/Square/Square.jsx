import React from 'react'
import "./square.css"


export const Square = (props) => {

  const {colorNr, image} = props

    if(colorNr%2===0){
       return <div className='square black-square'>
           {image && <div className='piece' style={{backgroundImage: `url(${image})`}}></div>}
        </div>
    }else{
      return  <div className='square white-square'>
           {image && <div className='piece' style={{backgroundImage: `url(${image})`}}></div>}
        </div>
    }

}
