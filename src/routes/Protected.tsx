import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ReactNode, useEffect } from "react";

// TS Interfaces declaration
interface PropsTypes {
  children: ReactNode;
}

const Protected = (props: PropsTypes): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth() as { user: any };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <>{props.children}</>;
};

export default Protected;
