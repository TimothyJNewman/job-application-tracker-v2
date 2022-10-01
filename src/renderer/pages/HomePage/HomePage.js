import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const HomePage = () => {
  const { currentSeason } = useContext(GlobalContext);
  return (
    <div className='p-4'>
      <h1 id='home-page' className='text-xl font-bold tracking-tight'>
        You applications at a glance
      </h1>
      <p>Welcome to your Job Application Tracker!</p>
      {(currentSeason === '' || currentSeason === undefined) && (
        <p>
          Current season eg. "2020 Application Season" not set. This can be set
          in the setting page.
        </p>
      )}
    </div>
  );
};

export default HomePage;
