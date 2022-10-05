import React from 'react';

const FilePicker = ({ onChange, id, name, accept, label }) => {
  if (id == undefined) name = id;
  return (
    <div className='my-2 w-96'>
      <label
        htmlFor={id}
        className='form-label mb-2 inline-block text-gray-700'>
        {label}
      </label>
      <input
        accept={accept}
        onChange={onChange}
        className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
        type='file'
        id={id}
      />
    </div>
  );
};

export default FilePicker;
