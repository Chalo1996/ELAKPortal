import { Routes, Route } from "react-router-dom";
import Policies from "../Policies/Policies";
import Policy from "../Policies/Policy";

const PoliciesRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Policies />} />
      <Route path=':policyId' element={<Policy />} />
    </Routes>
  );
};

export default PoliciesRoutes;
