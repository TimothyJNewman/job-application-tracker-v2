import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const PdfDisplay = ({ url, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const prevPagePagination = () => {
    if (pageNumber !== 1) setPageNumber(pageNumber - 1);
  };
  const nextPagePagination = () => {
    if (pageNumber !== numPages) setPageNumber(pageNumber + 1);
  };
  return (
    <div className='overflow-x-auto'>
      {title && (
        <h1 id='cv-pdf-viewer' className='my-2 text-xl font-bold'>
          {title}
        </h1>
      )}
      <Document
        className='flex justify-center border-2'
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={500} pageNumber={pageNumber} />
      </Document>
      <div className='my-1 flex'>
        <button
          onClick={prevPagePagination}
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
          className='flex h-8  w-8 items-center justify-center rounded bg-blue-700 text-white hover:bg-blue-500'>
          <ChevronLeft />
        </button>
        <span className='p-1'>
          {pageNumber} of {numPages}
        </span>
        <button
          onClick={nextPagePagination}
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
          className='flex h-8  w-8 items-center justify-center rounded bg-blue-700 text-white hover:bg-blue-500'>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PdfDisplay;
