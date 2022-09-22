import React, { useState } from 'react';
import CvConstructorSection from '../CvConstructorSection/CvConstructorSection';
import { useParams } from 'react-router-dom';
import LetterConstructorSection from '../LetterConstructorSection/LetterConstructorSection';
import PdfDisplay from '../../components/PdfDisplay';
import ApplicationDetails from './ApplicationDetails';

export default function ApplicationPage() {
  const [pdfState, setPdfUrl] = useState({ isReady: false, url: '' });
  const id = Number(useParams().id);
  return (
    <div>
      <ApplicationDetails id={id} setPdfUrl={setPdfUrl} />
      <div className='flex flex-col sm:flex-row overflow-x-auto'>
        <div className='grow'>
          <CvConstructorSection id={id} setPdfUrl={setPdfUrl} />
        </div>
        <div className=''>
          {pdfState.isReady ? (
            <PdfDisplay url={pdfState.url} />
          ) : (
            <p className='px-4 pt-4'>
              No CV PDF found. Click generate pdf to create a new one.
            </p>
          )}
        </div>
      </div>
    </div>
    // <div className='flex flex-col sm:flex-row'>
    //   <div className='grow flex flex-col'>
    //     <ApplicationDetails id={id} setPdfUrl={setPdfUrl} />
    //     <CvConstructorSection id={id} setPdfUrl={setPdfUrl} />
    //     <LetterConstructorSection id={id} />
    //   </div>

    // </div>
  );
}
