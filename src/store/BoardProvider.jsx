import boardContext from "./board-context";
import createRoughElement from "../utils/createRoughElement";
import React, { useReducer } from "react";
// import { useState } from "react";
import rough from "roughjs/bin/rough";
import { getSvgPathFromStroke } from "../utils/math";
import { isPointNearElement } from "../utils/eraseHelper";
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
      case "CHANGE_ACTION_TYPE": {
        return {
          ...state,
          toolActionType: action.payload.actionType,
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
          case "TEXT": {
            // if (state.toolActionType === "WRITING") return state;
            return {
              ...state,
              toolActionType: "WRITING",
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
          toolActionType: "NONE",
        };
      }
      case "ERASE_ELEMENT": {
        const { clientX, clientY } = action.payload;
        let newElements = state.elements;
        newElements = newElements.filter((ele) => {
          return !isPointNearElement(ele, clientX, clientY);
        });
        return {
          ...state,
          elements: newElements,
        };
      }
      case "CHANGE_TEXT": {
        let newElements = [...state.elements];
        let lastInd = newElements.length - 1;
        newElements[lastInd].text = action.payload.text;
        return {
          ...state,
          elements: newElements,
          toolActionType: "NONE",
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
    if (boardState.toolActionType === "WRITING") return;
    if (boardState.activeItem === "ERASE") {
      dispatchboardStateAction({
        type: "CHANGE_ACTION_TYPE",
        payload: {
          actionType: "ERASING",
        },
      });
      return;
    }
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
    if (boardState.toolActionType === "DRAWING") {
      dispatchboardStateAction({
        type: "DRAW_MOVE",
        payload: {
          clientX: event.clientX,
          clientY: event.clientY,
        },
      });
    } else if (boardState.toolActionType === "ERASING") {
      dispatchboardStateAction({
        type: "ERASE_ELEMENT",
        payload: {
          clientX: event.clientX,
          clientY: event.clientY,
        },
      });
    }
  };
  const handleMouseUp = () => {
    if (boardState.toolActionType === "WRITING") return;
    dispatchboardStateAction({
      type: "CHANGE_ACTION_TYPE",
      payload: {
        actionType: "NONE",
      },
    });
  };
  const handleonBlur = (text) => {
    // dispatchboardStateAction({
    //   type: "CHANGE_ACTION_TYPE",
    //   payload: {
    //     actionType: "NONE",
    //   },
    // });
    dispatchboardStateAction({
      type: "CHANGE_TEXT",
      payload: {
        text: text,
      },
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
    handleonBlurBoard: handleonBlur,
  };
  return (
    <boardContext.Provider value={boardProviderValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
