// Functions & hooks
import { createBrowserRouter } from "react-router-dom";
import { loader as formsListLoader } from "../pages/Forms";
import { loader as formLoader } from "../pages/Fill";

// Pages
import Root from "../pages/Root";
import Forms from "../pages/Forms";
import FormRoot from "../pages/FormRoot";
import Edit from "../pages/Edit";
import Answers from "../pages/Answers";
import Fill from "../pages/Fill";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Forms />,
        loader: formsListLoader,
      },
      {
        path: "/:formId",
        element: <FormRoot />,
        children: [
          {
            path: "/:formId",
            element: <Edit />,
          },
          {
            path: "/:formId/answers",
            element: <Answers />,
          },
        ],
      },
      {
        path: "/:formId/fill",
        element: <Fill />,
        loader: formLoader,
      },
    ],
  },
]);

export default router;
