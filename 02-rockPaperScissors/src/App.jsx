import React, { useEffect, useState } from "react";
import "./App.css";
import rockEmoji from "/rock-emoji.png";
import paperEmoji from "/paper-emoji.png";
import scissorsEmoji from "/scissors-emoji.png";

function App() {
  const [score, setScore] = useState({
    wins: 0,
    losses: 0,
    ties: 0,
  });

  const [playerMove, setPlayerMove] = useState(null);
  const [computerMove, setComputerMove] = useState(null);

  const handleKeyDown = (event) => {
    const moveMapping = {
      r: "rock",
      p: "paper",
      s: "scissors",
    };

    const move = moveMapping[event.key];
    if (move) {
      handleButtonClick(move);
    } else if (event.key === " ") {
      handleReset();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleReset = () => {
    setScore({
      wins: 0,
      losses: 0,
      ties: 0,
    });
    setPlayerMove(null);
    setComputerMove(null);
  };

  const handleButtonClick = (move) => {
    setPlayerMove(move);
    const pickedMove = pickComputerMove();
    setComputerMove(pickedMove);
    determineWinner(move, pickedMove);
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      updateScore("tie");
    } else if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      updateScore("win");
    } else {
      updateScore("loss");
    }
  };

  const updateScore = (outcome) => {
    setScore((prevScore) => {
      return {
        ...prevScore,
        [outcome === "win" ? "wins" : outcome === "loss" ? "losses" : "ties"]:
          prevScore[
            outcome === "win" ? "wins" : outcome === "loss" ? "losses" : "ties"
          ] + 1,
      };
    });
  };

  const pickComputerMove = () => {
    const moves = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  };

  return (
    <div className="App">
      <p className="title">Rock Paper Scissors</p>

      <div className="moves-container">
        <button
          className="move-button js-rock-button"
          onClick={() => handleButtonClick("rock")}
        >
          <img src={rockEmoji} className="move-icon" alt="Rock" />
        </button>
        <button
          className="move-button js-paper-button"
          onClick={() => handleButtonClick("paper")}
        >
          <img src={paperEmoji} className="move-icon" alt="Paper" />
        </button>
        <button
          className="move-button js-scissors-button"
          onClick={() => handleButtonClick("scissors")}
        >
          <img src={scissorsEmoji} className="move-icon" alt="Scissors" />
        </button>
      </div>

      {playerMove && computerMove && (
        <p className="js-moves">
          You
          <img
            src={`/${playerMove}-emoji.png`}
            className="move-icon"
            alt={playerMove}
          />
          vs.
          <img
            src={`/${computerMove}-emoji.png`}
            className="move-icon"
            alt={computerMove}
          />
          Computer
        </p>
      )}

      <p className="js-result result">
        {playerMove && computerMove && (
          <>
            Result:{" "}
            {playerMove === computerMove
              ? "Tie"
              : playerMoveWin(playerMove, computerMove)
              ? "You Win!"
              : "Computer Wins!"}
          </>
        )}
      </p>

      <p className="js-score score">{`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`}</p>

      <button
        className="reset-score-button js-reset-score-button"
        onClick={handleReset}
      >
        Reset Score
      </button>
    </div>
  );
}

export default App;

const playerMoveWin = (player, computer) => {
  return (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  );
};
