import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LetterConstructorSection from './LetterConstructorSection/LetterConstructorSection';
import PdfDisplay from '../../components/PdfDisplay';
import ApplicationDetails from './ApplicationDetails';
import JobDescriptionSection from './JobDescriptionSection/JobDescriptionSection';
import CvConstructorSection from './CvConstructorSection/CvConstructorSection';

export default function ApplicationPage() {
  const [pdfUrl, setPdfUrl] = useState("");
  const id = Number(useParams().id);
  return (
    <div>
      <ApplicationDetails id={id} setPdfUrl={setPdfUrl} />
      <div className='px-4'> <ul className="nav nav-pills flex flex-col sm:flex-row flex-wrap list-none pl-0" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <a href="#pills-desc" className=" nav-link block font-medium text-xs leading-tight uppercase rounded px-6 py-3 my-2 sm:mr-2 focus:outline-none focus:ring-0 active" id="pills-desc-tab" data-bs-toggle="pill" data-bs-target="#pills-desc" role="tab" aria-controls="pills-desc"
            aria-selected="true">Job Description</a>
        </li>
        <li className="nav-item" role="presentation">
          <a href="#pills-cv" className=" nav-link block font-medium text-xs leading-tight uppercase rounded px-6 py-3 my-2 sm:mx-2 focus:outline-none focus:ring-0" id="pills-cv-tab" data-bs-toggle="pill" data-bs-target="#pills-cv" role="tab"
            aria-controls="pills-cv" aria-selected="false">CV Builder</a>
        </li>
        <li className="nav-item" role="presentation">
          <a href="#pills-letter" className=" nav-link block font-medium text-xs leading-tight uppercase rounded px-6 py-3 my-2 sm:mx-2 focus:outline-none focus:ring-0" id="pills-letter-tab" data-bs-toggle="pill" data-bs-target="#pills-letter" role="tab"
            aria-controls="pills-letter" aria-selected="false">Letter Builder</a>
        </li>
      </ul></div>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-desc" role="tabpanel" aria-labelledby="pills-desc-tab">
          <JobDescriptionSection />
        </div>
        <div className="tab-pane fade" id="pills-cv" role="tabpanel" aria-labelledby="pills-cv-tab">
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
        <div className="tab-pane fade" id="pills-letter" role="tabpanel" aria-labelledby="pills-letter-tab">
          <div className='px-4'>Letter constructor</div>
        </div>
      </div>
    </div>
  );
}
