// Components
import { Link } from "react-router-dom";

const Header = (): JSX.Element => {
  return (
    <div className="border-b-2 border-stone-300 bg-white p-6">
      <Link to="/">
        <h1 className="text-xl font-semibold">Just Another Form Builder</h1>
      </Link>
    </div>
  );
};

export default Header;
