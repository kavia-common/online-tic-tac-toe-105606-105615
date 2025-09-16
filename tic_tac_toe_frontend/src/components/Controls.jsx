import React from "react";
import clsx from "clsx";

/**
 * PUBLIC_INTERFACE
 * Controls
 * Provides mode selection and game lifecycle actions.
 */
export default function Controls({ mode, onModeChange, onStart, onReset, started }) {
  return (
    <div className="controls">
      <div className="mode-select" role="group" aria-label="Game mode">
        <button
          type="button"
          className={clsx("btn", "primary")}
          aria-pressed={mode === "single"}
          onClick={() => onModeChange("single")}
          title="Play vs Computer"
        >
          Single Player
        </button>
        <button
          type="button"
          className={clsx("btn", "secondary")}
          aria-pressed={mode === "two"}
          onClick={() => onModeChange("two")}
          title="Two Players on one device"
        >
          Two Players
        </button>
      </div>

      <div className="mode-select">
        {!started ? (
          <button type="button" className="btn primary" onClick={onStart}>
            Start Game
          </button>
        ) : (
          <button type="button" className="btn danger" onClick={onReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
