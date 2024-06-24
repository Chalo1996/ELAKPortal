import { useEffect } from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const GuaranteedPeriods = [0, 5, 10];
const Options = ["Yes", "No"];

const CoverageForm = ({ form, formData, setFormData }) => {
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);
  return (
    <>
      <div className="w-[710px] h-[76px] top-[408px] left-[425px] mt-3 py-3 px-0 flex flex-col gap-4">
        <p className="font-open-sans text-[16px] font-semibold leading-[28px] text-left">
          Please enter or select product coverage and optional benefits
        </p>
      </div>

      <Form form={form} layout="vertical">
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label="Guaranteed Period"
            tooltip="This is the period for which you are guaranteed to be paid regardless of whether or not you die during the specific period of time"
            rules={[
              {
                required: true,
                message: "Please select period.",
              },
            ]}
          >
            <Select
              value={formData.guaranteedPeriod}
              onChange={(value) =>
                setFormData({ ...formData, guaranteedPeriod: value })
              }
            >
              {GuaranteedPeriods.map((item) => (
                <Option key={item} value={item}>
                  {`${item} years`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="mb-2">
          <span>
            <strong>Optional Bundles</strong>
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label="Return of Residual Premium"
            tooltip="The 'Return of Residual Premium' feature refunds any remaining premiums if you are unable to work due to injury, offering financial support during difficult times"
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.residualPremium}
              onChange={(value) =>
                setFormData({ ...formData, residualPremium: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Long Term Care"
            tooltip="This care is for people over age 65 or with a chronic or disabling condition who need constant care."
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.longTermCare}
              onChange={(value) =>
                setFormData({ ...formData, longTermCare: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Critical & Terminal Illness"
            tooltip="Lump sum payment of 25% of annuity purchase price with a maximum KES 1,000,000 on diagnosis of critical Illness"
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.criticalIllness}
              onChange={(value) =>
                setFormData({ ...formData, criticalIllness: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Total & Permanent Disability"
            tooltip="This is applicable where an individual is no longer able to work due to injuries "
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.totalDisability}
              onChange={(value) =>
                setFormData({ ...formData, totalDisability: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Funeral Expense"
            tooltip="KES 150,000 to carter for funeral expenses"
            rules={[
              {
                required: true,
                message: "Please select an option.",
              },
            ]}
          >
            <Select
              value={formData.funeralExpense}
              onChange={(value) =>
                setFormData({ ...formData, funeralExpense: value })
              }
            >
              {Options.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default CoverageForm;
