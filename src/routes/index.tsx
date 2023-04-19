// Functions & hooks
import { createBrowserRouter } from "react-router-dom";
import { loader as formLoader } from "../components/FormsList";

// Pages
import Root from "../pages/Root";
import Forms from "../pages/Forms";
import Form from "../pages/Form";
import Edit from "../pages/Edit";
import Answers from "../pages/Answers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Forms />,
        loader: formLoader,
      },
      {
        path: "/:formId",
        element: <Form />,
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
    ],
  },
]);

export default router;
