import React, {useState,useEffect} from "react";
import {Steps,Form,Input,Radio,message, Divider,Typography,Card,Space,DatePicker,Button,Row,Col,Select,Modal,InputNumber,Checkbox} from "antd";
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/redux/features/goalSlice";
import moment from "moment";
import 'tailwindcss/tailwind.css';

import sspFlag from '../../assets/flags/ssp.png';
import cdfFlag from '../../assets/flags/cdf.png';
import rwfFlag from '../../assets/flags/rwf.png';
import kesFlag from '../../assets/flags/kes.png';
import tzsFlag from '../../assets/flags/tzs.png';
import ugxFlag from '../../assets/flags/ugx.png';

const { Step } = Steps;
const { Option } = Select;
const { Title } = Typography;


const Goalbased = () => {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    tel: '',
    phoneAreas: '',
    email: '',
    DOB: null,
    targetType: '',
    TermInYears: 0,
    goalType: '',
    optionalBenefit:'',
    frequency: '',
    premium: 0,
    currency: 'KES',
    startDate: null,
    endDate: null,
    currencies: [
      { code: 'KES', name: 'KES' },
      { code: 'USD', name: 'USD' },
    
    ],
  });

  
  const navigate = useNavigate();
  const dispatch = useDispatch();

const cData = useSelector((state) => state.goalBased.goalbasedData);
const authStatus = useSelector((state) => state.auth.status);
const isLoading = useSelector((state) => state.goalBased.isLoading);
  

