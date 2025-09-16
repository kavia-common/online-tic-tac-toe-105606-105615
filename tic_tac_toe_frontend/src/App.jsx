import React, { useMemo, useState, useEffect } from "react";
import clsx from "clsx";
import Board from "./components/Board";
import Controls from "./components/Controls";
import ResultBanner from "./components/ResultBanner";
import PlayerInfo from "./components/PlayerInfo";

/**
 * App - Root component for Ocean Tic Tac Toe
 * Layout:
 *  - Header
 *  - Info row: player info + controls
 *  - Board area: game board + result panel
 *  - Footer
 */
export default function App() {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState("single"); // 'single' or 'two'
  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState(null); // 'X', 'O', or null
  const [winningLine, setWinningLine] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // Derived status
  const currentPlayer = xIsNext ? "X" : "O";

  // Check winner
  const lines = useMemo(
    () => [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    []
  );

  useEffect(() => {
    // Determine game result after each move
    let found = null;
    let winLine = null;
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        found = board[a];
        winLine = [a, b, c];
        break;
      }
    }
    setWinner(found);
    setWinningLine(winLine);
    setIsDraw(!found && board.every(Boolean));
  }, [board, lines]);

  // Public: handle a move
  const handleSquareClick = (idx) => {
    if (winner || isDraw || board[idx] || !started) return;
    const next = board.slice();
    next[idx] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext((prev) => !prev);
  };

  // Very simple AI for single player: choose winning move if available, else block, else first empty
  useEffect(() => {
    if (mode !== "single") return;
    if (!started) return;
    if (winner || isDraw) return;
    if (xIsNext) return; // AI plays 'O'
    const aiMove = () => {
      const emptyIndices = board.map((v, i) => (v ? null : i)).filter((v) => v !== null);

      // Try to win
      for (const i of emptyIndices) {
        const tryBoard = board.slice();
        tryBoard[i] = "O";
        if (isWinning("O", tryBoard)) return i;
      }
      // Block X
      for (const i of emptyIndices) {
        const tryBoard = board.slice();
        tryBoard[i] = "X";
        if (isWinning("X", tryBoard)) return i;
      }
      // Center
      if (emptyIndices.includes(4)) return 4;
      // Corners
      for (const c of [0, 2, 6, 8]) if (emptyIndices.includes(c)) return c;
      // Any
      return emptyIndices[0];
    };

    const moveIndex = aiMove();
    if (typeof moveIndex === "number") {
      const timer = setTimeout(() => {
        handleSquareClick(moveIndex);
      }, 350); // small delay for UX
      return () => clearTimeout(timer);
    }
  }, [board, xIsNext, mode, winner, isDraw, started]);

  function isWinning(symbol, state) {
    return lines.some(([a, b, c]) => state[a] === symbol && state[b] === symbol && state[c] === symbol);
  }

  // Reset the game state
  const resetGame = (soft = false) => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    if (!soft) setStarted(false);
  };

  // Start game in current mode
  const startGame = () => {
    resetGame(true);
    setStarted(true);
  };

  return (
    <div className="app-root">
      <div className="app-card">
        <div className="header">
          <h1>
            <span className="brand-dot" />
            Ocean Tic Tac Toe
          </h1>
          <span className="header-sub">Modern • Minimal • Interactive</span>
        </div>

        <div className="content">
          <div className="info-row">
            <PlayerInfo
              xIsNext={xIsNext}
              started={started}
              mode={mode}
            />
            <div className="panel">
              <h2>Controls</h2>
              <Controls
                mode={mode}
                onModeChange={(m) => {
                  setMode(m);
                  resetGame();
                }}
                onStart={startGame}
                onReset={() => resetGame()}
                started={started}
              />
            </div>
          </div>

          <div className="board-area">
            <div className="board-card">
              <Board
                board={board}
                onClick={handleSquareClick}
                disabled={!started || Boolean(winner) || isDraw}
                winningLine={winningLine}
              />
            </div>

            <div className="panel">
              <h2>Status</h2>
              <ResultBanner
                winner={winner}
                isDraw={isDraw}
                started={started}
                currentPlayer={currentPlayer}
                mode={mode}
              />
            </div>
          </div>
        </div>

        <div className="footer">
          <span>Ocean Professional Theme</span>
          <span>
            Built with <a href="https://react.dev" target="_blank" rel="noreferrer">React 18</a>
          </span>
        </div>
      </div>
    </div>
  );
}
