import React from 'react';

const ErrorDisplayer = ({ msg }) => {
  const err = msg ? msg : 'Ooops - something went wrong. Path not found: 404'
  return (
    <section>
      <img src="http://icons.iconarchive.com/icons/iconsmind/outline/256/Error-404Window-icon.png" alt="error" />
      <h3>{err}</h3>
    </section>
  );
};

export default ErrorDisplayer;