const dataToPost = {
  "firstName": formData.firstName,
  "lastName": formData.lastName,
  "tel": formData.tel,
  "phoneAreas": formData.phoneAreas,
  "email": formData.email,
  "DOB": formData.DOB,
  "targetType": formData.targetType,
  "TermInYears": formData.TermInYears,
  "frequency": formData.frequency,
  "goalType": formData.goalType,
  "optionalBenefit":formData.optionalBenefit,
  "premium": formData.premium,
  "currency": formData.currency,
  "startDate": formData.startDate,
  "endDate": formData.endDate,
  "gender": formData.gender,
  };
  const handleSubmit = async () => {
    if (authStatus === "succeeded") {
      try {
        await dispatch(fetchData(dataToPost)).unwrap();
        console.log('Form Data:', formData);
        message.success('Quote generated successfully!');
        setIsFormSubmitted(true);
      } catch (error) {
        message.error('Failed to submit form data.');
      }
    } else {
      message.error('Authentication failed.');
    }
  };
  useEffect(() => {
    if (isFormSubmitted && !isLoading) {
      const serializableFormData = JSON.parse(JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        tel: formData.tel,
        phoneAreas: formData.phoneAreas,
        email: formData.email,
        DOB: formData.DOB,
        targetType: formData.targetType,
        TermInYears: formData.TermInYears,
        frequency: formData.frequency,
        goalType: formData.goalType,
        optionalBenefit:formData.optionalBenefit,
        premium: formData.premium,
        currency: formData.currency,
        startDate: formData.startDate,
        endDate: formData.endDate,
        gender: formData.gender,
      }));
      console.log('cData:', cData);
      const serializableCData = JSON.stringify(cData, (key, value) => {
        if (typeof value === 'function') {
          return undefined; // remove functions
        }
        return value;
      });
     
      navigate("Goal-Quotation", {
        state: { formData: serializableFormData, cData: serializableCData },
      });
    }
  }, [isFormSubmitted, isLoading, navigate, formData, cData]);



  useEffect(() => {
    if (formData.startDate && formData.TermInYears) {
      const calculatedEndDate = calculateEndDate(formData.startDate, formData.TermInYears);
      setFormData((prevData) => ({ ...prevData, endDate: calculatedEndDate }));
      form.setFieldsValue({ endDate: calculatedEndDate });
    }
  }, [formData.startDate, formData.TermInYears,form]);
  const handleStartDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: date ? moment(date).startOf('day') : null,
    }));
  };
  const handleTermInYearsChange = (value) => {
    setFormData((prevData) => ({ 
      ...prevData, TermInYears: value }));
  };
  const calculateEndDate = (startDate, years) => {
    const startMoment = moment.utc(startDate); // Parse as UTC date
    const localStartMoment = startMoment.local(); // Convert to local date
  
    console.log('startDate:', localStartMoment.format('YYYY-MM-DD'));  // Debug log
  
    if (localStartMoment.isValid() && years) {
      return localStartMoment.add(years, 'years');
    }
    return null;
  };
  const onChangeCurrency = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      currency: value,
    }));
  };

  const getTermInYearsOptions = (goalType) => {
    switch (goalType) {
      case 'ShortTerm':
        return [1, 2];
      case 'MediumTerm':
        return [3, 4, 5];
      case 'LongTerm':
        return [6, 7, 8, 9, 10];
      default:
        return [];
    }
  };
  

  const handlegoalTypeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      goalType: value,
      TermInYears: null 
    }));
  };
  const phoneAreas = [
    { code: "+211", flag: sspFlag, country: "South Sudan" },
    { code: "+243", flag: cdfFlag, country: "DRC" },
    { code: "+250", flag: rwfFlag, country: "Rwanda" },
    { code: "+254", flag: kesFlag, country: "Kenya" },
    { code: "+255", flag: tzsFlag, country: "Tanzania" },
    { code: "+256", flag: ugxFlag, country: "Uganda" },
  ];
  const handleChange = (newValue) => {
    const area = phoneAreas.find((item) => item.code === newValue);
    setFormData((prevData) => ({
      ...prevData,
      country: area.country,
      phoneAreas: area.code,
    }));
  };
  const handleNavigate = () => {
    navigate(-1); // Navigates to the previous page
  };
  const next = () => {
    form.validateFields().then(() => {
      if (current === 0) {
        setIsModalOpen(true); // Only open modal for step 0
      } else if (current === 2) {
        // Submit the form here
        form.submit();
      } else {
        setCurrent(current + 1); // Directly go to next step for other steps
      }
    }).catch(errorInfo => {
      console.log('Validation Failed:', errorInfo);
    });
  };
  const back = () => {
    setCurrent(current - 1);
  };
  const disabledDate = (current) => {
    return (
      current &&
      (current < moment().subtract(80, 'years') || current > moment().subtract(18, 'years'))
    );
  };
  const showTermsModal = () => {
    setIsTermsModalVisible(true);
  };
  const handleTermsModalOk = () => {
    setIsTermsModalVisible(false);
  };
  const handleTermsModalCancel = () => {
    setIsTermsModalVisible(false);
  };
  const showPrivacyModal = () => {
    setIsPrivacyModalVisible(true);
  };
  const handlePrivacyModalOk = () => {
    setIsPrivacyModalVisible(false);
  };
  const handlePrivacyModalCancel = () => {
    setIsPrivacyModalVisible(false);
  };
  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedOption: e.target.value,
    }));
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    if (formData.selectedOption === 'quote') {
      setCurrent(current + 1); // Proceed to the next step
    } else if (formData.selectedOption === 'callback') {
      setCurrent(0); // Open the Personal Information Details step (step 0)
    }
  };

  return (
    <div className="pt-5 pl-4">
    <div className="flex items-center">
      <button className="mb-5 focus:outline-none hover:text-[#A32A29]">
        <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
      </button>
      <Title level={5} style={{ marginBottom: '20px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
      GoalBased Savings Insurance Cover
      </Title>
    </div>
    <br />
      <Steps current={current}>
        <Step title="Personal Details" />
        <Step title="Product Details" />
        <Step title="Review" />

      </Steps>
      <div style={{ marginTop: 20 }}>
        <Form form={form} layout="vertical" >
        {current === 0 && (
          
          <>
          <div className="pt-4 pl-3"> 
           <Row gutter={16}>
                    <h3>Please enter your personal details to continue</h3>
            </Row>
           </div>
            <br></br>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="First Name" name="firstName" 
                rules={[{ required: true, message: 'Please enter your first name' }]}>
                  <Input 
                    value={formData.firstName}
                    onChange={(event) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        firstName: event.target.value,
                      }))
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                  <Input
                    value={formData.lastName}
                    onChange={(event) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        lastName: event.target.value,
                      }))
                    } 
                  />
                </Form.Item>
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
            <Col span={12}>
              <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select gender." }]}
        >
          <Select
            id="gender"
            placeholder="Select Gender"
            value={formData.gender}
            onChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                gender: value,
              }))
            }
            style={{ width: "100%" }}
          >
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>
        
        </Col>
            <Col span={12}>
                <Form.Item label="Date of Birth" name="DOB" rules={[{ required: true, message: 'Please enter your date of birth' }]}>
                  <DatePicker 
                  style={{ width: '100%' }} 
                  disabledDate={disabledDate}
                  value={formData.DOB}
                  onChange={(date) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      DOB: date,
                    }))
                  }
                  />
                </Form.Item>
              </Col>
        
        
            </Row>
            <br></br>
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item label="Email Address" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
                  <Input
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          email: event.target.value,
                        }))
                      }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
          <Form.Item
            label="Mobile No"
            name="tel"
            rules={[
              {
                required: true,
                message: 'Please enter your Mobile number',
              },
              {
                pattern: "^[0-9]{9}$",
                message: "The Phone number should be 9 digits!",
              },
            ]}
          >
            <Input
              addonBefore={
                <Select
                  style={{ width: 100 }}
                  defaultValue="+254"
                  onChange={(value) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      phoneArea: value,
                    }));
                    handleChange(value);
                  }}
                >
                  {phoneAreas.map((item) => (
                    <Option value={item.code} key={item.code}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={item.flag}
                          alt={item.country}
                          style={{ width: '20px', marginRight: '8px' }}
                        />
                        {item.code}
                      </div>
                    </Option>
                  ))}
                </Select>
              }
              value={formData.tel}
              onChange={(event) =>
                setFormData((prevData) => ({
                  ...prevData,
                  tel: event.target.value,
                }))
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        
            </Row>
            <br></br>
           
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="termsCheckbox"
                  valuePropName="checked"
                  rules={[{ required: true, message: 'Please accept the terms and privacy policies' }]}
                >
                  <Checkbox>
                    I accept the <button type="button" onClick={showTermsModal} style={{ border: 'none', background: 'none', padding: 0, color: 'maroon', cursor: 'pointer' }}>terms</button> & <button type="button" onClick={showPrivacyModal} style={{ border: 'none', background: 'none', padding: 0, color: 'maroon', cursor: 'pointer' }}>privacy policies</button>
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
            
            <Modal
        title="What would you like to do?"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Row justify="start" key="footer-row" className="mt-4">
            <Button
              key="submit"
              type="primary"
              onClick={handleModalOk}
              disabled={!formData.selectedOption}
              className="shadow-none"
            >
              Continue
            </Button>
          </Row>,
        ]}
      >
        <br></br>
        <Radio.Group onChange={handleRadioChange} value={formData.selectedOption} style={{ width: '100%' }}>
  <div className="w-full flex items-center justify-between" onClick={() => handleRadioChange({ target: { value: 'quote' } })}>
    <Typography.Text>Generate Quote</Typography.Text>
    <Radio value="quote"></Radio>
  </div>
  <Divider />
  <div className="w-full flex items-center justify-between" onClick={() => handleRadioChange({ target: { value: 'callback' } })}>
    <Typography.Text>Request a Call Back</Typography.Text>
    <Radio value="callback"></Radio>
  </div>
