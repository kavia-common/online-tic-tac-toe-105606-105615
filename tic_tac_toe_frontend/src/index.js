import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

/**
 * Entry point: Safely mount React app.
 * Some preview environments may not inject #root; guard to avoid runtime errors.
 */
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  // Create a root if missing (defensive for preview environments)
  const created = document.createElement("div");
  created.id = "root";
  document.body.appendChild(created);
  const root = createRoot(created);
  root.render(<App />);
}
