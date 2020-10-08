import React from 'react'



function Time(props) {
  

  return (
    <div>
       <span>{ props.time.d}</span>:&nbsp;&nbsp;
       <span>{ props.time.h}</span> &nbsp;:&nbsp;
       <span>{ props.time.m}</span>&nbsp;:&nbsp;
       <span>{props.time.s}</span>
      
    </div>
  );
}



export default Time;
