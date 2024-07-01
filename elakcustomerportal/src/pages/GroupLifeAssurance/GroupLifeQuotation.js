import React, { useState } from "react";
import { Card, Row, Col, Table, Button, Checkbox, Typography, message } from "antd";
import { useLocation } from "react-router-dom";
import PolicyExclusionsModal from "../../components/Group Life/Modals/PolicyExclusionsModal";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import * as FileSaver from "file-saver";
import templateFile from "../../components/Group Life/Templates/quotationTemplate.docx";

import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const QuotationTable = () => {
  const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const navigate = useNavigate();

  const formatCurrency = (value) => `KES ${Math.round(value).toLocaleString()}`;

  const handleCheckboxChange = (e) => {
    setIsPolicyModalVisible(true);
    setIsCheckboxChecked(e.target.checked);
  };

  const handleModalAccept = () => {
    setIsPolicyAccepted(true);
    setIsPolicyModalVisible(false);
  };

  const handleDownload = () => {
    const docData = {
      policyId: 56777,
      date: new Date().toLocaleDateString(),
      customerName: data.proposedClientDetails.nameOfClient,
      annualSalaries: formatCurrency(data.proposedClientDetails.totalAnnualSalaries),
      numberOfStaff: data.proposedClientDetails.totalNumberOfStaff,
      benefitDescriptionGla: data.gla.benefits[0].benefitDescriptionGla,
      GLABenefitLevel: data.gla.benefits[0].benefitLevel,
      criticalillnessBenefitPercentage: `${data.criticalIllnessBenefitPercentage}%`,
      lastExpenseSA: formatCurrency(data.mainMemberLastExpense),
      benefitName: data.gla.benefits[0].benefitDescriptionGla,
      level: data.gla.benefits[0].benefitLevel,
      insuredSum: formatCurrency(data.gla.benefits[0].appliedSumAssured),
      premium: formatCurrency(data.gla.benefits[0].premium),
      annualPremiumGLA: formatCurrency(data.glaPremium),
      FCL: formatCurrency(
        data.negotiatedFreeCoverLimit === null
          ? data.freeCoverLimit
          : data.negotiatedFreeCoverLimit
      ),
      annualPremiumWIBA: formatCurrency(data.gpaWibaglaPremium),
      totalPremium: formatCurrency(data.totalPremium),
      policyStartDate: new Date(data.proposedClientDetails.policyStartDate).toLocaleDateString(),
      policyEndDate: new Date(data.proposedClientDetails.policyEndDate).toLocaleDateString(),
      averageAge: data.proposedClientDetails.averageAge,
      industry: data.proposedClientDetails.industry,
      intermediaryName: data.proposedClientDetails.intermediaryName,
      deathDerivedSumAssured: formatCurrency(data.deathDerivedSumAssured),
      gpaWibaBenefits: data.gpaWiba.gpaWibaBenefits.map(benefit => ({
        description: benefit.benefitDescriptionGpaWiba,
        level: benefit.benefitLevel,
        percentage: benefit.percentage,
        derivedSumAssured: formatCurrency(benefit.derivedSumAssured),
        premium: formatCurrency(benefit.premium)
      }))
    };

    fetch(templateFile)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const zip = new PizZip(buffer);
        const doc = new Docxtemplater(zip);

        doc.setData(docData);

        try {
          doc.render();
        } catch (error) {
          console.error("Error rendering document:", error);
          return;
        }

        const generatedDoc = doc.getZip().generate({ type: "blob" });
        FileSaver.saveAs(generatedDoc, "Quotation.docx");
        message.success('Quote downloaded successfully!');
      })
      .catch((error) => {
        console.error("Error loading template file:", error);
      });
  };

  const NumberFormat = {
    formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    parser: (value) => value.replace(/(,*)/g, ""),
  };

  const location = useLocation();
  const { data = {}, formData = {} } = location.state || {};

  const proposedClientDetails = [
    { key: "nameOfClient", attribute: "Name of Client", value: data.proposedClientDetails.nameOfClient },
    { key: "totalAnnualSalaries", attribute: "Total Annual Salaries", value: formatCurrency(data.proposedClientDetails.totalAnnualSalaries) },
    { key: "totalNumberOfStaff", attribute: "Total Number of Staff", value: NumberFormat.formatter(data.proposedClientDetails.totalNumberOfStaff) },
    { key: "mobileNumber", attribute: "Mobile Number", value: `${formData.phoneArea} ${formData.mobileNumber}` },
    { key: "email", attribute: "Email Address", value: formData.email },
    { key: "glaAsMultipleofAnnualSalary", attribute: "GLA Benefit Level as Multiple of Annual Salary", value: data.gla.benefits[0].benefitLevel },
    { key: "criticalIllnessBenefitPercentage", attribute: "Critical Illness Benefit Percentage", value: `${data.criticalIllnessBenefitPercentage}%` },
    { key: "mainMemberLastExpense", attribute: "Main Member Last Expense Sum Assured", value: formatCurrency(data.mainMemberLastExpense) },
  ];

  const illnessNaturalCausesAccidents = [];

  const combinedDetails = [...proposedClientDetails, ...illnessNaturalCausesAccidents];

  const columns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
      width: "50%",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "50%",
    },
  ];

  const groupLifeAssurance = [
    { title: "Benefit Description", dataIndex: "benefitDescriptionGla", key: "benefitDescriptionGla" },
    { title: "Benefit Level", dataIndex: "benefitLevel", key: "benefitLevel" },
    { title: "Sums Assured", dataIndex: "appliedSumAssured", key: "appliedSumAssured", render: (value) => formatCurrency(value) },
    { title: "Annual Premium", dataIndex: "premium", key: "premium", render: (value) => formatCurrency(value) },
  ];

  const accidentalOccupationalCausesOnly = [
    { title: "Benefit Description", dataIndex: "benefitDescriptionGpaWiba", key: "benefitDescriptionGpaWiba" },
    { title: "Benefit Level", dataIndex: "benefitLevel", key: "benefitLevel" },
    { title: "Sums Assured", dataIndex: "appliedSumAssured", key: "appliedSumAssured", render: (value) => formatCurrency(value) },
    { title: "Annual Premium", dataIndex: "premium", key: "premium", render: (value) => formatCurrency(value) },
  ];

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className="pt-5 pl-4"  style={{font: "DIN"}}>
      <div className="flex items-center" style={{ marginBottom: "20px", marginTop: "10px" }} >
        <button className="mb-1.5 focus:outline-none hover:text-[#A32A29]" >
          <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
        </button>
        <Title level={5} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Group Life Assurance Cover
        </Title>
      </div>
      <Card style={{ border: "1px solid #A32A29" }}>
        <div style={{ width: "90%", margin: "auto" }}>
          <Row justify="space-between" style={{ border: "1px solid #A32A29", padding: "10px" }}>
            <Col>
              <h3 style={{ fontWeight: "bold", marginBottom: 0 }}>EQUITY LIFE ASSURANCE (KENYA) LIMITED</h3>
              <h4 style={{ fontWeight: "bold", marginBottom: 0 }}>Group Life Assurance - Combined Solution</h4>
              <h4 style={{ fontWeight: "bold", marginBottom: 0 }}>Quotation</h4>
            </Col>
            <Col>
              <img src="https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain" alt="Company Logo" style={{ maxWidth: "100px", maxHeight: "120px" }} />
              <h4 style={{ display: "block", marginTop: "10px", fontWeight: "bold" }}>Date: {new Date().toLocaleDateString()}</h4>
            </Col>
          </Row>

          <h4 style={{ fontWeight: "bold", marginBottom: 0, marginTop: 15 }}>Proposed Client Details</h4>
          <Table
            columns={columns}
            dataSource={combinedDetails}
            bordered
            pagination={false}
            showHeader={false}
            style={{ marginBottom: "20px", border: "1px solid #A32A29" }}
          />

          <h4 style={{ fontWeight: "bold", marginBottom: 0 }}>Group Life Assurance – (Illness, Natural Causes or Accidental Causes)</h4>
          <Table
            columns={groupLifeAssurance}
            dataSource={data.gla.benefits}
            bordered
            pagination={false}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Annual Premium</Table.Summary.Cell>
                <Table.Summary.Cell index={1} />
                <Table.Summary.Cell index={2} />
                <Table.Summary.Cell index={3}>{formatCurrency(data.glaPremium)}</Table.Summary.Cell>
              </Table.Summary.Row>
            )}
            style={{ marginBottom: "20px", border: "1px solid #A32A29" }}
          />

          <Table
            bordered
            pagination={false}
            showHeader={false}
            dataSource={[{ key: "freeCoverLimit", label: "Free Cover Limit", value: formatCurrency(data.negotiatedFreeCoverLimit === null ? data.freeCoverLimit : data.negotiatedFreeCoverLimit) }]}
            columns={[
              { dataIndex: "label", key: "label", render: (text) => <strong>{text}</strong> },
              { dataIndex: "value", key: "value", align: "right", render: (text) => <strong>{text}</strong> },
            ]}
            style={{ marginBottom: "20px", border: "1px solid #A32A29" }}
          />

          <Table
            bordered
            pagination={false}
            showHeader={false}
            dataSource={[{ key: "maxCriticalIllnesValuePerIndividual", label: "Maximum Critical Illness Cover Per Individual", value: formatCurrency(data.negotiatedMaxCriticalIllnessCover === null ? data.maxCriticalIllnesValuePerIndividual : data.negotiatedMaxCriticalIllnessCover) }]}
            columns={[
              { dataIndex: "label", key: "label", render: (text) => <strong>{text}</strong> },
              { dataIndex: "value", key: "value", align: "right", render: (text) => <strong>{text}</strong> },
            ]}
            style={{ marginBottom: "20px", border: "1px solid #A32A29" }}
          />

          <h4 style={{ fontWeight: "bold", marginBottom: 0 }}>Accidental/Occupational Causes Only</h4>
          <Table
            columns={accidentalOccupationalCausesOnly}
            dataSource={data.gpaWiba.gpaWibaBenefits}
            bordered
            pagination={false}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Annual Premium</Table.Summary.Cell>
                <Table.Summary.Cell index={1} />
                <Table.Summary.Cell index={2} />
                <Table.Summary.Cell index={3}>{formatCurrency(data.gpaWibaglaPremium)}</Table.Summary.Cell>
              </Table.Summary.Row>
            )}
            style={{ marginBottom: "20px", border: "1px solid #A32A29" }}
          />

          <Table
            bordered
            pagination={false}
            showHeader={false}
            dataSource={[{ key: "totalPremium", label: "Total Annual Premium: Combined Solution", value: formatCurrency(data.totalPremium) }]}
            columns={[
              { dataIndex: "label", key: "label", render: (text) => <strong>{text}</strong> },
              { dataIndex: "value", key: "value", align: "right", render: (text) => <strong>{text}</strong> },
            ]}
            style={{ marginBottom: "20px", border: "1px solid #A32A29" }}
          />

          <h4 style={{ fontWeight: "bold", marginTop: "20px" }}>Notes:</h4>
          <ol>
            <li>1. Our Quotation is valid for a period of 90 days from the date of issue</li>
            <li>2. Passive terrorism included</li>
            <li>3. We reserve the right to review our quotation should the basis against which the quotation has been done vary significantly</li>
            <li>4. Terms and Conditions of ELAK's Group Life Assurance policy apply and will be availed on scheme admission</li>
          </ol>
        </div>

        <div style={{ width: "100%", backgroundColor: "#A32A29", textAlign: "center", padding: "6px", marginTop: "20px" }}>
          <h3 style={{ color: "white", margin: 0 }}><strong>Equity Life Assurance (Kenya) Limited</strong></h3>
        </div>
      </Card>
      <div style={{ marginTop: "30px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} style={{ marginTop: "4px"}}>
            <Checkbox checked={isCheckboxChecked} onChange={handleCheckboxChange} >
              I accept the{" "}
              <span onClick={() => setIsPolicyModalVisible(true)} style={{ textAlign: "right", marginTop: "20px", color: "#A32A29" }}>
                policy exclusions
              </span>
            </Checkbox>
          </Col>
          <Col xs={24} sm={12}>
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
    </div>
  );
};

export default QuotationTable;
