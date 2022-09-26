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
    if (pageNumber !== 1) setPageNumber(pageNumber - 1)
  }
  const nextPagePagination = () => {
    if (pageNumber !== numPages) setPageNumber(pageNumber + 1)
  }
  return (
    <div className='overflow-x-auto'>
      {title && <h1 id='cv-pdf-viewer' className='my-2 text-xl font-bold'>
        {title}
      </h1>}
      <Document
        className='flex justify-center border-2'
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={500} pageNumber={pageNumber} />
      </Document>
      <div className='flex my-1'><button onClick={prevPagePagination} data-mdb-ripple='true'
        data-mdb-ripple-color='light' className="w-8 h-8  flex items-center justify-center bg-blue-700 hover:bg-blue-500 text-white rounded"><ChevronLeft /></button><span className='p-1'>{pageNumber} of {numPages}</span><button onClick={nextPagePagination} data-mdb-ripple='true'
          data-mdb-ripple-color='light' className="h-8 w-8  flex items-center justify-center bg-blue-700 hover:bg-blue-500 text-white rounded"><ChevronRight /></button></div>
    </div>
  );
};

export default PdfDisplay;
