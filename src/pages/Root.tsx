// Components
import Header from "../components/Header";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { Navigation, Outlet, useNavigation } from "react-router-dom";

const Root = (): JSX.Element => {
  const navigation: Navigation = useNavigation();

  return (
    <>
      <Header />
      <div className="flex w-full justify-center p-10 ">
        <div className="container max-w-3xl">
          {navigation.state === "idle" && <Outlet />}
          {navigation.state === "loading" && <LoadingIndicator />}
        </div>
      </div>
    </>
  );
};

export default Root;
