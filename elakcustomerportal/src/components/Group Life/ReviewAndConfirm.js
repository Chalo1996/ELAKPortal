import React from 'react';
import { Row, Col, Card } from 'antd';
import 'tailwindcss/tailwind.css';

const ReviewAndConfirm = ({ formDataToSubmit, formData }) => {
  const [formatter] = React.useState(
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    })
  );

  const NumberFormat = {
    formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    parser: (value) => value.replace(/(,*)/g, ""),
  };
  

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

      <Card title="Contact Details" className="mb-10">
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
              <p>{formDataToSubmit.phoneArea} { formDataToSubmit.mobileNumber}</p>
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

      <Card title="Company Details" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Industry Type</p>
              <p>{formDataToSubmit.industry}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Employees</p>
              <p>{ NumberFormat.formatter(formDataToSubmit.numberOfEmployees)} employees</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Company Name</p>
              <p>{formDataToSubmit.companyName}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Total Annual Salaries</p>
              <p>{formatter.format(formDataToSubmit.annualSalaries)}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Employees average age</p>
              <p>{formDataToSubmit.averageAge} years</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Policy Coverage" className="mb-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Principal Members</p>
              <p>{formDataToSubmit.numberOfEmployees !== null ? NumberFormat.formatter(formDataToSubmit.numberOfEmployees) + ' members' : 'No members'}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Spouse</p>
              <p>{formDataToSubmit.totalNumberOfSpouses !== null ? NumberFormat.formatter(formDataToSubmit.totalNumberOfSpouses) + ' spouses' : 'No spouses'}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Children</p>
              <p>{formDataToSubmit.totalNumberOfChilidren !== null ? NumberFormat.formatter(formDataToSubmit.totalNumberOfChilidren) + ' children' : 'No children'}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Number of Parents Parents-in-Law</p>
              <p>{formDataToSubmit.totalNumberOfParentsAndParentsInLaw !== null ? NumberFormat.formatter(formDataToSubmit.totalNumberOfParentsAndParentsInLaw) + ' parents & Parents-in-Law' : 'No parents & Parents-in-Law'}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Principal member last expense</p>
              <p>{formatter.format(formDataToSubmit.mainMemberLastExpense)} </p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Spouse last expense</p>
              <p>{formatter.format(formDataToSubmit.spouseLastExpense)}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Child last expense</p>
              <p>{formatter.format(formDataToSubmit.childLastExpense)} </p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">Parent or parent-in-law last expense</p>
              <p>{formatter.format(formDataToSubmit.parentsLastExpense)}</p>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">The cover commences on:</p>
              <p>{formatDate(formDataToSubmit.policyStartDate)}</p>
            </div>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">The cover will expire on:</p>
              <p>{formatDate(formDataToSubmit.policyEndDate)}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="flex flex-col items-start justify-start mb-4">
              <p className="text-[#929497]">The assured sum will be:</p>
              <p>Annual Salary x {formDataToSubmit.multipleOfAnnualSalary || formDataToSubmit.flatAmount}</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};


export default ReviewAndConfirm;
