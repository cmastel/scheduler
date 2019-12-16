import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  // defines how view transitions are handled
  function transition(mode, replace = false) {
    if (replace === true) {
      history.pop();
      setHistory(history)
    }
    setHistory(prev => [...prev, mode]);
    setMode(mode);
  }

  // defines what view is presented when back is called based on
  // stored history
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(mode => history[history.length - 1])
    }
  }

  return { mode, transition, back };
};

