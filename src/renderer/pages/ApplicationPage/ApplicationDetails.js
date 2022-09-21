import React, { useState, useEffect, useContext } from 'react';
import {
  EmojiFrown,
  EmojiNeutral,
  EmojiSmile,
  Tag,
} from 'react-bootstrap-icons';
import { GlobalContext } from '../../context/GlobalContext';
import { readDatabaseEntry } from '../../util/CRUD';

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

  return (
    <div className='px-4 flex flex-col sm:flex-row gap-x-4 items-center'>
      <div className='flex justify-center pt-6 pb-2 w-fit'>
        <div className='flex max-w-xl flex-row rounded bg-blue-50 shadow'>
          <div className='flex w-full items-center justify-center object-cover p-4'>
            {AppsDetails.status === 'Rejected' ? (
              <EmojiFrown className='h-36 w-36' />
            ) : AppsDetails.status === 'To Apply' ? (
              <EmojiNeutral className='h-36 w-36' />
            ) : AppsDetails.status === 'Applied' ? (
              <EmojiSmile className='h-36 w-36' />
            ) : null}
          </div>
          <div className='flex flex-col justify-start p-6'>
            <h5 className='mb-2 text-xl font-medium text-gray-900'>
              {AppsDetails.company}
            </h5>
            <p className='mb-4 text-base text-gray-700'>{AppsDetails.role}</p>
            <p className='text-xs text-gray-600'>
              Date Applied{' '}
              {new Date(AppsDetails.date_applied).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-center grow w-full'>
      <div className='accordion w-full' id='accordionJobDesc'>
        <div className='accordion-item border border-gray-200 bg-white'>
          <h2 className='accordion-header mb-0' id='descriptionAccordionHeader'>
            <button
              className='accordion-button relative flex w-full items-center rounded-none border-0 bg-white py-2 px-5 text-left text-base text-gray-800 transition focus:outline-none'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#descriptionAccordion'
              aria-expanded='false'
              aria-controls='#descriptionAccordion'>
              Full job description
            </button>
          </h2>
          <div
            id='descriptionAccordion'
            className='collapse accordion-collapse'
            aria-labelledby='descriptionAccordionHeader'
            data-bs-parent='#accordionJobDesc'>
            <div className='accordion-body w-full px-4 py-2'>
              {AppsDetails.job_description}
            </div>
          </div>
        </div>
      </div></div>
    </div>
  );
};

export default ApplicationDetails;
