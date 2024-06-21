import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  Steps,
  Radio,
  Space,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Modal,
  Checkbox,
  InputNumber,
  Divider,
  Switch,
  Card,
  message
} from "antd";
import sspFlag from "../../assets/flags/ssp.png";
import cdfFlag from "../../assets/flags/cdf.png";
import rwfFlag from "../../assets/flags/rwf.png";
import kesFlag from "../../assets/flags/kes.png";
import tzsFlag from "../../assets/flags/tzs.png";
import ugxFlag from "../../assets/flags/ugx.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/redux/features/gciSlice";



const { Step } = Steps;

const RequestCallbackModal = ({
  visible,
  onCancel,
  onContinue,
  selectedOption,
  setSelectedOption,
}) => {
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Modal
      title="What would you like to do?"
      visible={visible}
      onCancel={onCancel}
      width={600}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        
        <Button
          key="continue"
          type="primary"
          onClick={onContinue}
          disabled={!selectedOption}
        >
          Continue
        </Button>,
      ]}
    >
      <div style={{ width: "100%" }}>
        <Radio.Group
          onChange={handleOptionChange}
          value={selectedOption}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Radio value="generate">Generate Quote</Radio>
            <Divider style={{ margin: "8px 0", width: "100%" }} />
            <Radio value="callback">Request a Call Back</Radio>
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  );
};

const GroupCriticalIllness = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [policyTerm, setPolicyTerm] = useState();
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState();
  const [clientEmailAddress, setClientEmailAddress] = useState();
  // const [telNo, setTelNo] = useState();
  const [phoneArea, setPhoneArea] = React.useState("+254");
  const [principalNumber, setPrincipalNumber] = React.useState();
  const [spouseNumber, setSpouseNumber] = useState();
  const [spouse, setSpouse] = useState(false);
  // const [spouseDOB, setSpouseDOB] = useState();
  const [childrenNumber, setChildrenNumber] = useState();
  const [childrenVisible, setChildrenVisible] = useState(false);
  const [SAPrincipal, setSAPrincipal] = useState();
  const [SASpouse, setSASpouse] = useState();
  const [SAChildren, setSAChildren] = useState();
  const [sumAssured, setSumAssured] = useState();
  const [coverDate, setCoverDate] = useState();
  const [ coverExpiryDate, setCoverExpiryDate] = useState();
  const [callbackModalVisible, setCallbackModalVisible] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({});
  const [ setShowHiddenFields] = useState(false);
  const [loading, setLoading]= useState(false);

  const authStatus = useSelector((state) => state.auth.status);
  const isLoading = useSelector((state) => state.groupCriticalIllness.isLoading);
  const quotationData = useSelector((state) => state.groupCriticalIllness.gciData);

  // const preventNumericInput = (event) => {
  //   if (/[0-9]/.test(event.key)) {
  //     event.preventDefault();
  //   }
  // };

  const preventTextInput = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const [formatter] = useState(new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
}));