</Radio.Group>
      </Modal>
          </>
        )}
        <br></br>

          {current === 1 && (
            <>
               <div>
                <Row gutter={16}>
                  <h3>Please enter your Insurance details to continue</h3>
                </Row>
              </div>
              <br></br>
       <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="What is your intended Target?"
              tooltip={`Targets:
                - Investment Premium: You can comfortably set a specific sum for your regular insurance payments.
                - Fund value: You have the flexibility to set a specific fund value that you aspire to achieve over time.`}
                
              name="targetType"
              id="targetType"
              style={{ width: "100%" }}
            >
              <Select
                onChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    targetType: value,
                  }))
                }
                defaultValue={formData.targetType}
                style={{ width: "100%" }}
              >
                <Option key="1" value="Investment Premium">
                  Investment Premium
                </Option>
                <Option key="2" value="Fund Value">
                  Fund Value
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Goal Type"
              tooltip={`Understand your choice:
                Short Term: Choose 1 or 2 years
                Medium Term: Choose 3 to 5 years
                Long Term: Choose 6 to 10 years`}
              name="goalType"
              id="goalType"
              style={{ width: '100%' }}
            >
              <Select
                onChange={handlegoalTypeChange}
                placeholder="Select Goal Type"
                defaultValue={formData.goalType}
                style={{ width: '100%' }}
              >
                <Option value="ShortTerm">Short Term</Option>
                <Option value="MediumTerm">Medium Term</Option>
                <Option value="LongTerm">Long Term</Option>
              </Select>
            </Form.Item>
          </Col>
      </Row>
      <br></br>
      <Row gutter={16}>
      <Col span={12}>
  <Form.Item
    name="Premium"
    label={formData.targetType || "Investment Premium"}
    tooltip="How much money do you want to invest?"
    required
  >
    <Space.Compact style={{ width: '100%' }}>
      <Form.Item
        name="currency"
        noStyle
      >
        <Select
          onChange={onChangeCurrency}
          defaultValue={formData.currency}
          style={{ width: '20%' }}
        >
          {formData.currencies.map((currency, index) => (
            <Select.Option key={index} value={currency.code}>
              {currency.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="premium"
        noStyle
        rules={[
          { required: true, message: 'Premium is required' },
        ]}
      >
        <InputNumber
          id="premium"
          step={10000}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/(,*)/g, '')}
          onChange={(value) =>
            setFormData((prevData) => ({
              ...prevData,
              premium: value,
            }))
          }
          value={formData.premium}
          style={{ width: '80%' }}
        />
      </Form.Item>
    </Space.Compact>
  </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="frequency"
          label="How frequently do you want to make your contributions?"
          style={{ width: "100%" }}
        >
          <Select
            style={{ width: "100%" }}
            id="frequency"
            value={formData.frequency}
            onChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                frequency: value,
              }))
            }
          >
            <Option key="weekly" value="weekly">
              Weekly
            </Option>
            <Option key="monthly" value="monthly">
              Monthly
            </Option>
            <Option key="quarterly" value="quarterly">
              Quarterly
            </Option>
            <Option key="semiAnnually" value="semiAnnually">
              Semi Annual
            </Option>
            <Option key="annually" value="annually">
              Annual
            </Option>
            <Option key="oneOff" value="oneOff">
              One off
            </Option>
          </Select>
        </Form.Item>
      </Col>
       </Row>
        <br></br>
       <Row gutter={16}>
       <Col span={12}>
          <Form.Item
            label="When would you wish to start?"
            name="startDate"
            rules={[{ required: true, message: 'Please select the start date' }]}
          >
 <DatePicker
  style={{ width: '100%' }}
  value={formData.startDate ? moment(formData.startDate) : null}
  disabledDate={(current) => current && current < moment().startOf('day')}
  onChange={handleStartDateChange}
