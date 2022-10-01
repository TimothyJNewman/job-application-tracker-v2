import React, { useState } from 'react';
import { GlobalContext } from './GlobalContext';

const GlobalProvider = (props) => {
  const [appsData, setAppsData] = useState([]);
  const [userPath, setUserPath] = useState('');
  const [seasonValues, setSeasonValues] = useState([]);
  const [currentSeason, setCurrentSeason] = useState('');
  return (
    <GlobalContext.Provider
      value={{
        appsData,
        setAppsData,
        userPath,
        setUserPath,
        seasonValues,
        setSeasonValues,
        currentSeason,
        setCurrentSeason,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
