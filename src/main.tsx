// React
import ReactDOM from "react-dom/client";

// Router
import { RouterProvider } from "react-router-dom";

// Routes
import routes from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={routes} />
);
