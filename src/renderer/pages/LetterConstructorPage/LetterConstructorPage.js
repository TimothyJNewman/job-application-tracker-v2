import React from 'react';

const LetterConstructorPage = (props) => {
  return (
    <div className='mx-2'>
      <h1 id='letter-contructor' className='font-bold text-xl'>
        Letter Constructor
      </h1>
      <p>Id: {props.id}</p>
    </div>
  );
};

export default LetterConstructorPage;
