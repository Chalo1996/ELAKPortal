import { Row, Col, Card } from "antd";

const ConfirmDetailsForm = ({ formData, form }) => {
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
              <p className='text-[#929497]'>Date of birth</p>
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
              <p>{formData.frequency}</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Number of Premium Installments</p>
              <p>{formData.installments}</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title='Additional Benefits' className='mb-10'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <div className='flex flex-col items-start justify-start mb-4'>
              <p className='text-[#929497]'>Retrenchment Cover/ Job Loss</p>
              <p>{formData.retrenchment ? "Yes" : "No"}</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default ConfirmDetailsForm;
