import React from "react";
import clsx from "clsx";
import Square from "./Square";

/**
 * PUBLIC_INTERFACE
 * Board
 * Renders a 3x3 Tic Tac Toe grid and forwards click events.
 */
export default function Board({ board, onClick, disabled, winningLine }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((val, idx) => {
        const isWinning = winningLine?.includes(idx);
        return (
          <Square
            key={idx}
            value={val}
            onClick={() => onClick(idx)}
            disabled={disabled || Boolean(val)}
            highlight={isWinning}
            aria-label={`cell-${idx}`}
          />
        );
      })}
    </div>
  );
}
