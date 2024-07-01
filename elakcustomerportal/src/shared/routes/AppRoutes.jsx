import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import PortalLayout from "../../layout/main-layout/PortalLayout";
import InnerLayout from "../../layout/inner-layout/InnerLayout";
import Education from "../../components/Education/Education";
import GoalBased from "../../components/Goal Based/GoalBased";
import GroupLifeAssurance from "../../pages/GroupLifeAssurance/GroupLife";
import GroupCriticalIllness from "../../components/Group Critical Illness/CriticalIlness";
import NotFound from "../../pages/NotFound";
import CustomerTypePage from "../../pages/FuneralExpensePages/CustomerType";
import LandingPage from "../../pages/landingPage";
import FuneralExpenseQuotation from "../../pages/FuneralExpensePages/Quotation";
import CriticalIllnessQuotation from "../../components/Group Critical Illness/CriticalIllnessQuotation";
import HandleCustomerSelection from "../../pages/FuneralExpensePages/HandleCustomerSelection";
import GroupTermLifeQuote from "../../components/Group Term Life/TermLifeQuote";
import Welcome from "../../components/Group Term Life/Welcome";
import CustomerType from "../../components/Group Critical Illness/CustomerType";
import Submit from "../../components/Group Critical Illness/Submit";
import GroupLifeQuotation from "../../pages/GroupLifeAssurance/GroupLifeQuotation";
import Privacy from "../../pages/TermsAndPrivacy/Privacy";
import Terms from "../../pages/TermsAndPrivacy/Terms";
import EducQuotation from "../../components/Education/EducQuotation";
import GoalQuotation from "../../components/Goal Based/GoalQuotation";
import AnnuityPage from "../../pages/AnnuityPages/Annuity";
import GroupCustomer from "../../components/Group Critical Illness/GroupCustomer";
import UploadDetails from "../../components/Group Critical Illness/UploadDetails";
import AnnuityQuotation from "../../pages/AnnuityPages/Quotation";
import SubmittedCallBack from "../../components/Group Life/SubmittedCallBackForm";
import Authentication from "../../authentication/pages/Auth";
import AuthLayout from "../../layout/auth-layout/AuthLayout";
import VehicleCategoryPage from "../../pages/MotorVehicleInsurance/VehicleCategory";
import HandleMotorSelection from "../../pages/MotorVehicleInsurance/HandleMotorSelection";
import PoliciesRoutes from "../../components/Routes/PoliciesRoutes";
import GroupCreditRoutes from "../../components/Routes/GroupCreditRoutes";
import Claims from "../../components/Claims/Claims";
import Payments from "../../components/Payments/Payments";
import Policy from "../../components/Policies/Policy";
import MotorQuotation from "../../pages/MotorVehicleInsurance/MotorQuotation";
import Dashboard from "../../pages/Dashboard";
import OTPPage from "../../authentication/pages/OTP";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/landing-page" element={<LandingPage />} />
        {/* Redirect to /landing-page */}
        {/* <Route path='/' element={<Navigate to='/landing-page' />} /> */}

        {/* Home route */}
        <Route
          path="/home"
          element={
            <PortalLayout>
              <Home />
            </PortalLayout>
          }
        />

        {/* Dashboard route */}
        <Route
          path="/"
          element={
            <InnerLayout>
              <Dashboard />
            </InnerLayout>
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
                  path="funeral-expense"
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
                <Route path="group-credit/*" element={<GroupCreditRoutes />} />
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
                <Route
                  path="motor-vehicle/select-motor-use"
                  element={<VehicleCategoryPage />}
                />
                <Route
                  path="motor-vehicle"
                  element={<HandleMotorSelection />}
                />
                <Route
                  path="motor-vehicle/quotation"
                  element={<MotorQuotation />}
                />
              </Routes>
            </PortalLayout>
          }
        />

        {/* Routes outside of /home */}
        <Route
          path="/*"
          element={
            <InnerLayout>
              <Routes>
                <Route path="/policies" element={<PoliciesRoutes />} />
                <Route path="/policies/:policyId" element={<Policy />} />
                <Route path="claims" element={<Claims />} />
                <Route path="payments" element={<Payments />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </InnerLayout>
          }
        />
        <Route path="/authentication/*" element={<AuthRoutes />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const AuthRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/otp" element={<OTPPage />} />
      </Routes>
    </AuthLayout>
  );
};

export default AppRoutes;
