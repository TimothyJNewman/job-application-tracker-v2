import React from 'react';

const Notification = ({ text, severity, className }) => {
  return (
    <div
      className={`${
        severity === 'high' ? 'bg-red-200' : ''
      } ${className} p-2 text-right`}>
      Notifications: {text}
    </div>
  );
};

export default Notification;
