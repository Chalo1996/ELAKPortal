import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import PolicyDetails from './PolicyDetails';
import myPolicies from './myPolicies';

const Policies = () => {
  const [policies] = useState(myPolicies);
  const navigate = useNavigate();

  const handlePolicyClick = (policyNumber) => {
    navigate(`/policies/${policyNumber}`);
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 flex items-center">
        <button
          className="mr-2 focus:outline-none hover:text-[#A32A29]"
          onClick={handleNavigate}
        >
          <LeftOutlined className="w-8 h-8" />
        </button>
        <span className="font-open-sans text-[16px] font-semibold leading-[24px]">
          Policies
        </span>
      </div>
      <Row gutter={[16, 16]}>
        {policies.map((policy) => (
          <Col key={policy.policyNumber} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="rounded-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => handlePolicyClick(policy.policyNumber)}
            >
              <PolicyDetails policy={policy} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Policies;
