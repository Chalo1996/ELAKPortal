import { Modal, Button, Row } from "antd";
import { NavLink } from "react-router-dom";
import happyfamily from "../../assets/happyfamily.png";

const GroupTermLifeModal = ({ isModalOpen, onCancel, onOkay, product }) => {
  const customTitle = (
    <p className="text-lg font-medium text-center font-roboto text-black">
      Group Term Life
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
            <NavLink to="term-life-quote">Apply Now</NavLink>
          </Button>
        </Row>,
      ]}
    >
      <div className="flex flex-col gap-1 ">
        <img
          src={happyfamily}
          alt={product.title}
          className="object-cover text-center rounded-[16px] h-[232px] w-[311px] m-auto"
        />
        <div className="py-3 px-0">
          <p className="text-left text-[#221F1F] font-semibold text-[16px] leading-6">
            A Life Secured is Peace Assured.
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            It pays out a death benefit to the beneficiaries if the insured
            person passes away during the term of the policy. Unlike whole life
            insurance, term life insurance does not accumulate cash value and is
            typically more affordable.
          </p>
        </div>
        <div className="py-3 px-0">
          <p className="text-left text-[#221F1F] font-semibold text-[16px] leading-6">
            All You need to Know about Term life
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            Term life insurance provides financial protection to the insured
            person's beneficiaries in the event of their untimely death. The
            death benefit can be used to cover various expenses, including
            funeral costs, outstanding debts, mortgage payments, and ongoing
            living expenses for the family. This can help provide financial
            stability and peace of mind to the insured's loved ones during a
            difficult time.
          </p>
        </div>
      </div>
    </Modal>
  );
};
export default GroupTermLifeModal;
