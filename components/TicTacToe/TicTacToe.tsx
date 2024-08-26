import classNames from "@/functions/classNames";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TicTacToe: React.FC = () => {
  const [playerMarker, setPlayerMarker] = useState<Player | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  type Player = "X" | "O";
  type Difficulty = "Easy" | "Impossible";
  type Board = (Player | null)[];

  interface GameState {
    board: Board;
    currentPlayer: Player;
    playerMarker: Player;
    aiMarker: Player;
    difficulty: Difficulty;
    outcome: "win" | "loss" | "draw" | null;
  }

  const emptyBoard: Board = Array(9).fill(null);

  const checkWinner = (board: Board): Player | null => {
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

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const isDraw = (board: Board): boolean => {
    return board.every((cell) => cell !== null);
  };

  const getRandomMove = (board: Board): number => {
    const emptyIndices = board
      .map((value, index) => (value === null ? index : null))
      .filter((i) => i !== null) as number[];
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  // Minimax algorithm for impossible mode
  const minimax = (
    board: Board,
    depth: number,
    isMaximizing: boolean,
    aiMarker: Player,
    playerMarker: Player
  ): number => {
    const winner = checkWinner(board);
    if (winner === aiMarker) return 10 - depth;
    if (winner === playerMarker) return depth - 10;
    if (isDraw(board)) return 0;

    const getBestScore = (scores: number[], isMaximizing: boolean) =>
      isMaximizing ? Math.max(...scores) : Math.min(...scores);

    return getBestScore(
      board
        .map((value, index) => {
          if (value === null) {
            const newBoard = [...board];
            newBoard[index] = isMaximizing ? aiMarker : playerMarker;
            return minimax(
              newBoard,
              depth + 1,
              !isMaximizing,
              aiMarker,
              playerMarker
            );
          }
          return isMaximizing ? -Infinity : Infinity;
        })
        .filter((score) => score !== (isMaximizing ? -Infinity : Infinity)),
      isMaximizing
    );
  };

  const getBestMove = (
    board: Board,
    aiMarker: Player,
    playerMarker: Player
  ): number => {
    return board
      .map((value, index) => {
        if (value === null) {
          const newBoard = [...board];
          newBoard[index] = aiMarker;
          return {
            score: minimax(newBoard, 0, false, aiMarker, playerMarker),
            move: index,
          };
        }
        return null;
      })
      .filter((result) => result !== null)
      .sort((a, b) => b!.score - a!.score)[0]!.move;
  };

  const [gameState, setGameState] = useState<GameState | null>(null);

  const startGame = () => {
    if (playerMarker && difficulty) {
      const aiMarker: Player = playerMarker === "X" ? "O" : "X";
      setGameState({
        board: emptyBoard,
        currentPlayer: playerMarker,
        playerMarker,
        aiMarker,
        difficulty,
        outcome: null, // Initialize the outcome to null at the start of the game
      });
    }
  };

  const handlePlayerMove = (index: number) => {
    if (
      gameState &&
      gameState.board[index] === null &&
      gameState.currentPlayer === gameState.playerMarker &&
      //and if the game is not over
      !gameState.outcome
    ) {
      const newBoard = [...gameState.board];
      newBoard[index] = gameState.playerMarker;
      const winner = checkWinner(newBoard);

      if (winner === gameState.playerMarker) {
        setGameState({ ...gameState, board: newBoard, outcome: "win" });
        toast.success("You won!", {
          position: "top-center",
          className: "font-bold mt-10",
        });
      } else if (isDraw(newBoard)) {
        setGameState({ ...gameState, board: newBoard, outcome: "draw" });
        toast("It's a draw.", {
          position: "top-center",
          className: "font-bold mt-10",
        });
      } else {
        setGameState({
          ...gameState,
          board: newBoard,
          currentPlayer: gameState.aiMarker,
        });
        setTimeout(() => handleAIMove(newBoard), 500);
      }
    }
  };

  const handleAIMove = (board: Board) => {
    if (gameState) {
      const aiMove =
        gameState.difficulty === "Easy"
          ? getRandomMove(board)
          : getBestMove(board, gameState.aiMarker, gameState.playerMarker);

      const newBoard = [...board];
      newBoard[aiMove] = gameState.aiMarker;
      const winner = checkWinner(newBoard);

      if (winner === gameState.aiMarker) {
        setGameState({ ...gameState, board: newBoard, outcome: "loss" });
        toast.error("You lost.", {
          position: "top-center",
          className: "font-bold mt-10",
        });
      } else if (isDraw(newBoard)) {
        setGameState({ ...gameState, board: newBoard, outcome: "draw" });
        toast("It's a draw.", {
          position: "top-center",
          className: "font-bold mt-10",
        });
      } else {
        setGameState({
          ...gameState,
          board: newBoard,
          currentPlayer: gameState.playerMarker,
        });
      }
    }
  };

  const resetGame = () => {
    setGameState(null); // Resets the game while keeping the marker and difficulty the same
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {gameState ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-1">
            {gameState.board.map((value, index) => (
              <div className="border p-0.5 rounded-lg" key={index}>
                <div
                  key={index}
                  onClick={() => handlePlayerMove(index)}
                  className={classNames(
                    "w-12 h-12 md:w-24 md:h-24 flex items-center justify-center text-2xl rounded-lg",
                    value === "X" &&
                      "bg-blue-500 text-white cursor-not-allowed",
                    value === "O" && "bg-red-500 text-white cursor-not-allowed",
                    !value && "bg-gray-300  cursor-pointer"
                  )}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {gameState.outcome && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                {gameState.outcome === "win" && "You won!"}
                {gameState.outcome === "loss" && "You lost."}
                {gameState.outcome === "draw" && "It's a draw."}
              </h2>
              <button
                onClick={resetGame}
                className="mt-4 px-6 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
              >
                Reset Game
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Choose Your Settings</h1>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Select Your Marker</h2>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => setPlayerMarker("X")}
                  disabled={playerMarker === "X"}
                  className={classNames(
                    "px-4 py-2 rounded",
                    playerMarker === "X"
                      ? "bg-blue-500 text-white cursor-not-allowed"
                      : "bg-blue-200 text-blue-700 hover:bg-blue-300"
                  )}
                >
                  X
                </button>
                <button
                  onClick={() => setPlayerMarker("O")}
                  disabled={playerMarker === "O"}
                  className={classNames(
                    "px-4 py-2 rounded",
                    playerMarker === "O"
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : "bg-red-200 text-red-700 hover:bg-red-300"
                  )}
                >
                  O
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Select Difficulty</h2>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => setDifficulty("Easy")}
                  disabled={difficulty === "Easy"}
                  className={classNames(
                    "px-4 py-2 rounded",
                    difficulty === "Easy"
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  )}
                >
                  Easy
                </button>
                <button
                  onClick={() => setDifficulty("Impossible")}
                  disabled={difficulty === "Impossible"}
                  className={classNames(
                    "px-4 py-2 rounded",
                    difficulty === "Impossible"
                      ? "bg-orange-500 text-white cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  )}
                >
                  Impossible
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={startGame}
              disabled={!playerMarker || !difficulty}
              className={classNames(
                "mt-4 px-6 py-2 rounded bg-indigo-500 text-white",
                (!playerMarker || !difficulty) &&
                  "opacity-50 cursor-not-allowed",
                playerMarker && difficulty && "hover:bg-indigo-600"
              )}
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
