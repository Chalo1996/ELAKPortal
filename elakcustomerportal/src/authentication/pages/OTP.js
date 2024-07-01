import { useState } from "react";
import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

const correctOTP = "123456";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "8px",
};

const inputStyle = {
  width: "40px",
  height: "40px",
  fontSize: "18px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  textAlign: "center",
  outline: "none",
  transition: "border-color 0.3s",
};

const OTPPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(null);

  const handleSubmit = () => {
    console.log("OTP", otp);
    if (otp === correctOTP) {
      navigate("/");
    } else {
      setOtpError("❌ Wrong OTP Please Check Again");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-10">
        <span className="font-open-sans text-[20px] font-semibold leading-[24px] text-left">
          Enter OTP
        </span>
      </div>
      <p className="mt-4 mb-10">
        <span className="font-open-sans text-[16px] font-semibold leading-[28px] text-left">
          Please enter the OTP sent to your email.
        </span>
      </p>
      <Form
        form={form}
        layout="vertical"
        onFinishFailed={(event) => console.log(event)}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="OTP"
          name="otp"
          rules={[
            {
              required: true,
              message: "Please enter the OTP.",
            },
          ]}
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={containerStyle}
            inputStyle={inputStyle}
          />
        </Form.Item>

        <p className="text-red-900 mt-4">{otpError}</p>
        <div className="text-left mt-4 flex justify-start gap-3">
          <Button type="primary" className="shadow-none" htmlType="submit">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OTPPage;
