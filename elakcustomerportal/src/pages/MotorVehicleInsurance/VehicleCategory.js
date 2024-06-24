import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LeftOutlined,
  UserOutlined,
  TeamOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { useTheme } from "../../store/context/theme-context";
import MotorUseModal from "../../components/MotorVehicleInsurance/modals/MotorUseModal";

const VehicleCategoryPage = () => {
  const { theme } = useTheme();
  const [selectedSection, setSelectedSection] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleClick = (section) => {
    setSelectedSection(section);
  };

  const handleOk = () => {
    setSelectedSection(null);
  };

  const handleCancel = () => {
    setSelectedSection(null);
  };

  return (
    <div className="pt-5 pl-4">
      <div className="mb-4">
        <span>
          <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
            <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
          </button>
        </span>
        <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Motor Vehicle Insurance
        </span>

        <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 flex flex-col gap-4">
          <p className="font-open-sans text-[20px] font-semibold leading-[28px] text-left">
            What do you use your car for?
          </p>
          <p className="text-sm font-normal font-open-sans text-left text-[#929497]">
            Please select whether you use your car for personal needs or for work purposes
          </p>
        </div>

        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-start gap-[24px] mt-5">
          <div
            className="cursor-pointer"
            onClick={() => handleClick("Private")}
          >
            <div className="flex items-center justify-between w-[335px] h-[81px]">
              <div className="flex flex-row items-center justify-center gap-3">
                <div className="bg-[#92949733] rounded-full p-3">
                  <UserOutlined
                    className="text-[#A32A29]"
                    style={{ fontSize: "24px" }}
                  />
                </div>
                <p className="mt-4">Private</p>
              </div>
              <div>
                <RightOutlined
                  className="text-[#A32A29]"
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
            <Divider className={`${theme === "dark" ? "bg-gray-700" : ""}`} />
          </div>

          <div className="cursor-pointer" onClick={() => handleClick("Commercial")}>
            <div className="flex items-center justify-between w-[335px] h-[81px]">
              <div className="flex flex-row items-center justify-center gap-3">
                <div className="bg-[#92949733] rounded-full p-3">
                  <TeamOutlined
                    className="text-[#A32A29]"
                    style={{ fontSize: "24px" }}
                  />
                </div>
                <p className="mt-4">Commercial</p>
              </div>
              <div>
                <RightOutlined
                  className="text-[#A32A29]"
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
            <Divider className={`${theme === "dark" ? "bg-gray-700" : ""}`} />
          </div>
        </div>
      </div>
      {selectedSection === "Private" && (
        <MotorUseModal
          isModalOpen={selectedSection === "Private"}
          onOkay={handleOk}
          onCancel={handleCancel}
          customerType="Private"
        />
      )}
      {selectedSection === "Commercial" && (
        <MotorUseModal
          isModalOpen={selectedSection === "Commercial"}
          onOkay={handleOk}
          onCancel={handleCancel}
          customerType="Commercial"
        />
      )}
    </div>
  );
};

export default VehicleCategoryPage;
