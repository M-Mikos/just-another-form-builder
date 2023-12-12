// Functions and hooks
import { useAuth } from "../context/AuthContext";
// Router
import { NavLink, useParams } from "react-router-dom";

const FormNavigation = (): JSX.Element => {
  const { formId } = useParams() as { formId: string };
  const { user } = useAuth() as { user: any };
  const authorId = user.uid;

  const navLinkStyles = ({ isActive }: { isActive: boolean }): string => {
    return `px-2 py-2 text-sm text-stone-900 hover:bg-gray-200 opacity-80 ${
      isActive && "opacity-100 border-b-4 border-sky-500"
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
        <NavLink
          to={`/${authorId}/${formId}/fill`}
          className={navLinkStyles}
          end
        >
          Fill
        </NavLink>
      </nav>
    </div>
  );
};

export default FormNavigation;
