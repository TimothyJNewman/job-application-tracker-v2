import React, { useState } from 'react';
import { GlobalContext } from './GlobalContext';

const GlobalProvider = (props) => {
  const [appsData, setAppsData] = useState([]);
  const [userPath, setUserPath] = useState('');
  return (
    <GlobalContext.Provider
      value={{
        appsData,
        setAppsData,
        userPath,
        setUserPath,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
