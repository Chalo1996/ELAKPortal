import { NavLink } from "react-router-dom";
import { Modal, Button, Row } from "antd";
import Img from "../../../assets/annuityImg.jpg";

const AnnuityModal = ({ isModalOpen, onCancel, onOkay, product }) => {
  const customTitle = (
    <p className="text-lg font-medium text-center font-roboto">
      Annuity Insurance Policy
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
            className="shadow-none font-semibold text-lg leading-6 text-center w-[177px] h-[48px] p-[12px_48px] gap-0 rounded-tl-lg"
          >
            <NavLink to="annuity">Apply Now</NavLink>
          </Button>
        </Row>,
      ]}
    >
      <div className="flex flex-col gap-1 ">
        <img
          src={Img}
          alt={product.title}
          className="object-cover text-center rounded-[16px] h-[232px] w-[311px] m-auto"
        />
        <div className="py-3 px-0">
          <p className="text-left  font-semibold text-[16px] leading-6">
            Life is a journey, and securing your financial future is essential.
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            Annuities provide a steady income stream during retirement, offering
            peace of mind and financial stability. With our annuity plans, you
            can enjoy a guaranteed income for life, ensuring you have the funds
            you need to live comfortably in your golden years. Whether you're
            planning for retirement or looking to convert your savings into a
            reliable income, our annuity solutions are designed to meet your
            needs.
          </p>
        </div>
        <div className="py-3 px-0">
          <p className="text-left font-semibold text-[16px] leading-6">
            Our Annuity Insurance Policy
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            Our annuity policy offers a range of options tailored to fit your
            retirement goals. Choose from immediate annuities, which start
            paying out right away, or deferred annuities, which allow your
            investment to grow tax-deferred until you're ready to receive
            payments. With flexible payment options and the ability to customize
            your plan, you can ensure a comfortable and secure future. Our
            annuity products come with a variety of features, including
            inflation protection, lifetime income, and beneficiary benefits, so
            you can tailor your plan to your unique needs.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AnnuityModal;
