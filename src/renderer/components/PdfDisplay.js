import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const PdfDisplay = ({ url, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <div className='overflow-x-auto px-4'>
      <h1 id='cv-pdf-viewer' className='my-2 text-xl font-bold'>
        {title}
      </h1>
      <Document
        className='flex justify-center border-2'
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={500} pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PdfDisplay;
