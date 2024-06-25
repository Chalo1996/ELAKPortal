import React from "react";
import { Row, Col, Card, notification } from "antd";
import dayjs from "dayjs";

const ConfirmDetailsForm = ({ formData }) => {
  const calculateAge = (dob) => {
    if (!dob) return "";

    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!dateRegex.test(dob)) {
      notification.error({
        message:
          "Invalid date format. Please provide date in MM/DD/YYYY format.",
      });
      return "";
    }

    const [month, day, year] = dob.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  };

  const partnerAges = formData.partnerDates.map((dob) => calculateAge(dob));

  return (
    <Card className='mb-10 mt-10'>
      <p className='font-open-sans text-[15px] font-semibold text-left'>
        To continue, please confirm your insurance purchase details
      </p>

      <Card title='Personal Details' className='mb-10'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Full Name</p>
              <p>
                {formData.firstname} {formData.lastname}
              </p>
            </div>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Gender</p>
              <p>{formData.gender}</p>
            </div>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Email Address</p>
              <p>{formData.email}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Date of Birth</p>
              <p>{formData.dob}</p>
            </div>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Country</p>
              <p>{formData.country}</p>
            </div>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Mobile Number</p>
              <p>
                {formData.countryCode}
                {formData.phone}
              </p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title='Product Details' className='mb-10'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Sum Assured</p>
              <p>KES {formData.sumAssured.toLocaleString()}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Terms In Months</p>
              <p>{formData.termsInMonths}</p>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Premium Frequency</p>
              <p>
                {formData.frequency === "Single"
                  ? "One-Off"
                  : formData.frequency}
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Number of Premium Installments</p>
              <p>{formData.installments}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Number of Partners Selected</p>
              <p>{formData.numOfPartners}</p>
            </div>
          </Col>
          {formData.partnerDates.map((partnerDate, index) => (
            <Col xs={24} sm={24} md={12} key={index}>
              <div className='flex flex-col items-start justify-start mb-4'>
                <p className='text-[#929497]'>
                  Partner {index + 1} Date of Birth
                </p>
                <p>
                  {partnerDate} || Age: {partnerAges[index]}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </Card>
  );
};

export default ConfirmDetailsForm;
