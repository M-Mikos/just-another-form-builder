import { Link } from "react-router-dom";
import Header from "../components/Header";

const Error = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className="flex h-96 w-full flex-col items-center justify-center gap-2">
        <h1 className="text-8xl font-semibold">404</h1>
        <h2>Page not found</h2>
        <Link to={`/`}>
          <p className="text-sky-500 hover:text-sky-700">
            Return to the homepage
          </p>
        </Link>
      </div>
    </>
  );
};

export default Error;
