// React
import ReactDOM from "react-dom/client";

// Router
import { RouterProvider } from "react-router-dom";

// Routes
import router from "./routes";

// Auth
import { AuthProvider } from "./context/AuthContext";

// Styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
