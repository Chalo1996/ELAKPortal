import React, { useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Space,
  Typography,
  InputNumber,
  DatePicker,
} from "antd";

const { Item } = Form;
const { Text } = Typography;

const ProductDetailsForm = ({ formData, handleFormChange, form }) => {
  const handleSumChange = (value) => {
    handleFormChange("sumAssured", value);
  };

  const handleTermsInMonthsChange = (value) => {
    handleFormChange("termsInMonths", value);
  };

  const handleNumOfPartnersChange = (value) => {
    handleFormChange("numOfPartners", parseInt(value));
  };

  const handleFrequencyChange = (value) => {
    handleFormChange("frequency", value);
    let installmentValue;
    switch (value) {
      case "Annually":
        installmentValue = 1;
        break;
      case "SemiAnnually":
        installmentValue = 2;
        break;
      case "Quarterly":
        installmentValue = 4;
        break;
      case "Monthly":
        installmentValue = 12;
        break;
      default:
        installmentValue = 1;
    }
    handleFormChange("installments", installmentValue);
  };

  const handlePremiumInstallmentsChange = (e) => {
    handleFormChange("installments", e.target.value);
  };

  const handlePartnerDoBChange = (index, date, dateString) => {
    const updatedDates = [...formData.partnerDates];
    updatedDates[index] = dateString;
    handleFormChange("partnerDates", updatedDates);
  };

  const disabledDate = (current) => {
    if (!current) return false;
    const today = new Date();
    const selectedDate = new Date(current);
    const age = today.getFullYear() - selectedDate.getFullYear();
    const hasBirthdayOccurred =
      today.getMonth() > selectedDate.getMonth() ||
      (today.getMonth() === selectedDate.getMonth() &&
        today.getDate() >= selectedDate.getDate());

    return age < 18 || age > 65 || !hasBirthdayOccurred;
  };

  const disableNotNumberKey = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    form.resetFields(
      Array.from(
        { length: formData.numOfPartners },
        (_, index) => `dob_partner_${index}`
      )
    );
    handleFormChange("partnerDates", Array(formData.numOfPartners).fill(null));
  }, [formData.numOfPartners, form]);

  return (
    <Form layout='vertical' form={form}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label='How much would you like to pay for the cover?'
            name='sumAssured'
            onKeyPress={disableNotNumberKey}
            rules={[
              {
                required: true,
                message: "Please input the sum assured!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              value={formData.sumAssured}
              prefix='KSH'
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={handleSumChange}
            />
          </Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label='For how long in months would you like to pay for the cover?'
            name='termsInMonths'
            onKeyPress={disableNotNumberKey}
            rules={[
              {
                required: true,
                message: "Please input terms in months!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              value={formData.termsInMonths}
              onChange={handleTermsInMonthsChange}
            />
          </Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label='How would you like to pay for the cover?'
            name='frequency'
            rules={[
              {
                required: true,
                message: "Please select the premium frequency!",
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              value={formData.frequency}
              placeholder='Select frequency'
              onChange={handleFrequencyChange}
              options={[
                { value: "Single", label: "One-Off" },
                { value: "Annually", label: "Annually" },
                { value: "SemiAnnually", label: "Semi-Annually" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Monthly", label: "Monthly" },
              ]}
            />
          </Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Item
            label={
              <Text>
                How many times per year would you like to pay for the cover?
              </Text>
            }
            name='installments'
          >
            <Space direction='vertical' wrap style={{ width: "100%" }}>
              <Input
                disabled
                value={formData.installments}
                onChange={handlePremiumInstallmentsChange}
              />
            </Space>
          </Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Text>How many partners would you like to cover?</Text>
          <Item
            label={<Text>Other Partner Details</Text>}
            name='partners'
            rules={[
              {
                required: true,
                message: "Please select the number of partners",
              },
            ]}
            s
          >
            <Select
              style={{ width: "100%" }}
              onChange={handleNumOfPartnersChange}
              options={[
                { value: "1", label: 1 },
                { value: "2", label: 2 },
                { value: "3", label: 3 },
                { value: "4", label: 4 },
                { value: "5", label: 5 },
                { value: "6", label: 6 },
              ]}
            />
          </Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {Array.from({ length: formData.numOfPartners }, (_, index) => (
          <Col xs={24} sm={12} md={12} lg={6} xl={6} key={`partner_${index}`}>
            <Item
              label={`Partner ${index + 2} Date of Birth`}
              name={`dob_partner_${index}`}
              rules={[
                {
                  required: true,
                  message: "Please select a date of birth",
                },
              ]}
            >
              <DatePicker
                format='MM/DD/YYYY'
                placeholder={`Select Partner ${index + 2} Date of Birth`}
                onChange={(date, dateString) =>
                  handlePartnerDoBChange(index, date, dateString)
                }
                disabledDate={disabledDate}
                needConfirm
              />
            </Item>
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default ProductDetailsForm;
