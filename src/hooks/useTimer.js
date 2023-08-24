import { useCallback, useEffect, useState } from "react";

const interval =
  (delay = 0) =>
  (callback) =>
    useEffect(() => {
      const id = setInterval(callback, delay);

      return () => clearInterval(id);
    }, [callback]);

const use1Second = interval(1000);

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [running, setRunning] = useState(false);

  const tick = useCallback(() => {
    running ? setSeconds((seconds) => seconds + 1) : undefined, [running];

    if (running && seconds === 60) {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    }
  });

  use1Second(tick);

  const start = () => {
    setSeconds(1);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
  };

  return { seconds, minutes, start, stop };
};
