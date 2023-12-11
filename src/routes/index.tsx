// Functions & hooks
import { createBrowserRouter } from "react-router-dom";
import formAnswersLoader from "./loaders/formAnswersLoader";
import formLoader from "./loaders/formLoader";
import formFillLoader from "./loaders/formFillLoader";
import formsListLoader from "./loaders/formsListLoader";
import formEditAction from "./actions/formEditAction";
import formListAction from "./actions/formListAction";
import formSubmitAction from "./actions/formSubmitAction";

// Pages
import Root from "../pages/Root";
import Forms from "../pages/Forms";
import FormRoot from "../pages/FormRoot";
import Edit from "../pages/Edit";
import Answers from "../pages/Answers";
import Fill from "../pages/Fill";
import ThankYou from "../pages/ThankYou";
import Error from "../pages/Error";
import Login from "../pages/Login";

// Auth
import Protected from "./Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Protected>
            <Forms />
          </Protected>
        ),
        loader: formsListLoader,
        action: formListAction,
      },
      {
        path: "/:formId",
        element: (
          <Protected>
            <FormRoot />
          </Protected>
        ),
        children: [
          {
            path: "/:formId",
            element: (
              <Protected>
                <Edit />
              </Protected>
            ),
            loader: formLoader,
            action: formEditAction,
          },
          {
            path: "/:formId/answers",
            element: (
              <Protected>
                <Answers />
              </Protected>
            ),
            loader: formAnswersLoader,
          },
        ],
      },
      {
        path: "/:authorId/:formId/fill",
        element: <Fill />,
        loader: formFillLoader,
        action: formSubmitAction,
      },
      {
        path: "/:authorId/:formId/fill/thankyou",
        element: <ThankYou />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
