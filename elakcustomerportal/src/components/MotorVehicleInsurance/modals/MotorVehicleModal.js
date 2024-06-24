import { NavLink } from "react-router-dom";
import { Modal, Button, Row } from "antd";
import Img from "../../../assets/images/motorImg.jpg";

import { useTheme } from "../../../store/context/theme-context";

const MotorVehicleModal = ({ isModalOpen, onCancel, onOkay, product }) => {
  const { theme } = useTheme();
  const customTitle = (
    <p
      className={`${
        theme === "dark" ? "text-white bg-gray-800" : "text-black"
      } text-lg font-medium text-center font-roboto `}
    >
      Motor vehicle Insurance
    </p>
  );

  return (
    <Modal
      title={customTitle}
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
        <Row justify="start" key="footer-row">
          <Button
            key="close"
            type="primary"
            className={`${
              theme === "dark" ? "text-white" : ""
            } shadow-none font-semibold text-lg leading-6 text-center w-[177px] h-[48px] p-[12px_48px] gap-0 rounded-tl-lg `}
          >
            <NavLink to="motor-vehicle">Apply Now</NavLink>
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
          <p
            className={`${
              theme === "dark" ? "text-white" : "text-[#221F1F]"
            } text-left  font-semibold text-[16px] leading-6`}
          >
           Motor Insurance
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
          This insurance policy protects you against any financial loss in the event that your vehicle is damaged,
          in an accident or stolen. This policy also covers third party injury, death and property loss or damage.
          </p>
        </div>
        <div className="py-3 px-0">
          <p
            className={`${
              theme === "dark" ? "text-white" : "text-[#221F1F]"
            } text-left  font-semibold text-[16px] leading-6`}
          >
            What are the different types of motor insurance?
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
          We have 2 different types of motor insurance:
          <br/>
          <br/>
          <strong>Motor third party -</strong> This cover protects you against third party losses including death, bodily injury and/or property damage.
          <br/>
          <br/>
          <strong>Motor comprehensive -</strong> This protects you against the third party’s death, bodily injury and/ or property damage as well as loss/ damage to your vehicle due to accidental fire, theft or an accident.
          <br/>
          <br/>
          <strong>Hint:</strong> A third party is a person who suffers damage to their vehicle or death or injury as a result of an accident involving your insured vehicle.

          </p>
        </div>
      </div>
    </Modal>
  );
};

export default MotorVehicleModal;
