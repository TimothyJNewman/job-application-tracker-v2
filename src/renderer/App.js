import React, { useContext, useEffect } from 'react';
import NavBar from './components/NavBar';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import {
  ApplicationPage,
  ApplicationSummaryPage,
  HomePage,
  SettingsPage,
  CVPage,
} from './pages/index';
import GlobalProvider from './context/GlobalProvider';
import { GlobalContext } from './context/GlobalContext';
import { readDatabaseEntry } from './util/CRUD';
import { ErrorBoundary } from 'react-error-boundary';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import { genericSuccessNotification } from './components/Notifications';

const ErrorFallback = ({ error }) => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div>
        <h1 className='text-xl font-bold tracking-tight'>
          <ExclamationTriangleFill className='h-12 w-12 text-red-500' />A fatal
          error occurred!
        </h1>
        <p>
          Click <span className='rounded bg-red-300 px-1 py-0.5'>CTRL+R</span>{' '}
          to refresh app.
        </p>
        <h2 className='mt-5 font-medium'>Full error message:</h2>
        <pre>{error.message}</pre>
      </div>
    </div>
  );
};

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
            if (value !== undefined && value !== '') setCurrentSeason(value);
            else if (result.length === 1) {
              setCurrentSeason(result[0].season);
            }
          })
          .catch((error) => {
            genericSuccessNotification(error.message);
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
          <Route path='/cv' element={<CVPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

const AppWrapper = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </ErrorBoundary>
);

export default AppWrapper;
