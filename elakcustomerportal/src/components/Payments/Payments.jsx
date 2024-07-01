import React, { useState } from 'react';
import { Row, Col, Input, Typography, Form, Button, InputNumber, Select, Space, Upload, message, Steps, DatePicker } from 'antd';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;
const { Step } = Steps;

const Payments = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [beneficiaryType, setBeneficiaryType] = useState(null);
  const [form] = Form.useForm();
  
  const [formData, setFormData] = useState({
    currency: 'USD',
    premium: 0,
    currencies: [
      { code: 'USD', name: 'USD' },
      { code: 'KES', name: 'KES' },
      
    ],
  });

  // Test data
  const numberOfPrincipalMembers = 1;

  const handleNavigate = () => {
    navigate(-1); // Navigates to the previous page
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    if (currentStep === 0) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit final data
      console.log('Final submission:', values);
    }
  };

  const onChangeCurrency = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      currency: value,
    }));
  };

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
      message.success(`${file.name} file uploaded successfully`);
    }, 1000);
  };

  const handleBeneficiaryTypeChange = (value) => {
    setBeneficiaryType(value);
    form.resetFields(); // Reset the form fields when the beneficiary type changes
  };

  return (
    <div className="pt-5 pl-4">
      <div className="flex items-center">
        <button className="mb-5 focus:outline-none hover:text-[#A32A29]" onClick={handleNavigate}>
          <LeftOutlined className="w-8 h-8" />
        </button>
        <Title level={5} style={{ marginBottom: '20px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Payments
        </Title>
      </div>

      <Steps current={currentStep}>
        <Step title="Principal Members" />
        <Step title="Beneficiary Details" />
      </Steps>

      <br />

      <Form layout="vertical" form={form} onFinish={onFinish}>
        {currentStep === 0 && (
          <>
            <div className="pt-4 pl-3">
              <Row gutter={16}>
                <h3>Please enter your personal details to continue</h3>
              </Row>
            </div>
            <br />
            {numberOfPrincipalMembers <= 5 ? (
              Array.from({ length: numberOfPrincipalMembers }, (_, index) => (
                <div key={index}>
                  <Title level={5}>Principal Member {index + 1}</Title>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="ID/Passport Number"
                        name={`idNumber${index}`}
                        rules={[
                          { required: true, message: 'Please enter your ID/Passport Number' },
                          { pattern: /^[a-zA-Z0-9]*$/, message: 'ID/Passport Number must be alphanumeric' },
                        ]}
                      >
                        <Input placeholder="Enter ID Number" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="KRA Pin"
                        name={`kraPin${index}`}
                        rules={[
                          { required: true, message: 'Please enter your KRA PIN' },
                          { pattern: /^[a-zA-Z0-9]*$/, message: 'KRA PIN must be alphanumeric' },
                        ]}
                      >
                        <Input placeholder="Enter KRA PIN" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Postal Address"
                        name={`postalAddress${index}`}
                        rules={[{ required: true, message: 'Please enter your Postal Address' }]}
                      >
                        <Input placeholder="Enter Postal Address" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Nationality"
                        name={`nationality${index}`}
                        rules={[{ required: true, message: 'Please select your Nationality' }]}
                      >
                        <Select placeholder="Select Nationality">
                          <Option value="Kenyan">Kenyan</Option>
                          <Option value="Ugandan">Ugandan</Option>
                          <Option value="Tanzanian">Tanzanian</Option>
                          {/* Add more options as needed */}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Country of Residence"
                        name={`countryOfResidence${index}`}
                        rules={[{ required: true, message: 'Please select your Country of Residence' }]}
                      >
                        <Select placeholder="Select Country of Residence">
                          <Option value="Kenya">Kenya</Option>
                          <Option value="Uganda">Uganda</Option>
                          <Option value="Tanzania">Tanzania</Option>
                          {/* Add more options as needed */}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Monthly Income"
                        name={`monthlyIncome${index}`}
                        tooltip="How much money do you earn?"
                        rules={[{ required: true, message: 'Please enter your Monthly Income' }]}
                      >
                        <Space.Compact style={{ width: '100%' }}>
                          <Form.Item
                            name={`currency${index}`}
                            noStyle
                            rules={[{ required: true, message: 'Currency is required' }]}
                          >
                            <Select
                              onChange={onChangeCurrency}
                              defaultValue={formData.currency}
                              style={{ width: '20%' }}
                            >
                              {formData.currencies.map((currency, index) => (
                                <Option key={index} value={currency.code}>
                                  {currency.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            name={`premium${index}`}
                            noStyle
                            rules={[{ required: true, message: 'Monthly Income is required' }]}
                          >
                            <InputNumber
                              id={`monthlyIncome${index}`}
                              step={10000}
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              }
                              parser={(value) => value.replace(/(,*)/g, '')}
                              onChange={(value) =>
                                setFormData((prevData) => ({
                                  ...prevData,
                                  premium: value,
                                }))
                              }
                              value={formData.premium}
                              style={{ width: '80%' }}
                            />
                          </Form.Item>
                        </Space.Compact>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Source of Funds"
                        name={`sourceOfFunds${index}`}
                        rules={[{ required: true, message: 'Please select your Source of Funds' }]}
                      >
                        <Select placeholder="Select Source of Funds">
                          <Option value="Salary">Salary</Option>
                          <Option value="Business">Business</Option>
                          <Option value="Investments">Investments</Option>
                          {/* Add more options as needed */}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Education Level"
                        name={`educationLevel${index}`}
                        rules={[{ required: true, message: 'Please select your Education Level' }]}
                      >
                        <Select placeholder="Select Your Education Level">
                          <Option value="High School">High School</Option>
                          <Option value="Diploma">Diploma</Option>
                          <Option value="Bachelor's Degree">Bachelor's Degree</Option>
                          <Option value="Master's Degree">Master's Degree</Option>
                          {/* Add more options as needed */}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <br />
                </div>
              ))
            ) : (
              <div>
                <Upload customRequest={handleUpload}>
                  <Button icon={<UploadOutlined />}>Upload Principal Members Details</Button>
                </Upload>
              </div>
            )}
          </>
        )}
        {currentStep === 1 && (
          <>
            <Title level={5}>Beneficiary Details</Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Beneficiary Type"
                  name="beneficiaryType"
                  rules={[{ required: true, message: 'Please select Beneficiary Type' }]}
                >
                  <Select placeholder="Select Beneficiary Type" onChange={handleBeneficiaryTypeChange}>
                    <Option value="Minor">Minor</Option>
                    <Option value="Adult">Adult</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Relationship"
                  name="relationship"
                  rules={[{ required: true, message: 'Please enter Relationship' }]}
                >
                  <Input placeholder="Enter Relationship" />
                </Form.Item>
              </Col>
            </Row>

            {beneficiaryType === 'Minor' && (
              <>
                <Title level={5}>Minor Details</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="minorName"
                      rules={[{ required: true, message: 'Please enter Name' }]}
                    >
                      <Input placeholder="Enter Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Age"
                      name="minorAge"
                      rules={[{ required: true, message: 'Please enter Age' }]}
                    >
                      <InputNumber min={0} placeholder="Enter Age" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Date of Birth"
                      name="minorDOB"
                      rules={[{ required: true, message: 'Please select Date of Birth' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Title level={5}>Guardian Details</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="guardianName"
                      rules={[{ required: true, message: 'Please enter Guardian Name' }]}
                    >
                      <Input placeholder="Enter Guardian Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Relationship"
                      name="guardianRelationship"
                      rules={[{ required: true, message: 'Please enter Relationship' }]}
                    >
                      <Input placeholder="Enter Relationship" />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            {beneficiaryType === 'Adult' && (
              <>
                <Title level={5}>Adult Beneficiary Details</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="adultName"
                      rules={[{ required: true, message: 'Please enter Name' }]}
                    >
                      <Input placeholder="Enter Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Age"
                      name="adultAge"
                      rules={[{ required: true, message: 'Please enter Age' }]}
                    >
                      <InputNumber min={0} placeholder="Enter Age" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Date of Birth"
                      name="adultDOB"
                      rules={[{ required: true, message: 'Please select Date of Birth' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Relationship"
                      name="adultRelationship"
                      rules={[{ required: true, message: 'Please enter Relationship' }]}
                    >
                      <Input placeholder="Enter Relationship" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Percentage"
                      name="percentage"
                      rules={[{ required: true, message: 'Please enter Percentage' }]}
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value) => value.replace('%', '')}
                        placeholder="Enter Percentage"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <Button type="primary" style={{ width: '50%' }} htmlType="submit">
              {currentStep === 0 ? 'Continue' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Payments;
