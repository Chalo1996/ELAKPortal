import React from "react";
import { Modal, Button } from "antd";

const Privacy = ({ visible, onClose }) => {
  return (
    <Modal
      title='Privacy Policy'
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key='close' type='primary' onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>This is the privacy policy...</p>
    </Modal>
  );
};

export default Privacy;
