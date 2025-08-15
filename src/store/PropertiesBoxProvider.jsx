import { COLORS } from "../constants";
import propertiesContext from "./properties-box-context";

import React, { useReducer } from "react";

const initialpropertiesBoxState = {
  LINE: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  RECTANGLE: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  CIRCLE: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  ARROW: {
    stroke: COLORS.BLACK,
    size: 1,
  },
};
const PropertiesBoxProvider = ({ children }) => {
  const [propertiesBoxState, dispatchpropertiesBoxAction] = useReducer(
    propertiesBoxReducer,
    initialpropertiesBoxState
  );
  const propertiesBoxValue = {
    propertiesBoxState,
  };
  return (
    <propertiesContext.Provider value={propertiesBoxValue}>
      {children}
    </propertiesContext.Provider>
  );
};

export default PropertiesBoxProvider;
