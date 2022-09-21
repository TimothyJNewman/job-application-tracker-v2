import React, { useState } from 'react';
import { GlobalContext } from './GlobalContext';

const GlobalProvider = (props) => {
  const [appsData, setAppsData] = useState([]);
  return (
    <GlobalContext.Provider
      value={{
        appsData,
        setAppsData,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
