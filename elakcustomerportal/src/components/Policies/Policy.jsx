import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Policy = ({ setPolicies }) => {
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
        // Update parent state
        setPolicies((prevPolicies) =>
          prevPolicies.filter((p) => p.id !== policyId),
        );
        navigate('/home/policies');
      })
      .catch((error) => console.error('Error canceling policy:', error));
  };

  if (!policy) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 center">
      <h2 className="text-2xl font-bold">{policy.name}</h2>
      <p className="text-gray-700">{policy.description}</p>
      <p className="mt-4">More policy details...</p>
      <button
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        onClick={handleCancelPolicy}
      >
        Cancel Policy
      </button>
    </div>
  );
};

export default Policy;
