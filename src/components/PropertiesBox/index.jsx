import React, { useContext } from "react";
import classes from "./index.module.css";
import classNames from "classnames";
import { COLORS, STROKE_TOOLS, FILL_TOOLS, SIZE_TOOLS } from "../../constants";
import propertiesContext from "../../store/properties-box-context";
import boardContext from "../../store/board-context";

const PropertiesBox = () => {
  const { activeItem } = useContext(boardContext);
  const {
    propertiesBoxState,
    handlechangeStroke,
    handlechangeFill,
    handlechangeSize,
  } = useContext(propertiesContext);
  const strokeColor = propertiesBoxState[activeItem]?.stroke;
  const fillColor = propertiesBoxState[activeItem]?.fill;
  const brushSize = propertiesBoxState[activeItem]?.size;
  return (
    <div className={classNames(classes.container)}>
      {STROKE_TOOLS.includes(activeItem) && (
        <div className={classNames(classes.selectOptionContainer)}>
          <div className={classes.toolBoxLabel}>Stroke Color</div>
          <div className={classNames(classes.colorsContainer)}>
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={classNames(classes.colorBox, {
                    [classes.activeColorBox]: COLORS[k] === strokeColor,
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => handlechangeStroke(activeItem, COLORS[k])}
                ></div>
              );
            })}
          </div>
        </div>
      )}
      {FILL_TOOLS.includes(activeItem) && (
        <div className={classNames(classes.selectOptionContainer)}>
          <div className={classes.toolBoxLabel}>Fill Color</div>
          <div className={classNames(classes.colorsContainer)}>
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={classNames(classes.colorBox, {
                    [classes.activeColorBox]: COLORS[k] === fillColor,
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => handlechangeFill(activeItem, COLORS[k])}
                ></div>
              );
            })}
          </div>
        </div>
      )}
      {SIZE_TOOLS.includes(activeItem) && (
        <div className={classNames(classes.selectOptionContainer)}>
          <div className={classNames(classes.toolBoxLabel)}> Brush Size</div>
          <input
            type="range"
            min={1}
            max={10}
            value={brushSize}
            step={1}
            onChange={(e) => handlechangeSize(activeItem, e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default PropertiesBox;
