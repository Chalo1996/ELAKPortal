import React from "react";
import { Modal, Button, Typography } from "antd";

const { Paragraph } = Typography;

const PrivacyPolicyModal = ({ isVisible, onClose }) => {
  const handlePrivacyModalAccept = () => {
    onClose();
  };

  return (
    <Modal
      title={
        <span className="text-left font-semibold text-[16px] leading-6">
          Privacy Policy
        </span>
      }
      open={isVisible}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="accept"
          type="primary"
          className="shadow-none"
          onClick={handlePrivacyModalAccept}
        >
          Accept
        </Button>,
      ]}
      onCancel={onClose}
    >
      <Paragraph>Comprehensive Annuity Insurance Privacy Psolicy</Paragraph>
    </Modal>
  );
};

export default PrivacyPolicyModal;
