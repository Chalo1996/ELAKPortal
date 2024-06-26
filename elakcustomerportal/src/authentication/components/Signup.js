import { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Form, Input, Select, DatePicker, Button } from "antd";
import sspFlag from "../../assets/flags/ssp.png";
import cdfFlag from "../../assets/flags/cdf.png";
import rwfFlag from "../../assets/flags/rwf.png";
import kesFlag from "../../assets/flags/kes.png";
import tzsFlag from "../../assets/flags/tzs.png";
import ugxFlag from "../../assets/flags/ugx.png";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const PhoneAreas = [
  { code: "+211", flag: sspFlag, country: "South Sudan" },
  { code: "+243", flag: cdfFlag, country: "DRC" },
  { code: "+250", flag: rwfFlag, country: "Rwanda" },
  { code: "+254", flag: kesFlag, country: "Kenya" },
  { code: "+255", flag: tzsFlag, country: "Tanzania" },
  { code: "+256", flag: ugxFlag, country: "Uganda" },
];
const Genders = ["Male", "Female"];
const questions = [
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What is the name of your first pet?",
  "What is the name of your first school?",
  "What is the name of your favorite sports team?",
];

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    birthDate: null,
    phoneArea: "+254",
    country: "Kenya",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedQuestion: "",
    answer: "",
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/authentication?mode=signin");
  };

  const handlePhoneAreaChange = (newValue) => {
    const selectedCountry = PhoneAreas.find((area) => area.code === newValue);
    if (selectedCountry) {
      setFormData({
        ...formData,
        phoneArea: newValue,
        country: selectedCountry.country,
      });
    }
  };

  const handleQuestionChange = (value) => {
    setFormData({
      ...formData,
      selectedQuestion: value,
      answer: "", // Clear answer when question changes
    });
  };

  const validateBirthDate = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }

    const today = new Date();
    const selectedDate = new Date(value);

    const minDate = new Date(
      today.getFullYear() - 70,
      today.getMonth(),
      today.getDate()
    );
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (selectedDate >= minDate && selectedDate <= maxDate) {
      return Promise.resolve();
    }

    if (selectedDate < maxDate) {
      return Promise.reject(new Error("Maximum required age is 70 years."));
    } else {
      return Promise.reject(new Error("Minimum required age is 18 years."));
    }
  };

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

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject("The two passwords that you entered do not match!");
    },
  });

  const preventNumericInput = (event) => {
    if (/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const preventTextInput = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = () => {
    console.log("Form data", formData);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <span>
          <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
            <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
          </button>
        </span>
        <span className="font-open-sans text-[20px] font-semibold leading-[24px] text-left">
          Register
        </span>
      </div>

      <div className="my-2">
        <p className="font-open-sans text-[16px] font-semibold leading-[28px] text-left">
          Create your profile
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinishFailed={(event) => console.log(event)}
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-1">
          <Form.Item
            label="Full Name"
            name="fullName"
            onKeyPress={preventNumericInput}
            rules={[
              {
                required: true,
                message: "Please enter your full name.",
              },
            ]}
          >
            <Input
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select a gender." }]}
          >
            <Select
              value={formData.gender}
              onChange={(value) => setFormData({ ...formData, gender: value })}
            >
              {Genders.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
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
            label="Mobile Number"
            name="phoneNo"
            onKeyPress={preventTextInput}
            rules={[
              {
                required: true,
                message: "Please input a mobile number.",
              },
              {
                len: 9,
                message: "The input must have exactly 9 digits.!",
              },
            ]}
          >
            <Input
              addonBefore={
                <Select
                  style={{ width: 100 }}
                  value={formData.phoneArea}
                  onChange={handlePhoneAreaChange}
                >
                  {PhoneAreas.map((item) => (
                    <Option value={item.code} key={item.code}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span>{item.code}</span>
                        <img
                          src={item.flag}
                          alt={item.country}
                          style={{ width: "20px", marginLeft: "8px" }}
                        />
                      </div>
                    </Option>
                  ))}
                </Select>
              }
              value={formData.phoneNo}
              onChange={(e) =>
                setFormData({ ...formData, phoneNo: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="birthDate"
            rules={[
              {
                required: true,
                message: "Please select date of birth.",
              },
              { validator: validateBirthDate },
            ]}
            style={{ width: "100%", cursor: "pointer", marginBottom: "35px" }}
          >
            <DatePicker
              style={{ width: "100%" }}
              id="birthDate"
              value={formData.birthDate}
              onChange={(value) =>
                setFormData({ ...formData, birthDate: value })
              }
              inputReadOnly={true}
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
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password.",
              },
              validateConfirmPassword,
            ]}
          >
            <Input.Password
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Security Question"
            name="securityQuestion"
            rules={[
              {
                required: true,
                message: "Please select a security question.",
              },
            ]}
          >
            <Select
              placeholder="Select a security question"
              value={formData.selectedQuestion}
              onChange={handleQuestionChange}
            >
              {questions.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Security Answer"
            name="answer"
            rules={[
              {
                required: true,
                message: "Please enter your answer.",
              },
            ]}
          >
            <Input
              placeholder="Enter your answer"
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
            />
          </Form.Item>
        </div>

        <div className="text-left mt-4 flex justify-start gap-3">
          <Button type="primary" className="shadow-none" htmlType="submit">
            Register
          </Button>
          <Button
            className="shadow-none"
            htmlType="button"
            onClick={handleNavigate}
          >
            Signin
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
