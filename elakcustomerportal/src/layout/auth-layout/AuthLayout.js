import { useState, useEffect } from "react";
import imgLogo from "../../assets/images/dark-logo.png";
import bgLogo from "../../assets/images/authImage.png";

const AuthLayout = ({ children }) => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth * 0.6);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth * 0.6);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-row items-start justify-start min-h-screen">
      <div>
        <div
          style={{ backgroundImage: `url(${bgLogo})`, width: `${pageWidth}px` }}
          className="relative bg-cover bg-center min-h-[100vh] h-full flex justify-center items-center"
        >
          <img
            src={imgLogo}
            alt="Logo"
            className="absolute top-0 left-0 ml-16 mt-12 w-30 h-20"
          />
        </div>
      </div>
      <div style={{ width: `calc(100% - ${pageWidth}px)` }}>{children}</div>
    </div>
  );
};

export default AuthLayout;
