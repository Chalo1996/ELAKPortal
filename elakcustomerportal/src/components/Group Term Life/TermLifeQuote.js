import React, { useState, createContext, useContext,useRef} from 'react';
import { Row, Col, Table,Space,Form, Input,Divider,Tooltip,Button, DatePicker, Select,Steps, Modal, Radio, Checkbox,Typography } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { InfoCircleOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import sspFlag from '../../assets/flags/ssp.png';
import cdfFlag from '../../assets/flags/cdf.png';
import rwfFlag from '../../assets/flags/rwf.png';
import kesFlag from '../../assets/flags/kes.png';
import tzsFlag from '../../assets/flags/tzs.png';
import ugxFlag from '../../assets/flags/ugx.png';

const { Item } = Form;
const QuotationDataContext = createContext();
export const useQuotationData = () => useContext(QuotationDataContext);

const TermLifeQuote = () => {
const { Option } = Select;
const { Step } = Steps;
const { Title, Text,Link } = Typography;
const pdfRef = useRef();

const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
const [isConditionsModalVisible, setIsConditionsModalVisible] = useState(false);
const [isFirstDivVisible, setFirstDivVisible] = useState(true);
const [quoteData, setQuoteData] = useState(null);
const [refreshKey, setRefreshKey] = useState(0);
const [quotationData, setQuotationData] = React.useState(null);
const [isDivVisible, setIsDivVisible] = useState(false);
const [selectedOption, setSelectedOption] = useState(null);
const [isModalVisible, setIsModalVisible] = useState(false);
const [showReviewModal, setShowReviewModal] = useState(false);
const [reviewData, setReviewData] = useState({});
const [generateQuoteChecked, setGenerateQuoteChecked] = useState(false);
const [requestCallbackChecked, setRequestCallbackChecked] = useState(false);
const [form] = Form.useForm();
const [showModal, setShowModal] = useState(false);
const [currentStep, setCurrentStep] = useState(0);
const [formData, setFormData] = useState({
name: '',
secondname: '',
dateOfBirth: '',
email: '',
country:'',
countryCode: '',
phoneNumber: '',
premiumType: '',
isCoverLoan:'',
coverType: '',
principalAmount: '',
termInYears: '',
installmentsPerAnnum: '',
annualEscalationRate: 0,
annualInterestRate: 23,
singleJoint: '',
loanType: '',
sumAssured: '',
termInYearsCover: '',
benefitEscalationCover: '',
acceleratedCritalIllness: '',
percentageOfPremToBReturned: '',
returnOfPremiumOnSurvival: '',
paymentFrequency: ''
});

const retOfPremSurvival = { YES: 'YES', NO: 'NO',};
const premiumFrequency = { ANNUAL: 'Annual', ONEOFF: 'Oneoff',};
const percentPremRet = { '20': '20%', '50': '50%','80': '80%', '100': '100%',};
const benefitEscalation = { LEVEL: 'Stay the same over time', INCREASING: 'Get bigger over time',};
const loanTyp = { BULLLET: 'Payment at term end', AMORTIZATION: 'Gradual Payment',};
const singleJoint = { SINGLE: 'Single', JOINT: 'Joint',};
const isCoverForloan = { YES: 'Loan-Premium', NO: 'Non-LoanPremium',};
const coverTypes = { INDIVIDUAL: 'Individual', KEYMANRISK: 'Another Key Person',};
const countryCodes = { Kenya: '+254', Uganda: '+256', Tanzania: '+255', Rwanda: '+250', 'South Sudan': '+211', DRC: '+243' };
const acceleratedCI = { YES: 'YES', NO: 'NO',};
const phoneAreas = [
  { code: "+211", flag: sspFlag, country: "South Sudan" },
  { code: "+243", flag: cdfFlag, country: "DRC" },
  { code: "+250", flag: rwfFlag, country: "Rwanda" },
  { code: "+254", flag: kesFlag, country: "Kenya" },
  { code: "+255", flag: tzsFlag, country: "Tanzania" },
  { code: "+256", flag: ugxFlag, country: "Uganda" },
];

const showPolicyModal = () => {
  setIsPolicyModalVisible(true);
};
const handlePolicyOk = () => {
  setIsPolicyModalVisible(false);
};
const handlePolicyCancel = () => {
  setIsPolicyModalVisible(false);
};

const handleCustomerClick = () =>{
  navigate('/home'); 
};
//Terms&Conditions Consts
const showTermsModal = () => {
  setIsTermsModalVisible(true);
};
const showConditionsModal = () => {
  setIsConditionsModalVisible(true);
};
const handleTermsOk = () => {
  setIsTermsModalVisible(false);
};
const handleTermsCancel = () => {
  setIsTermsModalVisible(false);
};
const handleConditionsOk = () => {
  setIsConditionsModalVisible(false);
};
const handleConditionsCancel = () => {
  setIsConditionsModalVisible(false);
};
//end 
const toggleVisibility = () => {
  setFirstDivVisible(!isFirstDivVisible);
};
const updateQuoteData = (data) => {
  setQuoteData(data);
};
const handleChange = (changedValues, allValues) => {
setFormData(allValues);
setReviewData(allValues);
};
const handleInputChange = (e) => {
const { name, value} = e.target;
setFormData((prevFormData) =>
({ ...prevFormData, [name]: value }));
};
const handleSelectChange = (value, name) => {
setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
};
const handleNext = () => {
if(currentStep === 0){
setShowModal(true);
}
else{
form.validateFields().then(() => {
setCurrentStep(currentStep + 1);
})
.catch((error) => {
Modal.error({
title: 'Form Incomplete',
content: 'Please Ensure All Fields are Filled.',
});
});
}
};
const handlePrev = () => {
setCurrentStep(currentStep - 1);};
const termInYearsOptions = Array.from({ length: 50 }, (_, i) => i + 1);
const installmentsPerAnnumOptions = Array.from({ length: 12 }, (_, i) => i + 1);
const nonLoanTermInYearsOptions = Array.from({length:15}, (_, i) =>i +1);
const handleGenerateQuote =() =>{
setCurrentStep(currentStep + 1);
setShowModal(false);
};
const handleCheckboxChange = (e) => {
const { name, checked } = e.target;
if (name === 'generateQuote') {
setGenerateQuoteChecked(checked);
setRequestCallbackChecked(!checked);
} else if (name === 'requestCallback') {
setRequestCallbackChecked(checked);
setGenerateQuoteChecked(!checked);}};
const addCommas = (value) => {
return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const validatePhone = (_, value) => {
const cleanedPhoneNumber = value.replace(/[ -()]/g, '');
const phoneRegex = /^\d{9}$/;
if (value && !phoneRegex.test(cleanedPhoneNumber)) {
return Promise.reject('Please enter a valid phone number');}
return Promise.resolve();
};
const getRequiredRule = () => [{required: true, message: 'This Field is Mandatory!'}]
const handlePrincipalChange = (e) => {
let { value } = e.target;
value = value.replace(/[^\d,]/g, '');
const numericValue = value.replace(/,/g, '');
const parsedValue = parseFloat(numericValue);
if (!isNaN(parsedValue)) {
setFormData((prevFormData) => ({
...prevFormData,
principalAmount: parsedValue,
}));
} else {
setFormData((prevFormData) => ({
...prevFormData,
principalAmount: '',
}));
}
};
const handleSumAssuredChange = (e) => {
let { value } = e.target;
value = value.replace(/[^\d,]/g, '');
const numericValue = value.replace(/,/g, '');
const parsedValue = parseFloat(numericValue);
if (!isNaN(parsedValue)) {
setFormData((prevFormData) => ({
...prevFormData,
sumAssured: parsedValue,
}));
} else {
setFormData((prevFormData) => ({
...prevFormData,
sumAssured: '',
}));
}
};
const handleReturnOfPremiumChange = (value) => {
if (value === 'NO') {
setFormData(prevFormData => ({
...prevFormData,
returnOfPremiumOnSurvival: value,

percentageOfPremToBReturned: 0,
}));
} else {
setFormData(prevFormData => ({
...prevFormData,
returnOfPremiumOnSurvival: value,
}));
}
};
const formatNumberWithCommas = (number) => {
return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const yrsDrpDwnLoan = {};
for (let i = 1; i <= 50; i++) {
yrsDrpDwnLoan[i.toString()] = i.toString();
}
const yrsDrpDwnCover = {};
for (let i = 1; i <= 15; i++) {
yrsDrpDwnCover[i.toString()] = i.toString();
}
const instPerAnnDropDown = {};
for (let i = 1; i <= 12; i++) {
instPerAnnDropDown[i.toString()] = i.toString();
}
const handleReview = () => {
setShowReviewModal(true);
};
const handlePolicyCheckboxChange = (e) => {
setIsModalVisible(e.target.checked);
};
const handleOk = () => {
setIsModalVisible(false);
};
const navigate = useNavigate();
const handleBackClick = () =>{
navigate('/home');
};
const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    };
const toggleDivVisibility = () => {
setIsDivVisible(!isDivVisible);
};    
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

const handleRefresh = () => {
  setRefreshKey((prevKey) => prevKey + 1);
};

const isCoverLoan = formData.isCoverLoan;            
const amountCovered = isCoverLoan === 'YES' ? formData.principalAmount : formData.sumAssured;
const yearsCover = isCoverLoan === 'YES' ? formData.termInYears : formData.termInYearsCover;

//Beginning  of Quotation Functions 
const numberFormatter = new Intl.NumberFormat('en-US');
const columns = [
{title: '', dataIndex: 'attribute', key: 'attribute', width: '30%', render: (text) => <Text strong>{text}</Text>,},
{ title: '', dataIndex: 'value', key: 'value', width: '0%', render: (text) => (
<div style={{ textAlign: 'center' }}>{text}</div> ),
},
];
const personalCredentials = [
{ key: 'name', attribute: 'Name', value: formData.name },
//{ key: 'country', attribute: 'Country', value: formData.country},
{ key: 'phone', attribute: 'Phone', value: formData.phoneNumber},
{ key: 'email', attribute: 'Email', value: formData.email },
];
const policyCredentials = [
{ key: 'coverType', attribute: 'Cover Type', value: formData.coverType },
{ key: 'termsInYrs', attribute: 'Term In Years', value: yearsCover},
{ key: 'sumAssured', attribute: 'Sum Assured', value: amountCovered.toLocaleString()},  
{ key: 'annBenEscRate', attribute: 'Annual Benefit EScalation Rate', value: 0},
{ key: 'frequency', attribute: 'Frequency', value: formData.premiumFrequency },
];
const perPreRetValue = formData.retPreSur === 'NO' ? 0 : formData.perPreRet;
const selectedOPtionalBenefits = [
{ key: 'accCI', attribute: 'Accelerated Critical Illness', value: formData.acceleratedCritalIllness },
{ key: 'retPreSur', attribute: 'Return On Premiums On Maturity', value: formData.returnOfPremiumOnSurvival },
{ key: 'perPreRet', attribute: 'Percentage Of Premium Returned', value: formData.percentageOfPremToBReturned},
];

const generatePDF = () => {
  const input = pdfRef.current;
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save('quotation.pdf');
  }).catch((error) => {
    console.error('Error generating PDF:', error);
  });
};
const contextObject = {
dateOfBirth: formData.dateOfBirth,
principalAmount: formData.principalAmount, //.replace(/,/g, ''),
termInYears: formData.termInYears,
annualInterestRate: formData.annualInterestRate,
installmentsPA: formData.installmentsPerAnnum,
sumAssuredCover: formData.sumAssured,
termYearsCover: formData.termInYearsCover,
loanType: formData.loanType,
coverType: formData.coverType,
isCoverLoan: formData.isCoverLoan,
singleJoint: formData.singleJoint,
benefitEscalationCover: formData.benefitEscalationCover,
annualEscalationRate: formData.annualEscalationRate,
acceleratedCritalIllness: formData.acceleratedCritalIllness,
returnOfPremiumOnSurvival: formData.returnOfPremiumOnSurvival,
percentageOfPremToBReturned: formData.percentageOfPremToBReturned,
premiumFrequency: formData.premiumFrequency,
};

fetch('https://sisos-eu.azurewebsites.net/api/cmd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlNUQUNZLk9ESElBTUJPQGVic2FmcmljYS5vbm1pY3Jvc29mdC5jb20iLCJyb2xlIjoiVXNlciIsImdyb3Vwc2lkIjoiZXF1aXR5IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbG9jYWxpdHkiOiJFTiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N5c3RlbSI6IiIsIm5iZiI6MTcxODY5MDE4NiwiZXhwIjoxNzE5Mjk0OTg2LCJpYXQiOjE3MTg2OTAxODZ9.COf1FVjQmnpZwfoCnMRWL1oXmNeAWoVIeSJuy5EteJY'
    },
    body: JSON.stringify({
      cmd: "ExeChain",
      data: {
        chain: "M3TrainingTermLifeCalculator",
        context: JSON.stringify(contextObject)
      }
    })
  })
  .then(response => response.json())
  .then(result => {
    const { ok, msg, outData } = result;
    if (!ok) {
      throw new Error(msg);
    } 
    else{  
      setQuotationData(outData.premiumData[0]);
      console.log(outData);
      console.log(quotationData);
    }
  })
  .catch(error => {
    //console.error('Error:', error.message);
   });
   console.log('ContextObject', contextObject);

