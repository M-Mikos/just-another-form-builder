// Components
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Header />
      <div className="flex w-full justify-center p-10 ">
        <div className="container max-w-3xl">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
