//ToDoModal.js

import React, { useState } from "react";
import { Modal, Button, Radio, Typography, Row, Divider } from "antd";

const { Text } = Typography;

const ToDoModal = ({ isModalOpen, onClose, onContinue }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const customTitle = (
    <p className={`text-left font-open-sans text-lg leading-6 mb-8`}>
      What would you like to do?
    </p>
  );

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleContinue = () => {
    onContinue(selectedOption);
  };

  const handleClick = (value) => {
    setSelectedOption(value);
  };

  return (
    <Modal
      title={customTitle}
      open={isModalOpen}
      onCancel={onClose}
      footer={[
        <Row justify="start" key="footer-row" className="mt-4">
          <Button
            key="submit"
            type="primary"
            onClick={handleContinue}
            disabled={!selectedOption}
            className="shadow-none"
          >
            Continue
          </Button>
        </Row>,
      ]}
    >
      <Radio.Group
        onChange={handleOptionChange}
        value={selectedOption}
        style={{ width: "100%" }}
      >
        <div
          className="w-full flex items-center justify-between cursor-pointer"
          onClick={() => handleClick("generateQuote")}
        >
          <Text>Generate Quote</Text>
          <Radio value="generateQuote"></Radio>
        </div>
        <Divider />
        <div
          className="w-full flex items-center justify-between cursor-pointer"
          onClick={() => handleClick("requestCallback")}
        >
          <Text>Request a call back</Text>
          <Radio value="requestCallback"></Radio>
        </div>
      </Radio.Group>
    </Modal>
  );
};

export default ToDoModal;
