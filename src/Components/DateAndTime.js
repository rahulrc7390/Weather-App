import React, { useState, useEffect } from 'react';

const FormattedDateTime = () => {
  const [formattedDateTime, setFormattedDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      const formattedDateTimeString = now.toLocaleString('en-US', options);
      setFormattedDateTime(formattedDateTimeString);
    };

    // Update the formatted date and time every second
    const interval = setInterval(updateDateTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{formattedDateTime}</p>
    </div>
  );
};

export default FormattedDateTime;
