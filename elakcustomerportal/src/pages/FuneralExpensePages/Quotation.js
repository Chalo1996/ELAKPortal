import { useEffect, useState } from "react";
import { Card, Row, Col, Table, Button, Form, Checkbox, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetData } from "../../store/redux/features/gleSlice";
import darkLogo from "../../assets/dark-logo.png";
import { useTheme } from "../../store/context/theme-context";
import FuneralExclusionsModal from "../../components/Funeral Expense/modals/Exclusions";
import ErrorPage from "../../shared/ErrorPage";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

const options = {
  method: "open",
  resolution: Resolution.MEDIUM,
  page: {
    margin: Margin.MEDIUM,
    format: "A4",
    orientation: "portrait",
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
    },
  },
};

const getTargetElement = () => document.getElementById("content-id");

const generatePdfAndNotify = async () => {
  try {
    await generatePDF(getTargetElement, options);
    message.success({
      content: "PDF generated successfully",
      key: "pdfMessage",
      duration: 2,
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    message.error({
      content: "Failed to generate PDF",
      key: "pdfMessage",
      duration: 2,
    });
  }
};

const FuneralExpenseQuotation = () => {
  const { theme } = useTheme();
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { formData = {}, tableData = [] } = location.state || {};

  const handleNavigate = () => {
    navigate("/home");
  };

  const assignKeysToData = (data) => {
    return data.map((item, index) => ({
      ...item,
      key: item.id || index, // Use item.id if it exists, otherwise use index
    }));
  };

  const policyData = assignKeysToData(tableData);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCheckbox = (e) => {
    if (isPolicyChecked) {
      setIsPolicyChecked(e.target.checked);
    } else {
      showModal();
    }
  };

  useEffect(() => {
    dispatch(resetData());
  }, [dispatch]);

  const customerTableColumns = [
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

  const customerTableData = [
    {
      key: "fullName",
      attribute: "Name",
      value: `${formData.firstName ?? ""} ${formData.lastName ?? ""}`,
    },
    {
      key: "email",
      attribute: "Email",
      value: formData.email ?? "",
    },
    {
      key: "gender",
      attribute: "Gender",
      value: formData.gender ?? "",
    },
    {
      key: "country",
      attribute: "Country",
      value: formData.country ?? "",
    },
    {
      key: "phone",
      attribute: "Phone",
      value: `${formData.phoneArea ?? ""}${formData.phoneNo ?? ""}`,
    },
  ];

  const policyDataColumns = [
    { title: "Member Type", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Number of Members", dataIndex: "lives", key: "lives" },
    {
      title: "Sum Assured Per Member",
      dataIndex: "sumAssured",
      key: "sumAssured",
    },
    {
      title: "Total Sum Assured",
      dataIndex: "totalSumAssured",
      key: "totalSumAssured",
    },
    {
      title: "Premium Per Member",
      dataIndex: "premiumPerMember",
      key: "premiumPerMember",
    },
    {
      title: "Total Premium",
      dataIndex: "totalPremium",
      key: "totalPremium",
    },
  ];

  const ageInfoData = [
    {
      category: "Life Assured (Main Member)",
      minAge: "18 years",
      maxAge: "70 years",
    },
    { category: "Spouse", minAge: "18 years", maxAge: "70 years" },
    { category: "Children", minAge: "1 day", maxAge: "24 years" },
    { category: "Parents/Parents In-Law", minAge: "NA", maxAge: "70 years" },
  ];

  if (formData.length === 0 || tableData.length === 0) {
    return (
      <ErrorPage
        status="404"
        title="Quotation Details Unavailable"
        subtitle="Please select funeral expense product in the home page and fill in your details to generate a quotation."
        onRetry={handleNavigate}
      />
    );
  }

  return (
    <div className="pt-5 pl-4">
      <div className="mb-4">
        <span>
          <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
            <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
          </button>
        </span>
        <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          {formData.segment} Funeral Expense Quotation Details
        </span>
      </div>
      <Card className={`border ${theme === "dark" ? "" : "border-black"}`}>
        <div id="content-id">
          <div style={{ width: "90%", margin: "auto" }}>
            <Row justify="space-between">
              <Col>
                <p style={{ fontWeight: "bold" }}>
                  EQUITY LIFE ASSURANCE (KENYA) LIMITED
                </p>
                <p style={{ fontWeight: "bold" }}>Funeral Expense</p>
                <p style={{ fontWeight: "bold" }}>
                  {formData.segment ?? ""} Quotation
                </p>
              </Col>
              <Col>
                <img
                  src={
                    theme === "dark"
                      ? darkLogo
                      : "https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain"
                  }
                  alt="Company Logo"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "120px",
                  }}
                />

                <p
                  style={{
                    display: "block",
                    marginTop: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Date: {new Date().toLocaleDateString()}
                </p>
              </Col>
            </Row>

            <p style={{ fontWeight: "bold", marginTop: "5px" }}>
              Customer Details
            </p>
            <Table
              columns={customerTableColumns}
              dataSource={customerTableData}
              bordered
              pagination={false}
              className={`${theme === "dark" ? "" : "border border-black"}`}
              scroll={{ x: "max-content" }}
              showHeader={false}
            />

            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              Policy Details
            </p>
            <Table
              columns={policyDataColumns}
              dataSource={policyData}
              bordered
              pagination={false}
              title={() => (
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "maroon",
                  }}
                >
                  {formData.segment === "Individual Customer"
                    ? "Personal Funeral Expense Cover"
                    : "Group Funeral Expense Cover"}
                </p>
              )}
              className={`${theme === "dark" ? "" : "border border-black"}`}
              scroll={{ x: "max-content" }}
            />

            <p style={{ fontWeight: "bold", marginTop: "20px" }}>Notes</p>
            <p>1. Cover on 24 hour worldwide basis. </p>
            <p>
              2. Funeral Expense claims are payable within 48 hours of official
              notification.
            </p>
            <p>
              3. All Funeral Expense benefits are paid on death, due to any
              covered cause, of the main member or of the dependants where
              applicable.
            </p>
            <p>
              4. Cover applies to principal member, one spouse, biological
              children, biological parents & parents-in-law. Cover may be
              extended to adopted children subject to proof of legal adoption.
            </p>
            <p>
              5. The cover duration is one (1) year and commences once the
              premium is paid in full.
            </p>
            <p>
              6. The premium rates are subject to re-pricing in case the claims
              experience proves worse than allowed for in the premium rates.
            </p>
            <p>
              7. There is a waiting period of 1 month for nuclear family and 2
              months for parents and parents in law from the date of
              commencement of the policy and subject to payment of full premium.
              In case of natural death within the waiting period no benefit is
              payable. There is no waiting period for accidental death.
            </p>
            <p>
              8. This quotation is valid for a period of 90 days after the date
              of issue.
            </p>

            <div className="overflow-x-auto">
              <table
                className={`border ${
                  theme === "dark" ? "" : "border-black"
                } border-collapse w-[100%]`}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "maroon",
                      color: "white",
                      textAlign: "left",
                    }}
                  >
                    <th
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    >
                      Category of Member
                    </th>
                    <th
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    >
                      Minimum Entry Age
                    </th>
                    <th
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    >
                      Maximum Entry Age
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ageInfoData.map((row, index) => (
                    <tr key={index}>
                      <td
                        className={`border ${
                          theme === "dark" ? "" : "border-black"
                        } border-collapse p-2`}
                      >
                        {row.category}
                      </td>
                      <td
                        className={`border ${
                          theme === "dark" ? "" : "border-black"
                        } border-collapse p-2`}
                      >
                        {row.minAge}
                      </td>
                      <td
                        className={`border ${
                          theme === "dark" ? "" : "border-black"
                        } border-collapse p-2`}
                      >
                        {row.maxAge}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: "15px" }}>
              <strong>Onboarding requirements:</strong> Member data in the below
              format
            </p>
            <div className="overflow-x-auto">
              <table
                className={`border ${
                  theme === "dark" ? "" : "border-black"
                } border-collapse w-[100%]`}
              >
                <thead>
                  <tr>
                    <th
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    >
                      Name
                    </th>
                    <th
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    >
                      Date of Birth
                    </th>
                    <th
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    >
                      ID/Passport Number
                    </th>
                    <th
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    >
                      Phone Number
                    </th>
                    <th
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    >
                      Main Member
                    </th>
                    <th
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    >
                      Relation to Member
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    ></td>
                    <td
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    ></td>
                    <td
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    ></td>
                    <td
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    ></td>
                    <td
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    ></td>
                    <td
                      className={`border ${
                        theme === "dark" ? "" : "border-black"
                      } border-collapse p-2`}
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: "15px" }}>
              Copies of ID/Passport, Birth Certificate/Notification of members
              covered.
            </p>
            <p>
              <em>
                Additional documents for individual cover: KRA Pin of main
                member.
              </em>
            </p>
            <p>
              <em>
                Additional documents for Groups/Corporates-Certificate of
                Registration & KRA Pin.
              </em>
            </p>

            <div className="mb-[10px] mt-[15px] overflow-x-auto">
              <p style={{ fontWeight: "bold" }}>Contacts</p>
              <p>
                Email:
                <a href="mailto:businessdevelopment@equityinsurance.co.ke">
                  businessdevelopment@equityinsurance.co.ke
                </a>
                <br />
                Tel: <a href="tel:0763026000">+254763026000</a>
              </p>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              backgroundColor: "maroon",
              textAlign: "center",
              padding: "6px",
            }}
          >
            <p style={{ color: "white" }}>
              <strong>Equity Life Assurance (Kenya) Limited</strong>
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-start md:items-center mt-4 gap-4">
        <Form className="mt-4">
          <Form.Item name="terms" valuePropName="checked">
            <span>
              <Checkbox checked={isPolicyChecked} onChange={handleCheckbox} />
              <span className="ml-2">
                I accept the{" "}
                <span
                  onClick={showModal}
                  className="text-[#A32A29] cursor-pointer"
                >
                  policy exclusions
                </span>
              </span>
            </span>
          </Form.Item>
        </Form>
        <div className="flex flex-col items-start justify-center md:flex-row md:items-center md:justify-between gap-2">
          <Button
            type="primary"
            className="shadow-none"
            disabled={!isPolicyChecked}
          >
            Continue With Payment
          </Button>

          <Button className="shadow-none" onClick={generatePdfAndNotify}>
            Download Quote
          </Button>
          <Button className="shadow-none">Send To Email</Button>
        </div>
      </div>

      <FuneralExclusionsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onCancel={handleCancel}
        setIsPolicyChecked={setIsPolicyChecked}
      />
    </div>
  );
};

export default FuneralExpenseQuotation;
