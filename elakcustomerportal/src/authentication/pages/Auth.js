import { useLocation } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Authentication = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const authType = searchParams.get("mode");

  return (
    <>
      {authType === "signin" && <Login />}
      {authType === "signup" && <Signup />}
    </>
  );
};

export default Authentication;
