import React, { useEffect, useState } from 'react';
import './App.css';
import rockEmoji from '/rock-emoji.png';
import paperEmoji from '/paper-emoji.png';
import scissorEmoji from '/scissors-emoji.png';

function App() {
  const [score, setScore] = useState({
    wins: 0,
    losses: 0,
    ties: 0,
  });
  const [result, setResult] = useState('')
  const [playerMove, setPlayerMove] = useState('');
  const [computerMove, setComputerMove] = useState('');

  const handleReset = () => {
    setScore({
      wins: 0,
      losses: 0,
      ties: 0,
    })
  }

  const handleKeyDown = (event) => {
    const moveMapping = {
      r: 'rock',
      p: 'paper',
      s: 'scissors',
    };

    const move = moveMapping[event.key];
    if (move) {
      handleButtonClick(move);
    } else if (event.key == ' '){
      handleReset();
    }
  };

  const handleButtonClick = (move) => {
    setPlayerMove(move);
    const pickedMove = pickComputerMove();
    setComputerMove(pickedMove);
    if(pickedMove === computerMove && move === playerMove) updateScore('tie');
  }

  useEffect(() => {
    if(playerMove === '' || computerMove === '') return;
    const playGame = () => {

      if(playerMove === 'rock'){
        if(computerMove === 'rock'){
          updateScore('tie');
        } else if(computerMove === 'paper'){
          updateScore('loss');
        } else {
          updateScore('win');
        }
      } else if(playerMove === 'paper'){
        if(computerMove === 'rock'){
          updateScore('win');
        } else if(computerMove === 'paper'){
          updateScore('tie');
        } else {
          updateScore('loss');
        }
      } else {
        if(computerMove === 'rock'){
          updateScore('loss');
        } else if(computerMove === 'paper'){
          updateScore('win');
        } else {
          updateScore('tie');
        }
      }
    }
    playGame();
  }, [playerMove, computerMove]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const updateScore = (outcome) => {
    setScore((prevScore) => {
      let updatedScore = { ...prevScore };

      if (outcome === 'win') {
        updatedScore.wins += 1;
      } else if (outcome === 'loss') {
        updatedScore.losses += 1;
      } else if (outcome === 'tie') {
        updatedScore.ties += 1;
      }

      return updatedScore;
    });
  };

  const pickComputerMove = () => {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

    return computerMove;
  };


  return (
    <>
      <p className="title">Rock Paper Scissors</p>
      <button className="move-button js-rock-button" onClick={() => handleButtonClick('rock')}>
        <img src={rockEmoji} className="move-icon" alt="Rock" />
      </button>

      <button className="move-button js-paper-button" onClick={() => handleButtonClick('paper')}>
        <img src={paperEmoji} className="move-icon" alt="Paper" />
      </button>

      <button className="move-button js-scissors-button" onClick={() => handleButtonClick('scissors')}>
        <img src={scissorEmoji} className="move-icon" alt="Scissors" />
      </button>

      <p className="js-result result">{result}</p>
      <p className="js-moves">
        {playerMove && (
          <>
            You
            <img src={`/${playerMove}-emoji.png`} className="move-icon" alt={playerMove} />
            <img src={`/${computerMove}-emoji.png`} className="move-icon" alt={computerMove} />
            Computer
          </>
        )}
      </p>

      <p className="js-score score">{`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`}</p>

      <button className="reset-score-button js-reset-score-button" onClick={handleReset}>
        Reset Score
      </button>
    </>
  );
}

export default App;
