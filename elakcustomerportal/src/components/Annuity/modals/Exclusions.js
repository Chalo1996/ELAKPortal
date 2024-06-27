import { Modal, Button, Row, Divider } from "antd";

const AnnuityExclusionsModal = ({
  isModalOpen,
  setIsModalOpen,
  onCancel,
  setIsPolicyChecked,
}) => {
  const customTitle = (
    <p className={`text-lg font-medium text-left font-roboto `}>Exclusions</p>
  );

  const handleExclusion = () => {
    setIsPolicyChecked(true);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={customTitle}
      open={isModalOpen}
      onCancel={onCancel}
      style={{
        width: "741px",
        height: "710px",
        gap: "0px",
        opacity: "1",
      }}
      footer={[
        <Row justify="end" key="footer-row">
          <Divider />
          <Button
            onClick={handleExclusion}
            key="close"
            type="primary"
            className={`shadow-none`}
          >
            I agree
          </Button>
        </Row>,
      ]}
    >
      <Divider />
    </Modal>
  );
};

export default AnnuityExclusionsModal;
