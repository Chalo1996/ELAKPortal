import React from 'react';

const PolicyDetails = ({ policy }) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">
        Policy Number: {policy.policyNumber}
      </h3>
      <p>
        <strong>Traveller:</strong> {policy.travellerName}
      </p>
      <p>
        <strong>Cover Level:</strong> {policy.coverLevel}
      </p>
      <p>
        <strong>Start Date:</strong> {policy.startDate}
      </p>
      <p>
        <strong>End Date:</strong> {policy.endDate}
      </p>
      <p>
        <strong>Destination:</strong> {policy.destination}
      </p>
      <p>
        <strong>Total Cost:</strong> {policy.totalCost}
      </p>
    </div>
  );
};

export default PolicyDetails;
