import { Modal, Button, Row } from "antd";
import ciImg from "../../assets/ciImg.jpg";
import { NavLink } from "react-router-dom";

const CriticalIllnessModal = ({ isModalOpen, onCancel, onOkay, product }) => {
  const customTitle = (
    <p className="text-lg font-medium text-center font-roboto text-black">
      Critical Illness Cover
    </p>
  );

  return (
    <Modal
      title={customTitle}
      open={isModalOpen}
      onOk={onOkay}
      onCancel={onCancel}
      style={{
        width: "741px",
        height: "710px",
        gap: "0px",
        opacity: "1",
      }}
      footer={[
        <Row justify="start" key="footer-row">
          <Button
            key="close"
            type="primary"
            className="shadow-none font-semibold text-lg leading-6 text-center text-white w-[177px] h-[48px] p-[12px_48px] gap-0 rounded-tl-lg "
          >
            <NavLink to="customer-type">Apply Now</NavLink>
          </Button>
        </Row>,
      ]}
    >
      <div className="flex flex-col gap-1 ">
        <img
          src={ciImg}
          alt={product.title}
          className="object-cover text-center rounded-[16px] h-[232px] w-[311px] m-auto"
        />
        <div className="py-3 px-0">
          <p className="text-left text-[#221F1F] font-semibold text-[16px] leading-6">
            Life is full of unexpected challenges.
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            Being diagnosed with a critical illness comes with huge expenses and
            need for immediate attention inorder to save a life
          </p>
        </div>
        <div className="py-3 px-0">
          <p className="text-left text-[#221F1F] font-semibold text-[16px] leading-6">
            Critical Illness Cover
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            Serious illnesses like cancer, heart attacks, kidney failure and
            strokes can lead to major medical expenses. Critical Illness Cover
            provides a lump sum payment upon diagnosis, helping you cover
            medical costs and maintain financial stability. Choose the right
            cover to secure your peace of mind and focus on recovery.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CriticalIllnessModal;
