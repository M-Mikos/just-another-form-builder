// Router
import { NavLink, useParams } from "react-router-dom";

const FormNavigation = () => {
  const { formId } = useParams();
  return (
    <nav>
      <NavLink to={`/${formId}`}>Edit</NavLink>
      <NavLink to={`/${formId}/answers`}>Answers</NavLink>
      <NavLink to={`/${formId}/fill`}>Fill</NavLink>
    </nav>
  );
};

export default FormNavigation;
