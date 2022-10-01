import React from 'react';

const Switch = ({ isChecked, setIsChecked, id, name, label }) => {
  if (id == undefined) name = id;
  return (
    <div className='form-check form-switch'>
      <input
        className='form-check-input float-left -ml-10 h-5 w-9 cursor-pointer appearance-none rounded-full bg-white bg-gray-300 bg-contain bg-no-repeat align-top shadow-sm focus:outline-none'
        id={id}
        name={name}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        type='checkbox'
        role='switch'
      />
      {label != null && (
        <label
          className='form-check-label inline-block text-gray-800'
          htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Switch;
