import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Steps, Button, Typography, message, Form } from "antd";

import dayjs from "dayjs";
import ClientDetailsForm from "../../../components/MotorVehicleInsurance/ClientDetailsForm";
import VehicleDetails from "../../../components/MotorVehicleInsurance/VehicleDetails";
import CoverTerms from "../../../components/MotorVehicleInsurance/CoverTerms";
import Extras from "../../../components/MotorVehicleInsurance/Extras";
import ToDoModal from "../../../components/MotorVehicleInsurance/modals/ToDoModal";
import CallBackForm from "../../../components/MotorVehicleInsurance/CallBackForm";
import { fetchData } from "../../../store/redux/features/glaSlice";


import ReviewAndConfirm from "../../../components/MotorVehicleInsurance/ReviewForm";




const { Step } = Steps;
const { Title } = Typography;


const CommercialActivities = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading]= useState(false);

  const authStatus = useSelector((state) => state.auth.status);
  const isLoading = useSelector((state) => state.groupLifeAssurance.isLoading);
  const data = useSelector((state) => state.groupLifeAssurance.glaData);

  const navigate = useNavigate();
  const dispatch = useDispatch();




  const initialData = {

    firstName: "",
    lastName: "",
    email: "",
    phoneArea: "+254",
    currencySymbol: "KES",
    mobileNumber: "",
    dateOfBirth: null,
    selectedOption: "",

    vehicleRegistrationNumber: "",
    transmission: "",
    make: "",
    model: "",
    bodyType: "",
    monthOfManufacture: "",
    yearOfManufacture: "",
    chassisNumber: "",
    fuel: "",
    performanceCC: null,
    colour: "",
    weight: null,
    engineNumber: "",
    antiTheftDevices: "",
    garagedAddress: "",


    typeOfCover: "",
    paymentOptionsFrequency: "",
    coverPeriodDays: null,
    estimatedSumInsured: null,
    paymentMethod: "",
    minimumCoverPremium: null,
    catalogueValueDepreciated: null,

    excessProtector: null,
    extraWindscreenLimit: null,
    roadsideAssistance: null,
    extraVehicleEntertainmentLimits: null,
    politicalViolenceAndTerrorism: null,
    extraAuthorisedRepairLimit: null,
    ambulanceService: null,
    lossOfUse: null

};

  const [formData, setFormData] = useState(() => ({
    ...initialData,
    dateOfBirth: initialData.dateOfBirth ? dayjs(initialData.dateOfBirth) : null,
    policyStartDate: initialData.policyStartDate ? dayjs(initialData.policyStartDate) : null,
    policyEndDate: initialData.policyEndDate ? dayjs(initialData.policyEndDate) : null,
  }));

  const dataToPost = {
    ContactDetails: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneArea: formData.phoneArea,
      mobileNumber: formData.mobileNumber,
      dateOfBirth: formData.dateOfBirth,
      selectedOption: formData.selectedOption,
    },
    vehicleDetails: {
        vehicleRegistrationNumber: formData.vehicleRegistrationNumber,
        transmission: formData.transmission,
        make: formData.make,
        model: formData.model,
        bodyType: formData.bodyType,
        monthOfManufacture: formData.monthOfManufacture,
        yearOfManufacture: formData.yearOfManufacture,
        chassisNumber: formData.chassisNumber,
        fuel: formData.fuel,
        performanceCC: formData.performanceCC,
        colour: formData.colour,
        weight: formData.weight,
        engineNumber: formData.engineNumber,
        antiTheftDevices: formData.antiTheftDevices,
        garagedAddress: formData.garagedAddress
    },
    
    coverTerms: {
        typeOfCover: formData.typeOfCover,
        paymentOptionsFrequency: formData.paymentOptionsFrequency,
        coverPeriodDays: formData.coverPeriodDays,
        estimatedSumInsured: formData.estimatedSumInsured,
        paymentMethod: formData.paymentMethod,
        minimumCoverPremium: formData.minimumCoverPremium,
        catalogueValueDepreciated: formData.catalogueValueDepreciated
    },
    
    additionalBenefits: {
        excessProtector: formData.excessProtector,
        extraWindscreenLimit: formData.extraWindscreenLimit,
        roadsideAssistance: formData.roadsideAssistance,
        extraVehicleEntertainmentLimits: formData.extraVehicleEntertainmentLimits,
        politicalViolenceAndTerrorism: formData.politicalViolenceAndTerrorism,
        extraAuthorisedRepairLimit: formData.extraAuthorisedRepairLimit,
        ambulanceService: formData.ambulanceService,
        lossOfUse: formData.lossOfUse
    }
};


