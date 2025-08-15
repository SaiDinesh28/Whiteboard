import React, { useContext, useState } from "react";
import classes from "./index.module.css";
import classNames from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
} from "react-icons/fa";
import boardContext from "../../store/board-context";
const Toolbox = () => {
  console.log("Tool box component started rendering");
  // const [activeItem, setactiveItem] = useState("");
  const { activeItem, handlesetactiveItem } = useContext(boardContext);
  console.log("Tool box component rendering completed");
  return (
    <div className={classes.container}>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "BRUSH",
        })}
        onClick={() => handlesetactiveItem("BRUSH")}
      >
        <FaPaintBrush />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "LINE",
        })}
        onClick={() => handlesetactiveItem("LINE")}
      >
        <FaSlash />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "RECTANGLE",
        })}
        onClick={() => handlesetactiveItem("RECTANGLE")}
      >
        <LuRectangleHorizontal size={30} />
      </div>

      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "CIRCLE",
        })}
        onClick={() => handlesetactiveItem("CIRCLE")}
      >
        <FaRegCircle />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "ARROW",
        })}
        onClick={() => handlesetactiveItem("ARROW")}
      >
        <FaArrowRight />
      </div>
    </div>
  );
};

export default Toolbox;
