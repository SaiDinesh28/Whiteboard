import React, { useContext, useState } from "react";
import classes from "./index.module.css";
import classNames from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaSlash } from "react-icons/fa";
import boardContext from "../../store/board-context";
const Toolbox = () => {
  console.log("Tool box component started rendering")
  // const [activeItem, setactiveItem] = useState("");
  const { activeItem ,handlesetactiveItem} = useContext(boardContext);
  console.log("Tool box component rendering completed")
  return (
    <div className={classes.container}>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "Rectangle",
        })}
        onClick={() => handlesetactiveItem("Rectangle")}
      >
        <LuRectangleHorizontal />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "Slash",
        })}
        onClick={() => handlesetactiveItem("Slash")}
      >
        <FaSlash />
      </div>
    </div>
  );
};

export default Toolbox;
