import React, { useState } from "react";
import { Modal, Checkbox, Button } from "antd";

const Terms = ({ visible, onClose }) => {
  const [understood, setUnderstood] = useState(false);

  const handleCheckboxChange = (e) => {
    setUnderstood(e.target.checked);
  };

  const handleOk = () => {
    if (understood) {
      onClose();
    }
  };

  return (
    <Modal
      title='Terms and Conditions'
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Checkbox key='checkbox' onChange={handleCheckboxChange}>
          Understood terms
        </Checkbox>,
        <Button
          key='submit'
          type='primary'
          disabled={!understood}
          onClick={handleOk}
        >
          OK
        </Button>,
      ]}
    >
      <p>These are the terms and conditions...</p>
    </Modal>
  );
};

export default Terms;
