import React, { useState } from 'react';
import CvData from '../../data/CvData';

// add test to check that IDs are unique

const CvConstructorPage = () => {
  const [unusedElements] = useState([...CvData]);
  return (
    <div className='mx-2'>
      <h1 className='font-bold text-xl'>Curriculum vitae</h1>
      <h2>All components</h2>
      <table className='w-full'>
        <thead>
          <tr className='border-y border-slate-500 divide-x divide-slate-200'>
            <th className='pr-2 w-3/12'>Section</th>
            <th className='pl-2 w-9/12'>Title</th>
          </tr>
        </thead>
        <tbody>
          {unusedElements.map((elem) => {
            return (
              <tr
                key={elem.id}
                className={
                  'w-full border-y border-slate-200 hover:bg-slate-500 hover:text-slate-100'
                }>
                <td className='px-2 w-3/12'>{elem.Section}</td>
                <td className='px-2 w-9/12'>{elem?.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CvConstructorPage;