return (
<div>
<Space
style={{
fontSize: '19px',
marginTop: '10px',
fontWeight: '600',
alignItems: 'center',
cursor: 'pointer'
}}
onClick={handleBackClick}>
<ArrowLeftOutlined style={{ color: 'black' }}/>
Term Life Cover
</Space>

    <Modal
    title="What would you like to do?"
    visible={showModal}
    onCancel={() => setShowModal(false)}
    footer={[
      <Row justify="start" key="footer-row" className="mt-4">
      <Button
          key="submit"
          type="primary"
          onClick={handleGenerateQuote}
          disabled={!selectedOption}
          className="shadow-none">
          Continue
      </Button>
      </Row>,
    ]}>
    <br></br>
    <Radio.Group 
    onChange={handleRadioChange}
    style={{ width: '100%' }}>
        <div className="w-full flex items-center justify-between">
        <Typography.Text>Generate Quote</Typography.Text>
        <Radio value="quote"></Radio>
        </div>

        <Divider/>
        <div className="w-full flex items-center justify-between">
        <Typography.Text>Request a Call Back</Typography.Text>
        <Radio value="callback"></Radio>
        </div>
    </Radio.Group>
    </Modal>

    {(!isDivVisible &&
        <Steps  
        current={currentStep} style={{ marginTop: '50px' }}>
        <Step title="Personal Details"/>
        <Step title="Cover Details"/>
        <Step title="Additional Options"/>
        <Step title="Review"/>
        </Steps>
    )}

<Form
form={form}
layout="vertical"
style={{ marginTop: '40px'}}
onFinish={handleNext}>
{currentStep === 0 && (
<div>
<h1
style={{ textAlign: 'left', fontSize: '16px', marginBottom: '30px',marginTop: '30px' }}>
Please enter your details
</h1>
<Row gutter={16}>
<Col span={12}>

<Form.Item
label="First Name"
name="name"
rules={[{ required: true, message: 'Please input your name!' }]}>
<Input
name="name"
value={formData.name}
onChange={handleInputChange}/>
</Form.Item>

</Col>
<Col span={12}>
<Form.Item
label="Last Name"
name="secondname"
style={{ width: '100%' }}
rules={[{ required: true, message: 'Enter Last Name' }]}>
<Input
name="secondname"
value={formData.secondname}
onChange={handleInputChange}/>
</Form.Item>
</Col>
</Row>
<Row gutter={16}>
<Col span={12}>

<Form.Item
label="Date Of Birth"
name="dob"
value={formData.dateOfBirth}
rules={[{ required: true, message: 'Please input your date of birth!' },]}>
<DatePicker
format="YYYY-MM-DD"
placeholder="2006-12-31"
style={{ width: '100%' }}
onChange={(date, dateString) => handleSelectChange(dateString, 'dateOfBirth')}
disabledDate={(current) => {
const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
return current && (current > today || current > eighteenYearsAgo);
}}/>
</Form.Item>


        <Form.Item
            label="Mobile Number"
            name="tel"
            rules={[
              { required: true, message: 'Please enter your Mobile number',},{ pattern: "^[0-9]{9}$", message: "The Phone number should be 9 digits!",},]}>
            <Input
              addonBefore={
                <Select
                  style={{ width: 100 }}
                  defaultValue="+254"
                  onChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      phoneArea: value,
                    }))
                  }>
                  {phoneAreas.map((item) => (
                    <Option value={item.code} key={item.code}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={item.flag}
                          alt={item.country}
                          style={{ width: '20px', marginRight: '8px' }}/>
                        {item.code}
                      </div>
                    </Option>
                  ))}
                </Select>
              }
              value={formData.phoneNumber}
              onChange={(event) =>
                setFormData((prevData) => ({
                  ...prevData,
                  phoneNumber: event.target.value,
                }))
              }
              style={{ width: '100%' }}/>
          </Form.Item>



