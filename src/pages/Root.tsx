// Components
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Header />
      <div className="container p-10">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
