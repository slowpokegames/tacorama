import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import Head from 'next/head';
import TacoramaGame from "../components/TacoramaGame";

export default function App() {
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    // Loads when the game starts
  }, [])

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height"></meta>
      </Head>
      <div className="container">
        <h1>Tacorama</h1>
        <div>High Score: {highScore}</div>
        <div>
          {options === null ? (
            <>
              <button onClick={() => setOptions(5)}>Easy</button>
              <button onClick={() => setOptions(4)}>Medium</button>
              <button onClick={() => setOptions(3)}>Hard</button>
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
        <TacoramaGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <div>
        <h2>Choose a difficulty to begin!</h2>
          <img src="cards/rules.png" className="rules"></img>
        </div>
      )}
          <style jsx global>
  {`
    body {
      text-align: center;
      font-family: -apple-system, sans-serif;
    }
    .container {
      width: 90%;
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
    .rules {
      width: auto;
      height: auto;
    }
    #cards {
      width: ${220+250*(options-1)}px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
    }
    .card {
      width: 220px;
      height: 300px;
      margin-bottom: 30px;
    }
    .card:not(:nth-child(${options}n)) {
      margin-right: 30px;
    }

    .c {
      position: absolute;
      max-width: 220px;
      max-height: 300px;
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
      background-image: url(cards/001.png);
      background-color: white;
    }
  `}
      </style>
          </div>
  )
}
