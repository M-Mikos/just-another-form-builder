// Router
import { NavLink } from "react-router-dom";

const FormNavigation = () => {
  return (
    <nav>
      <NavLink to="/:formId/edit">Edit</NavLink>
      <NavLink to="/:formId/answers">Answers</NavLink>
      <button>Get link</button>
    </nav>
  );
};

export default FormNavigation;
