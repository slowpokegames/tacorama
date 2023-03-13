import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import Card from "./Card.js";

function ZoniGame({options, setOptions, highScore, setHighScore}) {
    const [game, setGame] = useState([])
    const [selectedCount, setSelectedCount] = useState(0)
    const [selectedIndexes, setSelectedIndexes] = useState([])
    const [shown, setShown] = useState([])
    const [topOfDeck, setTopOfDeck] = useState(0)
    const [score, setScore] = useState(0)
    
    let cardIds = ["I-",    "N-I",   "N-",    "NI-",   "O-NI",  "O-N",   "OI-N",  "O-I",   "O-",    "OI-",
                   "ON-I",  "ON-",   "ONI-",  "Z-ONI", "Z-ON",  "ZI-ON", "Z-OI",  "Z-O",   "ZI-O",  "ZN-OI",
                   "ZN-O",  "ZNI-O", "Z-NI",  "Z-N",   "ZI-N",  "Z-I",   "Z-",    "ZI-",   "ZN-I",  "ZN-",
                   "ZNI-",  "ZO-NI", "ZO-N",  "ZOI-N", "ZO-I",  "ZO-",   "ZOI-",  "ZON-I", "ZON-",  "ZONI-"];

    useEffect(() => {
        const newGame = []
        for (let i = 0; i < 40; i++) {
            const c = {
                cardId: cardIds[i],
                selected: false,
            }
            newGame.push(c)
        }

        const shuffledGame = newGame.sort(() => Math.random() - 0.5)
        setGame(shuffledGame)
        setShown(shuffledGame.slice(0, 40))
        setTopOfDeck(40)
  }, [])

  useEffect(() => {
      if (score > highScore) {
          setHighScore(score)
      }
  }, [game])

    function reverse(str) {
      const strSplit = str.split("")
      const arrayRev = strSplit.reverse()
      return arrayRev.join("")
    }

    function encodeCard(id) {
      const hi = id.substr(0, id.indexOf("-"))
      const lo = id.substr(id.indexOf("-"))
      const z = hi.includes("Z") + lo.includes("Z")*2
      const o = hi.includes("O") + lo.includes("O")*2
      const n = hi.includes("N") + lo.includes("N")*2
      const i = hi.includes("I") + lo.includes("I")*2
      return [z, o, n, i]
    }
    function cardIsMatch(c0, c1, c2) {
      for (let i = 0; i < 3; i++) {
        if ((c0[i] + c1[i]) % 3 !== c2[i]) return false;
      }
      return true;
    }
    function isMatch(id0, id1, id2, id3) {
      const c0 = encodeCard(id0)
      const c0f = encodeCard(reverse(id0))
      const c1 = encodeCard(id1)
      const c2 = encodeCard(id2)
      const c2f = encodeCard(reverse(id2))
      const c3 = encodeCard(id3)
      const c3f = encodeCard(reverse(id3))
      return (((cardIsMatch(c0, c1, c2) || cardIsMatch(c0, c1, c2f)) &&
               (cardIsMatch(c0f, c1, c3) || cardIsMatch(c0f, c1, c3f))) ||
              ((cardIsMatch(c0f, c1, c2) || cardIsMatch(c0f, c1, c2f)) &&
               (cardIsMatch(c0, c1, c3) || cardIsMatch(c0, c1, c3f))));
    }
    if (selectedIndexes.length === 4) {
        const match = (isMatch(game[selectedIndexes[0]].cardId, game[selectedIndexes[1]].cardId,
                               game[selectedIndexes[2]].cardId, game[selectedIndexes[3]].cardId))
        
        if (match) {
            setScore(x => x + 1)
            const newGame = [...game]
            newGame[selectedIndexes[0]].selected = true
            newGame[selectedIndexes[1]].selected = true
            newGame[selectedIndexes[2]].selected = true
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
        </div>
    )
  }
}

export default ZoniGame;
