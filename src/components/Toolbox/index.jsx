import React, { useState } from "react";
import classes from "./index.module.css";
import classNames from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaSlash } from "react-icons/fa";
const Toolbox = () => {
  const [activeItem, setactiveItem] = useState("");
  return (
    <div className={classes.container}>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "Rectangle",
        })}
        onClick={() => setactiveItem("Rectangle")}
      >
        <LuRectangleHorizontal />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "Slash",
        })}
        onClick={() => setactiveItem("Slash")}
      >
        <FaSlash />
      </div>
    </div>
  );
};

export default Toolbox;
