// React
import ReactDOM from "react-dom/client";

// Router
import { RouterProvider } from "react-router-dom";

// Routes
import routes from "./routes";

// Styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={routes} />
);
