import React from 'react';
import Nav from './components/Nav';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApplicationPage,
  ApplicationSummaryPage,
  CvConstructorPage,
} from './pages/index';
import GlobalProvider from './context/GlobalProvider';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Nav />
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
