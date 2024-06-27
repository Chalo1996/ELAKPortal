import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row } from 'antd';

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/policies')
      .then((response) => response.json())
      .then((data) => setPolicies(data))
      .catch((error) => console.error('Error fetching policies:', error));
  }, []);

  const handlePolicyClick = (policyId) => {
    navigate(`/home/policies/${policyId}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Policies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="border rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => handlePolicyClick(policy.id)}
          >
            <h3 className="text-xl font-semibold">{policy.name}</h3>
            <p className="text-gray-700">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
