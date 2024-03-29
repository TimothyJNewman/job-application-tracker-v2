import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', url: '/' },
  { name: 'Applications', url: '/applications' },
  // { name: 'Curriculum Vitae', url: '/cv' },
  { name: 'Settings', url: '/settings' },
];

const NavBar = () => {
  return (
    <nav className='navbar navbar-light navbar-expand-sm relative flex w-full flex-wrap items-center justify-between bg-gray-100 text-gray-500 shadow-lg hover:text-gray-700 focus:text-gray-700'>
      <div className='container-fluid box-border flex w-full flex-wrap items-center justify-between px-6 py-2'>
        <button
          className=' navbar-toggler border-0 bg-transparent py-1 px-1.5 text-gray-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='bars'
            className='w-4'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'>
            <path
              fill='currentColor'
              d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'></path>
          </svg>
        </button>
        <div
          className='collapse navbar-collapse flex-grow items-center'
          id='navbarSupportedContent'>
          <ul className='list-style-none navbar-nav mr-auto flex flex-col pl-0'>
            {navLinks.map((elem) => (
              <li className='nav-item pr-2' key={elem.name}>
                <Link
                  to={elem.url}
                  data-mdb-ripple='true'
                  data-mdb-ripple-color='light'
                  className='nav-link inline-block rounded px-2 py-2 text-gray-500 hover:bg-gray-200 focus:text-gray-700 sm:px-0'>
                  {elem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
