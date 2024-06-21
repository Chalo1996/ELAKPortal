import { Modal, Button, Row } from "antd";
import edu from "../../assets/edu.jpg";
import { NavLink } from "react-router-dom";

const Educamodal = ({ isModalOpen, onCancel, onOkay, product }) => {
  const customTitle = (
    <p className="text-lg font-medium text-center font-roboto text-black">
      Education Insurance Cover
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
            <NavLink to="education">Apply Now</NavLink>
          </Button>
        </Row>,
      ]}
    >
      <div className="flex flex-col gap-1 ">
        <img
          src={edu}
          alt={product.title}
          className="object-cover text-center rounded-[16px] h-[232px] w-[311px] m-auto"
        />
        <div className="py-3 px-0">
          <p className="text-left text-[#221F1F] font-semibold text-[16px] leading-6">
            Ensure a Bright Future for Your Child
          </p>
          <p className="text-left font-normal text-[#929497] text-base leading-5 mb-4">
            Education insurance cover provides financial support for your child's education, ensuring that they have access to quality education regardless of life's uncertainties. With this cover, you can secure your child's future and give them the best opportunities to succeed.
          </p>
        </div>
        <div className="py-3 px-0">
          <p className="text-left text-[#221F1F] font-semibold text-[16px] leading-6">
            Benefits of Education Insurance Cover
          </p>
          <ul className="list-disc text-left pl-5">
            <li className="mb-2">Financial security for your child's education</li>
            <li className="mb-2">Peace of mind knowing that your child's education is protected</li>
            <li className="mb-2">Flexibility to choose the coverage that suits your needs</li>
            <li className="mb-2">Tax benefits under section 80C of the Income Tax Act</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default Educamodal;
