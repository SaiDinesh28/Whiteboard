import React, { useContext, useLayoutEffect } from "react";
import { useEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import propertiesContext from "../../store/properties-box-context";
const Board = () => {
  console.log("Board component rendered");
  const {
    elements,
    activeItem,
    toolActionType,
    handleMouseDownBoard,
    handleMouseMoveBoard,
    handleMouseUpBoard,
  } = useContext(boardContext);
  const { propertiesBoxState } = useContext(propertiesContext);
  const canvasRef = useRef();
  useEffect(() => {
    console.log("use effect executed");
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let rc = rough.canvas(canvas);
    elements.forEach((ele) => {
      switch (ele.type) {
        case "LINE":
        case "RECTANGLE":
        case "CIRCLE":
        case "ARROW":
          rc.draw(ele.roughEle);
          break;
        case "BRUSH":
          ctx.fillStyle = ele.stroke;
          ctx.fill(ele.path);
          ctx.restore();
          break;
        default:
          throw new Error("Type not found");
      }
    });
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  function handleMouseDown(event) {
    // console.log(event.target);
    handleMouseDownBoard(
      event,
      propertiesBoxState[activeItem]?.stroke,
      propertiesBoxState[activeItem]?.fill,
      propertiesBoxState[activeItem]?.size
    );
  }
  function handleMouseMove(event) {
    if (toolActionType === "DRAWING") {
      handleMouseMoveBoard(event);
    }
  }
  function handleMouseUp() {
    handleMouseUpBoard();
  }
  console.log("Board component end");
  return (
    <>
      <canvas
        id="myCanvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
    </>
  );
};

export default Board;
