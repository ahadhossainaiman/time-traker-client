import React, { useState, useEffect } from "react";
import moment from "moment";
import { VscDebugStart } from "react-icons/vsc";
import { GrStop } from "react-icons/gr";
import { VscDebugRestart } from "react-icons/vsc";

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
    <div className="flex gap-2 clock items-center " >
      <span className="clock text-green-500 mx-2 font-bold">{formatDuration(duration)}</span>
      {duration <= 0 && <p>Time's up!</p>}
      <span onClick={handleRestart}><VscDebugRestart /></span>
      <span onClick={handleStop}>{isActive ? <GrStop className="text-red-500" /> : <VscDebugStart className="text-blue-500" />}</span>
    </div>
  );
};

export default CountdownTimer;
