import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import dayjs from "dayjs";
import ClientDetailsForm from "../../components/MotorVehicleInsurance/ClientDetailsForm";



const {Title} = Typography



const PrivateUse = () => {
  const navigate = useNavigate();



  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneArea: "+254",
    currencySymbol: "KES",
    mobileNumber: "",
    dateOfBirth: null,
    selectedOption: "",
    nameOfClient: "",
    industry: "",
    intermediaryName: "",
    totalAnnualSalaries: "",
    flatAmount: "",
    totalNumberOfStaff: "",
    averageAge: "",
    policyStartDate: null,
    policyEndDate: null,
    glaAsMultipleofAnnualSalary: 4,
    criticalIllnessBenefitPercentage: 30,
    typeOfCriticalIllnessCover: "nil",
    mainMemberLastExpense: "",
    typeOfMainMemberLastExpense: "nil",
    spouseLastExpense: null,
    childLastExpense: null,
    parentsLastExpense: null,
    totalNumberOfSpouses: null,
    totalNumberOfChilidren: null,
    totalNumberOfParentsAndParentsInLaw: null,
    deathBenefitMultiplier: null,
    permananentTotalDisability: null,
    temporaryTotalDisability: 104,
    negotiatedFreeCoverLimit: null,
    negotiatedMaxCriticalIllnessCover: null,
    medicalReimbursment: 500000,
    lifeAssistantBenefit: 0,
    occupationalIllness: 0,
    accidentalOccupationalLastExpense: null,
    schemeLossRatio: 0,
    discountOnRate: 0,
  };

  const [formData, setFormData] = useState(() => ({
    ...initialData,
    dateOfBirth: initialData.dateOfBirth ? dayjs(initialData.dateOfBirth) : null,
    policyStartDate: initialData.policyStartDate ? dayjs(initialData.policyStartDate) : null,
    policyEndDate: initialData.policyEndDate ? dayjs(initialData.policyEndDate) : null,
  }));




  const handleNavigate = () => {
    navigate("/home/motor-vehicle/select-motor-use");
  };

  return (
    <div className="pt-5 pl-4">
          <div className="flex items-center">
        <button className="mb-5 focus:outline-none hover:text-[#A32A29]">
          <LeftOutlined className="w-8 h-4" style={{ marginTop: '10px' }}onClick={handleNavigate} />
        </button>
        <Title level={5} style={{ marginBottom: '10px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Motor Vehicle Insurance (Private Use)
        </Title>
        <ClientDetailsForm formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default PrivateUse;