const formatPercentage = (value) => {
  return value != null ? `${value}%` : '';
};

  const navigate = useNavigate();
  const dispatch = useDispatch();


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

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const handleNavigate = () => {
    navigate("/home");
  };

  const handleCoverDateChange = (date, policyTerm) => {
    if (!date) {
      form.resetFields(["coverExpiryDate"]);
      setCoverExpiryDate(null);
      return null;
    }
    const oneYearLater = date
      .clone()
      .add(policyTerm, "year")
      .subtract(1, "day");
    setCoverDate(date);
    return oneYearLater;
  };
  

  const disabledDate = (current) => {
    const today = new Date();
    return (
      current &&
      current < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const disableCoverExpiryDate = (date) => {
    if (coverDate) {
      const currentDate = coverDate.toDate();
      let newCoverExpiryDate = coverDate.clone().add(policyTerm, "year").subtract(1, "day").toDate();
  
      // Adjust for leap years
      if (currentDate.getDate() === 29 && currentDate.getMonth() === 1) {
        if (
          newCoverExpiryDate.getMonth() === 1 &&
          newCoverExpiryDate.getDate() === 28
        ) {
          newCoverExpiryDate.setDate(1); // Start from March 1
          newCoverExpiryDate.setMonth(2); // Adjust to March
        }
      }
  
      return date && date < newCoverExpiryDate;
    }
    return false;
  };
  
  useEffect(() => {
    if (coverDate) {
      const newCoverExpiryDate = handleCoverDateChange(coverDate, policyTerm);
      setCoverExpiryDate(newCoverExpiryDate);
      form.setFieldsValue({ coverExpiryDate: newCoverExpiryDate });
    }
  }, [coverDate, policyTerm]);
  

  const dataToPost = {
    members: [
      {
        name: "PRINCIPAL",
        individualLives: 1,
        sumAssuredPercentage: formData.SAPrincipal,
      },
      {
        name: "SPOUSE",
        individualLives: formData.spouseNumber,
        sumAssuredPercentage: formData.SASpouse,
      },
      {
        name: "CHILDREN",
        individualLives: formData.childrenNumber,
        sumAssuredPercentage: formData.SAChildren,
      },
    ],

     groupMemberData: [
{
  name: "PRINCIPAL1",
  individualLives: 1,
  groupLives: 0,
  dob: "1960-03-29",
  relation: "self",
  sumAssuredPercentage: 100,
},
{
  name: "PRINCIPAL2",
  individualLives: 1,
  groupLives: 0,
  dob: "1967-07-25",
  relation: "self",
  sumAssuredPercentage: 100,
},
{
  name: "PRINCIPAL3",
  individualLives: 1,
  groupLives: 0,
  dob: "1992-09-20",
  relation: "self",
  sumAssuredPercentage: 100,
},
{
  name: "PRINCIPAL4",
  individualLives: 1,
  groupLives: 0,
  dob: "2002-05-05",
  relation: "self",
  sumAssuredPercentage: 100,
},
{
  name: "PRINCIPAL5",
  individualLives: 1,
  groupLives: 0,
  dob: "1961-10-23",
  relation: "self",
  sumAssuredPercentage: 100,
},
{
  name: "PRINCIPAL6",
  individualLives: 1,
  groupLives: 0,
  dob: "1975-01-27",
  relation: "self",
  sumAssuredPercentage: 100,
},
{
  name: "PRINCIPAL7",
  individualLives: 1,
  dob: "2004-6-11",
  relation: "self",
  sumAssuredPercentage: 100,
},
{
  name: "PRINCIPAL8",
  individualLives: 1,
  groupLives: 0,
  dob: "1992-07-23",
  relation: "self",
  sumAssuredPercentage: 100,
},
{
  name: "SPOUSE",
  individualLives: 1,
  groupLives: 0,
  dob: "1989-12-30",
  relation: "spouse",
  sumAssuredPercentage: 75,
},
{
  name: "SPOUSE",
  individualLives: 1,
  groupLives: 0,
  dob: "1978-04-25",
  relation: "spouse",
  sumAssuredPercentage: 75,
},
{
  name: "SPOUSE",
  individualLives: 1,
  groupLives: 0,
  dob: "2003-08-15",
  relation: "spouse",
  sumAssuredPercentage: 75,
},
{
  name: "SPOUSE",
  individualLives: 1,
  groupLives: 0,
  dob: "1991-07-23",
  relation: "spouse",
  sumAssuredPercentage: 75,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2022-04-03",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2008-08-09",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2019-11-01",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2016-06-14",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2016-08-11",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2018-01-02",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2012-07-12",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2013-10-22",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2013-05-10",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2007-06-25",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2022-03-11",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2006-03-20",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2011-03-21",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2023-10-28",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2015-07-13",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2019-07-06",
  relation: "child",
  sumAssuredPercentage: 50,
},
{
  name: "CHILDREN",
  individualLives: 1,
  groupLives: 0,
  dob: "2016-04-17",
  relation: "child",
  sumAssuredPercentage: 50,
},
],

    lookupTable: [
      {
        Min: 0,
        Max: 29,
        CIMultiplier: 30,
        TIMultiplier: 30,
      },
      {
        Min: 30,
        Max: 39,
        CIMultiplier: 40,
        TIMultiplier: 40,
      },
      {
        Min: 40,
        Max: 49,
        CIMultiplier: 60,
        TIMultiplier: 60,
      },
      {
        Min: 50,
        Max: 59,
        CIMultiplier: 80,
        TIMultiplier: 80,
      },
      {
        Min: 60,
        Max: 69,
        CIMultiplier: 150,
        TIMultiplier: 150,
      },
      {
        Min: 70,
        Max: 100,
        CIMultiplier: 200,
        TIMultiplier: 200,
      },
    ],

    details: {
      salutation: formData.title,
      name: formData.clientName,
      gender: formData.clientGender,
      dob: formData.birthDate,
      spouseDob: formData.spouseDOB,
      email: formData.clientEmailAddress,
      phone: formData.telNo,
    },

    parameters: {
      benefitAmount: formData.sumAssured,
      policyTerm: formData.policyTerm,
      childAge: 18,
      expenseSumAssured: 100000,
      marketingLoading: 8,
      expenseLoading: 10,
      profitLoading: 5,
      morbidityLoading: 5,
      segment: "Individual Customer",
      TISelector: "Yes",
    },
  };

  const policyTerms = [1, 2, 3];
  const { Option } = Select;

  const handleNextClick = async () => {
    try {
      await form.validateFields();
      const currentValues = form.getFieldsValue();
      setFormData((prevFormData) => ({
        ...prevFormData,
        [steps[current]]: currentValues,
      }));

      if (current === 0 && !termsChecked) {
        alert("Please accept the terms and conditions");
        return;
      } else if (current === 0) {
        setCallbackModalVisible(true);
      } else if (current === steps.length - 2) {
        setCurrent(current + 1); // Move to the next step
      } else {
        setCurrent(current + 1); // Move to the next step
      }
      const values = await form.validateFields();
      console.log("VALUES", values);
      console.log("CURRENT", currentValues);
      // setFormData(prevFormData => ({
      //   ...prevFormData,
      //   [steps[current]]: values,
      // }));
      setFormData({ ...formData, ...values, phoneArea: phoneArea });
      console.log("Form data:", formData);
    } catch (error) {
      console.error("Validation Error:", error);
    }
  };

  const handlePrevClick = () => {
    setCurrent(current - 1);
  };

  const handleCallbackModalClose = () => {
    setCallbackModalVisible(false);
  };

  const handleCallbackContinue = async () => {
  
    if (selectedOption === "callback") {
      try {
        await form.validateFields();
        form.submit(); // Submit the form
        navigate("submit"); // Navigate to the critical-illness/submit path
      } catch (errorInfo) {
        console.log("Failed:", errorInfo);
      }
    } else if (selectedOption === "generate") {
      setCurrent(current + 1); // Move to the next step
    }
    setCallbackModalVisible(false); // Close the modal
  };

  const renderReviewAndConfirm = () => {
    console.log("FORM DATA", formData);
    return (
      <Form layout="vertical">
        <Card>
        <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 mt-3 flex flex-col gap-4">
        <p className="font-open-sans text-[15px] font-semibold leading-[28px] text-left">
          Please confirm your insurance purchase details to continue
        </p>
      </div>
        <Card title="PERSONAL DETAILS">
          <Row gutter={16}>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">First Name</p>
              <p>{formData.firstName} </p>
            </div>
            </Col>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Last Name</p>
              <p>{formData.lastName} </p>
            </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Email Adress</p>
              <p>{formData.email} </p>
            </div>
            </Col>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
  <p className="text-[#929497]">Mobile Number</p>
  <p>
    {formData?.phoneArea}{formData?.mobileNumber}
  </p>
</div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Date Of Birth</p>
              <p>{formatDate(formData.dob)} </p>
            </div>
            </Col>
          </Row>
        </Card>
        <br></br>
        <Card title="INSURED MEMBERS">
          <Row gutter={16}>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Number Of Principal Members</p>
              <p>{1} principal member (s)</p>
            </div>
            </Col>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Spouse Date Of Birth</p>
              <p>{formatDate(formData.spouseDOB)} </p>
            </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Number Of Spouses</p>
              <p>{formData.spouseNumber} spouse (s)</p>
            </div>
            </Col>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Number Of Children</p>
              <p>{formData.childrenNumber} children</p>
            </div>
            </Col>
          </Row>
        </Card>
        <br></br>
        <Card title="COVERAGE">
          <Row gutter={16}>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Amount to be paid for the cover</p>
              <p>{formatter.format(formData.sumAssured)} </p>
            </div>
            </Col>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Percentage of paid amount to be given to principal member</p>
              <p>{formatPercentage(formData.SAPrincipal)} </p>
            </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Percentage of paid amount to be given to spouse</p>
              <p>{formatPercentage(formData.SASpouse)} </p>
            </div>
            </Col>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Percentage of paid amount to be given to children</p>
              <p>{formatPercentage(formData.SAChildren)} </p>
            </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Cover Start Date</p>
              <p>{formatDate(formData.coverDate)} </p>
            </div>
            </Col>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Duration Of the Cover</p>
              <p>{formData.policyTerm} years</p>
            </div>
            </Col>
            <Col span={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className=" text-[#929497]">Cover End Date</p>
              <p>{formatDate(formData.coverExpiryDate)} </p>
            </div>
            </Col>
          </Row>
        </Card>
        </Card>
      </Form>
    );
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async () => {
    console.log('Form Data: ', formData);
    if (authStatus === "succeeded") {
      try {
        setLoading(true); 
        await dispatch(fetchData(dataToPost)).unwrap();
        message.success('Quote generated successfully!');
        setIsFormSubmitted(true);
      } catch (error) {
        setLoading(false); 
        message.error('Failed to submit form data.');
      }
    } else {
      message.error('Authentication failed.');
    }
  };


  useEffect(() => {
    if (!isLoading && isFormSubmitted) {
      navigate("critical-illness-quotation", {
        state: { formData, quotationData },
      });
    }
  }, [isLoading, navigate, formData, quotationData, dispatch, isFormSubmitted]);

  const steps = [
    {
      title: "Personal details",
      content: (
        <Form
          form={form}
          onFinish={(values) => console.log("Form submitted:", values)}
          layout="vertical"
        >
           <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 mt-3 flex flex-col gap-4">
        <p className="font-open-sans text-[15px] font-semibold leading-[28px] text-left">
          Please enter personal details
        </p>
      </div>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
              <Form.Item
                label="First Name"
                rules={[
                  { required: true, message: "Please input Customer Name." },
                ]}
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
                  placeholder="FirstName"
                />
              </Form.Item>

              <Form.Item
                label="Gender"
                rules={[{ required: true, message: "Please select gender." }]}
                name="gender"
                required
              >
                <Select id="gender" placeholder="Select Gender">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="birthDate"
                rules={[
                  { required: true, message: "Please enter date of birth." },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  value={birthDate}
                  disabledDate={(current) => {
                    const today = new Date();
                    const eighteenYearsAgo = new Date(
                      today.getFullYear() - 18,
                      today.getMonth(),
                      today.getDate()
                    );
                    return current && current >= eighteenYearsAgo;
                  }}
                />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true, message: "Please input last name." }]}
              >
                <Input id="lastName" placeholder="Last name" />
              </Form.Item>
              <Form.Item
                label="Email Adress"
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
                  onChange={(event) =>
                    setClientEmailAddress(event.target.value)
                  }
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
                    <ChoosePhoneArea
                      value={phoneArea}
                      onChange={setPhoneArea}
                    />
                  }
                  placeholder="Enter your mobile number"
                  onKeyPress={preventTextInput}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
    <Checkbox
        checked={termsChecked}
        onChange={(e) => setTermsChecked(e.target.checked)}
    >
        I accept the{" "}
        <a href="./critical-illness" style={{ color: "#A32A29" }}>
            terms
        </a>{" "}
        and{" "}
        <a href="./critical-illness" style={{ color: "#A32A29" }}>
            privacy policy
        </a>
    </Checkbox>
</Form.Item>

        </Form>
      ),
    },
    {
      title: "Insured Members",
      content: (
        <Form
          form={form}
          layout="vertical"
        >
          <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 mt-3 flex flex-col gap-4">
        <p className="font-open-sans text-[15px] font-semibold leading-[28px] text-left">
          Please enter the number of family members to be covered
        </p>
      </div>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
              <Form.Item
        label="How many principal members do you want to cover?"
        name="number"
        initialValue={1}
        rules={[
          {
            required: true,
            validator: (_, value) => {
              if (value !== 1) {
                return Promise.reject(new Error("The number must be 1."));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber
          min={1}
          max={1}
          style={{ width: "100%" }}
          readOnly
          disabled
        />
      </Form.Item>
               </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
               <Form.Item label="Do you want to cover your spouse?" name="spouse">
                <Switch onChange={(checked) => setSpouse(checked)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
              <Form.Item
                label="Spouse Date of Birth"
                name="spouseDOB"
                rules={[
                  {
                    required: spouse,
                    message: "Please enter spouse date of birth.",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabled={!spouse}
                  disabledDate={(current) => {
                    const today = new Date();
                    const eighteenYearsAgo = new Date(
                      today.getFullYear() - 18,
                      today.getMonth(),
                      today.getDate()
                    );
                    return current && current >= eighteenYearsAgo;
                  }}
                />
              </Form.Item>

            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
              <Form.Item
      label="How many spouses do you want to cover?"
      name="spouseNumber"
      rules={[
        {
          required: spouse,
          message: "Please enter the number of spouses.",
        },
      ]}
    >
      <InputNumber
        id="spouseNumber"
        value={spouseNumber}
        onChange={(value) => setSpouseNumber(parseFloat(value))}
        style={{ width: '100%' }}
        disabled={!spouse} 
      />
    </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
              <Form.Item label="Do you want to cover your children?" name="childrenVisible">
                <Switch onChange={(checked) => setChildrenVisible(checked)} />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
               <Form.Item
      label="How many children do you want to cover?"
      name="childrenNumber"
      rules={[
        {
          required: childrenVisible,
          message: "Please enter the number of children.",
        },
      ]}
    >
      <InputNumber
        id="childrenNumber"
        value={childrenNumber}
        onChange={(value) => setChildrenNumber(parseFloat(value))}
        disabled={!childrenVisible}
        style={{ width: '100%' }} 
      />
    </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Coverage",
      content: (
        <Form
          form={form}
          layout="vertical"
        >
         <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 mt-3 flex flex-col gap-4">
        <p className="font-open-sans text-[15px] font-semibold leading-[28px] text-left">
          Please confirm the sum assured and percentage sum assured for each member
        </p>
      </div>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
              <Form.Item
                label="How much would you like to pay for the cover?"
                name="sumAssured"
                rules={[
                  { required: true, message: "Please input sum assured." },
                ]}
              >
                <InputNumber
                  value={sumAssured}
                  style={{ width: "100%" }}
                  addonBefore="Ksh"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/(,*)/g, "")}
                  onChange={setSumAssured}
                />
              </Form.Item>
              <Form.Item
                label="What percentage of paid amount should be given to spouse?"
                name="SASpouse"
                rules={[
                  { required: true, message: "Please enter percentage." },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  step={0.1}
                  value={SASpouse}
                  onChange={(value) => setSASpouse(parseFloat(value))}
                />
              </Form.Item>
              <Form.Item
                label="When do you want the cover to start?"
                name="coverDate"
                rules={[
                  {
                    required: true,
                    message: "Please select start date.",
                  },
                ]}
                style={{ width: "100%", cursor: "pointer" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  id="coverDate"
                  disabledDate={disabledDate}
                  onChange={handleCoverDateChange}
                  inputReadOnly={true}
                />
              </Form.Item>
              <Form.Item
                label="Cover End Date"
                name="coverExpiryDate"
                style={{ width: "100%", cursor: "pointer" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  id="coverExpiryDate"
                  disabled
                  inputReadOnly={true}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: "10px" }}
            >
              <Form.Item
                label="What percentage of paid amount should be given to principal member?"
                name="SAPrincipal"
                rules={[
                  { required: true, message: "Please enter percentage." },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  step={0.1}
                  value={SAPrincipal}
                  onChange={(value) => setSAPrincipal(parseFloat(value))}
                />
              </Form.Item>
              <Form.Item
                label="What percentage of paid amount should be given to children?"
                name="SAChildren"
                rules={[
                  { required: true, message: "Please enter percentage." },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  step={0.1}
                  value={SAChildren}
                  onChange={(value) => setSAChildren(parseFloat(value))}
                />
              </Form.Item>

              <Form.Item
                label="How long do you want the cover to last (years)?"
                rules={[
                  { required: true, message: "Please select the Policy Term." },
                ]}
                name="policyTerm"
                required
              >
                <Select
                  id="policyTerm"
                  placeholder="Please select the cover duration"
                  value={policyTerm}
                  onChange={(value) => setPolicyTerm(parseFloat(value))}
                >
                  {policyTerms.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Review",
      content: <div>{renderReviewAndConfirm(formData)}</div>,
    },
  ];

  return (
    <div className="mb-4">
        <span>
          <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
            <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
          </button>
        </span>
        <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Get Critical Illness Cover (Individual)
        </span>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ marginTop: "24px" }}>
        {steps[current].content}
      </div>
      <div className="steps-action" style={{ marginTop: "24px" }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={handlePrevClick}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={handleNextClick}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
          >
            Generate Quote
          </Button>
        )}
      </div>
      <RequestCallbackModal
        visible={callbackModalVisible}
        onCancel={handleCallbackModalClose}
        onContinue={handleCallbackContinue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </div>
  );
};

export default GroupCriticalIllness;
