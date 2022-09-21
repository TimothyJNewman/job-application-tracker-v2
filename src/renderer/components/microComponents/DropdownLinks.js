import React from 'react';
import { Link } from "react-router-dom"
import { ArrowUpRightSquare, BoxArrowUpRight, DoorOpen, ThreeDotsVertical } from 'react-bootstrap-icons';

const DropdownLinks = ({ values = [], className }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div>
        <div className='dropdown relative'>
          <span
            className='cursor-pointer dropdown-toggle uppercase flex px-2 py-2 items-center justify-center whitespace-nowrap rounded bg-blue-600 text-xs font-medium leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:text-white active:shadow-lg'
            id='dropdownMenuButton2'
            data-bs-toggle='dropdown'
            aria-expanded='false' data-mdb-ripple='true'
            data-mdb-ripple-color='light'>
            <ArrowUpRightSquare className='mr-1' />Open
          </span>
          <ul
            className=' dropdown-menu absolute z-50 float-left m-0 mt-1 hidden min-w-max list-none rounded-lg border-none bg-white bg-clip-padding py-2 text-left text-base shadow-lg'
            aria-labelledby='dropdownMenuButton2'>
            {values.map(({ label, link }) => (
              <li key={link}>
                <Link
                  className='dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-gray-700 hover:bg-gray-100'
                  to={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownLinks;
