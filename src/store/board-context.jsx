import { createContext } from "react";

const boardContext = createContext({
  activeItem: "",
  elements: [],
  handlesetactiveItem : ()=>{},
  handleMouseDownBoard : ()=>{}
});

export default boardContext;
