import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LetterConstructorSection from './LetterConstructorSection/LetterConstructorSection';
import PdfDisplay from '../../components/PdfDisplay';
import ApplicationDetails from './ApplicationDetails';
import JobDescriptionSection from './JobDescriptionSection/JobDescriptionSection';
import CvConstructorSection from './CvConstructorSection/CvConstructorSection';
import { GlobalContext } from '../../context/GlobalContext';

export default function ApplicationPage() {
  const { appsData, setAppsData } = useContext(GlobalContext);
  const [pdfUrl, setPdfUrl] = useState('');
  const id = Number(useParams().id);
  const appDetails = appsData.filter((elem) => elem.id === id)[0];

  useEffect(() => {
    setPdfUrl(appDetails.cv_url);
  }, [appDetails]);

  return (
    <div>
      <ApplicationDetails
        id={id}
        appDetails={appDetails}
        setAppsDetails={setAppsData}
      />
      <div className='px-4'>
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
          <JobDescriptionSection />
        </div>
        <div
          className='fade tab-pane'
          id='pills-cv'
          role='tabpanel'
          aria-labelledby='pills-cv-tab'>
          <div className='flex flex-col overflow-x-auto sm:flex-row'>
            <div className='grow'>
              <CvConstructorSection id={id} setPdfUrl={setPdfUrl} />
            </div>
            <div>
              {pdfUrl !== null ? (
                <PdfDisplay url={pdfUrl} />
              ) : (
                <p className='px-4 pt-4'>
                  No CV PDF found. Click generate pdf to create a new one.
                </p>
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
}
