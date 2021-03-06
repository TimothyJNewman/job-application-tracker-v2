import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { readDatabaseEntry } from '../util/CRUD';

const ApplicationDetails = ({ id, setPdfUrl }) => {
  const { appsData } = useContext(GlobalContext);
  const AppsDetails = appsData.filter((e) => e.id === id)[0];

  useEffect(() => {
    if (AppsDetails.is_cv_ready) {
      setPdfUrl({ isReady: true, url: AppsDetails.cv_url });
    } else {
      setPdfUrl({ isReady: false, url: '' });
    }
  }, [setPdfUrl, id, AppsDetails]);

  return (
    <div className='mx-2 grid col-span-1 md:col-span-2'>
      <h1 className='font-bold text-xl'>Application Details</h1>
      <div className='grid grid-cols-2'>
        <p>Id: {AppsDetails.id}</p>
        <p>Company: {AppsDetails.company}</p>
        <p>Role: {AppsDetails.role}</p>
        <p>Job Description: {AppsDetails.job_description}</p>
        <p>Status: {AppsDetails.status}</p>
        <p>Date Applied: {Date(AppsDetails.date_applied)}</p>
      </div>
    </div>
  );
};

export default ApplicationDetails;
