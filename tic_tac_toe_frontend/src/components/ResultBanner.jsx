import React from "react";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * ResultBanner
 * Displays current game status, winner, or draw outcome.
 * Props:
 *  - winner: "X" | "O" | null
 *  - isDraw: boolean
 *  - started: boolean
 *  - currentPlayer: "X" | "O"
 *  - mode: "single" | "two"
 */
export default function ResultBanner({ winner, isDraw, started, currentPlayer, mode }) {
  if (!started) {
    return (
      <div className="result" aria-live="polite">
        <h3>Press "Start Game" to begin</h3>
        <span style={{ color: "#6b7280", fontWeight: 600, fontSize: 12 }}>
          Mode: {mode === "single" ? "Single Player" : "Two Players"}
        </span>
      </div>
    );
  }

  if (winner) {
    return (
      <div className="result win" aria-live="assertive">
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
      <div className="result draw" aria-live="assertive">
        <h3>It’s a draw.</h3>
        <span style={{ color: "#F59E0B", fontWeight: 800 }}>🤝</span>
      </div>
    );
  }

  return (
    <div className="result" aria-live="polite">
      <h3>{currentPlayer === "X" ? "X to move" : "O to move"}</h3>
      <span style={{ color: "#6b7280", fontWeight: 600, fontSize: 12 }}>
        {mode === "single"
          ? currentPlayer === "X" ? "Your turn" : "Computer thinking..."
          : currentPlayer === "X" ? "Player 1" : "Player 2"}
      </span>
    </div>
  );
}

ResultBanner.propTypes = {
  winner: PropTypes.oneOfType([PropTypes.oneOf(["X", "O"]), PropTypes.oneOf([null])]),
  isDraw: PropTypes.bool.isRequired,
  started: PropTypes.bool.isRequired,
  currentPlayer: PropTypes.oneOf(["X", "O"]).isRequired,
  mode: PropTypes.oneOf(["single", "two"]).isRequired,
};
