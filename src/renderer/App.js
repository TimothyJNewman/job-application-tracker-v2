import React, { useContext, useEffect } from 'react';
import NavBar from './components/NavBar';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {
  ApplicationPage,
  ApplicationSummaryPage,
  HomePage,
  SettingsPage,
} from './pages/index';
import GlobalProvider from './context/GlobalProvider';
import { GlobalContext } from './context/GlobalContext';
import { readDatabaseEntry } from './util/CRUD';
import { toast } from 'react-hot-toast';

const App = () => {
  const { setUserPath, setSeasonValues, setCurrentSeason } =
    useContext(GlobalContext);

  useEffect(() => {
    window.electron.getPath('get-user-data-path').then((path) => {
      setUserPath(path);
    });
    readDatabaseEntry('SELECT * FROM seasons', null, ({ error, result }) => {
      if (error) console.error(error);
      else {
        setSeasonValues(result);
        window.electron
          .modifySettings('settings', 'season')
          .then((value) => {
            console.log(value);
            if (value !== undefined && value !== '') setCurrentSeason(value);
            else if (result.length === 1) {
              console.log(result[0].season);
              setCurrentSeason(result[0].season);
            }
          })
          .catch((error) => {
            toast.error(error.message);
            console.error(error);
          });
      }
    });
  }, []);

  return (
    <div className='App'>
      <Toaster />
      <Router>
        <NavBar />
        <Routes>
          <Route path='/application/:id' element={<ApplicationPage />} />
          <Route path='/applications' element={<ApplicationSummaryPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

const AppWrapper = () => (
  <GlobalProvider>
    <App />
  </GlobalProvider>
);

export default AppWrapper;
