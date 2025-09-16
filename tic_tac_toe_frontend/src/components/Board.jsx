import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Square from "./Square";

/**
 * PUBLIC_INTERFACE
 * Board
 * Renders a 3x3 Tic Tac Toe grid and forwards click events.
 * Props:
 *  - board: string[] length 9, each null | "X" | "O"
 *  - onClick: function(index) -> void
 *  - disabled: boolean to disable interaction
 *  - winningLine: number[] | null indices that are part of the win
 */
export default function Board({ board, onClick = () => {}, disabled, winningLine }) {
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
            aria-label={`Board cell ${idx + 1}`}
          />
        );
      })}
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(["X", "O"]), PropTypes.oneOf([null])])).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  winningLine: PropTypes.arrayOf(PropTypes.number),
};
