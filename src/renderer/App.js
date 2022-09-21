import React from 'react';
import NavBar from './components/NavBar';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {
  ApplicationPage,
  ApplicationSummaryPage,
  CvConstructorPage,
} from './pages/index';
import GlobalProvider from './context/GlobalProvider';

const App = () => {
  return (
    <div className='App'>
      <Toaster />
      <Router>
        <NavBar />
        <Routes>
          <Route path='/cv-page/:id' element={<CvConstructorPage />} />
          <Route path='/application/:id' element={<ApplicationPage />} />
          <Route path='/' element={<ApplicationSummaryPage />} />
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
