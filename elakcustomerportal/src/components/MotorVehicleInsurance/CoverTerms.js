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
            label="What type of cover do you need?"
            name="typeOfCover"
            rules={[{ required: true, message: "Please select type of cover!" }]}
          >
            <Select
              placeholder="Please select type of cover"
              onChange={(value) => handleInputChange(value, 'typeOfCover')}
            >
              <Option value="Comprehensive">Comprehensive</Option>
              <Option value="Third Party">Third Party</Option>
              <Option value="Third Party, Fire and Theft">Third Party, Fire and Theft</Option>
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
              <Option value="One-off">One-off</Option>
              <Option value="Monthly">Monthly</Option>
              <Option value="Quarterly">Quarterly</Option>
              <Option value="Annually">Annually</Option>
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
            <Select
              className="w-full custom-input-number"
              placeholder="Enter cover period in days"
              onChange={(value) => handleInputChange(value, 'coverPeriodDays')}
            >
            <Option value="30">30 days</Option>
            <Option value="60">60 days</Option>
            <Option value="90">90 days</Option>
            <Option value="180">180 days</Option>
            <Option value="365">365 days</Option>
            </Select>
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
              addonBefore={formData.currencySymbol}
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
              addonBefore={formData.currencySymbol}
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
              addonBefore={formData.currencySymbol}
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
