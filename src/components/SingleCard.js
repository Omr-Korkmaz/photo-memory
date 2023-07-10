import React from 'react'
import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, disabled, cardCategory }) => {
console.log(cardCategory)
    const handleClick = () => {
        if (!disabled) {
          handleChoice(card)
        }
      }
    
      return (
        <div className="card">
          <div className={flipped ? "flipped" : ""}>
            <img className="front" src={card.src} alt="card front" />
            <img className="back" src={ cardCategory==="animal" ? "/image/animals_back.png" : "/image/vegetable_back.png"} onClick={handleClick} alt="cover" />
          </div>
        </div>
      )
    }

export default SingleCard