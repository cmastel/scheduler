import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(next, replace = false) {
    if (replace === true) {
      history.pop();
    }
    history.push(next);
    setMode(() => next);
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      const prevMode = history[history.length - 1]
      setMode(() => prevMode);
    }
  }

  return { mode, transition, back };
};