// Functions & hooks
import { createBrowserRouter } from "react-router-dom";
import { loader as formsListLoader } from "../pages/Forms";
import { loader as formToFillLoader } from "../pages/Fill";
import { loader as formAnswersLoader } from "../pages/Answers";

import { action as formSubmitAction } from "../components/FormToFill";

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
            loader: formAnswersLoader,
          },
        ],
      },
      {
        path: "/:formId/fill",
        element: <Fill />,
        loader: formToFillLoader,
        action: formSubmitAction,
      },
    ],
  },
]);

export default router;
