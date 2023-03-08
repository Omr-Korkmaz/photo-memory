import { useEffect, useState } from "react";
import "./App.css";

import SingleCard from "./components/SingleCard";

const sebze = [
  { src: "./image/cucumber.png", matched: false },
  { src: "./image/mushroom.png", matched: false },
  { src: "./image/okra.png", matched: false },
  { src: "./image/onion.png", matched: false },
  { src: "./image/pea.png", matched: false },
  { src: "./image/potato.png", matched: false },
];

const animal = [
  { src: "./image/camel.png", matched: false },
  { src: "./image/cat.png", matched: false },
  { src: "./image/cow.png", matched: false },
  { src: "./image/dog.png", matched: false },
  { src: "./image/horse.png", matched: false },
  { src: "./image/parrot.png", matched: false },
];
function App() {
  const [options, setOptions] = useState(sebze)
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
  
    // shuffle cards for new game
    const shuffleCards = async (value) => {
     setOptions(value);
     
      const shuffledCards = [...options, ...options]
        .sort(() => Math.random() - 0.5)
        .map(card => ({ ...card, id: Math.random() }))
        setCards(shuffledCards)
        
      setChoiceOne(null)
      setChoiceTwo(null)
      
      setTurns(0)
    }

const sebzeFunction =  ()=>{

 shuffleCards(sebze);
}
const AnimalFunction =  ()=>{
 
  shuffleCards(animal);
 }

  
    // handle a choice
    const handleChoice = (card) => {
      console.log(card)
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }
  
    // compare 2 selected cards
    useEffect(() => {
      if (choiceOne && choiceTwo) {
        setDisabled(true)
  
        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true }
              } else {
                return card
              }
            })
          })
          resetTurn()
        } else {
          setTimeout(() => resetTurn(), 1000)
        }
  
      }
    }, [choiceOne, choiceTwo])
  
    // reset choices & increase turn
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    }
  
    // start new game automagically
    useEffect(() => {
      shuffleCards()
    }, [])
  
    return (
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={ AnimalFunction}>Animal Game</button>
        <button onClick={ sebzeFunction}>sebzeFunction</button>

        <form action="">
  <label for="cars">Choose a car:</label>
  <select name="select" id="animal">
    <option value="animal">animal</option>
    <option value="sebze">sebzeFunction</option>
 
  </select>

  <input onClick={AnimalFunction}  type="submit" value="Submit " />
  <input onClick={sebzeFunction}  type="submit" value="Submit " />
</form>




  
        <div className="card-grid">
          {cards.map(card => (
            <SingleCard 
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
  
        <p>Turns: {turns}</p>
      </div>
    );
  }
export default App;
