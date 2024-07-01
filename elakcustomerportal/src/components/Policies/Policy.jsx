import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import myPolicies from './myPolicies';

const Policy = () => {
  const { policyId } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    const foundPolicy = myPolicies.find((p) => p.policyNumber === policyId);
    if (foundPolicy) {
      setPolicy(foundPolicy);
    } else {
      console.error('Policy not found');
    }
  }, [policyId]);

  const handleCancelPolicy = () => {
    navigate('/policies');
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  if (!policy) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100">
      <div className="mb-4 flex items-center">
        <button
          className="mr-2 focus:outline-none hover:text-[#A32A29]"
          onClick={handleNavigate}
        >
          <LeftOutlined className="w-8 h-8" />
        </button>
        <span className="font-open-sans text-xl font-semibold leading-24">
          Policies
        </span>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <button
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 text-lg"
          onClick={() => alert('Live Policy')}
        >
          Live Policy
        </button>
        <h2 className="text-4xl font-bold mb-4">
          Policy Number: {policy.policyNumber}
        </h2>
        <Divider />
        <div className="mb-4">
          <p className="mb-2 text-lg">
            <strong>Traveller:</strong> {policy.travellerName}
          </p>
          <p className="mb-2 text-lg">
            <strong>Cover level:</strong> {policy.coverLevel}
          </p>
        </div>
        <div className="mb-4 flex">
          <div className="flex-1">
            <p className="mb-2 text-lg">
              <strong>Start Date:</strong> {policy.startDate}
            </p>
          </div>
          <div className="flex-1">
            <p className="mb-2 text-lg">
              <strong>End Date:</strong> {policy.endDate}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2 text-lg">
            <strong>Destination:</strong> {policy.destination}
          </p>
          <p className="mb-2 text-lg">
            <strong>Max Trip Duration:</strong> {policy.maxTripDuration} days
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2 text-lg">
            <strong>Issue Date:</strong> {policy.issueDate}
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2 text-lg">
            <strong>Total Policy Cost:</strong> {policy.totalCost}
          </p>
        </div>
        <a
          href="/policy-documents"
          className="text-blue-500 underline mb-4 block text-lg"
        >
          View your policy documents
        </a>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 text-lg"
            onClick={() => navigate(`/make-a-claim?id=${policyId}`)}
          >
            Make a Claim
          </button>
          <button
            className="px-4 py-2 bg-white-500 border-red-300 border text-red-500 rounded hover:bg-white-700 text-lg"
            onClick={handleCancelPolicy}
          >
            Cancel policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Policy;
