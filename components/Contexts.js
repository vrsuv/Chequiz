import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SetSettings = ({ children }) => {
  const [isHaptic, setIsHaptic] = useState(true);

  const toggleHaptic = () => {
    setIsHaptic((enable) => !enable);
  };

  return (
    <SettingsContext.Provider value={{ isHaptic, toggleHaptic }}>
      {children}
    </SettingsContext.Provider>
  );
};