</Col>

<Col span={12}>
<Form.Item
label="Email"
name= "email"
rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!'}]}>
<Input
name= "email"
placeholder="johndoe@gmail.com"
value={formData.email}
onChange={handleInputChange}/>
</Form.Item>

</Col>
</Row>

<Row gutter={16}>
<Col span={12}>
    
    <>
      <Form.Item
        style={{ marginTop: '30px', marginLeft: '0px' }}
        valuePropName="checked">
        <Checkbox style={{ color: 'black' }}>
          <span style={{ color: 'black' }}>I accept </span>
          <Link onClick={showTermsModal} style={{ color: '#8B4513' }}>
            Terms
          </Link>
          <span style={{ color: 'black' }}> and </span>
          <Link onClick={showConditionsModal} style={{ color: '#8B4513' }}>
            Conditions
          </Link>
        </Checkbox>
      </Form.Item>
      <Modal
        title="Terms"
        visible={isTermsModalVisible}
        onOk={handleTermsOk}
        onCancel={handleTermsCancel}>
        <p>Your terms content goes here...</p>
      </Modal>
      <Modal
        title="Conditions"
        visible={isConditionsModalVisible}
        onOk={handleConditionsOk}
        onCancel={handleConditionsCancel}>
        <p>Your conditions content goes here...</p>
      </Modal>
    </>
