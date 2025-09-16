import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * Controls
 * Provides mode selection and game lifecycle actions.
 * Props:
 *  - mode: "single" | "two"
 *  - onModeChange: (mode) => void
 *  - onStart: () => void
 *  - onReset: () => void
 *  - started: boolean
 */
export default function Controls({ mode, onModeChange = () => {}, onStart = () => {}, onReset = () => {}, started }) {
  return (
    <div className="controls">
      <div className="mode-select" role="group" aria-label="Game mode">
        <button
          type="button"
          className={clsx("btn", "primary")}
          aria-pressed={mode === "single"}
          onClick={() => onModeChange("single")}
          title="Play vs Computer"
          aria-label="Single player mode"
        >
          Single Player
        </button>
        <button
          type="button"
          className={clsx("btn", "secondary")}
          aria-pressed={mode === "two"}
          onClick={() => onModeChange("two")}
          title="Two Players on one device"
          aria-label="Two players mode"
        >
          Two Players
        </button>
      </div>

      <div className="mode-select">
        {!started ? (
          <button type="button" className="btn primary" onClick={onStart} aria-label="Start game">
            Start Game
          </button>
        ) : (
          <button type="button" className="btn danger" onClick={onReset} aria-label="Reset game">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

Controls.propTypes = {
  mode: PropTypes.oneOf(["single", "two"]).isRequired,
  onModeChange: PropTypes.func,
  onStart: PropTypes.func,
  onReset: PropTypes.func,
  started: PropTypes.bool.isRequired,
};
