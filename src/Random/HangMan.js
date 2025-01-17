import React, { useState, useEffect , useRef } from 'react';
import { info } from '../Random_infos/Hang_info';
import { Link } from 'react-router-dom';

import winSound from '../bravo.mp3';
import loseSound from '../lose.mp3';

const Hang = () => {

  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Use useRef to maintain audio objects
  const winAudio = useRef(new Audio(winSound));
  const loseAudio = useRef(new Audio(loseSound));

  // Select a random word and hint from the info array
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomEntry = info[Math.floor(Math.random() * info.length)];
    setWord(randomEntry.word);
    setHint(randomEntry.hint);

    // Do not reveal any letters at the start
    setGuessedLetters([]);

    setIncorrectGuesses(0);
    setGameOver(false);
    setGameWon(false);

    // Stop and reset any playing sounds
    winAudio.current.pause();
    winAudio.current.currentTime = 0; // Reset sound to the beginning
    loseAudio.current.pause();
    loseAudio.current.currentTime = 0; // Reset sound to the beginning
  };

  // Handle letter guesses
  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameOver || gameWon) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  // Check if the game is over
  useEffect(() => {
    // Check if the player has won
    const isGameWon = word.split('').every((letter) => guessedLetters.includes(letter) || letter === ' ');
    if (isGameWon && word) {
      setGameWon(true);
      setGameOver(true);
      winAudio.current.play(); // Play win sound
    }

    // Check if the player has lost
    if (incorrectGuesses >= 6) {
      setGameOver(true);
      loseAudio.current.play(); // Play lose sound
    }
  }, [guessedLetters, incorrectGuesses, word]);

  // Display the word with guessed letters and handle spaces (RTL)
  const displayWord = () => {
    return word
      .split('')
      .map((letter) => {
        if (letter === ' ') {
          return ' '; // Keep spaces as empty spaces
        }
        return guessedLetters.includes(letter) ? letter : '_';
      })
      .join(''); // No need to reverse, just join the array
  };

  // Display the hangman figure
  const hangmanFigure = () => {
    const stages = [
      `
        -----
         |
        
        
        
        
      `,
      `
        -----
         |
         O
        
        
        
      `,
      `
        -----
         |
         O
         |
        
        
      `,
      `
        -----
         |
         O
        /|
        
        
      `,
      `
        -----
         |
         O
        /|\\
        
        
      `,
      `
        -----
         |
         O
        /|\\
        /
        
      `,
      `
        -----
        |
        O
        /|\\
        / \\
      `,
    ];
    return stages[incorrectGuesses];
  };

  return (
    <div className="flex flex-col items-center lg:justify-around justify-center min-h-screen lg:flex-row bg-[#135570] p-5">
      <section className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
        <h1 className="text-4xl font-bold mb-8">لعبة Hangman</h1>
        
        {/* Display Hangman Figure (Centered) */}
        <div className="flex justify-center items-center mb-8">
          <pre className="text-center font-extrabold text-3xl">{hangmanFigure()}</pre>
        </div>

        {/* Display Word with Guessed Letters (RTL) */}
        <div className="text-4xl font-bold mb-8 gap-x-3 text-white" style={{ direction: 'rtl' }}>
          {displayWord()}
        </div>

        {/* Display Hint */}
        <div className="text-xl text-white font-semibold mb-8">💡 تلميح: {hint}</div>

        {/* Display Game Status */}
        {gameOver && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-2xl font-bold mb-8">
                {gameWon ? '🎉 لقد فزت! 🎉' : 'خسرت الكلمة كانت: ' + word}
              </div>
              <button
                onClick={resetGame}
                className="p-2 text-xl font-bold bg-green-500 text-white rounded hover:bg-green-600"
              >
                إعادة اللعبة
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Keyboard for Guessing Letters */}
      <section className='flex justify-center items-center flex-col'>
        <div className="grid grid-cols-7 gap-2 mb-8">
          {Array.from('ابتثجحخدذرزسشصضطظعغفقكلمنهويئءأإڤچؤ').map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || gameOver || gameWon}
              className={`p-2 text-2xl w-[45px] font-bold bg-blue-500 text-white rounded ${
                guessedLetters.includes(letter) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetGame}
          className="p-2 text-xl font-bold bg-green-500 text-white rounded hover:bg-green-600"
        >
          إعادة اللعبة
        </button>
      </section>

      <Link to="/Ran" className='absolute top-0 right-0 p-2 text-2xl bg-white/20 rounded'>X</Link>
    </div>
  );

}
  

export default Hang;