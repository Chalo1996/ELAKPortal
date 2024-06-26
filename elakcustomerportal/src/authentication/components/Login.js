import { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validatePassword = (_, value) => {
    // Check if the password meets all criteria
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!£$#&*%])[A-Za-z\d!£$#&*%]{10,}$/.test(
        value
      )
    ) {
      return Promise.resolve();
    }
    return Promise.reject(
      "Password must be at least 10 characters, have upper and lower case letters, one digit (0-9), and one special character (!,£,$,#,&,*,%)."
    );
  };

  const handleRegister = () => {
    navigate("/authentication?mode=signup");
  };

  const handleSubmit = () => {
    console.log("Form data", formData);
    // Navigate to the OTP page
    navigate("/authentication/otp");
  };

  return (
    <div className="p-4">
      <div className="mb-10">
        <span className="font-open-sans text-[20px] font-semibold leading-[24px] text-left">
          Sign In
        </span>
      </div>
      <p className="mt-4 mb-10">
        <span className="font-open-sans text-[16px] font-semibold leading-[28px] text-left">
          Hello There,
        </span>
        <br></br>
        <span className="font-open-sans text-[14px] text-[#929497] leading-[28px] text-left">
          Sign in to continue. Remember, your password is yours, do not share it
          with anyone.
        </span>
      </p>
      <Form
        form={form}
        layout="vertical"
        onFinishFailed={(event) => console.log(event)}
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-1">
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email address.",
              },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password.",
              },
              {
                validator: validatePassword,
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Item>
        </div>
        <div className="mb-5">
          <p className="font-open-sans text-[#A32A29] text-[14px] text-left">
            <Link to="/forgot-password">Forgot your password?</Link>
          </p>
        </div>

        <div className="text-left mt-4 flex justify-start gap-3">
          <Button type="primary" className="shadow-none" htmlType="submit">
            Signin
          </Button>
          <Button
            className="shadow-none"
            htmlType="button"
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
