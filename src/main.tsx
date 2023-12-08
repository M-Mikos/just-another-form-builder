// React
import ReactDOM from "react-dom/client";

// Router
import { RouterProvider } from "react-router-dom";

// Routes
import routes from "./routes";

// Styles
import "./index.css";

// Auth
import { auth } from "../firebase";
import { signInAnonymously } from "firebase/auth";

signInAnonymously(auth)
  .then(() => {
    console.log("auth");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={routes} />
);
