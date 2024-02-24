import React from 'react';

const TimestampDisplay = ({ timestamp }) => {
  // Assuming `timestamp` is the object you want to render

  // Extract seconds and nanoseconds from the timestamp
 
  
  return timestamp &&(
    <>
    {timestamp.toDate().toString()}
    </>
  );
};

export default TimestampDisplay;
