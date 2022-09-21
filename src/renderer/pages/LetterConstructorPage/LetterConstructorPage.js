import React from 'react';

const LetterConstructorPage = (props) => {
  return (
    <div className='px-4'>
      <h1 id='letter-contructor' className='my-2 text-xl font-bold'>
        Letter Constructor
      </h1>
      <p>Id: {props.id}</p>
    </div>
  );
};

export default LetterConstructorPage;
