import { createContext } from "react";

const boardContext = createContext({
  activeItem: "",
  elements: [],
  toolActionType : "NONE",
  handlesetactiveItem: () => {},
  handleMouseDownBoard: () => {},
  handleMouseMoveBoard: () => {},
  handleMouseUpBoard: ()=>{},
});

export default boardContext;
