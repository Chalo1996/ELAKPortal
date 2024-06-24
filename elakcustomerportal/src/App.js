import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider } from "./store/context/theme-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PortalLayout from "./layout/PortalLayout";
import Education from "./components/Education/Education";
import GoalBased from "./components/Goal Based/GoalBased";
import GroupLifeAssurance from "./pages/GroupLifeAssurance/GroupLife";
import GroupCriticalIllness from "./components/Group Critical Illness/CriticalIlness";
import NotFound from "./pages/NotFound";
import CustomerTypePage from "./pages/FuneralExpensePages/CustomerType";
import LandingPage from "./pages/landingPage";
import GroupCredit from "./components/GroupCredit/GroupCredit";
import IndividualCover from "./components/GroupCredit/personal/IndividualCover";
import MultipleCover from "./components/GroupCredit/group/MultipleCover";
import FuneralExpenseQuotation from "./pages/FuneralExpensePages/Quotation";
import CriticalIllnessQuotation from "./components/Group Critical Illness/CriticalIllnessQuotation";
import {
  authenticateUser,
  setStatus,
  setToken,
} from "./store/redux/features/authSlice";
import HandleCustomerSelection from "./pages/FuneralExpensePages/HandleCustomerSelection";
import GroupTermLifeQuote from "./components/Group Term Life/TermLifeQuote";
import Welcome from "./components/Group Term Life/Welcome";
import CustomerType from "./components/Group Critical Illness/CustomerType";
import Submit from "./components/Group Critical Illness/Submit";
import GroupLifeQuotation from "./pages/GroupLifeAssurance/GroupLifeQuotation";
import Privacy from "./pages/TermsAndPrivacy/Privacy";
import Terms from "./pages/TermsAndPrivacy/Terms";
import EducQuotation from "./components/Education/EducQuotation";
import GoalQuotation from "./components/Goal Based/GoalQuotation";
import GCQuotationPageGroup from "./pages/GroupCredit/group/GCQuotationPage";
import GCQuotationPagePersonal from "./pages/GroupCredit/personal/GCQuotationPage";
import AnnuityPage from "./pages/AnnuityPages/Annuity";
import GroupCustomer from "./components/Group Critical Illness/GroupCustomer";
import UploadDetails from "./components/Group Critical Illness/UploadDetails";
import AnnuityQuotation from "./pages/AnnuityPages/Quotation";
import SubmittedCallBack from "./components/Group Life/SubmittedCallBackForm";
import Authentication from "./authentication/pages/Auth";
import AuthLayout from "./layout/auth-layout/AuthLayout";
import Register from "./components/Education/Register";


function App() {
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
    <BrowserRouter>
      <ThemeProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#A32A29",
            },
            algorithm: lightTheme
              ? theme.defaultAlgorithm
              : theme.darkAlgorithm,
          }}
        >
          <Routes>
            {/* Landing Page Route */}
            <Route path="/landing-page" element={<LandingPage />} />
            {/* Redirect to /landing-page */}
            <Route path="/" element={<Navigate to="/landing-page" />} />

            {/* Home route */}
            <Route
              path="/home"
              element={
                <PortalLayout>
                  <Home />
                </PortalLayout>
              }
            />

            {/* Routes under /home */}
            <Route
              path="/home/*"
              element={
                <PortalLayout>
                  <Routes>
                    <Route path="education" element={<Education />} />
                    <Route path="goal-based" element={<GoalBased />} />
                    <Route
                      path="funeral-expense/select-customer-type"
                      element={<CustomerTypePage />}
                    />
                    <Route
                      path="/funeral-expense"
                      element={<HandleCustomerSelection />}
                    />
                    <Route
                      path="funeral-expense/quotation-details"
                      element={<FuneralExpenseQuotation />}
                    />
                    <Route
                      path="group-life-assurance"
                      element={<GroupLifeAssurance />}
                    />
                    <Route
                      path="group-life-assurance/quotation-details"
                      element={<GroupLifeQuotation />}
                    />

                    <Route
                      path="customer-type/critical-illness"
                      element={<GroupCriticalIllness />}
                    />
                    <Route path="customer-type" element={<CustomerType />} />
                    <Route
                      path="customer-type/critical-illness/critical-illness-quotation"
                      element={<CriticalIllnessQuotation />}
                    />
                    <Route
                      path="customer-type/group-customer/critical-illness-quotation"
                      element={<CriticalIllnessQuotation />}
                    />
                    <Route
                      path="customer-type/critical-illness/submit"
                      element={<Submit />}
                    />
                    <Route
                      path="customer-type/group-customer"
                      element={<GroupCustomer />}
                    />
                    <Route
                      path="customer-type/group-customer/upload-details"
                      element={<UploadDetails />}
                    />
                    <Route
                      path="group-credit/*"
                      element={<GroupCreditRoutes />}
                    />
                    <Route path="welcome" element={<Welcome />} />
                    <Route
                      path="term-life-quote"
                      element={<GroupTermLifeQuote />}
                    />
                    <Route
                      path="Education/Educ-Quotation"
                      element={<EducQuotation />}
                    />
                     <Route
                      path="Education/Register"
                      element={<Register />}
                    />
                    <Route
                      path="Goal-based/goal-quotation"
                      element={<GoalQuotation />}
                    />
                    <Route path="annuity" element={<AnnuityPage />} />
                    <Route
                      path="annuity/quotation-details"
                      element={<AnnuityQuotation />}
                    />
                    <Route path="*" element={<NotFound />} />
                    <Route
                      path="group-life-assurance/call-back-submission"
                      element={<SubmittedCallBack />}
                    />
                  </Routes>
                </PortalLayout>
              }
            />

            {/* Routes outside of /home */}
            <Route path="/authentication/*" element={<AuthRoutes />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConfigProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const GroupCreditRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupCredit />} />
      <Route path="individual-cover" element={<IndividualCover />} />
      <Route path="multiple-cover" element={<MultipleCover />} />
      <Route path="/personal/quotation" element={<GCQuotationPagePersonal />} />
      <Route path="/group/quotation" element={<GCQuotationPageGroup />} />
    </Routes>
  );
};

const AuthRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/" element={<Authentication />} />
      </Routes>
    </AuthLayout>
  );
};
export default App;
