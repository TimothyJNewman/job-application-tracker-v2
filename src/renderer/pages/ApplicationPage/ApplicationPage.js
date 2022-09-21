import React, { useState } from 'react';
import CvConstructorPage from '../CvConstructorPage/CvConstructorPage';
import { useParams } from 'react-router-dom';
import LetterConstructorPage from '../LetterConstructorPage/LetterConstructorPage';
import PdfDisplay from '../../components/PdfDisplay';
import ApplicationDetails from './ApplicationDetails';

export default function ApplicationPage() {
  const [pdfState, setPdfUrl] = useState({ isReady: false, url: '' });
  const id = Number(useParams().id);
  return (
    <div>
      <ApplicationDetails id={id} setPdfUrl={setPdfUrl} />
      <div className='flex flex-col sm:flex-row'><div className='grow'><CvConstructorPage id={id} setPdfUrl={setPdfUrl} /></div><div className=''>
        {pdfState.isReady ? (
          <PdfDisplay url={pdfState.url} />
        ) : (
          <p className='pt-4 px-4'>
            No CV PDF found. Click generate pdf to create a new one.
          </p>
        )}
      </div></div>
    </div>
    // <div className='flex flex-col sm:flex-row'>
    //   <div className='grow flex flex-col'>
    //     <ApplicationDetails id={id} setPdfUrl={setPdfUrl} />
    //     <CvConstructorPage id={id} setPdfUrl={setPdfUrl} />
    //     <LetterConstructorPage id={id} />
    //   </div>

    // </div>
  );
}