const handleNavigate = () => {
  navigate(-1);
};

const onNextStep = async () => {
  try {
    await form.validateFields();
    if (currentStep === 0) {
      setIsModalOpen(true);
    } else {
      setCurrentStep(currentStep + 1);
      console.log(formData);
    }
  } catch (error) {
    message.error("Please complete the form before proceeding.");
  }
};

const onPrevStep = () => {
  setCurrentStep(currentStep - 1);
};

const handleModalContinue = (selectedOption) => {
  setAction(selectedOption);
  setIsModalOpen(false);
  if (selectedOption === 'generateQuote') {
    setCurrentStep(currentStep + 1);
    console.log(formData);
  } else if (selectedOption === 'requestCallback') {
    setCurrentStep('callbackForm');
  }
};

const handleSubmitCallback = () => {
  navigate("call-back-submission")
  message.success('Form submited successfully!');
  console.log(dataToPost.ContactDetails);
};

const handleSubmit = async () => {
  if (authStatus === 'succeeded') {
    try {
      setLoading(true); 
      await dispatch(fetchData(dataToPost)).unwrap();
      message.success('Quote generated successfully!');
      setIsFormSubmitted(true);
    } catch (error) {
      message.error('Failed to submit form data.');
    } finally {
      setLoading(false); 
    }
  } else {
    message.error('Authentication failed.');
  }
};
useEffect(() => {
  if (isFormSubmitted && !isLoading) {
    navigate("quotation-details", {
      state: { formData, data },
    });
  }
}, [isFormSubmitted, isLoading, navigate, formData, data]);

  const steps = [
    {
      title: "Client Details",
      content: <ClientDetailsForm form={form} formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Vehicle Details",
      content: <VehicleDetails form={form} formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Coverage",
      content: <CoverTerms form={form} formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Extras",
      content: <Extras form={form} formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Review",
      content: <ReviewAndConfirm formDataToSubmit={formData} />,
    },
  ];

  return (
    <div className="pt-5 pl-4">
      <div className="flex items-center">
        <button className="mb-5 focus:outline-none hover:text-[#A32A29]">
          <LeftOutlined className="w-8 h-4" style={{ marginTop: '10px' }}onClick={handleNavigate} />
        </button>
        <Title level={5} style={{ marginBottom: '10px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Motor Vehicle Insurance (Commercial activities)
        </Title>
      </div>
      <br />
      {currentStep !== 'callbackForm' ? (
        <>
          <Steps current={currentStep} className="mb-8">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[currentStep].content}</div>
          <div className="steps-action mt-8">
            {currentStep > 0 && (
              <Button className="mr-4" onClick={onPrevStep}>
                Go Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={onNextStep}>
                {action === 'callback' ? 'Submit' : 'Continue'}
              </Button>
            )}
            {currentStep > 3 && (
              <Button type="primary" onClick={handleSubmit} loading={loading} disabled>
                Generate Quote
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <CallBackForm
            form={form}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="steps-action">
            <Button
              type="primary"
              onClick={handleSubmitCallback}
              className="h-full px-4 py-2 shadow-none text-center mr-3"
            >
              Submit  
            </Button>
          </div>
        </>

      )}
      <ToDoModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinue={handleModalContinue}
      />
    </div>
  );
};

export default CommercialActivities;