/>


          </Form.Item>
        </Col>
        <Col span={12}>
  <Form.Item
    label="How many years would you wish to save?"
    name="TermInYears"
    style={{ width: "100%" }}
    rules={[
      {
        type: 'number',
        message: 'Please select the term in years.',
      },
      {
        required: true,
        message: 'Please input the term in years.',
      },
    ]}
  >
    <Select
      id="TermInYears"
      value={formData.TermInYears}
      onChange={handleTermInYearsChange}
      style={{ width: "100%" }}
      disabled={!formData.goalType}
    >
        {getTermInYearsOptions(formData.goalType).map((year) => (
                    <Select.Option key={year} value={year}>
                        {year} year{year > 1 ? 's' : ''}
                    </Select.Option>
                ))}
            </Select>
  </Form.Item>
</Col>

         </Row>
              <br></br>
         <Row gutter={16}>
         <Col span={12}>
          <Form.Item
            label="The Insurance cover policy will expire on"
            name="endDate"
          >
            <DatePicker
              style={{ width: '100%' }}
              value={formData.endDate ? moment(formData.endDate) : null}
              disabled
            />
          </Form.Item>
        </Col>   
          {formData.goalType === 'ShortTerm' && (
          <Col span={12}>
            <Form.Item 
            label="Optional Benefit" 
            name="optionalBenefit">
                  <Select
            onChange={(value) =>
              setFormData((prevData) => ({ ...prevData, optionalBenefit: value }))
            }
            value={formData.optionalBenefit}
          >
            <Option value="Death/Disability">Death/Disability</Option>
            <Option value="None">None</Option>
            
          </Select>
            </Form.Item>
          </Col>
        )}
         
         </Row>
            </>
          )}

       
                {current === 2 && (
  <Card className="mb-10">

    <p>Please, Review and confirm Your Information details to continue</p>
    
      <Card title="Product" className="mb-10">
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <span>GoalBased savings</span>
          </Col>
        </Row>
      </div>
      </Card>
      <Card title="Personal Information" className="mb-10">
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <h4 style={{ color: '#888', marginBottom: '5px' }}>First Name</h4>
            <span>{formData.firstName}</span>
          </Col>
          <br />
          <Col span={12}>
            <h4 style={{ color: '#888', marginBottom: '5px' }}>Last Name</h4>
            <span>{formData.lastName}</span>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <h4 style={{ color: '#888', marginBottom: '5px' }}>Mobile No</h4>
            <span>{formData.tel}</span>
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
            <span>{formData.DOB?.format('YYYY-MM-DD')}</span>
          </Col>
          <Col>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Gender</h4>
            <span>{formData.gender}</span>
          </Col>
        </Row>
        <br />
      </div>
      </Card>
      <Card title="Policy Information" className="mb-10">
      
      <Row gutter={16}>
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Target Type</h4>
          <span>{formData.targetType}</span>
        </Col>
        <br />
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Term In Years</h4>
          <span>{formData.TermInYears}</span>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Payment Frequency</h4>
          <span>{formData.frequency}</span>
        </Col>
        <br />
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Premium</h4>
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: formData.currency }).format(formData.premium)}</span>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Goal Type</h4>
          <span>{formData.goalType}</span>
        </Col>
        {formData.goalType === 'ShortTerm' && (
          <Col span={12}>
            <h4 style={{ color: '#888', marginBottom: '5px' }}>Optional Benefit</h4>
            <span>{formData.optionalBenefit}</span>
          </Col>
        )}
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>Start Date</h4>
          <span>{formData.startDate?.format('YYYY-MM-DD')}</span>
        </Col>
        <Col span={12}>
          <h4 style={{ color: '#888', marginBottom: '5px' }}>End Date</h4>
          <span>{formData.endDate?.format('YYYY-MM-DD')}</span>
        </Col>
      </Row>
      
      </Card>
      <br />
   
      </Card>
)}

          <div style={{ marginTop: 20 }}>
            {current > 0 && (
              <Button style={{ marginRight: 8 }} onClick={back}>
               Go Back
              </Button>
            )}
            {current < 2 && (
              <Button type="primary" onClick={next}>
                Continue
              </Button>
            )}
            {current === 2 && (
              <Button type="primary" onClick={handleSubmit}>
                Generate Quote
              </Button>
            )}

          </div>
        </Form>
      </div>
      <Modal
        title={<b>Terms and Conditions</b>}
        visible={isTermsModalVisible}
        onOk={handleTermsModalOk}
        onCancel={handleTermsModalCancel}
      >
        <p>Terms and conditions content goes here...</p>
      </Modal>
      <Modal
        title={<b>Privacy Policy</b>}
        visible={isPrivacyModalVisible}
        onOk={handlePrivacyModalOk}
        onCancel={handlePrivacyModalCancel}
      >
        <p>Privacy policy content goes here...</p>
      </Modal>
    </div>
  );
};

export default Goalbased;
