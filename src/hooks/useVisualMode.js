import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  // defines how view transitions are handled
  function transition(next, replace = false) {
    if (replace === true) {
      history.pop();
    }
    history.push(next);
    setMode(() => next);
  }

  // defines what view is presented when back is called based on
  // stored history
  function back() {
    if (history.length > 1) {
      history.pop();
      const prevMode = history[history.length - 1]
      setMode(() => prevMode);
    }
  }

  return { mode, transition, back };
};