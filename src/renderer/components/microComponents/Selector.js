import React from 'react';

const Selector = ({ options, selected, onChange }) => (
  <div className='min-w-[9rem] xl:max-w-[96rem]'>
    <select
      onChange={onChange}
      className='form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
      aria-label='Default select example'>
      {options.map(({ k, v }) => (
        <option key={k} selected={k === selected} value={k}>
          {v}
        </option>
      ))}
    </select>
  </div>
);

export default Selector;