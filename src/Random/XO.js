import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [playerNames, setPlayerNames] = useState({ player1: "", player2: "" });
  const [gameMode, setGameMode] = useState("twoPlayers"); // 'twoPlayers' or 'singlePlayer'
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], winningCells: [a, b, c] };
      }
    }
    return { winner: null, winningCells: [] };
  };

  const isBoardFull = (currentBoard) => {
    return currentBoard.every((cell) => cell !== null);
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const { winner: currentWinner, winningCells } = checkWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      updateScores(currentWinner);
      highlightWinningCells(winningCells);
    } else if (isBoardFull(newBoard)) {
      setWinner("draw");
    } else {
      setIsXNext(!isXNext);
    }
  };

  useEffect(() => {
    if (gameMode === "singlePlayer" && !isXNext && !winner) {
      // AI's turn with a delay of 1-2 seconds
      const delay = Math.random() * 1000 + 1000; // Random delay between 1 and 2 seconds
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const bestMove = minimax(newBoard, "O").index;
        newBoard[bestMove] = "O";
        setBoard(newBoard);

        const { winner: currentWinner, winningCells } = checkWinner(newBoard);
        if (currentWinner) {
          setWinner(currentWinner);
          updateScores(currentWinner);
          highlightWinningCells(winningCells);
        } else if (isBoardFull(newBoard)) {
          setWinner("draw");
        } else {
          setIsXNext(true); // Switch back to player's turn
        }
      }, delay);

      // Cleanup the timer if the component unmounts or the state changes
      return () => clearTimeout(timer);
    }
  }, [board, isXNext, winner, gameMode]);

  const updateScores = (currentWinner) => {
    if (currentWinner === "X") {
      setScores({ ...scores, player1: scores.player1 + 1 });
    } else if (currentWinner === "O") {
      setScores({ ...scores, player2: scores.player2 + 1 });
    }
  };

  const highlightWinningCells = (winningCells) => {
    winningCells.forEach((cell) => {
      document.getElementById(`cell-${cell}`).classList.add("bg-yellow-300");
    });
  };

  const minimax = (currentBoard, player) => {
    const availableMoves = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((cell) => cell !== null);

    const { winner: currentWinner } = checkWinner(currentBoard);
    if (currentWinner === "X") {
      return { score: -10 };
    } else if (currentWinner === "O") {
      return { score: 10 };
    } else if (availableMoves.length === 0) {
      return { score: 0 };
    }

    const moves = [];
    for (let move of availableMoves) {
      const newBoard = [...currentBoard];
      newBoard[move] = player;

      const result = minimax(newBoard, player === "O" ? "X" : "O");
      moves.push({
        index: move,
        score: result.score,
      });
    }

    let bestMove;
    if (player === "O") {
      let bestScore = -Infinity;
      for (let move of moves) {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let move of moves) {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    }

    return bestMove;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.classList.remove("bg-yellow-300");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>

      <div className="mb-4">
        <label className="mr-2">
          Player 1 (X):
          <input
            type="text"
            value={playerNames.player1}
            onChange={(e) =>
              setPlayerNames({ ...playerNames, player1: e.target.value })
            }
            className="ml-2 p-1 border rounded"
          />
        </label>
        <label>
          Player 2 (O):
          <input
            type="text"
            value={playerNames.player2}
            onChange={(e) =>
              setPlayerNames({ ...playerNames, player2: e.target.value })
            }
            className="ml-2 p-1 border rounded"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="mr-2">
          Game Mode:
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
            className="ml-2 p-1 border rounded"
          >
            <option value="twoPlayers">Two Players</option>
            <option value="singlePlayer">Single Player</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            id={`cell-${index}`}
            className="cell w-24 h-24 flex items-center justify-center bg-white border border-gray-300 rounded-lg text-3xl font-bold cursor-pointer hover:bg-gray-200"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Game
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xl">
          {winner
            ? winner === "draw"
              ? "It's a draw!"
              : `Winner: ${
                  winner === "X" ? playerNames.player1 : playerNames.player2
                }`
            : `Next Player: ${
                isXNext ? playerNames.player1 : playerNames.player2
              }`}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xl">
          Scores: {playerNames.player1} (X) - {scores.player1} |{" "}
          {playerNames.player2} (O) - {scores.player2}
        </p>
      </div>
      <Link to="/Ran" className=" absolute top-0 right-0 bg-black/20 rounded p-2 text-2xl">X</Link>
    </div>
  );
};

export default TicTacToe;