import { signInAnonymously } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import Card from "../components/UI/Card";

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/");
    } catch (error) {
      console.error;
    }
  };
  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-8">
      <h2>Welcome to the form builder</h2>
      <p>Log in as a guest to start building your own forms</p>
      <button className="btn--strong" onClick={loginHandler}>
        Log in
      </button>
    </Card>
  );
};

export default Login;
