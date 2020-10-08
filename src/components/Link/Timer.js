
  import React, {useState} from 'react';
  import Time from "./Time";
  import BtnComponent from './BtnComponent';
  import './file.css';
  
  function Timer() {
    const [time, setTime] = useState({ s:0,m:0,h:0,d:0});
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    var test= new Date("october, 3, 2020 21:44:25").setDate(new Date("october 3, 2020 21:44:25").getDate() + 30);

    // Not started = 0
    // started = 1
    // stopped = 2
  
   /*  const start = () => {
      run();
      setStatus(1);
      setInterv(setInterval(run, distance));
    };
  
   var  seconds = time.s, minutes = time.m,
    hours = time.h ,days=time.d;
   
   const run = () => {
      
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var  hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var  seconds = Math.floor((distance % (1000 * 60)) / 1000);
      return setTime({ s:seconds, m:minutes, h:hours,d:days});
    };
  
    const stop = () => {
      
      clearInterval(interv);
      setStatus(2);
    };
  
    const reset = () => {
      
      clearInterval(interv);
      setStatus(0);
      setTime({ s:0, m:0, h:0,d:0})
    };
  
    const resume = () => start();
  */
 var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = test - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
return(
      <div className="main-section">
       <div className="clock-holder">
            <div className="stopwatch">
            <p id="demo"></p>
      </div>  </div>  </div>
    );
  }
  

  

export default Timer;
