import React, { useCallback, useState } from 'react';
import { Form, Row, Col, Switch, InputNumber, Typography } from 'antd';
import 'tailwindcss/tailwind.css';

const { Title } = Typography;

const Extras = ({ form, formData, setFormData }) => {
  const [showExtraWindscreenLimit, setShowExtraWindscreenLimit] = useState(formData.excessProtector);
  const [showExtraVehicleEntertainmentLimits, setShowExtraVehicleEntertainmentLimits] = useState(formData.roadsideAssistance);
  const [showExtraAuthorisedRepairLimit, setShowExtraAuthorisedRepairLimit] = useState(formData.politicalViolenceAndTerrorism);
  const [showLossOfUse, setShowLossOfUse] = useState(formData.ambulanceService);

  const handleInputChange = useCallback((value, field) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  }, [setFormData]);

  return (
    <Form form={form} layout="vertical" initialValues={formData}>
      <Row gutter={16} style={{ marginBottom: '25px' }}>
        <Col span={24}>
          <Title level={5}>Please enter additional benefits</Title>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '25px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Excess Protector"
            tooltip="Protected from paying excess in case of an accidental damage claim"
            name="excessProtector"
            valuePropName="checked"
          >
            <Switch
              onChange={(value) => {
                handleInputChange(value, 'excessProtector');
                setShowExtraWindscreenLimit(value);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Roadside Assistance"
            name="roadsideAssistance"
            valuePropName="checked"
          >
            <Switch
              onChange={(value) => {
                handleInputChange(value, 'roadsideAssistance');
                setShowExtraVehicleEntertainmentLimits(value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      {showExtraWindscreenLimit && (
        <Row gutter={16} style={{ marginBottom: '25px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Extra Windscreen Limit"
              name="extraWindscreenLimit"
              rules={[{ required: showExtraWindscreenLimit, message: "Please enter extra windscreen limit!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                placeholder="Enter extra windscreen limit"
                addonBefore={formData.currencySymbol}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
                onChange={(value) => handleInputChange(value, 'extraWindscreenLimit')}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {showExtraVehicleEntertainmentLimits && (
        <Row gutter={16} style={{ marginBottom: '25px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Extra Vehicle Entertainment Limits"
              name="extraVehicleEntertainmentLimits"
              rules={[{ required: showExtraVehicleEntertainmentLimits, message: "Please enter extra vehicle entertainment limits!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                addonBefore={formData.currencySymbol}
                placeholder="Enter extra vehicle entertainment limits"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
                onChange={(value) => handleInputChange(value, 'extraVehicleEntertainmentLimits')}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Row gutter={16} style={{ marginBottom: '25px' }}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Political Violence & Terrorism"
            name="politicalViolenceAndTerrorism"
            valuePropName="checked"
          >
            <Switch
              onChange={(value) => {
                handleInputChange(value, 'politicalViolenceAndTerrorism');
                setShowExtraAuthorisedRepairLimit(value);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Ambulance Service"
            name="ambulanceService"
            valuePropName="checked"
          >
            <Switch
              onChange={(value) => {
                handleInputChange(value, 'ambulanceService');
                setShowLossOfUse(value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      {showExtraAuthorisedRepairLimit && (
        <Row gutter={16} style={{ marginBottom: '25px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Extra Authorised Repair Limit"
              name="extraAuthorisedRepairLimit"
              rules={[{ required: showExtraAuthorisedRepairLimit, message: "Please enter extra authorised repair limit!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                addonBefore={formData.currencySymbol}
                placeholder="Enter extra authorised repair limit"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
                onChange={(value) => handleInputChange(value, 'extraAuthorisedRepairLimit')}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {showLossOfUse && (
        <Row gutter={16} style={{ marginBottom: '25px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Loss of Use"
              name="lossOfUse"
              rules={[{ required: showLossOfUse, message: "Please enter loss of use limit!" }]}
            >
              <InputNumber
                className="w-full custom-input-number"
                placeholder="Enter loss of use limit"
                addonBefore={formData.currencySymbol}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/(,*)/g, "")}
                onChange={(value) => handleInputChange(value, 'lossOfUse')}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default Extras;
