import React, { useCallback } from 'react';
import { Form, InputNumber, Row, Col, Select, Typography } from 'antd';
import 'tailwindcss/tailwind.css';

const { Option } = Select;
const { Title } = Typography;

const CoverTerms = ({ form, formData, setFormData }) => {
  const handleInputChange = useCallback((value, field) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  }, [setFormData]);

  return (
    <Form form={form} layout="vertical" initialValues={formData}>
      <Row gutter={16} style={{ marginBottom: '25px' }}>
        <Col span={24}>
          <Title level={5}>Please enter cover terms</Title>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '25px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Type of Cover"
            name="typeOfCover"
            rules={[{ required: true, message: "Please select type of cover!" }]}
          >
            <Select
              placeholder="Please select type of cover"
              onChange={(value) => handleInputChange(value, 'typeOfCover')}
            >
              <Option value="comprehensive">Comprehensive</Option>
              <Option value="thirdParty">Third Party</Option>
              <Option value="thirdPartyFireAndTheft">Third Party, Fire and Theft</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Payment Options (Frequency)"
            name="paymentOptionsFrequency"
            rules={[{ required: true, message: "Please select payment frequency!" }]}
          >
            <Select
              placeholder="Please select payment frequency"
              onChange={(value) => handleInputChange(value, 'paymentOptionsFrequency')}
            >
              <Option value="oneOff">One-off</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="quarterly">Quarterly</Option>
              <Option value="annually">Annually</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '25px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Cover Period (days)"
            name="coverPeriodDays"
            rules={[{ required: true, message: "Please enter cover period!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter cover period in days"
              onChange={(value) => handleInputChange(value, 'coverPeriodDays')}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Estimated Sum Insured"
            name="estimatedSumInsured"
            rules={[{ required: true, message: "Please enter estimated sum insured!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter estimated sum insured"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
              onChange={(value) => handleInputChange(value, 'estimatedSumInsured')}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '25px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Minimum Cover Premium"
            name="minimumCoverPremium"
            rules={[{ required: true, message: "Please enter minimum cover premium!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter minimum cover premium"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
              onChange={(value) => handleInputChange(value, 'minimumCoverPremium')}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Catalogue Value (Depreciated)"
            name="catalogueValueDepreciated"
            rules={[{ required: true, message: "Please enter catalogue value (depreciated)!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder="Enter catalogue value (depreciated)"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
              onChange={(value) => handleInputChange(value, 'catalogueValueDepreciated')}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CoverTerms;
