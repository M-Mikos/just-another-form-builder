// Router
import { NavLink, useParams } from "react-router-dom";

const FormNavigation = () => {
  const { formId } = useParams();

  const navLinkStyles = ({ isActive }: { isActive: boolean }): string => {
    return `px-2 py-2 text-sm font-bold hover:bg-gray-100 ${
      isActive && "text-emerald-500 border-b-2 border-emerald-500"
    }`;
  };

  return (
    <div className="mb-6 flex w-full justify-center">
      <nav className="flex gap-3 ">
        <NavLink to={`/${formId}`} className={navLinkStyles} end>
          Edit
        </NavLink>
        <NavLink to={`/${formId}/answers`} className={navLinkStyles} end>
          Answers
        </NavLink>
        <NavLink to={`/${formId}/fill`} className={navLinkStyles} end>
          Fill
        </NavLink>
      </nav>
    </div>
  );
};

export default FormNavigation;
