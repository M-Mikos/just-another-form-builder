// Components
import { Outlet } from "react-router-dom";
import FormNavigation from "../components/FormNavigation";

const Form = (): JSX.Element => {
  return (
    <>
      <FormNavigation />
      <Outlet />
    </>
  );
};
export default Form;
