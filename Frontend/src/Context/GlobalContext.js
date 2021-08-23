import React, { createContext, useContext, useReducer } from "react";
import authinit from "./init-state/authInit";
import authReducer from "./Reducer/authReducer";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authinit);

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
