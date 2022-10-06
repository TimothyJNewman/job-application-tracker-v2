import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useParams } from 'react-router-dom';
import LetterConstructorSection from './LetterSection/LetterSection';
import ApplicationDetails from './ApplicationDetails';
import JobDescriptionSection from './JobDescriptionSection/JobDescriptionSection';
import CVSection from './CVSection/CVSection';

const ApplicationPage = () => {
  const { appsData, setAppsData } = useContext(GlobalContext);
  const id = Number(useParams().id);

  return (
    <div className='px-4'>
      <ApplicationDetails
        id={id}
        appsData={appsData}
        setAppsData={setAppsData}
      />
      <div>
        <ul
          className='nav nav-pills flex list-none flex-col flex-wrap pl-0 sm:flex-row'
          id='pills-tab'
          role='tablist'>
          <li className='nav-item' role='presentation'>
            <a
              href='#pills-desc'
              className=' nav-link active my-2 block rounded px-6 py-3 text-xs font-medium uppercase leading-tight focus:outline-none focus:ring-0 sm:mr-2'
              id='pills-desc-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-desc'
              role='tab'
              aria-controls='pills-desc'
              aria-selected='true'>
              Job Description
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              href='#pills-cv'
              className=' nav-link my-2 block rounded px-6 py-3 text-xs font-medium uppercase leading-tight focus:outline-none focus:ring-0 sm:mx-2'
              id='pills-cv-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-cv'
              role='tab'
              aria-controls='pills-cv'
              aria-selected='false'>
              Curriculam Vitae
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              href='#pills-letter'
              className=' nav-link my-2 block rounded px-6 py-3 text-xs font-medium uppercase leading-tight focus:outline-none focus:ring-0 sm:mx-2'
              id='pills-letter-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-letter'
              role='tab'
              aria-controls='pills-letter'
              aria-selected='false'>
              Letter Builder
            </a>
          </li>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        <div
          className='active show tab-pane fade'
          id='pills-desc'
          role='tabpanel'
          aria-labelledby='pills-desc-tab'>
          <JobDescriptionSection id={id} />
        </div>
        <div
          className='fade tab-pane'
          id='pills-cv'
          role='tabpanel'
          aria-labelledby='pills-cv-tab'>
          <CVSection id={id} />
        </div>
        <div
          className='fade tab-pane'
          id='pills-letter'
          role='tabpanel'
          aria-labelledby='pills-letter-tab'>
          <LetterConstructorSection id={id} />
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
