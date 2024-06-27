import React from 'react';
import { Row, Col, Card } from 'antd';
import 'tailwindcss/tailwind.css';

const ReviewAndConfirm = ({ formDataToSubmit }) => {
  const [formatter] = React.useState(
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    })
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <Card className="mb-10 mt-10">
      <p className="font-open-sans text-[15px] font-semibold text-left">
        To continue, please confirm your details
      </p>

      <Card title="Client Details" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">First Name</p>
              <p>{formDataToSubmit.firstName}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Email Address</p>
              <p>{formDataToSubmit.email}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Last Name</p>
              <p>{formDataToSubmit.lastName}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Mobile Number</p>
              <p>{formDataToSubmit.phoneArea} {formDataToSubmit.mobileNumber}</p>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Date of Birth</p>
              <p>{formatDate(formDataToSubmit.dateOfBirth)}</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Vehicle Details" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Vehicle Registration Number</p>
              <p>{formDataToSubmit.vehicleRegistrationNumber}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Transmission</p>
              <p>{formDataToSubmit.transmission}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Make</p>
              <p>{formDataToSubmit.make}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Model</p>
              <p>{formDataToSubmit.model}</p>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Body Type</p>
              <p>{formDataToSubmit.bodyType}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Month of Manufacture</p>
              <p>{formDataToSubmit.monthOfManufacture}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Year of Manufacture</p>
              <p>{formDataToSubmit.yearOfManufacture}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Chassis Number</p>
              <p>{formDataToSubmit.chassisNumber}</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Coverage Terms" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Type of Cover</p>
              <p>{formDataToSubmit.typeOfCover}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Payment Options Frequency</p>
              <p>{formDataToSubmit.paymentOptionsFrequency}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Cover Period (in days)</p>
              <p>{formDataToSubmit.coverPeriodDays}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Estimated Sum Insured</p>
              <p>{formatter.format(formDataToSubmit.estimatedSumInsured)}</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Additional Benefits" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Excess Protector</p>
              <p>{formDataToSubmit.excessProtector ? 'Yes' : 'No'}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Extra Windscreen Limit</p>
              <p>{formDataToSubmit.extraWindscreenLimit ? 'Yes' : 'No'}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Roadside Assistance</p>
              <p>{formDataToSubmit.roadsideAssistance ? 'Yes' : 'No'}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Extra Vehicle Entertainment Limits</p>
              <p>{formDataToSubmit.extraVehicleEntertainmentLimits ? 'Yes' : 'No'}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Political Violence and Terrorism</p>
              <p>{formDataToSubmit.politicalViolenceAndTerrorism ? 'Yes' : 'No'}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Extra Authorised Repair Limit</p>
              <p>{formDataToSubmit.extraAuthorisedRepairLimit ? 'Yes' : 'No'}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Ambulance Service</p>
              <p>{formDataToSubmit.ambulanceService ? 'Yes' : 'No'}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Loss of Use</p>
              <p>{formDataToSubmit.lossOfUse ? 'Yes' : 'No'}</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default ReviewAndConfirm;