</Col>
</Row>
</div>
)}

{currentStep === 1 && (
<>
<h1
style={{ textAlign: 'left', fontSize: '16px', marginBottom: '20px',marginTop: '0px',color: 'black' }}>
Please enter your cover details
</h1>
<Row gutter={16}>
<Col span={12}>
<Form.Item
label="What type of cover premium would you like?"
name="isCoverLoan"
rules={[{ required: true, message: 'This field is required' }]}>
<Select
placeholder="Loan-Premium"
value={formData.isCoverLoan}
onChange={(value) => handleSelectChange(value, 'isCoverLoan')}
style={{ width: '100%' }}>
{Object.keys(isCoverForloan).map((option) => (
    <Option key={option} value={option}>
    {isCoverForloan[option]}
    </Option>
))}
</Select>
    </Form.Item>
</Col>

<Col span={12}>

<Form.Item
  name="coverType"
  rules={[{ required: true, message: 'This field is required' }]}
  label={<span>Do you want a cover for individual protection&nbsp;
      <Tooltip title="Choose whether you want a cover for yourself or for another important person">
        <QuestionCircleOutlined />
      </Tooltip>
    </span>}
    >
  <Select
    placeholder="Individual"
    value={formData.coverType}
    onChange={(value) => handleSelectChange(value, 'coverType')}
    // Tooltip for the Select component itself
    dropdownRender={(menu) => (
      <div>
        {menu}
        <Tooltip title="Individual cover in insurance to coverage designed to protect an individual against specific risks.It  provides financial compensation to the insured person in case of covered events such as illness, injury, disability, or death whereas
                        Keyman-risk insurance is a policy taken out by a business on the life of a key employee or employees whose skills, knowledge, or leadership are crucial to the company's operations and profitability.">
          <QuestionCircleOutlined style={{ marginLeft: '8px' }} />
        </Tooltip>
      </div>
    )}
  >
    {Object.keys(coverTypes).map((type) => (
      <Option key={type} value={type}>
        {coverTypes[type]}
      </Option>
    ))}
  </Select>
</Form.Item>
</Col>
</Row>


{formData.isCoverLoan === 'YES' && (
<div>
<Row gutter={16}>
<Col span={12}>
<Item
label="How much would you like to pay for the cover ?"
value={formatNumberWithCommas(formData.principalAmount)}>
<Input
name="principalAmount"
rules={[{ required: true, message: 'Please Enter Principal Amount'}]}
placeholder="Principal Amount"
type="text"
value={formatNumberWithCommas(formData.principalAmount)}
onChange={handlePrincipalChange}/>
</Item>

<Item
name="termInYears"
rules={[{ required: true, message: 'This field is required' }]}
label="How  many years  will the cover take ?">
<Select
name="termInYears"
placeholder="7"
value={formData.termInYears}
onChange={(value) => handleSelectChange(value, 'termInYears')}
style={{ width: '100%' }}>
{Object.keys(yrsDrpDwnLoan).map((year) => (
<Option key={year} value={parseInt(year)}>
{year}
</Option>
))}
</Select>
</Item>

<Item
rules={[{ required: true, message: 'This field is required' }]}
label="What's the preferred number of payments per year for you ?">
<Select
name="installmentsPerAnnum"
placeholder="12"
value={formData.installmentsPerAnnum}
onChange={(value) => handleSelectChange(value, 'installmentsPerAnnum')}
style={{ width: '100%' }}>
{Object.keys(instPerAnnDropDown).map((year) => (
<Option key={year} value={parseInt(year)}>
{year}
</Option>
))}
</Select>
</Item>
</Col>

<Col span={12}>
<Item
label="Is this cover for you (single) or you and your partner (joint)?"
name="singleJoint"
rules={getRequiredRule()}>
<Select
name="singleJoint"
placeholder="SINGLE"
value={formData.singleJoint}
onChange={(value) => handleSelectChange(value, 'singleJoint')}>
{Object.keys(singleJoint).map((type) => (
<Option key={type} value={type}>
{singleJoint[type]}
</Option>
))}
</Select>
</Item>

<Form.Item
  name="loanType"
  rules={getRequiredRule()} // Assuming getRequiredRule() returns the required validation rule
  label={<span>
      Preferred Repayment Schedule&nbsp;
      <Tooltip title="What way  better  suits  you  in terms  of the manner  of repaying.">
        <QuestionCircleOutlined />
      </Tooltip>
    </span>}>
  <Select
    name="loanType"
    placeholder="Gradual Payment"
    value={formData.loanType}
    onChange={(value) => handleSelectChange(value, 'loanType')}
    dropdownRender={(menu) => (
      <div>
        {menu}
        <Tooltip title="Bullet payments refer to a type of loan repayment structure where the borrower pays off the entire principal amount in one lump sum at the end of the loan term.
                        whereas Amortization refers to a loan repayment schedule where both principal and interest are paid off gradually over the loan term.">
          <QuestionCircleOutlined style={{ marginLeft: '8px' }} />
        </Tooltip>
      </div>
    )}
  >
    {Object.keys(loanTyp).map((type) => (
      <Select.Option key={type} value={type}>
        {loanTyp[type]}
      </Select.Option>
    ))}
  </Select>
</Form.Item>


</Col>
</Row>
</div>
)}

{formData.isCoverLoan === 'NO' && (
<div>
<Row gutter={16}>
<Col span={12}>
<Item
label="How much would you like to pay for the cover?">
<Input
name="sumAssured"
placeholder="1000,000"
type="text"
value={formatNumberWithCommas(formData.sumAssured)}
onChange={handleSumAssuredChange}/>
</Item>

<Item
name="termInYearsCover"
label="How Many Years Will  the Cover take?"
rules={[{ required: true, message: 'This field is required' }]}>
<Select
name="termInYearsCover"
placeholder="15"
value={formData.termInYearsCover}
onChange={(value) => handleSelectChange(value, 'termInYearsCover')}
style={{ width: '100%' }}>
{Object.keys(yrsDrpDwnCover).map((year) => (
<Option key={year} value={parseInt(year)}>
{year}
</Option>
))}
</Select>
</Item>
</Col>

<Col span={12}>
<Item
name="benefitEscalationCover"
label="How Would You Like Benefits to change Over Time?"
rules={getRequiredRule()}>
<Select
name="benefitEscalationCover"
placeholder="LEVEL"
value={formData.benefitEscalationCover}
onChange={(value) => setFormData((prevFormData) => ({ ...prevFormData, benefitEscalationCover: value }))}
style={{ width: '100%' }}>
{Object.keys(benefitEscalation).map((option) => (
<Option key={option} value={option}>
{benefitEscalation[option]}
</Option>
))}
</Select>
</Item>
</Col>
</Row>
</div>
)}
</>
)}


