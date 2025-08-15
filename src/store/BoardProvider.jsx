import boardContext from "./board-context";

import React, { useReducer } from 'react'
// import { useState } from "react";
import rough from "roughjs/bin/rough"
const gen = rough.generator();

const BoardProvider = ({children}) => {
    const initialboardState = {
        activeItem: "",
        elements : []
    }
    const boardReducer = (state,action) =>{
            switch (action.type) {
                case "CHANGE_TOOL":
                    return {
                        ...state,
                        activeItem : action.payload.tool
                    }
                case "DRAW_DOWN":
                    const {clientX,clientY} = action.payload;
                    const newRoughEle = {
                        id : state.elements.length,
                        x1 : clientX,
                        y1 : clientY,
                        x2 : clientX,
                        y2 : clientY,
                        roughEle : gen.line(clientX,clientY,clientX,clientY)
                    }
                    const prevElements = state.elements;
                    return {
                        ...state,
                        elements : [...prevElements,newRoughEle]
                    }
            
                default:
                    return state;
            }
    }
    // const [activeItem,setactiveItem] = useState("");
    const [boardState, dispatchboardStateAction] = useReducer(boardReducer,initialboardState);
    const handlesetactiveItem = (tool) =>{
        //  setactiveItem(tool);
        dispatchboardStateAction({
            type : "CHANGE_TOOL",
            payload :{
                tool
            }
        })
    }
    const handleMouseDown = (event)=>{
        dispatchboardStateAction({
            type : "DRAW_DOWN",
            payload:{
                clientX : event.clientX,
                clientY : event.clientY
            }
        });
    }
    const boardProviderValue ={
        activeItem : boardState.activeItem,
        elements : boardState.elements,
        handlesetactiveItem,
        handleMouseDownBoard:handleMouseDown
    }
  return (
    <boardContext.Provider value={boardProviderValue}>
        {children}
    </boardContext.Provider>
  )
}

export default BoardProvider