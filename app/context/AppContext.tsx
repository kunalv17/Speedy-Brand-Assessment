"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextType {
  activeState: number;
  setActiveState: React.Dispatch<React.SetStateAction<number>>;
  customData: ISuggestedData[];
  setCustomData: React.Dispatch<React.SetStateAction<ISuggestedData[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeState, setActiveState] = useState<number>(() => {
    const storedState =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("activeState")
        : null;
    return storedState ? Number(storedState) : 0;
  });
  const [customData, setCustomData] = useState<ISuggestedData[]>(() => {
    const storedState =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("customData")
        : null;
    return storedState ? JSON.parse(storedState) : [];
  });

  useEffect(() => {
    localStorage.setItem("activeState", activeState.toString());
  }, [activeState]);

  useEffect(() => {
    localStorage.setItem("customData", JSON.stringify(customData));
  }, [customData]);

  const contextValue: AppContextType = {
    activeState,
    setActiveState,
    customData,
    setCustomData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContextProvider, useAppContext };
