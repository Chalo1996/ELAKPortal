import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, message, Modal } from 'antd';
import { LeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import sspFlag from "../../assets/flags/ssp.png";
import cdfFlag from "../../assets/flags/cdf.png";
import rwfFlag from "../../assets/flags/rwf.png";
import kesFlag from "../../assets/flags/kes.png";
import tzsFlag from "../../assets/flags/tzs.png";
import ugxFlag from "../../assets/flags/ugx.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/redux/features/callBackSlice";


const { Option } = Select;

const Submit = () => {
  const [form] = Form.useForm();
  const [clientEmailAddress, setClientEmailAddress] = useState('');
  const [phoneArea, setPhoneArea] = useState("+254");
  const [loading, setLoading]= useState(false);
  const [callBackData, setCallBackData] = useState({});

  const authStatus = useSelector((state) => state.auth.status);
  const isLoading = useSelector((state) => state.callBack.isLoading);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const preventTextInput = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleModalClose = () => {
    setModalVisible(false); // Close modal
  };

  const generateEmailContent = (customer) => {
    const { firstName, lastName, email, mobileNumber } = customer;
  
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear Team,</p>
        <p>Please find below the information of a customer who requested for a callback:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">First Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${firstName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Last Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mobile Number:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phoneArea}${mobileNumber}</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">Best regards,<br>Equity Bank Limited</p>
      </div>
    `;
  };

  const customerInfo = {
    firstName: callBackData.firstName,
    lastName: callBackData.lastName,
    email: callBackData.email,
    mobileNumber: callBackData.mobileNumber
  };
  
  const emailContent = generateEmailContent(customerInfo);
  

  const handleSubmit = async () => {
    console.log('Data: ', data); // Verify data being processed
  
    if (authStatus === "succeeded") {
      try {
        // Validate form fields
        await form.validateFields();
  
        // Get current form values
        const values = form.getFieldsValue();
  
        // Update callBackData state with the new values
        setCallBackData({
          ...callBackData,
          ...values,
          phoneArea: phoneArea // Assuming phoneArea is defined elsewhere
        });
  
        console.log("CALLBACK DATA", callBackData); // Verify callBackData after update
  
        setLoading(true); // Set loading state to true
  
        // Dispatch fetchData action and wait for it to complete
        await dispatch(fetchData(data)).unwrap();
  
        setLoading(false); // Set loading state to false after dispatch
  
        message.success('Email Sent!'); // Show success message
        setModalVisible(true);
  
      } catch (error) {
        setLoading(false); // Set loading state to false on error
        message.error('Failed to send email.'); // Show error message
      }
    } else {
      message.error('Authentication failed.'); // Show authentication failure message
    }
  };
  

  const handleNavigate = () => {
    navigate(-1);
  };

  const PhoneAreas = [
    { code: "+211", flag: sspFlag, country: "South Sudan" },
    { code: "+243", flag: cdfFlag, country: "DRC" },
    { code: "+250", flag: rwfFlag, country: "Rwanda" },
    { code: "+254", flag: kesFlag, country: "Kenya" },
    { code: "+255", flag: tzsFlag, country: "Tanzania" },
    { code: "+256", flag: ugxFlag, country: "Uganda" },
  ];

  const ChoosePhoneArea = ({ value, onChange }) => (
    <Select defaultValue={value} onChange={onChange} style={{ width: 100 }}>
      {PhoneAreas.map((area) => (
        <Option key={area.code} value={area.code}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{area.code}</span>
            <img
              src={area.flag}
              alt={area.country}
              style={{ width: "20px", marginLeft: "8px" }}
            />
          </div>
        </Option>
      ))}
    </Select>
  );


  const data = {
    email: callBackData.email,
    text: emailContent,
    subject: "CALLBACK REQUEST"
  };

  return (
    <div className="mb-4">
      <span>
        <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
          <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
        </button>
      </span>
      <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
        Request Callback
      </span>
      <div className="steps-content" style={{ marginTop: "24px" }}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 mt-3 flex flex-col gap-0">
            <p className="font-open-sans text-[20px] font-semibold leading-[28px] text-left">
              Please confirm your details
            </p>
            <p
              style={{
                fontWeight: "lighter",
                color: "#888",
                marginBottom: "0px",
              }}
            >
              These are the details our agent will use to contact you.
            </p>
          </div>
          <br />
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: "16px" }}>
              <Form.Item
                label="Enter First Name"
                rules={[{ required: true, message: "Please input Customer Name." }]}
                name="firstName"
                required
              >
                <Input
                  addonBefore={
                    <Select style={{ width: 90 }} defaultValue="Mr.">
                      <Select.Option value="Mr.">Mr.</Select.Option>
                      <Select.Option value="Mrs.">Mrs.</Select.Option>
                      <Select.Option value="Ms.">Ms.</Select.Option>
                    </Select>
                  }
                  id="firstName"
                  placeholder="Please type a customer name"
                />
              </Form.Item>
              <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                rules={[
                  { len: 9, message: "The input must have exactly 9 digits." },
                  {
                    required: true,
                    message: "Please enter your mobile number!",
                  },
                ]}
              >
                <Input
                  maxLength={9}
                  addonBefore={
                    <ChoosePhoneArea value={phoneArea} onChange={setPhoneArea} />
                  }
                  placeholder="Enter your mobile number"
                  onKeyPress={preventTextInput}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: "16px" }}>
              <Form.Item
                label="Enter Last Name"
                name="lastName"
                required
                rules={[{ required: true, message: "Please input last name." }]}
              >
                <Input id="lastName" placeholder="Last name" />
              </Form.Item>
              <Form.Item
                label="Enter Email Address"
                name="email"
                required
                rules={[
                  { required: true, message: "Please input email address." },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input
                  id="email"
                  placeholder="name@email.com"
                  value={clientEmailAddress}
                  onChange={(event) => setClientEmailAddress(event.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="notification" style={{ marginTop: "16px", marginBottom: "16px", color: "#888" }}>
            <ExclamationCircleOutlined style={{ marginRight: "8px", color: "black" }} />
            Edit any field before clicking submit if necessary.
          </div>
          <Form.Item style={{ marginTop: "16px" }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>

          <Modal
        title="We'll get back to you soon"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null} // No footer for this example
      >
        <p>Thank you for reaching out to us.We will call you back within 48hrs</p>
        <Button type="primary" htmlType="continue" onClick={handleNavigate}>
          Continue
          </Button>
      </Modal>

        </Form>
      </div>
    </div>
  );
};

export default Submit;
