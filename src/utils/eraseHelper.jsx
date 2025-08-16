import { isPointNearLine, distanceBetweenPoints } from "./math";
export const isPointNearElement = (element, pointX, pointY) => {
  const { x1, y1, x2, y2, type } = element;
  const ctx = document.getElementById("myCanvas").getContext("2d");
  switch (type) {
    case "LINE":
    case "ARROW":
      return isPointNearLine(x1, y1, x2, y2, pointX, pointY);
    case "RECTANGLE":
      return (
        isPointNearLine(x1, y1, x2, y1, pointX, pointY) ||
        isPointNearLine(x2, y1, x2, y2, pointX, pointY) ||
        isPointNearLine(x2, y2, x1, y2, pointX, pointY) ||
        isPointNearLine(x1, y2, x1, y1, pointX, pointY)
      );
    case "CIRCLE":
      const r = distanceBetweenPoints(x1, y1, x2, y2);
      return (
        isPointNearLine(x1 - r, y1 - r, x1 + r, y1 - r, pointX, pointY) ||
        isPointNearLine(x1 + r, y1 - r, x1 + r, y1 + r, pointX, pointY) ||
        isPointNearLine(x1 + r, y1 + r, x1 - r, y1 + r, pointX, pointY) ||
        isPointNearLine(x1 - r, y1 + r, x1 - r, y1 - r, pointX, pointY)
      );
    case "BRUSH": {
      return ctx.isPointInPath(element.path, pointX, pointY);
    }
    case "DEFAULT":
      break;
  }
  return false;
};
