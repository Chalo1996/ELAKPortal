import React, { useState, useEffect, useCallback } from 'react';
import { Row, Form, Input, Col, Checkbox, DatePicker, Select, Typography } from 'antd';
import 'tailwindcss/tailwind.css';

import { preventNumericInput, preventTextInput, disabledDate, PhoneAreas } from "./Utilities.js";
import dayjs from 'dayjs';
import TermsModal from './Modals/TermsModal.js';
import PrivacyPolicyModal from './Modals/PrivacyPolicyModal.js';

const { Option } = Select;
const { Title } = Typography;

const ChoosePhoneArea = ({ value, onChange }) => (
  <Select defaultValue={value} onChange={onChange} style={{ width: 100 }}>
    {PhoneAreas.map((area) => (
      <Option key={area.code} value={area.code}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{area.code}</span>
          <img src={area.flag} alt={area.country} style={{ width: '25px', marginLeft: '8px' }} />
        </div>
      </Option>
    ))}
  </Select>
);

const ContactDetails = ({ form, formData, setFormData }) => {
  const [termsVisible, setTermsVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const handleInputChange = useCallback((value, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  }, [setFormData]);

  const termsAndPrivacyPolicyCheckBox = (e) => {
    handleInputChange(e.target.checked, "termschecked");
  };

  return (
    <Form layout="vertical" form={form} initialValues={formData} >
      <Row gutter={[16, 16]} style={{ marginBottom: '25px' }} >
        <Col span={24}>
          <Title level={5} >Please enter details of contact person</Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: '25px' }} >
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
      <Row gutter={[16, 16]} style={{ marginBottom: '25px' }} >
        <Col xs={24} sm={12}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender." }]}
          >
            <Select
              placeholder="Select Gender"
              onChange={(value) => handleInputChange(value, 'gender')}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[{ required: true, message: "Please enter your date of birth!" }]}
          >
            <DatePicker
              className="w-full custom-input"
              disabledDate={disabledDate}
              onChange={(date) => handleInputChange(date, 'dateOfBirth')}
              value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: '25px' }}>
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
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[{
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error("You must accept the terms and conditions")),
            }]}
          >
            <Checkbox
              checked={formData.termschecked}
              onChange={termsAndPrivacyPolicyCheckBox}
            >
              I accept the
              <span
                style={{ color: "#A32A29", cursor: "pointer" }}
                onClick={(e) => { e.stopPropagation(); setTermsVisible(true); }}
              >
                {" "}terms
              </span>
              {" and "}
              <span
                style={{ color: "#A32A29", cursor: "pointer" }}
                onClick={(e) => { e.stopPropagation(); setPrivacyVisible(true); }}
              >
                privacy policy
              </span>
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <TermsModal
        isVisible={termsVisible}
        onClose={() => setTermsVisible(false)}
        formData={formData}
        setFormData={setFormData}
      />

      <PrivacyPolicyModal
        isVisible={privacyVisible}
        onClose={() => setPrivacyVisible(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </Form>
  );
};

export default ContactDetails;
