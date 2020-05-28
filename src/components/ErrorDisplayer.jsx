import React from 'react';

const ErrorDisplayer = ({ msg }) => {
  const err = msg ? msg : 'Ooops - something went wrong. Path not found: 404'
  return (
    <section>
      <h3> Server error: {err}</h3>
    </section>
  );
};

export default ErrorDisplayer;