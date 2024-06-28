import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { Divider } from 'antd';

const Policy = () => {
  const { policyId } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/policies/${policyId}`)
      .then((response) => response.json())
      .then((data) => setPolicy(data))
      .catch((error) => console.error('Error fetching policy details:', error));
  }, [policyId]);

  const handleCancelPolicy = () => {
    fetch(`http://localhost:3001/api/policies/${policyId}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/policies');
      })
      .catch((error) => console.error('Error canceling policy:', error));
  };

  if (!policy) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-white shadow-md rounded-lg h-4/5 w-4/5">
        <div className="flex">
          <h2 className="text-2xl font-bold mb-4">Policy Number: {uuid4()}</h2>
          <button type="text ml-20">Live Policy</button>
        </div>
        <Divider />
        {/* <h3 className="text-xl font-bold mb-2">{policy.title}</h3> */}
        <p className="text-gray-700 mb-4">{policy.description}</p>
        <p className="mb-4">More policy details...</p>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 align-bottom"
          onClick={handleCancelPolicy}
        >
          Cancel Policy
        </button>
      </div>
    </div>
  );
};

export default Policy;
