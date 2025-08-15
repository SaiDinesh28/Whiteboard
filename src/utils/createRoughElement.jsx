import React from "react";
import rough from "roughjs/bin/rough";
import { getArrowCoordinates } from "./math";
const gen = rough.generator();
const createRoughElement = (id, x1, y1, x2, y2, { type }) => {
  let newElement = {
    id,
    x1,
    y1,
    x2,
    y2,
  };
  let options = {
    seed: id + 1,
  };
  switch (type) {
    case "LINE":
      {
        newElement.roughEle = gen.line(x1, y1, x2, y2, options);
      }
      break;
    case "RECTANGLE":
      {
        newElement.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
      }
      break;
    case "CIRCLE":
      {
        const diameter =
          2 * Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        newElement.roughEle = gen.circle(x1, y1, diameter);
      }
      break;
    case "ARROW":
      {
        const arrowLength = 20;
        const [x3, y3, x4, y4] = getArrowCoordinates(
          x1,
          y1,
          x2,
          y2,
          arrowLength
        );
        const points = [
          [x1, y1],
          [x2, y2],
          [x3, y3],
          [x2, y2],
          [x4, y4],
          [x2, y2],
        ];
        newElement.roughEle = gen.linearPath(points, options);
      }
      break;
    case "DEFAULT": {
      throw Error("Type is invalid");
    }
  }
  return newElement;
};

export default createRoughElement;
