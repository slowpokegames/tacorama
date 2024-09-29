import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import Card from "./Card.js";

function TacoramaGame({options, setOptions, highScore, setHighScore}) {
    const [game, setGame] = useState([])
    const [selectedCount, setSelectedCount] = useState(0)
    const [selectedIndexes, setSelectedIndexes] = useState([])
    const [shown, setShown] = useState([])
    const [topOfDeck, setTopOfDeck] = useState(0)
    const [score, setScore] = useState(0)
    
    let cardIds = [
        "001",
        "010", "011", "012", "013", "014",
        "100", "101", "102", "103", "104",
        "110", "111", "112", "113", "114",
        "120", "121", "122", "123", "124",
        "130", "131", "132", "133", "134",
        "140", "141", "142", "143", "144"];

    useEffect(() => {
        const newGame = []
        for (let i = 0; i < 31; i++) {
            const c = {
                cardId: cardIds[i],
                selected: false,
            }
            newGame.push(c)
        }

        const shuffledGame = newGame.sort(() => Math.random() - 0.5)
        setGame(shuffledGame)
        setShown(shuffledGame.slice(0, 2*options))
        setTopOfDeck(2*options)
  }, [])

  useEffect(() => {
      if (score > highScore) {
          setHighScore(score)
      }
  }, [game])

  if (game.length === 0) return <div>loading...</div>
  else {
    return (
            <div id="game">
              <h1>Score: {score}</h1>
            <div id="cards">
              {shown.map((card, index) => (
                      <div className="card" key={index}>
                      <Card
                  id={index}
                  cardId={card.cardId}
                  game={game}
                  shown={shown}
                  setShown={setShown}
                  selectedCount={selectedCount}
                  setSelectedCount={setSelectedCount}
                  selectedIndexes={selectedIndexes}
                  setSelectedIndexes={setSelectedIndexes}
                  topOfDeck={topOfDeck}
                  setTopOfDeck={setTopOfDeck}
                      />
                      </div>
              ))}
            </div>
            <div id="match">
              <button className="match" onClick={() => {
                    if (selectedCount > 2) {
                        setScore(x => x + 1)
                        const newGame = [...game]
                        newGame[selectedIndexes[0]].selected = true
                        newGame[selectedIndexes[1]].selected = true
                        setGame(newGame)
            
                        const newIndexes = [...selectedIndexes]
                        newIndexes.push(false)
                        setSelectedIndexes(newIndexes)
                    } else {
                        const newIndexes = [...selectedIndexes]
                        newIndexes.push(true)
                        setSelectedIndexes(newIndexes)
                    }
                }
              }>Take Match!</button>
            </div>
            <style jsx global>
{`
    .match {
      background: #00ad9f;
      border-radius: 10px;
      font-weight: 1000;
      color: #fff;
      border: none;
      padding: 17px 25px;
      margin-left: 18px;
      cursor: pointer;
      font-size: xx-large
      enabled: ${selectedIndexes.length > 2}
    }
`}
            </style>
        </div>
    )
  }
}

export default TacoramaGame;
