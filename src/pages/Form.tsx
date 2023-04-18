// Components
import { Outlet } from "react-router-dom";
import FormNavigation from "../components/FormNavigation";

const Form = () => {
  return (
    <>
      <h2>Form</h2>
      <FormNavigation />
      <Outlet />
    </>
  );
};
export default Form;
