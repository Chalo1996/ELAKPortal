import React, { useEffect, useCallback } from 'react';
import { Row, Form, Input, Col, Select, Typography } from 'antd';
import 'tailwindcss/tailwind.css';
import { InfoCircleOutlined } from "@ant-design/icons";

import { preventNumericInput, preventTextInput, PhoneAreas } from "./Utilities.js";


const { Option } = Select;
const { Title } = Typography;

const ChoosePhoneArea = ({ value, onChange }) => (
  <Select defaultValue={value} onChange={onChange} style={{ width: 100 }}>
    {PhoneAreas.map((area) => (
      <Option key={area.code} value={area.code}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{area.code}</span>
          <img src={area.flag} alt={area.country} style={{ width: '20px', marginLeft: '8px' }} />
        </div>
      </Option>
    ))}
  </Select>
);

const ContactDetails = ({ form, formData, setFormData }) => {


  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const handleInputChange = useCallback((value, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  }, [setFormData]);



  return (
    <Form layout="vertical" form={form} initialValues={formData}>
      <Row gutter={[16, 16]} >
        <Col span={24}>
          <Title level={5}>Please confirm your details</Title>
          <p>            
          <span className="text-[#929497]">
            These are the details our agent will use to contact you
            </span>
          </p>
        </Col>
        <Col span={24}>

        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }} >
        <Col xs={24} sm={12}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter your first name!" }]}
          >
            <Input
              className="custom-input"
              placeholder="Enter your first name"
              onKeyPress={preventNumericInput}
              onChange={(e) => handleInputChange(e.target.value, 'firstName')}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name!" }]}
          >
            <Input
              className="custom-input"
              placeholder="Enter your last name"
              onKeyPress={preventNumericInput}
              onChange={(e) => handleInputChange(e.target.value, 'lastName')}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please enter your email address!" }]}
          >
            <Input
              className="custom-input"
              placeholder="Enter your email address"
              onChange={(e) => handleInputChange(e.target.value, 'email')}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[
              { len: 9, message: "The input must have exactly 9 digits." },
              { required: true, message: "Please enter your mobile number!" },
            ]}
          >
            <Input
              maxLength={9}
              placeholder="Enter your mobile number"
              onChange={(e) => handleInputChange(e.target.value, 'mobileNumber')}
              addonBefore={
                <ChoosePhoneArea
                  value={formData.phoneArea}
                  onChange={(value) => handleInputChange(value, 'phoneArea')}
                />
              }
              onKeyPress={preventTextInput}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
          <p className="flex items-center mb-[35px]">
            <InfoCircleOutlined
              style={{
                color: "#D93E3E",
                marginRight: "8px",
              }}
            />
            <span className="text-[#929497]">
              Edit any field before clicking submit if necessary
            </span>
          </p>
        </Row>
    </Form>
  );
};

export default ContactDetails;
