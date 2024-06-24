import React, { useState } from 'react';
import { Table, Card, Row, Col, Checkbox, Button, Typography } from 'antd';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetData } from "../../store/redux/features/eduSlice";
import { LeftOutlined } from "@ant-design/icons";
import PolicyExclusionsModal from "../Group Life/Modals/PolicyExclusionsModal";

const { Title } = Typography;

const renderFormattedValue = (value) => Math.round(value).toLocaleString("en-us");
const formatCurrency = (value) => `KES ${Math.round(value).toLocaleString()}`;
const formatPercentage = (value) => `${Math.round(value)}%`; 

const detailColumns = [
  { title: "Attribute", dataIndex: "attribute", key: "attribute", width: "50%" },
  { title: "Value", dataIndex: "value", key: "value", width: "50%" }
];

const getClientData = (formData) => {
  const {firstName = '', lastName = '', email = '',  phoneAreas= '', tel = '' } = formData || {};
  console.log('phoneAreas:', phoneAreas);
  const name = `${firstName} ${lastName}`;

  return [
    { key: "name", attribute: "Name", value: name },
    { key: "email", attribute: "Email", value: email },
    
    { key: "tel", attribute: "Mobile Number", value: tel}
  ];
};

const getPolicyData = (formData) => {
  const { targetType = '', TermInYears = '', frequency = '', premium = 0 } = formData || {};
  return [
    { key: "targetType", attribute: "Target Type", value: targetType },
    { key: "TermInYears", attribute: "Term In Years", value: TermInYears },
    { key: "frequency", attribute: "Premium Frequency", value: frequency },
    { key: "premium", attribute: targetType === "Investment Premium" ? "Investment Premium" : "Fund Value", value: formatCurrency(premium) },
  ];
};

const getInvestmentData = (cData) => {
  const {
    TotalInvestmentPremium = 0,
    TotalRiskPremium = 0,
    TotalPremiumsPaid = 0,
    FundValueatMaturity = 0,
    InvestmentReturnEarned = 0,
    ReturnonInvestmentPremiums = 0,
    ReturnonTotalPremium = 0,
  } = cData || {};

  return [
    { key: "TotalInvestmentPremium", attribute: "Total Investment Premium", value: formatCurrency(TotalInvestmentPremium) },
    { key: "TotalRiskPremium", attribute: "Total Risk Premium", value: formatCurrency(TotalRiskPremium) },
    { key: "TotalPremiumsPaid", attribute: "Total Premiums Paid", value: formatCurrency(TotalPremiumsPaid) },
    { key: "FundValueatMaturity", attribute: "Fund Value at Maturity", value: formatCurrency(FundValueatMaturity) },
    { key: "InvestmentReturnEarned", attribute: "Investment Return Earned", value: formatCurrency(InvestmentReturnEarned) },
    { key: "ReturnonInvestmentPremiums", attribute: "Return on Investment Premiums", value: formatPercentage(ReturnonInvestmentPremiums) },
    { key: "ReturnonTotalPremium", attribute: "Return on Total Premium", value: formatPercentage(ReturnonTotalPremium) }
  ];
};

