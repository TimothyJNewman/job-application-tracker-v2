import React, { useState, useEffect, useContext } from 'react';
import {
  EmojiFrown,
  EmojiNeutral,
  EmojiSmile,
  Tag,
} from 'react-bootstrap-icons';
import { updateDatabaseEntry } from '../../util/CRUD';
import { Selector } from '../../components/microComponents';

const ApplicationDetails = ({ id, appsData, setAppsData }) => {
  const appDetails = appsData.find((elem) => elem.id === id);

  const updateValue = (newValue, field) => {
    if (field === 'company') {
      const newAppsData = appsData.map((elem) => {
        if (elem.id === id) return { ...elem, company: newValue };
        return elem;
      });
      setAppsData(newAppsData);
    } else if (field === 'role') {
      const newAppsData = appsData.map((elem) => {
        if (elem.id === id) return { ...elem, role: newValue };
        return elem;
      });
      setAppsData(newAppsData);
    } else if (field === 'status') {
      const newAppsData = appsData.map((elem) => {
        if (elem.id === id) return { ...elem, status: newValue };
        return elem;
      });
      setAppsData(newAppsData);
    }
  };

  const saveValue = (field) => {
    updateDatabaseEntry(
      `UPDATE applications SET ${field}=? WHERE id=?`,
      [appDetails[field], id],
      ({ error }) => {
        if (error) console.error(error);
      }
    );
  };

  return (
    <div className='flex flex-col items-center gap-x-4 px-4 sm:flex-row'>
      <div className='flex w-fit justify-center pt-6 pb-2'>
        <div className='flex max-w-xl flex-row rounded bg-blue-50 shadow transition-colors duration-100 hover:bg-yellow-50'>
          <div className='flex w-full flex-col items-center justify-center gap-y-2 object-cover p-4'>
            {appDetails.status === 'Rejected' ? (
              <EmojiFrown className='h-36 w-36' />
            ) : appDetails.status === 'To Apply' ? (
              <EmojiNeutral className='h-36 w-36' />
            ) : appDetails.status === 'Applied' ? (
              <EmojiSmile className='h-36 w-36' />
            ) : null}
            <Selector
              options={[
                { k: 'Rejected', v: 'Rejected' },
                { k: 'To Apply', v: 'To Apply' },
                { k: 'Applied', v: 'Applied' },
              ]}
              selected={appDetails.status}
              onChange={(event) => updateValue(event.target.value, 'status')}
            />
          </div>
          <div className='flex flex-col justify-start p-6'>
            <input
              className='bg-inherit p-1 text-xl font-medium text-gray-900 outline-blue-500'
              type='text'
              placeholder='Company'
              value={appDetails.company}
              onChange={(event) => updateValue(event.target.value, 'company')}
              onBlur={() => saveValue('company')}
            />
            <input
              className='bg-inherit p-1 text-base text-gray-700 outline-blue-500'
              type='text'
              placeholder='Role'
              value={appDetails.role}
              onChange={(event) => updateValue(event.target.value, 'role')}
              onBlur={() => saveValue('role')}
            />
            <p className='px-1 text-xs text-gray-600'>
              Date Applied{' '}
              {new Date(appDetails.date_applied).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      {/* <div className='flex w-full grow items-center'>
        <div className='accordion w-full' id='accordionJobDesc'>
          <div className='accordion-item border border-gray-200 bg-white'>
            <h2
              className='accordion-header mb-0'
              id='descriptionAccordionHeader'>
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
                {appDetails.job_description}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ApplicationDetails;
