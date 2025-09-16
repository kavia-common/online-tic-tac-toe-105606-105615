import React from "react";

/**
 * PUBLIC_INTERFACE
 * PlayerInfo
 * Shows X and O player info and whose turn, with the selected mode.
 */
export default function PlayerInfo({ xIsNext, started, mode }) {
  return (
    <div className="panel">
      <h2>Players</h2>
      <div className="player-row" style={{ marginBottom: 10 }}>
        <div className="player">
          <span className="badge">
            <span className="dot-x" />
            Player X
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>
            {mode === "single" ? "(You)" : "(Player 1)"}
          </span>
        </div>
        {started && xIsNext && <span className="turn-indicator">Your move</span>}
      </div>

      <div className="player-row">
        <div className="player">
          <span className="badge">
            <span className="dot-o" />
            Player O
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>
            {mode === "single" ? "(Computer)" : "(Player 2)"}
          </span>
        </div>
        {started && !xIsNext && <span className="turn-indicator">Their move</span>}
      </div>
    </div>
  );
}
