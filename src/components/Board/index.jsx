import React, { useContext } from "react";
import { useEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
const Board = () => {
  console.log("Board component rendered");
  const { elements ,handleMouseDownBoard} = useContext(boardContext);
  const canvasRef = useRef();
  useEffect(() => {
    console.log("use effect executed");
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // let ctx = canvas.getContext('2d');
    // let rc = rough.canvas(canvas);
    // let generator = rc.generator;
    // let rect1 = generator.rectangle(10, 10, 100, 100);
    // let rect2 = generator.rectangle(10, 120, 100, 100, { fill: "red" });
    // rc.draw(rect1);
    // rc.draw(rect2);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let rc = rough.canvas(canvas);
    elements.forEach((ele)=>{
      rc.draw(ele.roughEle);
    })
    return ()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
  }, [elements]);

  function handleMouseDown(event) {
    // console.log(event.target);
    handleMouseDownBoard(event);
  }
  console.log("Board component end");
  return (
    <>
      <canvas id="myCanvas" ref={canvasRef} onMouseDown={handleMouseDown}>
        Your browser does not support the HTML canvas tag.
      </canvas>
    </>
  );
};

export default Board;
