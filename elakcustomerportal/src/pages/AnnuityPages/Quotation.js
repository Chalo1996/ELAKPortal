import { useState } from "react";
import { Card, Row, Col, Button, message, Form, Checkbox } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../store/context/theme-context";
import darkLogo from "../../assets/images/dark-logo.png";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import AnnuityExclusionsModal from "../../components/Annuity/modals/Exclusions";
import ErrorPage from "../../shared/ErrorPage";

const options = {
  method: "open",
  resolution: Resolution.MEDIUM,
  page: {
    margin: Margin.SMALL,
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

const AnnuityQuotation = () => {
  const { theme } = useTheme();
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { formData = {}, tableData = [] } = location.state || {};
  const data = tableData;

  const handleNavigate = () => {
    navigate("/home");
  };

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

  if (formData.length === 0 || tableData.length === 0) {
    return (
      <ErrorPage
        status="404"
        title="Quotation Details Unavailable"
        subtitle="Please select annuity product in the home page and fill in your details to generate a quotation."
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
          Annuity Quotation Details
        </span>
      </div>

      <div id="content-id">
        <Card className={`border ${theme === "dark" ? "" : "border-black"}`}>
          <div style={{ width: "100%", margin: "auto" }}>
            <Row justify="space-between">
              <Col>
                <h3 style={{ fontWeight: "bold" }}>
                  EQUITY LIFE ASSURANCE (KENYA) LIMITED
                </h3>
                <p style={{ fontWeight: "bold" }}>Annuity Quotation</p>
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

            <div style={{ marginBottom: "15px" }}>
              <p style={{ fontWeight: "bold" }}>Customer Details</p>
              <table
                className={`border ${
                  theme === "dark" ? "" : "border-black"
                } border-collapse w-[100%]`}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Name:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.firstName} {formData.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Country:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.country}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Telephone:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.phoneArea} {formData.phoneNo}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Email:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.email}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Age At Commencement (Years):
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {data.annuitantAgeAtCommencement}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <p style={{ fontWeight: "bold" }}>Policy Details</p>
              <table
                className={`border ${
                  theme === "dark" ? "" : "border-black"
                } border-collapse w-[100%]`}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Target type:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.targetType}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      {formData.targetType === "Pre-determined Purchase Price"
                        ? "Purchase Price:"
                        : `Annuity Amount Per ${formData.displayFrequency}:`}
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      Ksh{" "}
                      {Math.round(
                        formData.targetType === "Pre-determined Purchase Price"
                          ? formData.purchasePrice
                          : formData.annuityPerMonth
                      ).toLocaleString() || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Single/Joint Life:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.segment}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Spouse's Reversionary Rate:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.spouseReversion}%
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Guaranteed Period (Years):
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.guaranteedPeriod}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Annuity Payment Frequency:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.paymentFrequency}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <p style={{ fontWeight: "bold" }}>Selected Optional Benefits</p>
              <table
                className={`border ${
                  theme === "dark" ? "" : "border-black"
                } border-collapse w-[100%]`}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Return of Residual Premium:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.residualPremium}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Long-Term Care:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.longTermCare}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Critical and Terminal Illness:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.criticalIllness}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Total & Permanent Disability:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.totalDisability}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Funeral Expense:
                    </td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      {formData.funeralExpense}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <p style={{ fontWeight: "bold" }}>Annuity Details</p>
              {data && (
                <table
                  className={`border ${
                    theme === "dark" ? "" : "border-black"
                  } border-collapse w-[100%]`}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          width: "50%",
                          textAlign: "left",
                          padding: "10px",
                        }}
                      >
                        {formData.targetType === "Pre-determined Purchase Price"
                          ? `Annuity Amount Per ${formData.displayFrequency}:`
                          : "Purchase Price:"}
                      </td>
                      <td style={{ textAlign: "left", padding: "10px" }}>
                        Ksh{" "}
                        {Math.round(
                          data.annualAnnuityPerFrequency
                        ).toLocaleString()}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Premiums For Optional Payments
                      </td>
                      <td style={{ textAlign: "left", padding: "10px" }}></td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "50%",
                          textAlign: "left",
                          padding: "10px",
                        }}
                      >
                        Return of Residual Premium:
                      </td>
                      <td style={{ textAlign: "left", padding: "10px" }}>
                        {data.optionalBundles.returnOfResidualPremium
                          .sumAssured != null
                          ? ` Ksh ${Math.round(
                              data.optionalBundles.returnOfResidualPremium
                                .riskPremium
                            ).toLocaleString()}`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "50%",
                          textAlign: "left",
                          padding: "10px",
                        }}
                      >
                        Long-Term Care:
                      </td>
                      <td style={{ textAlign: "left", padding: "10px" }}>
                        {data.optionalBundles.longTermCare.sumAssured != null
                          ? ` Ksh ${Math.round(
                              data.optionalBundles.longTermCare.riskPremium
                            ).toLocaleString()}`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "50%",
                          textAlign: "left",
                          padding: "10px",
                        }}
                      >
                        Critical and Terminal Illness:
                      </td>
                      <td style={{ textAlign: "left", padding: "10px" }}>
                        {data.optionalBundles.criticalAndTerminalIllness
                          .sumAssured != null
                          ? ` Ksh ${Math.round(
                              data.optionalBundles.criticalAndTerminalIllness
                                .riskPremium
                            ).toLocaleString()}`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "50%",
                          textAlign: "left",
                          padding: "10px",
                        }}
                      >
                        Total & Permanent Disability:
                      </td>
                      <td style={{ textAlign: "left", padding: "10px" }}>
                        {data.optionalBundles.totalAndPermanentDisability
                          .sumAssured != null
                          ? ` Ksh ${Math.round(
                              data.optionalBundles.totalAndPermanentDisability
                                .riskPremium
                            ).toLocaleString()}`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "50%",
                          textAlign: "left",
                          padding: "10px",
                        }}
                      >
                        Funeral Expense:
                      </td>
                      <td style={{ textAlign: "left", padding: "10px" }}>
                        {data.optionalBundles.funeralExpense.sumAssured != null
                          ? ` Ksh ${Math.round(
                              data.optionalBundles.funeralExpense.riskPremium
                            ).toLocaleString()}`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "50%",
                          textAlign: "left",
                          padding: "10px",
                        }}
                      >
                        Total Purchase Price:
                      </td>
                      <td style={{ textAlign: "left", padding: "10px" }}>
                        Ksh{" "}
                        {Math.round(data.totalPurchasePrice).toLocaleString() ||
                          "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <p style={{ fontWeight: "bold", marginTop: "20px" }}>Notes</p>
              <p>
                1. All annuities are payable in advance, whether annually or
                monthly in advance as the case maybe.
              </p>
              <p>
                2. The minimum age for the main annuitant as at date of
                commencement is 35 years.
              </p>
              <p>
                3. For individual immediate annuities, spouse reversion should
                be indicated as 0% (zero).
              </p>
              <p>
                4. If an annuity has both a guarantee period and spouse
                reversion, should the main annuitant die before the guarantee
                period elapses, pension at the full rate will continue for the
                remainder of the guarantee period. The spouse reversion
                commences after the conclusion of the guarantee period.
              </p>
              <p>
                5. Should spouse details be unavailable or difficult to
                retrieve, for purposes of computing a spouse reversion, assume a
                3 year age difference with the male life older than the female
                life.
              </p>

              <p style={{ fontWeight: "bold", marginTop: "20px" }}>
                Terms & Conditions
              </p>
              <p>
                <a
                  href="https://equitygroupholdings.com/ke/insure"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://equitygroupholdings.com/ke/insure
                </a>
              </p>
              <p style={{ fontWeight: "bold" }}>Contacts</p>
              <p>
                Email:
                <a href="mailto:quotations@equityinsurance.co.ke">
                  quotations@equityinsurance.co.ke
                </a>
                <br />
                Tel: <a href="tel:0765000000">0765000000</a>
              </p>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "maroon",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <h3 style={{ color: "white" }}>
              <strong>Equity Life Assurance (Kenya) Limited</strong>
            </h3>
          </div>
        </Card>
      </div>

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

      <AnnuityExclusionsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onCancel={handleCancel}
        setIsPolicyChecked={setIsPolicyChecked}
      />
    </div>
  );
};

export default AnnuityQuotation;
