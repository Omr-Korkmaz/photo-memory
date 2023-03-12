import { useEffect, useState } from "react";
import "./App.css";
import category from "./components/Categories.json";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import SingleCard from "./components/SingleCard";

function App() {
  const [cardCategory, setCardCategory] = useState('');

  const [options, setOptions] = useState(category.animal);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...options, ...options]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);

    setChoiceOne(null);
    setChoiceTwo(null);

    setTurns(0);
  };




  const handeCategory = (e) => {
    setCardCategory(e.target.value);
    if (e.target.value === "animal") {
      setOptions(category.animal);
    } else if (e.target.value === "sebze") {
      setOptions(category.sebze);
    }
  };

  // handle a choice
  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start new game automagically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Memory</h1>


<Box sx={{display:'flex',  justifyContent:'center', alignItems:'center', gap:'10px', m:'20px'}}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cardCategory}
          label="cardCategory"
          onChange={handeCategory}
        >
          <MenuItem value="sebze">vegetable</MenuItem>
          <MenuItem value="animal">animal</MenuItem>
        </Select>
      </FormControl>
    </Box>



      {/* <select onChange={handeCategory}>
        <option value="sebze"> vegetable</option>
        <option value="animal"> animal</option>
      </select> */}
      <Button onClick={shuffleCards} variant="contained">Start Game</Button>
      </Box>
      <div className="card-grid">
        {cards.map((card) => (
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
