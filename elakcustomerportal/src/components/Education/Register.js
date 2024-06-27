import React from 'react';
import { Row, Col, Input, Typography, Form, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="pt-5 pl-4">
      <div className="flex items-center">
        <button className="mb-5 focus:outline-none hover:text-[#A32A29]" onClick={handleNavigate}>
          <LeftOutlined className="w-8 h-8" />
        </button>
        <Title level={5} style={{ marginBottom: '20px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Register
        </Title>
      </div>
   
      <div className="pt-4 pl-3">
   <Row gutter={16}>
            <h3> Please enter your personal details to continue</h3>
    </Row>
   </div>
   <br></br>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ID NUMBER">
              <Input placeholder="Enter ID Number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="KRA PIN">
              <Input placeholder="Enter KRA PIN" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="POSTAL ADDRESS">
              <Input placeholder="Enter Postal Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="NATIONALITY">
              <Input placeholder="Enter Nationality" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="COUNTRY OF RESIDENCE">
              <Input placeholder="Enter Country of Residence" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="MONTHLY INCOME">
              <Input placeholder="Enter Monthly Income" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="SOURCE OF FUNDS">
              <Input placeholder="Enter Source of Funds" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="EDUCATION LEVEL">
              <Input placeholder="Select Your Education Level" />
            </Form.Item>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <Button type="primary" style={{ width: '50%' }}>
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Register;
