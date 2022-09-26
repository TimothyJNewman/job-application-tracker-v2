import React, { useContext, useEffect } from 'react';
import NavBar from './components/NavBar';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ApplicationPage, ApplicationSummaryPage } from './pages/index';
import GlobalProvider from './context/GlobalProvider';
import HomePage from './pages/HomePage/HomePage';
import { GlobalContext } from './context/GlobalContext';

const App = () => {
  const { setUserPath } = useContext(GlobalContext)
  useEffect(() => {
    window.electron.getPath("get-user-data-path").then((path) => { setUserPath(path) })
  }, [])
  return (
    <div className='App'>
      <Toaster />
      <Router>
        <NavBar />
        <Routes>
          <Route path='/application/:id' element={<ApplicationPage />} />
          <Route path='/applications' element={<ApplicationSummaryPage />} />
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
