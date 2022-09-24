import React, { useState } from 'react';

const JobDescriptionSection = () => {
  const [textArea, setTextArea] = useState("This is a job description")
  return (
    <div className='px-4'>
      <h1 id='job-description' className='my-2 text-xl font-bold'>
        Job Description
      </h1>
      <textarea className='w-full h-48 outline-blue-500 mb-2' value={textArea} onChange={(event) => setTextArea(event.target.value)}></textarea>
    </div>
  );
};

export default JobDescriptionSection;
