import React from "react";

/**
 * PUBLIC_INTERFACE
 * ResultBanner
 * Displays current game status, winner, or draw outcome.
 */
export default function ResultBanner({ winner, isDraw, started, currentPlayer, mode }) {
  if (!started) {
    return (
      <div className="result">
        <h3>Press "Start Game" to begin</h3>
        <span style={{ color: "#6b7280", fontWeight: 600, fontSize: 12 }}>
          Mode: {mode === "single" ? "Single Player" : "Two Players"}
        </span>
      </div>
    );
  }

  if (winner) {
    return (
      <div className="result win">
        <h3>
          {winner === "X"
            ? mode === "single"
              ? "You win! (X)"
              : "Player X wins!"
            : mode === "single"
              ? "Computer wins! (O)"
              : "Player O wins!"}
        </h3>
        <span style={{ color: "#2563EB", fontWeight: 800 }}>🎉</span>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="result draw">
        <h3>It’s a draw.</h3>
        <span style={{ color: "#F59E0B", fontWeight: 800 }}>🤝</span>
      </div>
    );
  }

  return (
    <div className="result">
      <h3>{currentPlayer === "X" ? "X to move" : "O to move"}</h3>
      <span style={{ color: "#6b7280", fontWeight: 600, fontSize: 12 }}>
        {mode === "single"
          ? currentPlayer === "X" ? "Your turn" : "Computer thinking..."
          : currentPlayer === "X" ? "Player 1" : "Player 2"}
      </span>
    </div>
  );
}
