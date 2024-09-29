import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";

function imgName(cardId) {
    return "cards/"+cardId+".png"
}

function Card({
    id,
    game,
    shown,
    setShown,
    selectedCount,
    setSelectedCount,
    selectedIndexes,
    setSelectedIndexes,
    flippedIndexes,
    setFlippedIndexes,
    topOfDeck,
    setTopOfDeck,
}) {
    const [selected, setSelect] = useState(false)
    const [flipped, setFlip] = useState(false)
    const [tilted, setTilted] = useState(0)
    const {transform, opacity} = useSpring({
        opacity: flipped ? 0 : 1,
        transform: `perspective(600px) rotateX(${flipped ? 0 : 180}deg) scale(${selected ? 1.15 : 1}) rotateZ(${tilted * 5}deg)`,
        config: {mass: 5, tension: 500, friction: 80},
    })

    useEffect(() => {
        if (selectedIndexes[selectedCount] === true && selectedIndexes.indexOf(id) > -1) {
            setTimeout(() => {
                setSelect(state => !state)
                setSelectedCount(0)
                setSelectedIndexes([])
            }, 1000)
        } else if (selectedIndexes[selectedCount] === false && selectedIndexes.indexOf(id) > -1) {
            setFlip(flip => !flip)
            setSelectedCount(0)
            setSelectedIndexes([])
            setTimeout(() => {
                let sii = selectedIndexes.indexOf(id)
                if (topOfDeck + sii < 31) {
                    console.log(`TOD @ ${sii}: ` + topOfDeck)
                    shown[id].cardId = game[topOfDeck+sii].cardId
                    setShown(shown)
                    setTopOfDeck(tod => tod + 1)
                    setFlip(flip => !flip)
                    setSelect(state => !state)
                } else {
                    setSelect(state => !state)
                }
            }, 1000)
        }
    }, [selectedIndexes])

    const rejectSelection = () => {
        setTilted(3)
        setTimeout(() => setTilted(-3), 100)
        setTimeout(() => setTilted(3), 200)
        setTimeout(() => setTilted(-3), 300)
        setTimeout(() => setTilted(0), 400)
    }

    const isMatch = (thirdId) => {
        if (selectedCount >= 2) {
            let match = false;
            let x = [parseInt(game[selectedIndexes[0]].cardId[0]), parseInt(game[selectedIndexes[0]].cardId[1]), parseInt(game[selectedIndexes[0]].cardId[2])];
            let y = [parseInt(game[selectedIndexes[1]].cardId[0]), parseInt(game[selectedIndexes[1]].cardId[1]), parseInt(game[selectedIndexes[1]].cardId[2])];
            let z = [parseInt(game[thirdId].cardId[0]), parseInt(game[thirdId].cardId[1]), parseInt(game[thirdId].cardId[2])];
    
            console.log("Testing " + x + ", " + y + ", " + z);
            for (let a = 1; a < 5 && !match; a++) {
                for (let b = 1; b < 5 && !match; b++) {
                    for (let c = 1; c < 5 && !match; c++) {
                        console.log((a * x[0]) + ", " + (b * y[0]) + ", " + (c * z[0]) + "; " + (a * x[1]) + ", " + (b * y[1]) + ", " + (c * z[1]) + "; " + (a * x[2]) + ", " + (b * y[2]) + ", " + (c * z[2]) + ". " + ((a * x[0] + b * y[0]) % 5 == (c * z[0]) % 5) + " " + ((a * x[1] + b * y[1]) % 5 == (c * z[1]) % 5) + " " + ((a * x[2] + b * y[2]) % 5 == (c * z[2]) % 5));
                        if ((a * x[0] + b * y[0]) % 5 == (c * z[0]) % 5 &&
                            (a * x[1] + b * y[1]) % 5 == (c * z[1]) % 5 &&
                            (a * x[2] + b * y[2]) % 5 == (c * z[2]) % 5) {
                            return true;
                        }
                    }
                }
            }
        } else {
            return true
        }
        return false
    }
    
    const onCardClick = () => {
        if (!flipped) {
            if (!selected) {
                if (isMatch(id)) {
                    setSelect(state => true)
                    setSelectedCount(selectedCount + 1)
                    const newIndexes = [...selectedIndexes]
                    newIndexes.push(id)
                    setSelectedIndexes(newIndexes)
                } else {
                    rejectSelection()
                }
            } else {
                setSelect(state => false)
                setSelectedCount(selectedCount - 1)
                const newIndexes = selectedIndexes.filter(i => i != id)
                setSelectedIndexes(newIndexes)
            }
        }
    }

  return (
    <div onClick={onCardClick}>
      <a.div
        className="c back"
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      />
      <a.div
        className="c front"
        style={{
            opacity,
            transform: transform.interpolate(t => `${t} rotateX(180deg)`),
            "backgroundImage": "url(" + imgName(shown[id].cardId, true) + ")",
        }}
          />
    </div>
  )
}

export default Card;
