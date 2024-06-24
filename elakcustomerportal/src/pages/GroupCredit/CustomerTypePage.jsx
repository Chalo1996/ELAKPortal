import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import {
  LeftOutlined,
  UserOutlined,
  TeamOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { useTheme } from "../../store/context/theme-context";
import CustomerTypeModal from "../../components/GroupCredit/Modals/CustomerTypeModal";

const { Title } = Typography;

const CustomerTypePage = () => {
  const { theme } = useTheme();
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  let title = "Group Credit Cover";

  const handleClick = (section) => () => {
    setSelectedSection(section);
  };

  const handleOk = () => {
    setSelectedSection(null);
  };

  const handleCancel = () => {
    setSelectedSection(null);
  };

  return (
    <div className='pt-5 pl-4'>
      <div className='mb-4'>
        <span>
          <button className='mb-2 focus:outline-none hover:text-[#A32A29]'>
            <LeftOutlined className='w-8 h-8' onClick={handleNavigate} />
          </button>
        </span>
        <span className='font-open-sans text-[16px] font-semibold leading-[24px] text-left'>
          {title}
        </span>

        <div className='w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 flex flex-col gap-4'>
          <Title level={5}>Please select the type of customer</Title>
          <p className='text-sm font-normal font-open-sans text-left text-[#929497]'>
            Select the type of customer to proceed
          </p>
        </div>

        <div className='flex flex-col items-start lg:flex-row lg:items-center lg:justify-start gap-[24px] mt-5'>
          <div className='cursor-pointer' onClick={handleClick("Personal")}>
            <div className='flex items-center justify-between w-[335px] h-[81px]'>
              <div className='flex flex-row items-center justify-center gap-3'>
                <div className='bg-[#92949733] rounded-full p-3'>
                  <UserOutlined
                    className='text-[#A32A29]'
                    style={{ fontSize: "24px" }}
                  />
                </div>
                <p className='mt-4'>Personal</p>
              </div>
              <div>
                <RightOutlined
                  className='text-[#A32A29]'
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
            <Divider className={`${theme === "dark" ? "bg-gray-700" : ""}`} />
          </div>

          <div className='cursor-pointer' onClick={handleClick("Group")}>
            <div className='flex items-center justify-between w-[335px] h-[81px]'>
              <div className='flex flex-row items-center justify-center gap-3'>
                <div className='bg-[#92949733] rounded-full p-3'>
                  <TeamOutlined
                    className='text-[#A32A29]'
                    style={{ fontSize: "24px" }}
                  />
                </div>
                <p className='mt-4'>Group</p>
              </div>
              <div>
                <RightOutlined
                  className='text-[#A32A29]'
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
            <Divider className={`${theme === "dark" ? "bg-gray-700" : ""}`} />
          </div>
        </div>
      </div>
      {selectedSection && (
        <CustomerTypeModal
          isModalOpen={Boolean(selectedSection)}
          onOkay={handleOk}
          onCancel={handleCancel}
          customerType={selectedSection}
        />
      )}
    </div>
  );
};

export default CustomerTypePage;