{currentStep === 2 && (
<>
<h1
style={{ textAlign: 'left', fontSize: '16px', marginBottom: '20px',marginTop: '0px',color: 'black' }}>
Please Enter Additional Details
</h1>
<Row gutter={16}>
<Col span={12}>

<Item 
name="acceleratedCritalIllness"
label="Have you been diagnosed with any critical illness?"
rules={getRequiredRule()}
style={{ marginTop: '22px' }}>
<Select
name="acceleratedCritalIllness"
placeholder="NO"
value={formData.acceleratedCritalIllness}
onChange={(value) => handleSelectChange(value, 'acceleratedCritalIllness')}
style={{ width: '100%' }}>
{Object.keys(acceleratedCI).map((option) => (
<Option key={option} value={option}>
{acceleratedCI[option]}
</Option>
))}</Select>
</Item>


<Item
rules={getRequiredRule()}
label="How much refund  would you like if the insurance goes unused?">
<Select
name="percentageOfPremToBReturned"
placeholder="50%"
value={formData.returnOfPremiumOnSurvival === 'NO' ? 0 : formData.percentageOfPremToBReturned}
onChange={(value) => handleSelectChange(value, 'percentageOfPremToBReturned')}
style={{ width: '100%' }}
disabled={formData.returnOfPremiumOnSurvival === 'NO'}>
{Object.keys(percentPremRet).map((option) => (
<Option key={option} value={parseInt(option)}>
{percentPremRet[option]}
</Option>
))}
</Select>
</Item>
</Col>

<Col span={12}>
<Item
name="returnOfPremiumOnSurvival"
label="Would you like a refund of insurance if you outlive the policy term?"
style= {{marginTop: '21px'}}
rules={getRequiredRule()}>
<Select
name="returnOfPremiumOnSurvival"
placeholder="YES"
value={formData.returnOfPremiumOnSurvival}
onChange={handleReturnOfPremiumChange}
style={{ width: '100%' }}>
{Object.keys(retOfPremSurvival).map((option) => (
<Option key={option} value={option}>
{retOfPremSurvival[option]}
</Option>
))}
</Select>
</Item>

<Item
name="premiumFrequency"
label="What Payment Frequency Suits You?"
rules={getRequiredRule()}>
<Select
name="premiumFrequency"
placeholder="ANNUAL"
value={formData.premiumFrequency}
onChange={(value) => handleSelectChange(value, 'premiumFrequency')}
style={{ width: '100%' }}>
{Object.keys(premiumFrequency).map((option) => (
<Option key={option} value={option}>
{premiumFrequency[option]}
</Option>
))}
</Select>
</Item>
</Col>
</Row>
</>
)}

