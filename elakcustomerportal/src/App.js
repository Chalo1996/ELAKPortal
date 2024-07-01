import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider } from "./store/context/theme-context";
import {
  authenticateUser,
  setStatus,
  setToken,
} from "./store/redux/features/authSlice";
import AppRoutes from "./shared/routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.auth.theme) === "light";

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const authStatus = localStorage.getItem("authStatus");

    if (authToken) {
      dispatch(setToken(authToken));
    }

    if (authStatus) {
      dispatch(setStatus(authStatus));
    } else {
      dispatch(authenticateUser());
    }
  }, [dispatch]);
  return (
    <ThemeProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#A32A29",
          },
          algorithm: lightTheme ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        <AppRoutes />
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;