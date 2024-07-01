import { Typography } from "antd";
import imgLogo from "../../assets/images/dark-logo.png";
import bgLogo from "../../assets/images/authImage.png";

const { Title, Text } = Typography;

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen w-full overflow-hidden">
      {/* Left Side */}
      <div
        className="flex flex-col w-3/5 min-h-screen relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgLogo})`,
          position: "fixed", // Fixed positioning for the left side
          top: 0, // Stick to the top of the viewport
          bottom: 0, // Take full height of the viewport
          left: 0, // Stick to the left side of the viewport
        }}
      >
        <img
          src={imgLogo}
          alt="Logo"
          className="absolute top-0 left-0 ml-16 mt-12 w-30 h-20"
        />
        <div className="text-left ml-16 mt-40">
          <Title level={1} style={{ color: "white" }}>
            Welcome to <br />
            EQUITY Assurance
          </Title>
          <Text className="text-[20px] text-white">
            Sign in or register to continue
          </Text>
        </div>
      </div>

      {/* Right Side */}
      <div className="ml-[60%] w-[40%] min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
