import {
  LeftOutlined,
  UserOutlined,
  TeamOutlined,
  RightOutlined,
} from "@ant-design/icons";

const FuneralExpensePage = () => {
  return (
    <div className="pt-5 pl-4">
      <div className="mb-4">
        <span>
          <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
            <LeftOutlined className="w-8 h-8" />
          </button>
        </span>
        <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Customer
        </span>

        <div className="w-[710px] h-[76px] top-[408px] left-[425px] py-3 px-0 flex flex-col gap-4">
          <p className="font-open-sans text-[20px] font-semibold leading-[28px] text-left">
            Please select the type of customer
          </p>
          <p className="text-sm font-normal font-open-sans text-left text-[#929497]">
            Select the type of customer to proceed
          </p>
        </div>

        <div className="flex items-center justify-start gap-[24px]">
          <div className="flex items-center justify-between w-[335px] h-[81px]">
            <div className="flex flex-row items-center justify-center gap-3">
              <div className="bg-[#92949733] rounded-full p-3">
                <UserOutlined
                  className="text-[#A32A29]"
                  style={{ fontSize: "24px" }}
                />
              </div>
              <p className="w-[231px] h-[24px]">Personal</p>
            </div>
            <div>
              <RightOutlined
                className="text-[#A32A29]"
                style={{ fontSize: "24px" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-[335px] h-[81px] mt-5">
            <div className="flex flex-row items-center justify-center gap-3">
              <div className="bg-[#92949733] rounded-full p-3">
                <TeamOutlined
                  className="text-[#A32A29]"
                  style={{ fontSize: "24px" }}
                />
              </div>
              <p className="w-[231px] h-[24px]">Group</p>
            </div>
            <div>
              <RightOutlined
                className="text-[#A32A29]"
                style={{ fontSize: "24px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuneralExpensePage;
