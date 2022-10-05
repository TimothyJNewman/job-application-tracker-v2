import React, { useContext, useEffect } from 'react';
import NavBar from './components/NavBar';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import {
  ApplicationPage,
  ApplicationSummaryPage,
  HomePage,
  SettingsPage,
} from './pages/index';
import GlobalProvider from './context/GlobalProvider';
import { GlobalContext } from './context/GlobalContext';
import { readDatabaseEntry } from './util/CRUD';
import { ErrorBoundary } from 'react-error-boundary'
import {  ExclamationTriangleFill } from 'react-bootstrap-icons';

const ErrorFallback = ({ error }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div><h1 className="font-bold tracking-tight text-xl"><ExclamationTriangleFill className="w-12 h-12 text-red-500"/>A fatal error occurred!</h1>
      <p>Click <span className="rounded bg-red-300 px-1 py-0.5">CTRL+R</span> to refresh app.</p>
      <h2 className="font-medium mt-5">Full error message:</h2>
      <pre>{error.message}</pre></div>
    </div>
  )
}

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
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
  >
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </ErrorBoundary>
);

export default AppWrapper;
