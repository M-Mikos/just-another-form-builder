import { createBrowserRouter } from "react-router-dom";

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
      },
      {
        path: ":formId",
        element: <Form />,
        children: [
          {
            path: "edit",
            element: <Edit />,
          },
          {
            path: "answers",
            element: <Answers />,
          },
        ],
      },
    ],
  },
]);

export default router;
