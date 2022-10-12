import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import CVUpload from './CVUpload';
import PdfDisplay from '../../../components/PdfDisplay';

const CVSection = ({ id }) => {
  const { appsData, userPath } = useContext(GlobalContext);
  const appDetails = appsData.find((elem) => elem.id === id);
  return (
    <>
      <h1
        id='job-description'
        className='my-2 text-xl font-bold tracking-tight'>
        Curriculam Vitae
      </h1>
      <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
        <div className='grow'>
          <CVUpload id={id} />
        </div>
        <div>
          {appDetails.cv_url !== null ? (
            <PdfDisplay url={`atom://${userPath}${appDetails.cv_url}`} />
          ) : (
            <div
              className='mb-3 w-[500px] rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700'
              role='alert'>
              No CV PDF found. Click generate PDF to create a new one.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CVSection;
