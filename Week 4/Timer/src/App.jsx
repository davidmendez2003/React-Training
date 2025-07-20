import { useState, useEffect } from "react";

export default function App() {
  let duration = 30000; 
  const [time, setTime] = useState(duration);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [start]);

  const timeOf = (time) => {
    let hours = Math.floor(time/(1000* 60 * 60));
    let minutes = Math.floor((time%(1000 *60 * 60)) /(1000 * 60));
    let seconds = Math.floor((time%60000) /1000);
    return `${hours< 10 ? "0" + hours : hours}:${minutes< 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <div className="flex flex-col justify-center items-center w-[700px] h-[410px] bg-amber-50 rounded-xl shadow-xl">
        <span className="mt-[140px] text-3xl font-bold">{timeOf(time)}</span>
         <div className="flex flex-row gap-4 mt-[120px]">
          <button name="start" className="w-12 h-12" onClick={() => setStart(true)}><img src="/images/start.png"/></button>
          <button name="pause" className="w-12 h-12" onClick={() => setStart(false)}><img src="/images/pause.png"/></button>
          <button name="reset"className="w-12 h-12"onClick={() =>{setStart(false);setTime(duration);}}><img src="/images/reset.png"/></button>
        </div>
      </div>
    </div>
  );
}
