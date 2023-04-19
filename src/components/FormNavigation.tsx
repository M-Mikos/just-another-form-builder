// Router
import { NavLink, useParams } from "react-router-dom";

const FormNavigation = () => {
  const { formId } = useParams();
  return (
    <nav>
      <NavLink to={`/${formId}`}>Edit</NavLink>
      <NavLink to={`/${formId}/answers`}>Answers</NavLink>
      <button>Get link</button>
    </nav>
  );
};

export default FormNavigation;
