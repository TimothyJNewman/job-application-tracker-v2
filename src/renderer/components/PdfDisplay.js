import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

// TODO make pdf text fitwidth

const PdfDisplay = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages })=> {
    setNumPages(numPages);
  }
  return (
    <div className='pt-4'>
      <h1 id='cv-pdf-viewer' className='text-xl font-bold'>
        CV pdf viewer
      </h1>
      {/* <embed
        src={`data:application/pdf;base64,${url}`}
        type='application/pdf'
        width={'100%'}
        style={{ height: 'calc(100vh - 3rem)' }}
      /> */}
      <Document file={`data:application/pdf;base64,${url}`} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={400} pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PdfDisplay;
