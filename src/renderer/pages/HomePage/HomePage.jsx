import React, { useContext, useEffect, useState } from 'react';
import { readDatabaseEntry } from '../../util/CRUD';
import { GlobalContext } from '../../context/GlobalContext';

const HomePage = () => {
  const { currentSeason } = useContext(GlobalContext);
  const [applicationsArray, setApplicationsData] = useState([]);
  useEffect(() => {
    readDatabaseEntry('SELECT * FROM applications', null, ({ result }) => {
      setApplicationsData(result);
    });
  }, []);

  const getHistogramApplications = () => {
    const histogramApplications = {
      'To apply': 0,
      Applied: 0,
      Assessment: 0,
      Interview: 0,
      'Waiting for result': 0,
      Rejected: 0,
      Offer: 0,
    };
    applicationsArray.forEach(({ status }) => {
      histogramApplications[status]++;
    });
    return histogramApplications;
  };

  return (
    <div className='p-4'>
      <p>Welcome to your Job Application Tracker!</p>
      <h1 id='home-page' className='text-xl font-bold tracking-tight'>
        Your <span className='underline'>{applicationsArray.length}</span> applications at a glance
      </h1>
      <ul className='my-4 flex flex-wrap'>
        {Object.entries(getHistogramApplications()).map(([key, value]) => {
          return (
            <li className='flex h-32 w-24 flex-col items-center justify-center rounded-md transition-colors hover:bg-gray-200 hover:shadow'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-green-200 text-2xl font-semibold shadow-md'>
                {value}
              </div>
              <span className='text-sm text-center mt-4 h-8 text-gray-600'>{key}</span>
            </li>
          );
        })}
      </ul>
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
