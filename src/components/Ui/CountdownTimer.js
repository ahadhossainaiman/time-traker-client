import React, { useState, useEffect } from "react";
import moment from "moment";

const CountdownTimer = ({ initialDuration }) => {
  const [duration, setDuration] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && duration > 0) {
      timer = setInterval(() => {
        setDuration((prevDuration) => prevDuration - 1000);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, duration]);

  const formatDuration = (milliseconds) => {
    const duration = moment.duration(milliseconds);
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };
  const handleRestart = () => {
    setDuration(initialDuration);
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="flex gap-2">
      {formatDuration(duration)}
      {duration <= 0 && <p>Time's up!</p>}
      <button onClick={handleRestart}>Restart</button>
      <button onClick={handleStop}>{isActive ? "Stop" : "Start"}</button>
    </div>
  );
};

export default CountdownTimer;
