"use client";
import React, { createContext, useState, useEffect } from "react";

interface TabContextProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const TabContext = createContext<TabContextProps>({
  activeIndex: 0,
  setActiveIndex: () => {},
});

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const savedIndex = localStorage.getItem("activeTabIndex");
    if (savedIndex !== null) {
      setActiveIndex(Number(savedIndex));
    }
  }, []);

  const updateActiveIndex = (index: number) => {
    setActiveIndex(index);
    localStorage.setItem("activeTabIndex", index.toString());
  };

  return (
    <TabContext.Provider
      value={{ activeIndex, setActiveIndex: updateActiveIndex }}
    >
      {children}
    </TabContext.Provider>
  );
};
