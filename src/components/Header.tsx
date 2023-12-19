// Components
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth() as { user: any };
  const logOutHandler = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <div className="jus flex flex-col-reverse items-center gap-4  border-b-2 border-stone-300 bg-white p-6 sm:flex-row sm:justify-between">
      <Link to="/">
        <h1 className="text-xl font-semibold">Just Another Form Builder</h1>
      </Link>
      {user && (
        <span className="text-[10px] text-stone-500">
          Your guest ID: {user.uid}
          <button
            className="ml-2 rounded-lg border-[1px] border-stone-500 px-2 text-stone-500 hover:border-stone-900 hover:text-stone-900"
            onClick={logOutHandler}
          >
            Log out
          </button>
        </span>
      )}
    </div>
  );
};

export default Header;
