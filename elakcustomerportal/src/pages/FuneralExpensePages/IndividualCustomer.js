import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Steps, Button, Form, message } from "antd";
import dayjs from "dayjs";
import PersonalDetailsForm from "../../components/Funeral Expense/PersonalDetails";
import CallBackModal from "../../components/Funeral Expense/modals/CallBackModal";
import BeneficiaryMembersForm from "../../components/Funeral Expense/BeneficiaryMembers";
import ProductPackagesForm from "../../components/Funeral Expense/ProductPackages";
import SumAssuredPercentageForm from "../../components/Funeral Expense/SumAssuredPercentage";
import ConfirmDetailsForm from "../../components/Funeral Expense/ConfirmDetails";
import { fetchData } from "../../store/redux/features/gleSlice";
import CallBackForm from "../../components/Funeral Expense/CallBack";
import ErrorPage from "../../shared/ErrorPage";

const { Step } = Steps;

const getInitialFormData = () => {
  const savedFormData = localStorage.getItem("yourGLEData");
  return savedFormData
    ? JSON.parse(savedFormData)
    : {
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phoneNo: "",
        phoneArea: "+254",
        country: "Kenya",
        birthDate: null,
        terms: false,
        spouse: false,
        principalNumber: 1,
        spouseNumber: null,
        parentsNumber: null,
        childrenNumber: null,
        parentsInLawNumber: null,
        productName: "",
        benefitAmount: 0,
        principalPercentage: 100,
        spousePercentage: null,
        childrenPercentage: null,
        parentsPercentage: null,
        parentsInLawPercentage: null,
        startDate: null,
        endDate: null,
        segment: "Individual Customer",
      };
};

const IndividualCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  const isLoading = useSelector((state) => state.funeralExpense.isLoading);
  const isError = useSelector((state) => state.funeralExpense.isError);
  const tableData = useSelector((state) => state.funeralExpense.gleData);

  const [current, setCurrent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showCallback, setShowCallback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [form5] = Form.useForm();
  const forms = [form1, form2, form3, form4];

  const [formData, setFormData] = useState(() => {
    const initialData = getInitialFormData();
    return {
      ...initialData,
      birthDate: initialData.birthDate ? dayjs(initialData.birthDate) : null,
      startDate: initialData.startDate ? dayjs(initialData.startDate) : null,
      endDate: initialData.endDate ? dayjs(initialData.endDate) : null,
    };
  });

  // useEffect(() => {
  //   localStorage.setItem("yourGLEData", JSON.stringify(formData));
  // }, [formData]);

  const dataToPost = {
    inputData: {
      persons: [
        {
          name: "Principal Member",
          lives: formData.principalNumber,
          sumAssuredPercentage: 100,
        },
        {
          name: "Spouse",
          lives: formData.spouseNumber,
          sumAssuredPercentage:
            formData.spouseNumber > 0 ? formData.spousePercentage : 0,
        },
        {
          name: "Children",
          lives: formData.childrenNumber,
          sumAssuredPercentage:
            formData.childrenNumber > 0 ? formData.childrenPercentage : 0,
        },
        {
          name: "Parents",
          lives: formData.parentsNumber,
          sumAssuredPercentage:
            formData.parentsNumber > 0 ? formData.parentsPercentage : 0,
        },
        {
          name: "Parents In Law",
          lives: formData.parentsInLawNumber,
          sumAssuredPercentage:
            formData.parentsInLawNumber > 0
              ? formData.parentsInLawPercentage
              : 0,
        },
      ],
      parameters: {
        benefitAmount: formData.benefitAmount,
        mortalityRiskLoading: 0.05,
        marketingExpenseLoading: 0.08,
        businessExpenseLoading: 0.2,
        profitLoading: 0.05,
        groupCoverAverageAge: 40,
        childAge: 18,
        parentAge: 60,
        mortalityTable: "CI - IndividualMortalityRateTable",
        currencySymbol: "KSh",
        segment: "Individual Customer",
      },
      applicant: {
        dob: formData.birthDate,
      },
    },
  };

  const handleNavigate = () => {
    navigate("/home/funeral-expense/select-customer-type");
  };

  const isNextButtonDisabled = () => {
    if (current === 2) {
      return !formData.productName || formData.benefitAmount === 0;
    }
    return false;
  };

  const handleNext = async () => {
    try {
      await forms[current].validateFields();
      if (current === 0) {
        setIsModalVisible(true);
      } else {
        setCurrent(current + 1);
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalContinue = (selectedOption) => {
    setIsModalVisible(false);
    if (selectedOption === "generateQuote") {
      setCurrent(current + 1);
    } else if (selectedOption === "requestCallback") {
      setShowCallback(true);
    }
  };

  const handleCallBack = () => {
    setShowCallback(false);
  };

  const handleSubmitCallback = () => {
    console.log("clicked");
  };

  const handleSubmit = async () => {
    if (authStatus === "succeeded") {
      setIsSubmitting(true);
      try {
        await Promise.all(forms.map((form) => form.validateFields()));
        dispatch(fetchData(dataToPost));
      } catch (error) {
        console.log("Validation Failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      message.error("An Error Occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (!isLoading && !isSubmitting && !isError) {
      navigate("/home/funeral-expense/quotation-details", {
        state: { formData, tableData },
      });
      console.log("Navigating...");
      localStorage.removeItem("yourGLEData");
    }
  }, [isLoading, navigate, formData, tableData, isSubmitting, isError]);

  const steps = [
    {
      title: "Personal Information",
      content: (
        <PersonalDetailsForm
          form={form1}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Beneficiary Members",
      content: (
        <BeneficiaryMembersForm
          form={form2}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Package",
      content: (
        <ProductPackagesForm
          form={form3}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Coverage (%)",
      content: (
        <SumAssuredPercentageForm
          form={form4}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Review",
      content: <ConfirmDetailsForm formData={formData} />,
    },
  ];

  if (isError) {
    return (
      <ErrorPage
        status="error"
        title="Quote Generation Failed!"
        subtitle="Sorry, there was an issue generating a quotation. Please try again later."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="pt-5 pl-4">
      {showCallback ? (
        <>
          <div className="mb-4">
            <span>
              <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
                <LeftOutlined className="w-8 h-8" onClick={handleCallBack} />
              </button>
            </span>
            <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
              Request Callback
            </span>
          </div>
          <CallBackForm
            form={form5}
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
      ) : (
        <>
          <div className="mb-4">
            <span>
              <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
                <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
              </button>
            </span>
            <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
              Get Funeral Expense Cover
            </span>
          </div>

          <div>
            <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
              {current > 0 && (
                <Button
                  onClick={handlePrev}
                  className="h-full px-4 py-2 shadow-none text-center mr-3"
                >
                  Go back
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleNext}
                  disabled={isNextButtonDisabled()}
                  className="h-full px-4 py-2 shadow-none text-center"
                >
                  Continue
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  className="h-full px-4 py-2 shadow-none text-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Generate Quotation"}
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      <CallBackModal
        isModalOpen={isModalVisible}
        onClose={handleModalClose}
        onContinue={handleModalContinue}
      />
    </div>
  );
};

export default IndividualCustomer;
