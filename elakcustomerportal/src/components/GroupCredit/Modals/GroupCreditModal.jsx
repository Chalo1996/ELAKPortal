import { NavLink } from "react-router-dom";
import { Modal, Button, Row } from "antd";
import Img from "../../../assets/groupcredit.png";
import { useTheme } from "../../../store/context/theme-context";
const GroupCreditModal = ({ isModalOpen, onCancel, onOkay, product }) => {
  const { theme } = useTheme();

  return (
    <Modal
      open={isModalOpen}
      onOk={onOkay}
      onCancel={onCancel}
      className={theme === "dark" ? "dark-theme" : ""}
      style={{
        width: "741px",
        height: "710px",
        gap: "0px",
        opacity: "1",
      }}
      footer={[
        <Row justify='start' key='footer-row'>
          <Button
            key='close'
            type='primary'
            className={`${
              theme === "dark" ? "text-white" : ""
            } shadow-none font-semibold text-lg leading-6 text-center w-[177px] h-[48px] p-[12px_48px] gap-0 rounded-tl-lg `}
          >
            <NavLink to='group-credit'>Apply Now</NavLink>
          </Button>
        </Row>,
      ]}
    >
      <div className='flex flex-col gap-1 '>
        <img
          src={Img}
          alt={product.title}
          className='object-cover text-center rounded-[16px] h-[232px] w-[311px] m-auto'
        />
        <div className='py-3 px-0'>
          <p
            className={`${
              theme === "dark" ? "text-white" : "text-[#221F1F]"
            } text-left  font-semibold text-[16px] leading-6`}
          >
            Leave the loan stress to us!
          </p>
          <p className='text-left font-normal text-[#929497] text-base leading-5 mb-4'>
            Loan defaults happen. Some are intentional while others are not.
            That's why we are here. To carry your burden and allow you focus on
            growing your business. We will cover you and make your risk our
            burden in exchange for premium 🙊.
          </p>
        </div>
        <div className='py-3 px-0'>
          <p
            className={`${
              theme === "dark" ? "text-white" : "text-[#221F1F]"
            } text-left  font-semibold text-[16px] leading-6`}
          >
            Do not worry about defaults anymore 😎.
          </p>
          <p className='text-left font-normal text-[#929497] text-base leading-5 mb-4'>
            In case of a default, we will pay you the amount defaulted.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default GroupCreditModal;
