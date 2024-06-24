import { useEffect } from "react";
import { Form, Select, DatePicker, InputNumber } from "antd";

const { Option } = Select;

const segments = ["Single Life", "Joint Life"];
const Genders = ["Male", "Female"];
const AnnuityTypes = ["Immediate Annuity", "Deferred Annuity"];
const TargetTypes = [
  "Pre-determined Purchase Price",
  "Pre-determined Annuity Amount",
];
const SpouseReversionRates = [25, 50, 75, 100];
const PaymentFrequencies = {
  Weekly: 52,
  Monthly: 12,
  Quarterly: 4,
  "Semi-Annually": 2,
  Annually: 1,
};

const ProductParametersForm = ({ form, formData, setFormData }) => {
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const handleSegmentChange = (value) => {
    if (value === "Single Life") {
      setFormData((prevData) => ({
        ...prevData,
        segment: value,
        isSingleLife: true,
      }));
    } else if (value === "Joint Life") {
      setFormData((prevData) => ({
        ...prevData,
        segment: value,
        isSingleLife: false,
      }));
    }
  };
  const handleSpouseGenderChange = (value) => {
    const customerGender = value === "Male" ? "Female" : "Male";
    setFormData((prevData) => ({
      ...prevData,
      spouseGender: value,
      gender: customerGender,
    }));
  };

  const handleAnnuityTypeChange = (value) => {
    if (value === "Immediate Annuity") {
      setFormData((prevData) => ({
        ...prevData,
        annuityType: value,
        isDeferredAnnuity: false,
      }));
    } else if (value === "Deferred Annuity") {
      setFormData((prevData) => ({
        ...prevData,
        annuityType: value,
        isDeferredAnnuity: true,
      }));
    }
  };

  const handleStartDateChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      initialized: true,
      startDate: value,
    }));
  };

  const handleTargetTypeChange = (value) => {
    if (value === "Pre-determined Annuity Amount") {
      setFormData((prevData) => ({
        ...prevData,
        targetType: value,
        isPurchasePrice: false,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        targetType: value,
        isPurchasePrice: true,
      }));
    }
  };

  const handlePaymentFrequency = (value) => {
    const frequencyValue = PaymentFrequencies[value];

    const displayFrequencyMap = {
      Weekly: "Week",
      Monthly: "Month",
      Quarterly: "Quarter",
      "Semi-Annually": "Half-Year",
      Annually: "Annum",
    };

    setFormData((prevData) => ({
      ...prevData,
      paymentFrequency: value,
      displayFrequency: displayFrequencyMap[value],
      frequencyValue: frequencyValue,
    }));
  };

  const disabledDate = (current) => {
    const today = new Date();
    return (
      current &&
      current < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const validateBirthDate = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }

    const today = new Date();
    const selectedDate = new Date(value);

    // Calculate minimum and maximum dates
    const minDate = new Date(
      today.getFullYear() - 60,
      today.getMonth(),
      today.getDate()
    );
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    // Check if selected date is within the acceptable range
    if (selectedDate >= minDate && selectedDate <= maxDate) {
      return Promise.resolve();
    }

    // Reject with appropriate error message
    if (selectedDate < maxDate) {
      return Promise.reject(new Error("Maximum required age is 60 years."));
    } else {
      return Promise.reject(new Error("Minimum required age is 18 years."));
    }
  };

  const validateDeferredAnnuityAge = (_, value) => {
    // Check if deferred annuity option is not selected
    if (!formData.isDeferredAnnuity) {
      const selectedDate = new Date(value);
      const birthDateObj = new Date(formData.birthDate);
      let age = selectedDate.getFullYear() - birthDateObj.getFullYear();
      const birthMonth = birthDateObj.getMonth();
      const todayMonth = selectedDate.getMonth();
      const birthDay = birthDateObj.getDate();
      const selectedDay = selectedDate.getDate();

      if (
        birthMonth > todayMonth ||
        (birthMonth === todayMonth && birthDay > selectedDay)
      ) {
        age--;
      }

      if (age < 50) {
        return Promise.reject(
          new Error(
            "Applicant must be 50 years or older to receive the first annuity."
          )
        );
      } else {
        return Promise.resolve();
      }
    } else if (formData.isDeferredAnnuity && formData.deferrementPeriod) {
      const selectedDate = new Date(value);
      const newStartDate = new Date(selectedDate);
      newStartDate.setMonth(
        selectedDate.getMonth() + parseInt(formData.deferrementPeriod)
      );

      const birthDateObj = new Date(formData.birthDate);
      let ageAtNewStartDate =
        newStartDate.getFullYear() - birthDateObj.getFullYear();
      const birthMonth = birthDateObj.getMonth();
      const todayMonth = newStartDate.getMonth();
      const birthDay = birthDateObj.getDate();
      const selectedDay = newStartDate.getDate();

      if (
        birthMonth > todayMonth ||
        (birthMonth === todayMonth && birthDay > selectedDay)
      ) {
        ageAtNewStartDate--;
      }

      if (ageAtNewStartDate < 50) {
        return Promise.reject(
          new Error(
            "Applicant must be 50 years or older at the deferred start date."
          )
        );
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.resolve();
    }
  };

  const preventTextInput = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (formData.initialized) {
      form.validateFields(["startDate"]);
    }
  }, [
    form,
    formData.birthDate,
    formData.startDate,
    formData.initialized,
    formData.deferrementPeriod,
    formData.annuityType,
  ]);

  return (
    <>
      <div className="w-[710px] h-[76px] top-[408px] left-[425px] mt-3 py-3 px-0 flex flex-col gap-4">
        <p className="font-open-sans text-[16px] font-semibold leading-[28px] text-left">
          Please enter or select your product preferences
        </p>
      </div>

      <Form form={form} layout="vertical">
        <div className="mb-2">
          <span>
            <strong>Spouse Details {">"}</strong>
            <span className="text-[#A32A29]">
              <em>*Applicable to joint life annuities only</em>
            </span>
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label="Do you want coverage for yourself (Single Life) or you and your partner (Joint Life)?"
            rules={[
              {
                required: true,
                message: "Please select segment.",
              },
            ]}
          >
            <Select value={formData.segment} onChange={handleSegmentChange}>
              {segments.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {!formData.isSingleLife && (
            <>
              <Form.Item
                label="Spouse Date of Birth"
                name="spouseDob"
                rules={[
                  {
                    required: true,
                    message: "Please select date of birth.",
                  },
                  { validator: validateBirthDate },
                ]}
                style={{ width: "100%", cursor: "pointer" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  id="spouseDob"
                  onChange={(value) =>
                    setFormData({ ...formData, spouseDob: value })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Spouse Gender"
                rules={[
                  {
                    required: true,
                    message: "Please select a gender.",
                  },
                ]}
              >
                <Select
                disabled
                  value={formData.spouseGender}
                  onChange={handleSpouseGenderChange}
                >
                  {Object.values(Genders).map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="What percentage should your spouse receive in the event of your death"
                rules={[
                  {
                    required: true,
                    message: "Please select a reversionary rate.",
                  },
                ]}
              >
                <Select
                  value={formData.spouseReversion}
                  onChange={(value) =>
                    setFormData({ ...formData, spouseReversion: value })
                  }
                >
                  {SpouseReversionRates.map((item) => (
                    <Option key={item} value={item}>
                      {`${item}%`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
        </div>

        <div className="mb-2">
          <span>
            <strong>Product Configuration Details</strong>
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label="Would you like the cover to commence immediately or at a later date?"
            rules={[
              {
                required: true,
                message: "Please select annuity type.",
              },
            ]}
          >
            <Select
              value={formData.annuityType}
              onChange={handleAnnuityTypeChange}
            >
              {AnnuityTypes.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={
              formData.isDeferredAnnuity
                ? "When would you like the contract to start?"
                : "When would you like the cover to commence?"
            }
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please select start date.",
              },
              { validator: validateDeferredAnnuityAge },
            ]}
            style={{ width: "100%", cursor: "pointer" }}
          >
            <DatePicker
              style={{ width: "100%" }}
              id="startDate"
              disabledDate={disabledDate}
              onChange={handleStartDateChange}
              inputReadOnly={true}
            />
          </Form.Item>
          {formData.isDeferredAnnuity && (
            <Form.Item
              label="Deferrement Period"
              tooltip="Defer the cover to a later date you would like start recieving payments"
              name="deferrementPeriod"
              rules={[
                {
                  required: true,
                  message: "Please input deferrement period",
                },
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              onKeyPress={preventTextInput}
            >
              <InputNumber
                value={formData.deferrementPeriod}
                placeholder="Enter period in months"
                step={1}
                min={1}
                onChange={(value) =>
                  setFormData({ ...formData, deferrementPeriod: value })
                }
                style={{ width: "100%" }}
                addonAfter="Months"
              />
            </Form.Item>
          )}

          <Form.Item
            label="Target Type"
            tooltip="Would you like to specify an initial amount to pay (Pre-determined Purchase Price) or an amount to receive regularly (Pre-determined Annuity Amount)"
            rules={[
              {
                required: true,
                message: "Please select target type.",
              },
            ]}
          >
            <Select
              value={formData.targetType}
              onChange={handleTargetTypeChange}
            >
              {TargetTypes.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {formData.isPurchasePrice && (
            <Form.Item
              label="Specify a lump sum amount you would like to pay initially"
              tooltip="We will let to know how much you receive per chosen frequency"
              name="purchasePrice"
              rules={[
                {
                  required: true,
                  message: "Please input the purchase price amount",
                },
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              onKeyPress={preventTextInput}
            >
              <InputNumber
                value={formData.purchasePrice}
                placeholder="Enter purchase price"
                onChange={(value) =>
                  setFormData({ ...formData, purchasePrice: value })
                }
                style={{ width: "100%" }}
                addonBefore="Kshs"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => {
                  return value.replace(/(,*)/g, "");
                }}
              />
            </Form.Item>
          )}
          {!formData.isPurchasePrice && (
            <Form.Item
              label={`How much would you like to recieve per ${formData.displayFrequency}?`}
              name="annuityPerMonth"
              rules={[
                {
                  required: true,
                  message: `Please input the annuity amount per ${formData.displayFrequency}.`,
                },
                {
                  type: "number",
                  message: "The input is not a valid number!",
                },
              ]}
              onKeyPress={preventTextInput}
            >
              <InputNumber
                value={formData.annuityPerMonth}
                placeholder="Enter annuity amount"
                onChange={(value) =>
                  setFormData({ ...formData, annuityPerMonth: value })
                }
                style={{ width: "100%" }}
                addonBefore="Kshs"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => {
                  return value.replace(/(,*)/g, "");
                }}
              />
            </Form.Item>
          )}
          <Form.Item
            label="Please select a frequency you would like to receive payment"
            rules={[
              {
                required: true,
                message: "Please select frequency.",
              },
            ]}
          >
            <Select
              value={formData.paymentFrequency}
              onChange={handlePaymentFrequency}
            >
              {Object.keys(PaymentFrequencies).map((item) => (
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

export default ProductParametersForm;
