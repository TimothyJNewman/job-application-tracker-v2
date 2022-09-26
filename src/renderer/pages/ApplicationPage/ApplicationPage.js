import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useParams } from 'react-router-dom';
import LetterConstructorSection from './LetterConstructorSection/LetterConstructorSection';
import PdfDisplay from '../../components/PdfDisplay';
import ApplicationDetails from './ApplicationDetails';
import JobDescriptionSection from './JobDescriptionSection/JobDescriptionSection';
import CVConstructorSection from './CVConstructorSection/CVConstructorSection';

const ApplicationPage = () => {
  const { appsData, setAppsData, userPath } = useContext(GlobalContext);
  const id = Number(useParams().id);
  const appDetails = appsData.find((elem) => elem.id === id);

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
              CV Builder
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
          className='fade tab-pane show active'
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
          <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
            <div className='grow'>
              <CVConstructorSection id={id} />
            </div>
            <div>
              {appDetails.cv_url !== null ? (
                <PdfDisplay url={`atom://${userPath}${appDetails.cv_url}`} />
              ) : (
                <div
                  className='mb-3 rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700'
                  role='alert'>
                  No CV PDF found. Click generate pdf to create a new one.
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className='fade tab-pane'
          id='pills-letter'
          role='tabpanel'
          aria-labelledby='pills-letter-tab'>
          <LetterConstructorSection />
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
