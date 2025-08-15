import boardContext from "./board-context";
import createRoughElement from "../utils/createRoughElement";
import React, { useReducer } from "react";
// import { useState } from "react";
import rough from "roughjs/bin/rough";
import { getSvgPathFromStroke } from "../utils/math";
import getStroke from "perfect-freehand";
const gen = rough.generator();

const BoardProvider = ({ children }) => {
  const initialboardState = {
    activeItem: "LINE",
    elements: [],
    toolActionType: "NONE",
  };
  const boardReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_TOOL": {
        return {
          ...state,
          activeItem: action.payload.tool,
        };
      }
      case "DRAW_DOWN": {
        const { clientX, clientY, strokeColor, fillColor, size } =
          action.payload;
        const prevElements = state.elements;
        const newRoughEle = createRoughElement(
          state.elements.length,
          clientX,
          clientY,
          clientX,
          clientY,
          {
            type: state.activeItem,
            stroke: strokeColor,
            fill: fillColor,
            size,
          }
        );
        switch (state.activeItem) {
          case "LINE":
          case "RECTANGLE":
          case "CIRCLE":
          case "ARROW": {
            return {
              ...state,
              toolActionType: "DRAWING",
              elements: [...prevElements, newRoughEle],
            };
          }
          case "BRUSH": {
            newRoughEle.points = [{ x: clientX, y: clientY }];
            newRoughEle.path = new Path2D(
              getSvgPathFromStroke(getStroke(newRoughEle.points))
            );
            return {
              ...state,
              toolActionType: "DRAWING",
              elements: [...prevElements, newRoughEle],
            };
          }
        }
      }
      case "DRAW_MOVE": {
        const { clientX, clientY } = action.payload;
        let lastInd = state.elements.length - 1;
        let newElements = [...state.elements];
        const { id, x1, y1, stroke, fill, size } = newElements[lastInd];
        const newRoughEle = createRoughElement(id, x1, y1, clientX, clientY, {
          type: state.activeItem,
          stroke,
          fill,
          size,
        });

        switch (state.activeItem) {
          case "LINE":
          case "RECTANGLE":
          case "CIRCLE":
          case "ARROW": {
            newElements[lastInd] = newRoughEle;
            return {
              ...state,
              elements: [...newElements],
            };
          }
          case "BRUSH": {
            newRoughEle.points = [
              ...newElements[lastInd].points,
              { x: clientX, y: clientY },
            ];
            newRoughEle.path = new Path2D(
              getSvgPathFromStroke(getStroke(newRoughEle.points))
            );
            newElements[lastInd] = newRoughEle;
            return {
              ...state,
              elements: [...newElements],
            };
          }
        }
      }
      case "DRAW_UP": {
        return {
          ...state,
          toolActionType: "None",
        };
      }
      default:
        return state;
    }
  };
  // const [activeItem,setactiveItem] = useState("");
  const [boardState, dispatchboardStateAction] = useReducer(
    boardReducer,
    initialboardState
  );
  const handlesetactiveItem = (tool) => {
    //  setactiveItem(tool);
    dispatchboardStateAction({
      type: "CHANGE_TOOL",
      payload: {
        tool,
      },
    });
  };
  const handleMouseDown = (event, strokeColor, fillColor, brushSize) => {
    dispatchboardStateAction({
      type: "DRAW_DOWN",
      payload: {
        clientX: event.clientX,
        clientY: event.clientY,
        strokeColor,
        fillColor,
        size: brushSize,
      },
    });
  };
  const handleMouseMove = (event) => {
    dispatchboardStateAction({
      type: "DRAW_MOVE",
      payload: {
        clientX: event.clientX,
        clientY: event.clientY,
      },
    });
  };
  const handleMouseUp = () => {
    dispatchboardStateAction({
      type: "DRAW_UP",
    });
  };
  const boardProviderValue = {
    activeItem: boardState.activeItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    handlesetactiveItem,
    handleMouseDownBoard: handleMouseDown,
    handleMouseMoveBoard: handleMouseMove,
    handleMouseUpBoard: handleMouseUp,
  };
  return (
    <boardContext.Provider value={boardProviderValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
