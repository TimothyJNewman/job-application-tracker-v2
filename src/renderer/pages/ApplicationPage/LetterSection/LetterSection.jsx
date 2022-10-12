import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import LetterUpload from './LetterUpload';
import PdfDisplay from '../../../components/PdfDisplay';
import { Switch } from '../../../components/microComponents';
import LetterConstructorSection from './LetterConstructorSection';

const LetterSection = ({ id }) => {
  const [useLetterBuilder, setUseLetterBuilder] = useState(false);
  const { appsData, userPath } = useContext(GlobalContext);
  const appDetails = appsData.find((elem) => elem.id === id);

  return (
    <>
      <h1 id='letter' className='my-2 text-xl font-bold tracking-tight'>
        Letter
      </h1>
      <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
        <div className='grow'>
          <Switch
            isChecked={useLetterBuilder}
            setIsChecked={setUseLetterBuilder}
            id='letterBuilderToggle'
            name='letterBuilderToggle'
            label='Use Letter Builder'
          />
          {useLetterBuilder ? (
            <LetterConstructorSection id={id} />
          ) : (
            <LetterUpload id={id} />
          )}
        </div>
        <div>
          {appDetails.cover_letter_url !== null ? (
            <PdfDisplay
              url={`atom://${userPath}${appDetails.letter_url}`}
            />
          ) : (
            <div
              className='mb-3 w-[500px] rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700'
              role='alert'>
              No Letter found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LetterSection;
