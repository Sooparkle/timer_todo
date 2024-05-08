import { useEffect, useState } from "react";
import "../SCSS/Timer.scss";

const Timer = () =>{
  const [ time ,setTime ] = useState<number>(0);
  const [ isRunning, setIsRunning ] = useState<Boolean>(false);

const housrs = (time:number) => ('0'+ Math.floor(((time / 1000 / 60 / 60) % 60))).slice(-2)
const mins = (time:number) => ('0'+ Math.floor(((time / 1000 / 60) % 60))).slice(-2)
const secs = (time:number) => ('0' + Math.floor((time / 1000) % 60 )).slice(-2) 
// const msecs = (time:number) =>('0'+(time/10) % 100).slice(-2); 

  const formateTime = (time : number) :string => {
    return `${housrs(time)}:${mins(time)}:${secs(time)}`
  }

  useEffect(()=>{
    let interval:number | undefined;

    if(isRunning) {
      interval = setInterval(()=> setTime(time => time + 10),10)
    }

    return () => {clearInterval(interval)}

  }, [isRunning])

  return(
    <section>
      <div className="timer">{formateTime(time)}</div>
      <div className="timerBtns">
        <button 
          className={isRunning ? "activated" : ""}
          onClick={()=>setIsRunning(true)}>Start </button>
        <button onClick={()=>setIsRunning(false)}>Stop</button>
        <button className="reset" onClick={()=>setTime(0)}>Reset</button>
      </div>
    </section>
  )
  
};

export default Timer;