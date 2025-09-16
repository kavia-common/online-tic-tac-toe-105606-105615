import React from "react";
import clsx from "clsx";

/**
 * PUBLIC_INTERFACE
 * Square
 * Single board cell to place X / O marks.
 */
export default function Square({ value, onClick, disabled, highlight, ...props }) {
  return (
    <button
      type="button"
      className={clsx("square", disabled && "disabled")}
      onClick={onClick}
      disabled={disabled}
      {...props}
      style={
        highlight
          ? {
              background: "linear-gradient(180deg, rgba(37,99,235,0.08), #fff)",
              borderColor: "rgba(37,99,235,0.35)"
            }
          : undefined
      }
    >
      {value ? (
        <span className={clsx("mark", value === "X" ? "mark-x" : "mark-o")}>
          {value}
        </span>
      ) : null}
    </button>
  );
}
