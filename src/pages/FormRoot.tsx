// Components
import { Outlet } from "react-router-dom";
import FormNavigation from "../components/FormNavigation";

const Form = () => {
  return (
    <>
      <FormNavigation />
      <Outlet />
    </>
  );
};
export default Form;
