// Functions & hooks
import { createBrowserRouter } from "react-router-dom";
import { loader as formsListLoader } from "../pages/Forms";
import { loader as formLoader } from "../pages/Fill";
import { loader as formAnswersLoader } from "../pages/Answers";
import { action as formSubmitAction } from "../components/FormToFill";
import { action as formEditAction } from "../components/FormEdit";
import { action as formListAction } from "../components/FormsList";

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
        action: formListAction,
      },
      {
        path: "/:formId",
        element: <FormRoot />,
        children: [
          {
            path: "/:formId",
            element: <Edit />,
            loader: formLoader,
            action: formEditAction,
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
        loader: formLoader,
        action: formSubmitAction,
      },
    ],
  },
]);

export default router;
