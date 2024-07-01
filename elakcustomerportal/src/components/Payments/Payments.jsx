import React, { useState } from 'react';
import { Row, Col, Input, Typography, Form, Button, InputNumber, Select, Space, Upload, message } from 'antd';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const Payments = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currency: 'USD',
    premium: 0,
    currencies: [
      { code: 'USD', name: 'USD' },
      { code: 'KES', name: 'KES' },
      // Add other currencies as needed
    ],
  });

  // Test data
  const numberOfPrincipalMembers = 3;

  const handleNavigate = () => {
    navigate(-1); // Navigates to the previous page
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const onChangeCurrency = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      currency: value,
    }));
  };

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      message.success(`${file.name} file uploaded successfully`);
    }, 1000);
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

      <div className="pt-4 pl-3">
        <Row gutter={16}>
          <h3>Please enter your personal details to continue</h3>
        </Row>
      </div>
      <br />
      <Form layout="vertical" onFinish={onFinish}>
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
                    tooltip="How much money do you want to invest?"
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
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <Button type="primary" style={{ width: '50%' }} htmlType="submit">
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Payments;
