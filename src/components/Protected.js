import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Protected() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/protected', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h2>Protected Resource</h2>
          <p>{data.message}</p>
        </div>
      ) : (
        <p>You are not authenticated. Please log in.</p>
      )}
    </div>
  );
}

export default Protected;