{currentStep === 3 && (
<>
{/*------------------------------------Review Page----------------------------------------------------------------*/}
  {!isDivVisible ? (
      <div style={{ padding: '20px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h4 style={{ marginBottom: '20px' }}>Please, Review and confirm Your Information details to continue</h4>
      <div>
      <br/>
      <div>
      <Row gutter={16}>
      <Col span={12}>
      <h5 style={{ color: '#888', marginBottom: '5px' }}>Product</h5>
      <span>Term Life Cover</span>
      </Col>
      </Row>
      </div>
      <Divider/>
      <br/>

      
      <h4 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Personal Information</h4>
      <br/>
      {/*---------------------------------PERSONAL DETAILS-----------------------------------------*/}
      <div>
      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>First Name</h4>
      <span>{formData.name}</span>
      </Col>
      <br />
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Last Name</h4>
      <span>{formData.secondname}</span>
      </Col>
      </Row>
      <br />
      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Telephone No</h4>
      <span>{formData.phoneNumber}</span>
      </Col>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Email</h4>
      <span>{formData.email}</span>
      </Col>
      </Row>
      <br />
      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Date of Birth</h4>
      <span>{formData.dateOfBirth}</span>
      </Col>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Country</h4>
      <span>{formData.country}</span>
      </Col>
      </Row>
      <br />
      </div>
      <Divider/>

      {/*----------------------------------COVER DETAILS-----------------------------------------*/}
      <h4 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Cover Details</h4>
      <br/>
      <div>
      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Premium Type</h4>
      <span>{formData.isCoverLoan}</span>
      </Col>
      <br />
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Cover Type</h4>
      <span>{formData.coverType}</span>
      </Col>
      </Row>
      <br />

      {formData.isCoverLoan === 'YES' &&(
      <>
      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Principal</h4>
      <span>{formData.principalAmount}</span>
      </Col>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Term In Years</h4>
      <span>{formData.termInYears}</span>
      </Col>
      </Row>
      <br/>

      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Installments Per Annum</h4>
      <span>{formData.installmentsPerAnnum}</span>
      </Col>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Single or Joint</h4>
      <span>{formData.singleJoint}</span>
      </Col>
      </Row>
      <br/>

      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Loan Type</h4>
      <span>{formData.loanType}</span>
      </Col>
      </Row>
      <br/>
      </>
      )}

      {formData.isCoverLoan === 'NO' &&(
      <>
      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Sum Assured </h4>
      <span>{formData.sumAssured}</span>

      <h4 style={{ color: '#888', marginBottom: '5px' }}>Term In Years</h4>
      <span>{formData.termInYearsCover}</span>
      </Col>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Benefit Escalation</h4>
      <span>{formData.benefitEscalationCover}</span>
      </Col>
      </Row>
      <br/>
      </>
      )}
      </div>
      <Divider/>

      {/*----------------------------------Additional Options-----------------------------------------*/}
      <h4 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}> Additional Options</h4>
      <br/>
      <div>
      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Accelerated Critical Illness</h4>
      <span>{formData.acceleratedCritalIllness}</span>
      </Col>
      <br />
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Percentage of Premium to be Returned</h4>
      <span>{formData.percentageOfPremToBReturned}</span>
      </Col>
      </Row>
      <br />
      <Row gutter={16}>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Return of Premium on Survival</h4>
      <span>{formData.returnOfPremiumOnSurvival}</span>
      </Col>
      <Col span={12}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>Payment Frequency</h4>
      <span>{formData.premiumFrequency}</span>
      </Col>
      </Row>
      <br />
      </div>
      <Divider/>
      </div>


      <div>
      <Row gutter={16}>
      {Object.entries(reviewData).map(([key, value]) => (
      <Col span={12} key={key}>
      <p>
      <strong>{key.toUpperCase()}:</strong> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
      </p>
      </Col>
      ))}
      </Row>
      </div> 
      </div>
  ) 

  : 
  
  ( 
  <>
    <div
      ref={pdfRef}
      value={{ quoteData, updateQuoteData }} 
      style={{ maxWidth: '800px',marginTop: '30px', padding: '20px',backgroundColor: 'white' ,border: '2px solid black', margin: 'auto'}}>
      <Row justify="start">
        <Col span={12}>
        <Title
        style={{ textAlign: 'start', marginTop: '20px',}} level={4}>
        <span style={{ fontWeight: 'bold', color: 'black' }}>Equity Life Assurance (Kenya) Limited</span>
        </Title>
        
        <Title
        style={{ textAlign: 'start', marginTop: '20px' }}
        level={4}>
        <span style={{ fontWeight: 'bold', color: 'black' }}>Term Life Product Quotation </span>
        </Title>
        </Col>
        
        <Col span={12} style={{ textAlign: 'end'}}>
        <img
        src="https://equitygroupholdings-ke-uat.azurewebsites.net/ke/templates/equity/assets/img/equity-bank-logo.png"
        alt="Company Logo"
        style={{
        maxWidth: '140px',
        maxHeight: '140px',
        marginTop: '0px',
        marginRight: '45px',
        marginLeft: 'auto',
        }} />
        <Title
        style={{ marginTop: '5px', marginRight: '60px' }} level={4}>
        <span style={{ fontWeight: 'bold', color: 'black' }}>{getCurrentDate()}</span>
        </Title>
        </Col>
        </Row>
        <Title
        style={{ textAlign: 'start', marginTop: '20px', fontSize: '17px'}}
        level={4}>
        <span style={{ fontWeight: 'bold', color: 'black' }}>Customer Details</span>
        </Title>
        <Table
        columns={columns}
        dataSource={personalCredentials}
        pagination={false}
        bordered
        size="middle"
        style={{
        border: '2px solid black',
        padding: '20px',
        marginBottom: '20px',
        }}/> 
        <Title
        style={{ textAlign: 'start'}} level={4}>
        <span style={{ fontWeight: 'bold', color: 'black' }}>Policy Details</span>
        </Title>
        <Table
        columns={columns}
        dataSource={policyCredentials}
        pagination={false}
        bordered
        size="middle"
        style={{
        border: '2px solid black',
        padding: '20px',
        marginBottom: '20px',
        }}/>
        <Title
        style={{ textAlign: 'start'}} level={4}>
        <span style={{ fontWeight: 'bold', color: 'black'}}>
        Selected Optional Benefits
        </span>
        </Title>
        <Table
        columns={columns}
        dataSource={selectedOPtionalBenefits}
        pagination={false}
        bordered
        size="middle"
        style={{
        border: '2px solid black',
        padding: '20px',
        marginBottom: '20px',
        }}/>
        
        <Title
        style={{ textAlign: 'start'}} level={4}>
        <span style={{ fontWeight: 'bold',  width: '100%' ,color: 'black',marginTop:'30px' }}>Premium Details</span>
        </Title>
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', weight: 800}}>
        <Row gutter={[16, 16]} style={{ flexDirection: 'column' }}>
          {Object.keys(quotationData).map((key) => (
            <Col span={24} key={key} style={{ marginBottom: '16px' }}>
              <Text strong style={{ display: 'inline-block', width: '450px' }}>{key}:</Text>
              <Text>
                {numberFormatter.format(quotationData[key])}
              </Text>
            </Col>
          ))}
        </Row>
        </div>
        
        <Title
        style={{ textAlign: 'start'}} level={4}>
        <span style={{ fontWeight: 'bold', color: 'black' }}>Notes:</span>
        </Title>
        <Title
        style={{ textAlign: 'start'}} level={4}>
        Quotation is valid for 90 days since the date of issue <br />
        Medical underwriting will be required for a Sum Assured (SA) above KShs 5 million Term & Conditions
        </Title>
        <Title style={{ textAlign: 'start' }} level={4}>
        <span style={{ fontWeight: 'bold', color: 'black' }}>Terms and Conditions</span>
        </Title>
        <Title style={{ textAlign: 'start' }} level={4}>
        <span style={{ color: 'maroon', textDecoration: 'underline' }}>
        https://www.equity.co.ke/insurance/termlife
        </span>
        </Title>
        <Title style={{ textAlign: 'start' }} level={4}>
        <span style={{ fontWeight: 'bold', color: 'black' }}>Contacts</span>
        </Title>
        <Title style={{ textAlign: 'start', color: 'blue', textDecoration: 'underline' }} level={4}>
        Email: <span style={{ color: 'blue', textDecoration: 'underline' }}>quotations@equityinsurance.co.ke</span>
        </Title>
        <Title style={{ textAlign: 'start', color: 'black' }} level={4}>
        Tel: 0765000000
        </Title>
        </div>

      <div>
      <Checkbox 
         style= {{marginTop: '40px',marginLeft : '150px'}}>
        <span style={{ color: 'black' }}>I accept </span>
        <span style={{ color: 'brown', cursor: 'pointer' }}
              onClick={showPolicyModal}> policy exclusions
        </span>
      </Checkbox>
      <Modal
        title="Policy Exclusions"
        visible={isPolicyModalVisible}
        onOk={handlePolicyOk}
        onCancel={handlePolicyCancel}>
        <p>
           When considering term life insurance, it's important to be aware of
            potential policy exclusions that may affect coverage. Common exclusions
            often include pre-existing conditions, where deaths resulting from undisclosed
            medical conditions are not covered. Many policies have a suicide exclusion clause,
            typically within the first two years of the policy, meaning if the policyholder
            commits suicide during this period, the insurer may not pay out the death benefit.

            Engaging in hazardous activities, such as extreme sports like skydiving or scuba diving,
            may also lead to exclusions. Deaths resulting from these activities might not be covered
            if they were not disclosed during the application process. Similarly, deaths occurring
            during illegal activities, including drug use or committing a crime, are often excluded from coverage.

            Acts of war and terrorism can also be excluded from term life insurance policies.
            This means that if the policyholder dies due to war or terrorism, the insurance company may not pay
            out the benefit. Additionally, deaths resulting from alcohol or drug abuse are commonly excluded,

            and insurers may deny claims if the death is directly linked to substance misuse.
            Understanding these exclusions helps policyholders ensure they are adequately covered a
            nd avoid situations that might invalidate their policy.
        </p>
      </Modal>
      <Button
        type="primary"
        style={{ marginLeft: 850}}
        onClick={generatePDF}>
        Download
       </Button>
      </div>    
  </>
  )}
</>
)}
{(!isDivVisible &&
  <Form.Item>
    {currentStep > 0 && (   
    <Button
    style={{ marginRight: 8 }}
    onClick={handlePrev}>
    Previous
    </Button>
    )}
    {currentStep < 3 && (
    <Button
    type="primary"
    style={{ marginRight: 8 }} onClick={handleNext}>
    Next
    </Button>
    )}
    {currentStep === 3 && (
      <>    
      <Button
      type="primary"
      onClick={toggleDivVisibility} 
      style={{ marginRight: 8,marginLeft: 10 , marginTop: '20px'}}>
        Generate Quotation
      </Button> 
      </>
    )}
   </Form.Item>
 )}
    </Form>
    </div>
  );
};
export default TermLifeQuote;