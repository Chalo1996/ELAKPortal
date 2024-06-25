import { Typography } from "antd";
import imgLogo from "../../assets/images/dark-logo.png";
import bgLogo from "../../assets/images/authImage.png";

const { Title, Text } = Typography;

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-row items-start justify-center min-h-screen h-full w-full overflow-hidden">
      <div className="flex flex-col w-3/5 min-h-screen h-full">
        <div
          style={{ backgroundImage: `url(${bgLogo})` }}
          className=" bg-cover bg-center min-h-screen h-full flex flex-col justify-start items-start"
        >
          <img
            src={imgLogo}
            alt="Logo"
            className="absolute top-0 left-0 ml-16 mt-12 w-30 h-20"
          />

          <div className="text-left ml-16 mt-40">
            <Title level={1} style={{ color: "white" }}>
              Welcome to <br></br>EQUITY Assurance
            </Title>
            <Text className="text-[20px] text-white">
              Sign in or register to continue
            </Text>
          </div>
        </div>
      </div>
      <div className="w-2/5 min-h-screen h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
