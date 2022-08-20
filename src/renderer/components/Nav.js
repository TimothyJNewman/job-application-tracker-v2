import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification';
import { GlobalContext } from '../context/GlobalContext';

const navLinks = [
  { name: 'Applications', url: '/' },
  { name: 'Curriculam Vitae', url: '/cv-page' },
];

export default function Nav() {
  const { notification } = useContext(GlobalContext);
  return (
    <nav className='flex w-full p-1 bg-slate-200 h-12'>
      <div className='flex divide-x divide-slate-500'>
        {navLinks.map((elem) => (
          <Link
            to={elem.url}
            key={elem.name}
            className='p-2 hover:bg-slate-500 hover:text-slate-100'>
            {elem.name}
          </Link>
        ))}
      </div>
      {notification.text ? (
        <Notification className={'grow'} text={notification.text} severity={'low'} />
      ) : (
        ''
      )}
    </nav>
  );
}
