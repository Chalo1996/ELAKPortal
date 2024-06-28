import React from 'react';

const PolicyDetails = ({ policy }) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{policy.name}</h3>
      <p className="text-gray-700">{policy.description}</p>
    </div>
  );
};

export default PolicyDetails;
