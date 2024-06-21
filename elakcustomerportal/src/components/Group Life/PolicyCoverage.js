import React, { useEffect, useCallback, useState } from 'react';
import { Row, Form, InputNumber, Col, DatePicker, Select, Typography, Switch } from 'antd';
import 'tailwindcss/tailwind.css';
import { preventTextInput } from "./Utilities.js";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from 'moment';

const { Option } = Select;
const { Title } = Typography;

const PolicyCoverage = ({ form, formData, setFormData }) => {
  const [showSpouseFields, setShowSpouseFields] = useState(false);
  const [showChildrenFields, setShowChildrenFields] = useState(false);
  const [showParentsFields, setShowParentsFields] = useState(false);
  const [isFlatAmount, setIsFlatAmount] = useState(false);
  const [levelOfCover, setLevelOfCover] = useState("pleaseSelect");

  const handleInputChange = useCallback((value, field) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  }, [setFormData]);

  const handleStartDateChange = useCallback(
    (date) => {
      if (!date) {
        form.resetFields(['policyEndDate']);
        setFormData({ ...formData, policyEndDate: null });
        return null;
      }
      const oneYearLater = date.clone().add(1, 'year').subtract(1, 'day');
      setFormData({ ...formData, policyStartDate: date, policyEndDate: oneYearLater });
      return oneYearLater;
    },
    [form, formData, setFormData]
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    form.setFieldsValue(formData);
    form.setFieldsValue({ policyStartDate: formData.policyStartDate });
  }, [form, formData]);

  useEffect(() => {
    const newPolicyEndDate = handleStartDateChange(formData.policyStartDate);
    setFormData({ ...formData, policyEndDate: newPolicyEndDate });
    form.setFieldsValue({ policyEndDate: newPolicyEndDate });
  }, [formData, form, setFormData, handleStartDateChange]);

  const handleCoverChange = (value) => {
    setLevelOfCover(value);
    setIsFlatAmount(value === 'flatAmount');
    handleInputChange(value, 'multipleOfAnnualSalary');
  };

  return (
    <Form form={form} layout="vertical" initialValues={formData}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5} style={{ marginBottom: '20px' }}>
            Please enter coverage details
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Specify amount beneficiary will get in the event of death of the main member?"
            name="mainMemberLastExpense"
            rules={[{ required: true, message: "Please enter employee last expense!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              addonBefore={formData.currencySymbol}
              placeholder="Enter employee last expense"
              value={formData.mainMemberLastExpense}
              onChange={(value) => handleInputChange(value, "mainMemberLastExpense")}
              onKeyPress={preventTextInput}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={24} title='Would you like to cover your employees spouses?'>
          <p tooltip="Toggle ON if YES">Would you like to cover employees spouses?</p>
          <Switch
            checked={showSpouseFields}
            onChange={(checked) => setShowSpouseFields(checked)}
            checkedChildren
            unCheckedChildren
          />
        </Col>
      </Row>

      {showSpouseFields && (
        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="How many spouses would you like to be covered?"
              name="totalNumberOfSpouses"
              rules={[{ required: true, message: "Please enter number of spouses!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                placeholder="Enter number of spouses"
                value={formData.totalNumberOfSpouses}
                onChange={(value) => handleInputChange(value, "totalNumberOfSpouses")}
                onKeyPress={preventTextInput}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Specify amount beneficiary will get in the event of death of a spouse?"
              name="spouseLastExpense"
              rules={[{ required: true, message: "Please enter spouse last expense!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                addonBefore={formData.currencySymbol}
                placeholder="Enter spouse last expense"
                value={formData.spouseLastExpense}
                onChange={(value) => handleInputChange(value, "spouseLastExpense")}
                onKeyPress={preventTextInput}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Col span={12} style={{ marginBottom: '20px' }}>
        <p>Would you like to cover employees children?</p>
        <Switch
          checked={showChildrenFields}
          onChange={(checked) => setShowChildrenFields(checked)}
          checkedChildren
          unCheckedChildren
        />
      </Col>
      {showChildrenFields && (
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="How many children would you like to cover?"
              name="totalNumberOfChilidren"
              rules={[{ required: true, message: "Please enter number of children!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                placeholder="Enter number of children"
                value={formData.totalNumberOfChilidren}
                onChange={(value) => handleInputChange(value, "totalNumberOfChilidren")}
                onKeyPress={preventTextInput}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Specify amount beneficiary will get in the event of death of a child?"
              name="childLastExpense"
              rules={[{ required: true, message: "Please enter child last expense!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                addonBefore={formData.currencySymbol}
                placeholder="Enter child last expense"
                value={formData.childLastExpense}
                onChange={(value) => handleInputChange(value, "childLastExpense")}
                onKeyPress={preventTextInput}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Row gutter={[16, 16]}></Row>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <p>Would you like to cover employees parents and in-laws?</p>
          <Switch
            checked={showParentsFields}
            onChange={(checked) => setShowParentsFields(checked)}
            checkedChildren
            unCheckedChildren
          />
        </Col>
      </Row>

      {showParentsFields && (
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="How many parents and parents-in-law would you like to be covered?"
              name="totalNumberOfParentsAndParentsInLaw"
              rules={[{ required: true, message: "Please enter number of parents!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                placeholder="Enter number of parents"
                value={formData.totalNumberOfParentsAndParentsInLaw}
                onChange={(value) => handleInputChange(value, "totalNumberOfParentsAndParentsInLaw")}
                onKeyPress={preventTextInput}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Specify amount beneficiary will get in the event of death of a parent or in-law?"
              name="parentsLastExpense"
              rules={[{ required: true, message: "Please enter parents last expense!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                addonBefore={formData.currencySymbol}
                placeholder="Enter parents last expense"
                value={formData.parentsLastExpense}
                onChange={(value) => handleInputChange(value, "parentsLastExpense")}
                onKeyPress={preventTextInput}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="When would you like the cover to commencemence?"
            tooltip="This cover is for one year"
            name="policyStartDate"
            rules={[
              {
                required: true,
                message: 'Please select start date.',
              },
            ]}
            style={{ width: '100%', cursor: 'pointer' }}
          >
            <DatePicker
              style={{ width: '100%' }}
              id="policyStartDate"
              placeholder='Select cover start date'
              disabledDate={(current) => current && current < moment().endOf('day')}
              onChange={handleStartDateChange}
              inputReadOnly={true}
            />
          </Form.Item>
          {formData.policyStartDate && (
            <p className="flex items-center mb-[20px]">
              <InfoCircleOutlined
                style={{
                  color: '#D93E3E',
                  marginRight: '8px',
                }}
              />
              <span className="text-[#929497]">
                Your cover will automatically expire on {formatDate(formData.policyEndDate)}
              </span>
            </p>
          )}
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="What Level of Cover Do you need?"
            name="multipleOfAnnualSalary"
            rules={[
              {
                required: true,
                message: 'Please select a level of cover!',
              },
            ]}
          >
            <Select
              placeholder="Select a level of cover"
              onChange={handleCoverChange}
            >
              <Option value="1">1x Salary</Option>
              <Option value="2">2x Salary</Option>
              <Option value="3">3x Salary</Option>
              <Option value="4">4x Salary</Option>
              <Option value="5">5x Salary</Option>
              <Option value="6">6x Salary</Option>
            </Select>
          </Form.Item>
          <br />
          {isFlatAmount && (
            <Form.Item
              label="Specify Flat Amount"
              name="flatAmount"
              rules={[
                {
                  required: true,
                  message: 'Please enter the flat amount!',
                },
              ]}
            >
              <InputNumber
                className="w-full"
                placeholder="Enter flat amount"
                min={0}
                addonBefore={formData.currencySymbol}
                value={formData.flatAmount}
                onChange={(value) => handleInputChange(value, 'flatAmount')}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/(,*)/g, '')}
              />
            </Form.Item>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default PolicyCoverage;
