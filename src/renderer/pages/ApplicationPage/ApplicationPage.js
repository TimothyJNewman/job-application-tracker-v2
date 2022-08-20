import React, { useState } from 'react';
import CvConstructorPage from '../CvConstructorPage/CvConstructorPage';
import { useParams } from 'react-router-dom';
import LetterConstructorPage from '../LetterConstructorPage/LetterConstructorPage';
import PdfDisplay from '../../components/PdfDisplay';
import ApplicationDetails from '../../components/ApplicationDetails';

export default function ApplicationPage() {
  const [pdfState, setPdfUrl] = useState({ isReady: false, url: '' });
  const id = Number(useParams().id);
  return (
    <div className='grid grid-cols-12'>
      <div className='flex flex-col col-span-8'>
        <ApplicationDetails id={id} setPdfUrl={setPdfUrl} />
        <CvConstructorPage id={id} setPdfUrl={setPdfUrl} />
        <LetterConstructorPage id={id} />
      </div>
      <div className='col-span-4'>
        {pdfState.isReady ? (
          <PdfDisplay url={pdfState.url} />
        ) : (
          <p className='mx-2'>
            No CV PDF found. Click generate pdf to create a new one.
          </p>
        )}
      </div>
    </div>
  );
}