const EducQuotation = () => {
  const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  

  const handleNavigate = () => {
    navigate(-1);
  };

const handleCheckboxChange = (e) => {
  setIsPolicyModalVisible(true);
  setIsCheckboxChecked(e.target.checked);
};

const handleModalAccept = () => {
  setIsPolicyAccepted(true);
  setIsPolicyModalVisible(false);
};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { cData = {}, formData = {} } = location.state || {};
  
  const parsedCData = JSON.parse(cData);
  
  const [acceptedExclusions, setAcceptedExclusions] = useState(false);

  const handleAcceptanceChange = (e) => {
    setAcceptedExclusions(e.target.checked);
  };

  const handlePrevClick = () => {
    console.log('Back button clicked');
  };

  const handleDownload = () => {
    console.log('Download button clicked');
  };

  const clientData = getClientData(formData);
  const policyData = getPolicyData(formData);
  const investmentData = getInvestmentData(parsedCData);

  const tableColumns = [
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: "Investment Premium", dataIndex: "InvestmentPremium", key: "InvestmentPremium", render: renderFormattedValue },
    { title: "Risk Premium", dataIndex: "RiskPremium", key: "RiskPremium", render: renderFormattedValue },
    { title: "Total Premium", dataIndex: "TotalPremium", key: "TotalPremium", render: renderFormattedValue },
    { title: "Cumulative Premium", dataIndex: "CumulativePremium", key: "CumulativePremium", render: renderFormattedValue },
    { title: "Investment Income", dataIndex: "InvestmentIncome", key: "InvestmentIncome", render: renderFormattedValue },
    { title: "Closing Fund Value", dataIndex: "ClosingFundValue", key: "ClosingFundValue", render: renderFormattedValue }
  ];

  return (
    <>
      <div className="flex items-center">
        <button className="mb-5 focus:outline-none hover:text-[#A32A29]">
          <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
        </button>
        <Title level={5} style={{ marginBottom: '20px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
        Education Savings Insurance Cover
        </Title>
      </div>
    <Card style={{ border: "1px solid maroon" }}>
      <div style={{ width: "90%", margin: "auto" }}>
        {/* Header */}
        <Row justify="space-between" style={{ border: "1px solid maroon", padding: "10px" }}>
          <Col>
            <h2 style={{ fontWeight: "bold", marginBottom: 0 }}>
              EQUITY LIFE ASSURANCE (KENYA) LIMITED
            </h2>
            <h3 style={{ fontWeight: "bold", marginBottom: 0 }}>Quotation</h3>
            <h3 style={{ fontWeight: "bold", marginBottom: 0 }}>Education Savings Product</h3>
          </Col>
          <Col>
            <img
              src="https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain"
              alt="Company Logo"
              style={{ maxWidth: "100px", maxHeight: "120px" }}
            />
            <h4 style={{ display: "block", marginTop: "10px", fontWeight: "bold" }}>
              Date: {new Date().toLocaleDateString()}
            </h4>
          </Col>
        </Row>

        {/* Client Details Table */}
        <h4 style={{ fontWeight: "bold", marginTop: "5px" }}>Customer Details</h4>
        <Table
          columns={detailColumns}
          dataSource={clientData}
          bordered
          pagination={false}
          style={{ marginBottom: "20px", border: "1px solid maroon" }}
          showHeader={false}
        />

        {/* Policy Details Table */}
        <h4 style={{ fontWeight: "bold", marginTop: "5px" }}>Policy Details</h4>
        <Table
          columns={detailColumns}
          dataSource={policyData}
          bordered
          pagination={false}
          style={{ marginBottom: "20px", border: "1px solid maroon" }}
          showHeader={false}
        />

        {/* Investment Details Table */}
        <h4 style={{ fontWeight: "bold", marginTop: "5px" }}>Investment Details</h4>
        <Table
          columns={detailColumns}
          dataSource={investmentData}
          bordered
          pagination={false}
          style={{ marginBottom: "20px", border: "1px solid maroon" }}
          showHeader={false}
        />

        {/* Notes */}
        <h4 style={{ fontWeight: "bold", marginTop: "20px" }}>Notes</h4>
        <ol>
          <li>Our Quotation is valid for a period of 90 days from the date of issue</li>
          <li>Medical underwriting will be required for a Sum Assured (SA) above KES 5 Million</li>
          <li><strong>Death Benefit:</strong> In case of death, the higher of SA and Fund Value is payable</li>
          <li><strong>Withdrawal Benefit:</strong> In case of withdrawal, the fund value is payable, less any statutory charges and administrative charges</li>
        </ol>

        {/* Fund Projections Table */}
        <h4 style={{ fontWeight: "bold", marginTop: "5px" }}>Fund Projections</h4>
        <Table
          columns={tableColumns}
          dataSource={parsedCData.fundProjections?.details || []}
          bordered
          pagination={false}
          style={{ marginBottom: "20px", border: "1px solid maroon" }}
          rowKey="year"
        />

        {/* Footer */}
        <div
          style={{
            width: "100%",
            backgroundColor: "maroon",
            textAlign: "center",
            padding: "6px",
            marginTop: "20px"
          }}
        >
          <h3 style={{ color: "white", margin: 0 }}>
            <strong>Equity Life Assurance (Kenya) Limited</strong>
          </h3>
        </div>
      </div> 
    </Card>
    <div style={{ marginTop: "30px" }}>
    <Row>
          <Col span={12} style={{ marginTop: "4px"}}>
            <Checkbox checked={isCheckboxChecked} onChange={handleCheckboxChange} >
              I accept the{" "}
              <span onClick={() => setIsPolicyModalVisible(true)} style={{ textAlign: "right", marginTop: "20px", color: "#A32A29" }}>
                policy exclusions
              </span>
            </Checkbox>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: "right", color: "#A32A29"}}>
              <Button
                type="primary"
                style={{ marginRight: "10px" }}
                disabled={!isPolicyAccepted || !isCheckboxChecked}
              >
                Continue with Payment
              </Button>
              <Button className="mr-4" style={{ marginRight: "10px" }} onClick={handleDownload}>
                Download
              </Button>
              <Button className="mr-4" style={{ marginRight: "10px" }}>
                Send to Email
              </Button>
            </div>
          </Col>
        </Row>

        <PolicyExclusionsModal
          visible={isPolicyModalVisible}
          onCancel={() => setIsPolicyModalVisible(false)}
          onAccept={handleModalAccept}
        />
      </div>
    </>
  );
};

export default EducQuotation;
