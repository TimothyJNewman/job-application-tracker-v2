import React, { useState, useContext } from 'react';
import { Switch } from '../../../components/microComponents';
import { GlobalContext } from '../../../context/GlobalContext';
import CVUpload from './CVUpload';
import CVConstructorSection from './CVConstructorSection/CVConstructorSection';
import PdfDisplay from '../../../components/PdfDisplay';

const CVSection = ({ id }) => {
  const [useCVBuilder, setUseCVBuilder] = useState(false);
  const { appsData, userPath } = useContext(GlobalContext);
  const appDetails = appsData.find((elem) => elem.id === id);
  return (
    <>
      <h1 id='job-description' className='my-2 text-xl font-bold'>
        Curriculam Vitae
      </h1>
      <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
        <div className='grow'>
          <Switch
            isChecked={useCVBuilder}
            setIsChecked={setUseCVBuilder}
            id='cvBuilderToggle'
            name='cvBuilderToggle'
            label='Use CV Builder'
          />
          {useCVBuilder ? (
            <CVConstructorSection id={id} />
          ) : (
            <CVUpload id={id} />
          )}
        </div>
        <div>
          {appDetails.cv_url !== null ? (
            <PdfDisplay url={`atom://${userPath}${appDetails.cv_url}`} />
          ) : (
            <div
              className='mb-3 rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700 w-[500px]'
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
