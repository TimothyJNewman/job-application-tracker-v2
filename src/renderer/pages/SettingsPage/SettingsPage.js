import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { toast } from 'react-hot-toast';
import { Selector } from '../../components/microComponents';
import { createDatabaseEntry, readDatabaseEntry } from '../../util/CRUD';

const SettingsPage = () => {
  const { seasonValues, setSeasonValues, currentSeason, setCurrentSeason } =
    useContext(GlobalContext);
  const [currentSeasonLocal, setCurrentSeasonLocal] = useState('');

  useEffect(() => {
    setCurrentSeasonLocal(currentSeason);
  }, []);

  const updateSeason = () => {
    window.electron
      .modifySettings('settings', 'season', currentSeasonLocal)
      .then((result) => {
        if (result !== undefined) {
          setCurrentSeason(currentSeasonLocal);
          toast.success(`Season updated to ${result.value}!`);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  };

  const createSeason = () => {
    window.electron
      .modifySettings('settings', 'season', currentSeasonLocal)
      .then(() => {
        setCurrentSeason(currentSeasonLocal);
        console.log(seasonValues, currentSeasonLocal,seasonValues.every(({ season }) => season !== currentSeasonLocal))
        if (
          !seasonValues.every(({ season }) => season !== currentSeasonLocal)
        ) {
          console.log("New season cannot be duplicate of existing season")
          return;
        } else if (currentSeasonLocal === '') {
          console.error("New season cannot be empty string")
          return;
        } else {
          console.log("New entry")
          createDatabaseEntry(
            'INSERT INTO seasons (season) VALUES (?)',
            [currentSeasonLocal],
            ({ error }) => {
              if (error) console.error(error);
              else {
                toast.success('New season created successfully!');
                readDatabaseEntry(
                  'SELECT * FROM seasons',
                  null,
                  ({ error, result }) => {
                    if (error) console.error(error);
                    else setSeasonValues(result);
                  }
                );
              }
            }
          );
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  };

  return (
    <div className='p-4'>
      <h1 id='settings-page' className='text-xl font-bold tracking-tight'>
        Settings page
      </h1>
      <p>
        Select an existing season or create a new season. Current season:{' '}
        <span className='font-bold'>{currentSeason}</span>
      </p>
      <div className='mb-4'>
        <label
          htmlFor='salutation'
          className='form-label mb-2 inline-block font-medium capitalize text-gray-700'>
          Existing Season
        </label>
        <Selector
          options={seasonValues.map(({ season }) => ({ k: season, v: season }))}
          selected={currentSeasonLocal}
          onChange={(event) => setCurrentSeasonLocal(event.target.value)}
          onBlur={() => updateSeason()}
        />
        <div className='mb-4'>
          <label
            htmlFor='newSeason'
            className='form-label mb-2 inline-block font-medium capitalize text-gray-700'>
            New Season
          </label>
          <input
            type='text'
            className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
            placeholder='Internship 2022'
            name='newSeason'
            id='newSeason'
            value={currentSeasonLocal}
            onChange={(event) => setCurrentSeasonLocal(event.target.value)}
            onBlur={() => createSeason()}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
