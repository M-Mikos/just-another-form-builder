import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { auth } from "../../firebase";

// TS Interfaces declaration
interface AuthContextProps {
  user: any | null;
}
interface PropsTypes {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = (props: PropsTypes): JSX.Element => {
  const [user, setUser] = useState<AuthContextProps["user"]>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
