import { useLocation } from "react-router-dom";
import PrivateUsePage from "./PrivateUse";
import CommercialActivitiesPage from "./CommercialActivities";


const HandleMotorSelection = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const motorUse = searchParams.get("use");

  return (
    <>
      {motorUse === "private" && <PrivateUsePage />}
      {motorUse === "commercial" && <CommercialActivitiesPage />}
    </>
  );
};

export default HandleMotorSelection;
