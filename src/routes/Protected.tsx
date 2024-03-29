import { useLoaderData, useNavigate } from "react-router";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../../firebase";
import LoadingIndicator from "../components/UI/LoadingIndicator";

// TS Interfaces declaration
interface PropsTypes {
  children: ReactNode;
}

const Protected = (props: PropsTypes): JSX.Element => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // User is not authenticated, redirect to login
        navigate("/login");
      }

      // Re-call loader function when user is authenticated, but loader returned no user
      if (user && data === "no user") {
        navigate(".", { replace: true });
      }

      // navigate(".", { replace: true });
      // Set loading to false after the authentication state is resolved
      setLoading(false);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  // If still loading, you can show a loading indicator or null
  return <>{loading ? <LoadingIndicator /> : props.children}</>;
};

export default Protected;
