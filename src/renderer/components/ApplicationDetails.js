import React, { useState, useEffect, useContext } from 'react';
import { EmojiFrown, EmojiNeutral, EmojiSmile, Tag } from 'react-bootstrap-icons';
import { GlobalContext } from '../context/GlobalContext';
import { readDatabaseEntry } from '../util/CRUD';

const ApplicationDetails = ({ id, setPdfUrl }) => {
  const { appsData } = useContext(GlobalContext);
  const AppsDetails = appsData.filter((elem) => elem.id === id)[0];

  useEffect(() => {
    if (AppsDetails.is_cv_ready) {
      setPdfUrl({ isReady: true, url: AppsDetails.cv_url });
    } else {
      setPdfUrl({ isReady: false, url: '' });
    }
  }, [setPdfUrl, id, AppsDetails]);

  return (<div className='px-4'>
    <div className='flex justify-center pt-6 pb-2'> <div className="flex flex-row rounded shadow bg-blue-50 max-w-xl">
      <div className="w-full object-cover flex items-center justify-center p-4" >{AppsDetails.status === "Rejected" ? <EmojiFrown className='w-36 h-36' /> : AppsDetails.status === "To Apply" ? <EmojiNeutral className='w-36 h-36' /> : AppsDetails.status === "Applied" ? <EmojiSmile className='w-36 h-36' /> : null}</div>
      <div className="p-6 flex flex-col justify-start">
        <h5 className="text-gray-900 text-xl font-medium mb-2">{AppsDetails.company}</h5>
        <p className="text-gray-700 text-base mb-4">
          {AppsDetails.role}
        </p>
        <p className="text-gray-600 text-xs">Date Applied {new Date(AppsDetails.date_applied).toLocaleDateString()}</p>
      </div>
    </div>
    </div>
    <div className='accordion' id='accordionJobDesc'>
      <div
        className='accordion-item border border-gray-200 bg-white'>
        <h2
          className='accordion-header mb-0'
          id="descriptionAccordionHeader">
          <button
            className='accordion-button relative flex w-full items-center rounded-none border-0 bg-white py-2 px-5 text-left text-base text-gray-800 transition focus:outline-none'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target="#descriptionAccordion"
            aria-expanded='false'
            aria-controls="#descriptionAccordion">
            Full job description
          </button>
        </h2>
        <div
          id="descriptionAccordion"
          className='collapse accordion-collapse'
          aria-labelledby="descriptionAccordionHeader"
          data-bs-parent='#accordionJobDesc'>
          <div className='accordion-body w-full px-4 py-2'>
            {AppsDetails.job_description}
          </div>
        </div>
      </div>
    </div></div>
  );
};

export default ApplicationDetails;
