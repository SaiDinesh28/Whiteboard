import React from 'react'
import { useEffect, useRef } from "react"
import rough from "roughjs"
const Toolbox = () => {
  console.log("Toolbox component rendered");
  const canvasRef = useRef();
  useEffect(()=>{
      console.log("use effect executed");
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // let ctx = canvas.getContext('2d');
      let rc = rough.canvas(canvas);
      let generator = rc.generator;
      let rect1 = generator.rectangle(10, 10, 100, 100);
      let rect2 = generator.rectangle(10, 120, 100, 100, {fill: 'red'});
      rc.draw(rect1);
      rc.draw(rect2);
      // ctx.fillStyle = "#ff0000";
      // ctx.fillRect(0,0,150,200);


  },[]);
  
  console.log("Toolbox component end");
  return (
    <>
        <canvas id="myCanvas"  ref={canvasRef}>Your browser does not support the HTML canvas tag.</canvas>
    </>
  )
}

export default Toolbox