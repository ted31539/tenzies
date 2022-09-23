import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import Confetti from "./components/Confetti";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDices] = useState(() => getDieAry());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  function getDieAry() {
    const dieAry = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.ceil(Math.random() * 6);
      const die = {
        id: nanoid(),
        value: randomNum,
        isHeld: false,
      };
      dieAry.push(die);
    }
    return dieAry;
  }

  function renderDice() {
    return dice.map((die) => {
      return (
        <Die
          key={die.id}
          value={die.value}
          isHeld={die.isHeld}
          onClick={() => holdDice(die.id)}
        />
      );
    });
  }

  function holdDice(id) {
    setDices((preDices) => {
      return preDices.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function rollDice() {
    if (tenzies) {
      setDices(getDieAry());
      setTenzies(false);
      return;
    }
    setDices((preDices) => {
      return preDices.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.ceil(Math.random() * 6) };
      });
    });
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="win">
        <h2>Tenzies</h2>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-container">{renderDice()}</div>
      <button className="roll-dice-btn" type="button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
