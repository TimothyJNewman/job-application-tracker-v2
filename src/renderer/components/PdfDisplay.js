import React from 'react';

// make pdf text fitwidth

const PdfDisplay = ({ url }) => {
  return (
    <div className='mx-2'>
      <h1 id='cv-pdf-viewer' className='font-bold text-xl'>
        CV pdf viewer
      </h1>
      <embed
        src={`data:application/pdf;base64,${url}`}
        type='application/pdf'
        width={'100%'}
        style={{ height: 'calc(100vh - 3rem)' }}
      />
    </div>
  );
};

export default PdfDisplay;
