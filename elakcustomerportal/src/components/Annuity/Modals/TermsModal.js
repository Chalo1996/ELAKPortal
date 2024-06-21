import React from "react";
import { Modal, Button, Typography } from "antd";

const { Paragraph } = Typography;

const TermsModal = ({ isVisible, onClose, formData, setFormData }) => {
  const handleTermsModalAccept = () => {
    setFormData({ ...formData, terms: true });
    onClose();
  };

  return (
    <Modal
      title={
        <span className="text-left font-semibold text-[16px] leading-6">
          Terms and Conditions
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
          onClick={handleTermsModalAccept}
        >
          Accept
        </Button>,
      ]}
      onCancel={onClose}
    >
      <Paragraph>
        Comprehensive Annuity Insurance Terms and Conditions
      </Paragraph>
    </Modal>
  );
};

export default TermsModal;
