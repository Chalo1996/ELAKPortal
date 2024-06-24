import { NavLink } from "react-router-dom";
import { Modal, Button, Row } from "antd";
import Img from "../../../assets/images/modal-image.png";

const FuneralExpenseModal = ({ isModalOpen, onCancel, onOkay, product }) => {
  const customTitle = (
    <p className={`text-lg font-medium text-center font-roboto `}>
      Funeral Expense Cover
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
            className={`shadow-none font-semibold text-lg leading-6 text-center w-[177px] h-[48px] p-[12px_48px] gap-0 rounded-tl-lg `}
          >
            <NavLink to="funeral-expense/select-customer-type">
              Apply Now
            </NavLink>
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
          <p className={` text-left  font-semibold text-[16px] leading-6`}>
            Life is a journey...
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            Death within the family may come with a heavy financial burden when
            we may least expect. There will be immediate funeral related
            expenses to be met to accord the family member a decent send off.
          </p>
        </div>
        <div className="py-3 px-0">
          <p className={`text-left  font-semibold text-[16px] leading-6`}>
            Our Funeral expense cover
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            Will make a lump sum payment to you or your beneficiary within 48
            hours of a notice of death, to go towards covering funeral expenses.
            With a range of covers to choose from, you are a click away having
            peace of mind and stability for you and your loved ones.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default FuneralExpenseModal;
