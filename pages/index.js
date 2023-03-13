import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import ZoniGame from "../components/ZoniGame";

export default function App() {
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    // Loads when the game starts
  }, [])

  return (
    <div>
      <div className="container">
        <h1>ZONI</h1>
        <div>High Score: {highScore}</div>
        <div>
          {options === null ? (
            <>
              <button onClick={() => setOptions(8)}>Horizontal</button>
              <button onClick={() => setOptions(5)}>Vertical</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const prevOptions = options
                  setOptions(null)
                  setTimeout(() => {
                    setOptions(prevOptions)
                  }, 5)
                }}
              >
                Start Over
              </button>
              <button onClick={() => setOptions(null)}>Main Menu</button>
            </>
          )}
        </div>
      </div>

      {options ? (
        <ZoniGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <h2>Choose an arrangement to begin!</h2>
      )}
          <style jsx global>
  {`
    body {
      text-align: center;
      font-family: -apple-system, sans-serif;
    }
    .container {
      width: 1060px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    button {
      background: #00ad9f;
      border-radius: 4px;
      font-weight: 700;
      color: #fff;
      border: none;
      padding: 7px 15px;
      margin-left: 8px;
      cursor: pointer;
    }
    button:hover {
      background: #008378;
    }
    button:focus {
      outline: 0;
    }
    #cards {
      width: ${130+150*(options-1)}px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
    }
    .card {
      width: 130px;
      height: 94px;
      margin-bottom: 20px;
    }
    .card:not(:nth-child(${options}n)) {
      margin-right: 20px;
    }

    .c {
      position: absolute;
      max-width: 130px;
      max-height: 94px;
      width: 50ch;
      height: 50ch;
      cursor: pointer;
      border-radius: 12px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      will-change: transform, opacity;
    }

    .front,
    .back {
      background-size: cover;
    }

    .back {
      background-image: url(cards/back.png);
    }

    .front {
      background-image: url(cards/ZONI-.png);
      background-color: white;
    }
  `}
      </style>
          </div>
  )
}
